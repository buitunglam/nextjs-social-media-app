
import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendSidebar from "@/components/TrendSidebar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import ForYourFeed from "./ForYourFeed";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYourFeed />
      </div>
      <TrendSidebar />
    </main>
  );
}
