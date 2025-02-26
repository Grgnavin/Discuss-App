"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";

const AuthHeader = () => {
  const session = useSession();
  let authContent: React.ReactNode;

  if(session.status === "loading") return null;

  if (session?.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage
              src={session?.data?.user?.image || ""}
              alt={session?.data?.user?.name || ""}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="text-center">
            <h1 className="text-lg">{session?.data?.user?.name}</h1>
            <p className="text-sm text-gray-500">{session?.data?.user?.email}</p>
          </div>
          <Separator className="my-2" />
          <form action={signOut}>
            <Button className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <form action={signIn}>
          <Button variant={"outline"}>Signin</Button>
        </form>
        <form action={signIn}>
          <Button>Signup</Button>
        </form>
      </>
    );
  }

  return <div className="flex gap-2">{authContent}</div>;
};

export default AuthHeader;
