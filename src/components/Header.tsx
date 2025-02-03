import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/app/actions/sign-in";
import { signOut } from "@/app/actions/sign-out";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";

const HeaderPage = async () => {
  const session = await auth();
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-14">
      <div className="flex justify-start">
        <h1 className="font-semibold text-xl">Discuss</h1>
      </div>
      <div className="flex justify-center">
        <Input type="text" placeholder="Search posts..." />
      </div>
      <div className="flex justify-end gap-2">
        {session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || ""}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="text-center">
                <h1 className="text-lg">{session?.user?.name}</h1>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
              <Separator className="my-2" />
              <form action={signOut}>
              <Button className="w-full">
                {" "}
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
              </form>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <form action={signIn}>
              <Button variant={"outline"}>Signin</Button>
            </form>
            <form action={signIn}>
              <Button>Signup</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
