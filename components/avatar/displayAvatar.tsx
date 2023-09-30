"use client";

// Importing the necessary resources and components
import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function DisplayAvatar() {
  // Using the custom hooks to get the user and profile data
  const [isUpdatingAvatarImage, setIsUpdatingAvatarImage] = useState(false);
  const user = useUser();
  const { profile, loading, blobUrl, refetch } = useProfile(user?.id);

  // Local state for storing the user's initials
  const [initials, setInitials] = useState<string>("");

  // Function to capitalize and get the initials from the user's email
  const getInitialsAndCapitalize = (name: string) => {
    return name?.toUpperCase();
  };

  const supabase = createClientComponentClient();

  // useEffect hook to set initials when the user data changes
  useEffect(() => {
    setInitials(getInitialsAndCapitalize(user?.email[0]));
  }, [user]);

  const subscribeToAvatarUpdates = useCallback(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("schema-db-changes-for-display-avatar")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          // console.log("Change received!", payload);
          setIsUpdatingAvatarImage(true);
          if (payload.old.id === user?.id) {
            // console.log("Updating profile...");

            refetch().then((data) => {
              setIsUpdatingAvatarImage(false);
              console.log("Profile updated!");
            });
          }
        }
      )
      .subscribe();
  }, [user?.id]);

  useEffect(() => {
    const unsubscribe = subscribeToAvatarUpdates();
    return unsubscribe;
  }, [user?.id, subscribeToAvatarUpdates]);

  return (
    <>
      <div className="flex items-center text-xs text-gray-400">
        <div className="flex items-center ">
          {isUpdatingAvatarImage && (
            <div className="absolute w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] z-20">
              <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
              <div className="flex justify-center align-middle items-center h-full w-full">
                <Loader2 className="w-20 h-20 animate-spin z-10" />
              </div>
            </div>
          )}
          <Image
            src={blobUrl || "/avatar-placeholder.jpg"}
            alt={`avatar`}
            width={200}
            height={200}
            className="rounded border"
          />
        </div>
      </div>
    </>
  );
}
