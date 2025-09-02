import {
  InfiniteData,
  QueryClient,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";
import { toast } from "sonner";
import { PostPage } from "@/lib/types";
import { validateRequest } from "@/auth";
import { useSession } from "@/app/(main)/SessionProvider";

export function useSubmitPostMutation() {
  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["post-feed"],
        // this make sure whenever we go to for-you feed or user prfile this will requery post
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryHash.includes(user.id))
          );
        },
      } satisfies QueryFilters;
      // first we need to cancle all query is running
      await queryClient.cancelQueries();
      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      /*
    The invalidateQueries code with the predicate function will only invalidate (refetch) queries for ["post-feed", "for-you"]
    if those queries do not have any data yet (i.e., query.state.data is falsy).
    This is useful when the feed is empty and the user submits their first post,
    ensuring the feed updates and fetches fresh data. If the feed already has data,
    those queries are not invalidated by this code.
      */
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          // check queryFilter.predicate(query) also to make sure
          // whenever we go to for-you feed or user prfile this will requery post
          return queryFilter.predicate(query) && !query.state.data;
        },
      });

      toast.success("Post created!");
    },
    onError: (error) => {
      console.log("error ----", error);
      toast.error("Failed to post. Please try again.");
    },
  });
  return mutation;
}
