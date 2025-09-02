"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPostDataInClude } from "@/lib/types";
import { createPostsSchema } from "@/lib/validation";

export async function submitPost(input: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const { content } = createPostsSchema.parse({ content: input });
  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: getPostDataInClude(user.id),
  });

  return newPost;
}
