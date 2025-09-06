import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";
import UserTooltip from "./UserTooltip";

const TrendSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      {/* Because WhoToFollow is server component so maybe it have some delay for loading data for 
        example like call api will take time or something like i set timeout about 10s then it will block ui.
        So with server component to load independent we use Suspense block and fallback to show loading icon.
        And Suspense only work with child compoent
        */}
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhotoFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

async function WhotoFollow() {
  const { user } = await validateRequest();
  console.log("WhotoFollow user ---", user);
  // await new Promise((r) => setTimeout(r, 10000));
  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      // alo remove followerId that already follow
      // followers: {
      //   none: {
      //     followerId: user.id,
      //   },
      // },
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });
  console.log("usersToFollow ---", usersToFollow);

  return (
    <div className="bg-card space-y-5 rounded-2xl p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
      {usersToFollow.map((userFollow) => (
        <div
          className="flex items-center justify-between gap-3"
          key={userFollow.id}
        >
          <UserTooltip user={userFollow}>
            <Link
              href={`/users/${userFollow.id}`}
              className="flex items-center gap-3"
            >
              <div>
                <p className="line-clamp-1 font-semibold break-all hover:underline">
                  {userFollow.displayName}
                </p>
                <p className="text-muted-foreground line-clamp-1 break-all">
                  @{userFollow.username}
                </p>
              </div>
            </Link>
          </UserTooltip>
          <FollowButton
            userId={userFollow.id}
            initialState={{
              followers: userFollow._count.followers,
              isFollowedByUser: userFollow.followers.some(
                ({ followerId }) => followerId === user.id,
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5
  `;

    return result.map((Row) => ({
      hashtag: Row.hashtag,
      count: Number(Row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60, // 3 hours
  },
);

const TrendingTopics = async () => {
  const topics = await getTrendingTopics();
  return (
    <div className="bg-card space-y-5 rounded-2xl p-5 shadow-sm">
      <div className="text-xl font-bold">Trending Topics</div>
      {topics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];
        return (
          <Link href={`/hashtag/${title}`} className="block" key={hashtag}>
            <p
              className="line-clamp-1 font-semibold break-all hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-muted-foreground text-sm">
              {formatNumber(count)} {count === 1 ? "Post" : "Posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendSidebar;
