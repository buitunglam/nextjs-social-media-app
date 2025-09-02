import {
  QueryClient,
  QueryFilters,
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";
import { toast } from "sonner";
import { PostPage } from "@/lib/types";

export function useDeletePostMutation() {
  const router = useRouter();
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const mutatation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: oldData.pages.map((page) => ({
                nextCursor: page.nextCursor,
                posts: page.posts.filter((p) => p.id != deletedPost.id),
              })),
            };
          }
        },
      );

      toast.success("Post deleted!");
      if (pathName === `/posts/${deletedPost.id}`) {
        router.push(`post/${deletedPost.user.username}`);
      }
    },
    onError(error) {
      console.log(error);
      toast.error("Failed to delete post. Please try it again");
    },
  });

  return mutatation;
}
