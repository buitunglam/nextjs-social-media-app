"use client";
import React, { PropsWithChildren } from "react";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipArrow, TooltipTrigger } from "@radix-ui/react-tooltip";
import { FollowerInfo, UserData } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import Linkify from "./Linkify";
import FollowerCount from "./FollowerCount";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

const UserTooltip = ({ children, user }: UserTooltipProps) => {
  const { user: loggedInUser } = useSession();

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === loggedInUser.id,
    ),
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="break-works flex max-w-80 flex-col gap-3 px-1 py-2.5 md:min-w-52">
          <div className="flex items-center justify-between gap-2">
            <Link href={`users/${user.username}`}>
              <UserAvatar avatarUrl={user.avartarUrl} size={70} />
            </Link>
            {loggedInUser.id !== user.id && (
              <FollowButton userId={user.id} initialState={followerState} />
            )}
          </div>
          <div>
            <Link href={`/users/${user.username}`}>
              <div className="text-lg font-semibold hover:underline">
                {user.displayName}
              </div>
              <div className="text-muted-foreground">@{user.username}</div>
            </Link>
          </div>
          {user.bio && (
            <Linkify>
              <div className="line-clamp-4 whitespace-pre-line">{user.bio}</div>
            </Linkify>
          )}
          <FollowerCount userId={user.id} initialState={followerState} />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default UserTooltip;
