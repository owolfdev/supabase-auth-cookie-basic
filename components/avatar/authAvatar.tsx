"use client";

// Importing the necessary resources and components
import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function AuthAvatar() {
  // Using the custom hooks to get the user and profile data
  const user = useUser();
  const { profile, loading, blobUrl, refetch, createProfile } = useProfile(
    user?.id
  );

  // Local state for storing the user's initials
  const [initials, setInitials] = useState<string>("");

  // Function to capitalize and get the initials from the user's email
  const getInitialsAndCapitalize = (name: string) => {
    return name?.toUpperCase();
  };

  const supabase = createClientComponentClient();

  useEffect(() => {
    loading && console.log("loading:", loading);
    if (!loading && !profile) {
      console.log("no profile found, creating one");
      createProfile(user?.id as string);
    }
  }, [loading, profile]);

  // useEffect hook to set initials when the user data changes
  useEffect(() => {
    setInitials(getInitialsAndCapitalize(user?.email[0]));
  }, [user]);

  const subscribeToAvatarUpdates = useCallback(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("schema-db-changes-for-auth-avatar")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          // console.log("Change received!", payload);
          if (payload.old.id === user?.id) {
            // console.log("Updating profile...");
            refetch();
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
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={blobUrl || ""}
              alt={`avatar`}
              className="rounded-full border w-8 h-8"
            />
            <AvatarFallback>
              <span className="text-lg">{initials}</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
