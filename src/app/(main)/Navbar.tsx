import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-card sticky top-0 z-10 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center p-5">
        <Link className="text-primary text-2xl font-bold" href={"/"}>
          BenBook
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
};

export default Navbar;
