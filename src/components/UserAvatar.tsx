import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";


interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt="avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "bg-secondary aspect-square h-fit flex-none rounded-full object-cover",
        className,
      )}
    />
  );
};

export default UserAvatar;
