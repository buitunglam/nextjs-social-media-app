import { validateRequest } from "@/auth";
import FollowButton from "@/components/FollowButton";
import FollowerCount from "@/components/FollowerCount";
import TrendSidebar from "@/components/TrendSidebar";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { prisma } from "@/lib/prisma";
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";
import { formatDate } from "date-fns";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import UserPosts from "./UserPosts";

interface PageProps {
  params: { username: string };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });
  if (!user) notFound();
  return user;
});

export const generateMetadata = async ({ params: { username } }: PageProps) => {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user?.username})`,
  };
};

const Page = async ({ params: { username } }: PageProps) => {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser)
    return (
      <p className="text-destructive">
        You &apos;re not authorized to view this page
      </p>
    );
  const user = await getUser(username, loggedInUser.id);
  console.log("user profile:", user, username);
  return (
    <main className="w-fulll flex min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">
            {user.displayName}'s Posts
          </h2>
        </div>
        <UserPosts userId={user.id} />
      </div>
      <TrendSidebar />
    </main>
  );
};

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

const UserProfile = async ({ user, loggedInUserId }: UserProfileProps) => {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId == loggedInUserId,
    ),
  };

  return (
    <div className="bg-card h-fit w-full space-y-5 rounded-2xl p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user.avartarUrl}
        size={250}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <div className="text-muted-foreground">@{user.username}</div>
          </div>
          <div>Member since {formatDate(user.createdAt, "MMM d, yyyy")}</div>
          <div className="flex items-center gap-3">
            <span>
              Post: <span className="font-semibold">{user._count.posts}</span>
            </span>
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>
        {user.id == loggedInUserId ? (
          <Button>Edit Profile</Button>
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}
      </div>
      {user.bio && (
        <>
          <hr />
          <div className="overflow-hidden break-words whitespace-pre-line">
            {user.bio}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
