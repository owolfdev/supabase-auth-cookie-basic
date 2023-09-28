"use client";

// Importing the necessary resources and components
import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { ProfileDisplay } from "./profileDisplay";
import { Button } from "../ui/button";

export function Profile() {
  // Using the custom hooks to get the user and profile data
  const user = useUser();
  const { profile, loading, blobUrl } = useProfile(user?.id);

  if (!user || loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-12">
        {/* <div className="">User: {JSON.stringify(user)}</div> */}
        <div>
          <ProfileDisplay profile={profile} />
          <Button className="mt-8">Edit Profile</Button>
        </div>
        <div>
          {blobUrl && (
            <Image
              src={blobUrl}
              alt="avatar"
              height={200}
              width={200}
              layout="cover"
            />
          )}
        </div>
        <div className="text-sm text-gray-500">
          Profile: {JSON.stringify(profile)}
        </div>
      </div>
    </>
  );
}
