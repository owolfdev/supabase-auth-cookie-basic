"use client";

// Importing the necessary resources and components
import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { ProfileDisplay } from "./profileDisplay";
import { ProfileForm } from "./profileEditForm";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProfileData } from "@/types/profile";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import AvatarEditor from "../avatar/avatarEditor";
import { DisplayAvatar } from "../avatar/displayAvatar";

export function Profile() {
  // Using the custom hooks to get the user and profile data
  const user = useUser();
  const { profile, loading, blobUrl, refetch, createProfile } = useProfile(
    user?.id
  );
  const [error, setError] = useState<string | null>(null);
  // A state to toggle between edit/view mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const supabase = createClientComponentClient();
  const [avatarFileForUpdate, setAvatarFileForUpdate] = useState<File | null>(
    null
  );
  const [avatarImageForUpdate, setAvatarImageForUpdate] = useState<
    string | null
  >(null);

  const { toast } = useToast();

  // useEffect(() => {
  //   console.log("profile from profile component", profile);
  //   console.log("user from profile component", user);
  //   if (user && !profile) {
  //     console.log("creating profile");
  //     createProfile(user?.id as string);
  //   }
  // }, [user, profile]);

  useEffect(() => {
    if (avatarFileForUpdate) {
      // console.log("avatarFileForUpdate", avatarFileForUpdate);
      const url = URL.createObjectURL(avatarFileForUpdate);
      setAvatarImageForUpdate(url);
      uploadAvatar(avatarFileForUpdate);
    }
  }, [avatarFileForUpdate]);

  const uploadAvatar = async (file: File) => {
    // console.log("uploadAvatar function");
    try {
      // console.log("trying to upload avatar");

      // Delete the old avatar from the storage

      let { data, error, status } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user?.id)
        .single();

      console.log("deleting old avatar", profile.avatar_url);

      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove(data?.avatar_url);

      if (deleteError) throw deleteError;
      console.log("deleted old avatar");

      // console.log("uploading file");

      const now = new Date();
      const time = Math.floor(now.getTime() / 1000);
      const avatarUrl = `${user?.id}.${time}.avatar`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(avatarUrl, file);

      if (uploadError) throw uploadError;

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

  // if (!user || loading) {
  //   return (
  //     <div className="absolute w-full h-[300px]  sm:h-[400px] z-20">
  //       <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
  //       <div className="flex justify-center align-middle items-center h-full w-full">
  //         <Loader2 className="w-20 h-20 animate-spin z-10" />
  //       </div>
  //     </div>
  //   );
  // }

  async function updateProfile({
    username,
    website,
    full_name,
    avatarUrl,
    company,
    info,
    role,
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
        info: info,
        role: role,
      });

      if (error) throw error;
    } catch (error) {
      setError("Error updating the data");
    } finally {
      if (isEditingProfile) {
        refetch();
      }
      // refetch();
      toast({
        title: "Profile Updated!",
        description: "Your profile has been updated successfully.",
      });
      // setLoading(false);
    }
  }

  // Function to update the profile
  const onSubmit = async (values: any) => {
    // console.log("values", values);
    await updateProfile(values);
    setIsEditingProfile(false); // Set back to view mode after updating
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <div>
          {isEditingProfile ? (
            <ProfileForm
              user={user}
              onSubmit={onSubmit}
              setIsEditing={setIsEditingProfile}
              defaultValues={{
                username: profile.username,
                full_name: profile.full_name,
                website: profile.website,
                company: profile.company,
                role: profile.role,
                info: profile.info,
              }}
            />
          ) : (
            <ProfileDisplay profile={profile} user={user} />
          )}
          <div className="flex gap-4">
            {!isEditingProfile && (
              <Button className="" onClick={() => setIsEditingProfile(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        {/* avatar editor */}
        <div>
          <div className="flex flex-col gap-4">
            {!isEditingAvatar && (
              <>
                <div>Your Avatar</div>
                <DisplayAvatar />
                <div>
                  <Button className="" onClick={() => setIsEditingAvatar(true)}>
                    Edit Avatar
                  </Button>
                </div>
              </>
            )}
          </div>
          {isEditingAvatar && (
            <AvatarEditor
              setAvatarFileForUpdate={setAvatarFileForUpdate}
              avatarUrl={blobUrl || "/avatar-placeholder.jpg"}
              setIsEditingAvatar={setIsEditingAvatar}
            />
          )}
        </div>
        {/* avatar editor */}
        <Toaster />
      </div>
    </>
  );
}
