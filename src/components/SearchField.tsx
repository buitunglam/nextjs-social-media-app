'use client';

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const SearchField = () => {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLFormElement).value.trim();
    if(!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action={`/search`}>
      <div className="relative mx-3 bg-secondary">
        <Input name="q" placeholder="Search" className="" />
        <SearchIcon className="-translate-y-1/2 text-muted-foreground absolute top-1/2 right-3 size-5" />
      </div>
    </form>
  );
};

export default SearchField;
