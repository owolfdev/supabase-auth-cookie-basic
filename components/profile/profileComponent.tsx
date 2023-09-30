"use client";

// Importing the necessary resources and components
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { ProfileDisplay } from "./profileDisplay";
import { ProfileForm } from "./profileEditForm";
import { Button } from "../ui/button";
import { on } from "events";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProfileData } from "@/types/profile";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import AvatarEditor from "../avatar/avatarEditor";
import { set } from "react-hook-form";

export function Profile() {
  // Using the custom hooks to get the user and profile data
  const user = useUser();
  const { profile, loading, blobUrl, refetch } = useProfile(user?.id);

  const [error, setError] = useState<string | null>(null);
  // A state to toggle between edit/view mode
  const [isEditing, setIsEditing] = useState(false);

  const supabase = createClientComponentClient();

  const [avatarFileForUpdate, setAvatarFileForUpdate] = useState<File | null>(
    null
  );
  const [avatarImageForUpdate, setAvatarImageForUpdate] = useState<
    string | null
  >(null);

  const { toast } = useToast();

  useEffect(() => {
    if (avatarFileForUpdate) {
      console.log("avatarFileForUpdate", avatarFileForUpdate);
      const url = URL.createObjectURL(avatarFileForUpdate);
      setAvatarImageForUpdate(url);
      uploadAvatar(avatarFileForUpdate);
    }
  }, [avatarFileForUpdate]);

  const uploadAvatar = async (file: File) => {
    console.log("uploadAvatar function");
    try {
      console.log("trying to upload avatar");

      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([`${user?.id}.avatar`]);

      console.log("uploading file");

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`${user?.id}.avatar`, file);

      if (uploadError) throw uploadError;

      // Construct the avatar URL
      const avatarUrl = `${user?.id}.avatar`;

      // Update the profile with the new avatar URL
      await updateProfile({ ...profile, avatarUrl });
    } catch (error) {
      console.log("error uploading avatar", error);
      setError("Error uploading the avatar");
    } finally {
      toast({
        title: "Avatar Updated!",
        description: "Your avatar has been updated successfully.",
      });
    }
  };

  if (!user || loading) {
    return (
      <div className="absolute w-full h-[300px]  sm:h-[400px] z-20">
        <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
        <div className="flex justify-center align-middle items-center h-full w-full">
          {/* <Loader2 className="w-20 h-20 animate-spin z-10" /> */}
        </div>
      </div>
    );
  }

  async function updateProfile({
    username,
    website,
    full_name,
    avatarUrl,
    company,
  }: ProfileData): Promise<void> {
    try {
      // setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: full_name,
        username: username,
        website: website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
        company: company,
      });

      if (error) throw error;
    } catch (error) {
      setError("Error updating the data");
    } finally {
      toast({
        title: "Profile Updated!",
        description: "Your profile has been updated successfully.",
      });
      // setLoading(false);
    }
  }

  // Function to update the profile
  const onSubmit = async (values: any) => {
    console.log("values", values);
    await updateProfile(values);
    setIsEditing(false); // Set back to view mode after updating
    refetch();
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <div>
          {isEditing ? (
            <ProfileForm
              user={user}
              onSubmit={onSubmit}
              setIsEditing={setIsEditing}
              defaultValues={{
                username: profile.username,
                full_name: profile.full_name,
                website: profile.website,
                company: profile.company,
              }}
            />
          ) : (
            <ProfileDisplay profile={profile} user={user} />
          )}
          <div className="flex gap-4">
            {!isEditing && (
              <Button className="" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        {/* avatar editor */}
        <div>
          <div>Test blob url</div>
          <div>{JSON.stringify(blobUrl)}</div>
          <img src={blobUrl || "kitten.jpg"} className="w-[200px]" />
          <div>Test cropped image</div>
          <img
            src={avatarImageForUpdate || "/avatar-placeholder.jpg"}
            className="w-[200px]"
          />
          <div>Test avatar editor</div>
          <AvatarEditor
            setAvatarFileForUpdate={setAvatarFileForUpdate}
            avatarUrl={blobUrl || "/avatar-placeholder.jpg"}
          />
        </div>
        {/* avatar editor */}
        <Toaster />
      </div>
    </>
  );
}
