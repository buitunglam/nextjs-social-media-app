import { Prisma } from "@/generated/prisma";

export const userDataSelect = {
  id: true,
  username: true,
  displayName: true,
  avartarUrl: true,
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export interface PostPage {
  posts: PostData[];
  nextCursor: string | null;
}
