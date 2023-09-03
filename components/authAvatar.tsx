"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import useUser from "@/hooks/useUser";

export function AuthAvatar() {
  //   const { user, profile } = useUser();

  const getInitialsAndCapitalize = (name: string) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((name) => name[0]?.toUpperCase());
    const initialsString = initials.join("");
    return initialsString;
  };

  return (
    <>
      <div className="flex items-center text-xs text-gray-400">
        <div className="flex items-center ">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={``}
              alt={`avatar`}
              className="rounded-full border w-8 h-8"
            />
            <AvatarFallback>
              <span className="text-lg">{getInitialsAndCapitalize(``)}</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
