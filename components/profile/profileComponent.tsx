"use client";

// Importing the necessary resources and components
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { ProfileDisplay } from "./profileDisplay";
import { ProfileForm } from "./profileEdit";
import { Button } from "../ui/button";

export function Profile() {
  // Using the custom hooks to get the user and profile data
  const user = useUser();
  const { profile, loading, blobUrl } = useProfile(user?.id);

  // A state to toggle between edit/view mode
  const [isEditing, setIsEditing] = useState(false);

  if (!user || loading) {
    return <p>Loading...</p>;
  }

  // Function to update the profile
  const onSubmit = async (values: any) => {
    console.log("values", values);
    // await updateProfile(values);
    setIsEditing(false); // Set back to view mode after updating
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <div>
          {isEditing ? (
            <ProfileForm
              onSubmit={onSubmit}
              defaultValues={{
                username: profile.username,
                full_name: profile.full_name,
                website: profile.website,
                company: profile.company,
              }}
            />
          ) : (
            <ProfileDisplay profile={profile} />
          )}
          <div
            className="flex gap-4
        "
          >
            <Button
              variant={isEditing ? `destructive` : `default`}
              className="mt-8"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            {isEditing && (
              <Button
                className="mt-8"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                Update Profile
              </Button>
            )}
          </div>
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
