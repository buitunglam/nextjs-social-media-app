"use client";

import useFollowerInfo from "@/app/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import React from "react";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowerCount = ({ userId, initialState }: FollowerCountProps) => {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Follower:{" "}
      <span className="font-semibold">{formatNumber(data?.followers)}</span>
    </span>
  );
};

export default FollowerCount;
