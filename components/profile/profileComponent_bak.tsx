"use client";
import { useState, useCallback, useEffect, use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";

// import Avatar from "./avatar";
import AvatarEditor from "@/components/avatar/avatarEditor";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const formSchema = z.object({
  username: z.string().optional(),
  fullname: z.string().optional(),
  website: z.string().optional(),
  company: z.string().optional(),
});

interface ProfileData {
  fullname: string | null;
  username: string | null;
  website: string | null;
  avatarUrl: string | null;
  company: string | null;
}

interface ProfileFormProps {
  session: Session | null;
}

interface FormValues {
  username: string | null;
  fullname: string | null;
  website: string | null;
  company: string | null;
}

export function Profile({ session }: ProfileFormProps) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData>({
    fullname: "",
    username: "",
    website: "",
    avatarUrl: null,
    company: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);

  // const [avatarUrlForUpdate, setAvatarUrlForUpdate] = useState<string | null>(
  //   null
  // );

  const [userHasInteractedWithAvatar, setUserHasInteractedWithAvatar] =
    useState<boolean>(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const setAvatarFileForUpdate = (file: File | null) => {
    setAvatarFile(file);
  };

  const { toast } = useToast();

  useEffect(() => {
    // console.log("avatarFile", avatarFile);
  }, [avatarFile]);

  useEffect(() => {
    // console.log("userHasInteractedWithAvatar", userHasInteractedWithAvatar);
  }, [userHasInteractedWithAvatar]);

  const user = session?.user;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile.username,
      fullname: profile.fullname,
      website: profile.website,
      company: profile.company,
    },
  });

  const { setValue } = form;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url, company`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setProfile({
          fullname: data.full_name,
          username: data.username,
          website: data.website,
          avatarUrl: data.avatar_url,
          company: data.company,
        });

        setValue("username", data.username || "");
        setValue("fullname", data.full_name || "");
        setValue("website", data.website || "");
        setValue("company", data.company || "");
      }
    } catch (error) {
      setError("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    fullname,
    avatarUrl,
    company,
  }: ProfileData): Promise<void> {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username: username,
        website: website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
        company: company,
      });

      if (error) throw error;

      // alert("Profile updated successfully");
    } catch (error) {
      setError("Error updating the data");
    } finally {
      // toast({
      //   title: "Profile updated successfully",
      //   description: "Your profile has been updated.",
      // });
      setLoading(false);
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);

      const now = new Date();
      const secondsSinceEpoch = Math.floor(now.getTime() / 1000);

      // default to the existing URL

      let avatarValue = profile.avatarUrl;

      // If a new avatar file is set, delete the existing avatar (if any) and upload the new file to Supabase

      //
      if (avatarFile && userHasInteractedWithAvatar) {
        let oldAvatarUrl = profile.avatarUrl; // default to the existing URL
        let newAvatarUrl = `${user?.id}.${secondsSinceEpoch}.png`;
        avatarValue = newAvatarUrl;
        // console.log(
        //   "we have a new avatar file, so we will delete the old avatar file",
        //   oldAvatarUrl,
        //   "and upload the new one",
        //   avatarFile
        // );
        // Delete the existing avatar file (if any)
        if (oldAvatarUrl) {
          const { error: deleteError } = await supabase.storage
            .from("avatars")
            .remove(profile.avatarUrl);
          if (deleteError) {
            console.error("Error deleting existing avatar:", deleteError);
            throw deleteError;
          }
        }

        // Upload the new avatar file
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(newAvatarUrl, avatarFile);
        if (error) {
          throw error;
        }
        // update the URL to the new file's URL (confirm the attribute name from Supabase documentation)
      }

      // Create an object holding the updated profile data
      const updatedProfileData: ProfileData = {
        ...profile,
        ...values,
        avatarUrl: avatarValue,
      };

      // Update profile data
      await updateProfile(updatedProfileData);

      // alert("Profile updated successfully");
    } catch (error) {
      console.error("Caught an error:", error);
      setError("Error updating profile");
    } finally {
      setLoading(false);
      getProfile();
      setIsEditingProfile(false);
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated.",
      });
    }
  }

  const Profile = () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="font-medium">User Name</div>
          <div className="text-sm pl-4">{profile?.username}</div>
          <div className="text-sm text-muted-foreground">
            Your public display name.
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">Full Name</div>
          <div className="text-sm pl-4">{profile?.fullname}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">Company</div>
          <div className="text-sm pl-4">{profile?.company}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">Website</div>
          <div className="text-sm pl-4">{profile?.website}</div>
        </div>
      </div>
    );
  };

  const ProfileForm = () => {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-[340px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter user name."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter full name."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company name."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter web site."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-0">
            <Button type="submit" className="">
              Update Profile
            </Button>
          </div>
          {/* <div
            id="avatar"
            className="flex flex-col gap-2
     w-1/2"
            onClick={() => {
              if (!userHasInteractedWithAvatar) {
                setUserHasInteractedWithAvatar(true);
              }
            }}
          >
            <div>Avatar</div>

            <AvatarEditor
              avatarUrl={profile.avatarUrl}
              setAvatarFileForUpdate={setAvatarFileForUpdate}
            />
          </div> */}
        </form>
      </Form>
    );
  };

  const AvatarEditorComponent = () => {
    return (
      <div
        id="avatar"
        className="flex flex-col gap-2
w-1/2"
        onClick={() => {
          if (!userHasInteractedWithAvatar) {
            setUserHasInteractedWithAvatar(true);
          }
        }}
      >
        {/* File upload input */}
        <div>Avatar</div>
        {/* <div>{avatarUrl}</div> */}
        <AvatarEditor
          avatarUrl={profile.avatarUrl}
          setAvatarFileForUpdate={setAvatarFileForUpdate}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-medium">Email</div>
          <div className="text-sm pl-4">{user?.email}</div>
          <div className="text-sm text-muted-foreground">
            Your account is linked to this email.
          </div>

          {!isEditingProfile && (
            <div className="pt-4 flex flex-col gap-8">
              <Profile />

              <div className="">
                <Button onClick={() => setIsEditingProfile(true)}>
                  Edit Profile
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            {isEditingProfile && <ProfileForm />}
            {/* <AvatarEditorComponent /> */}
          </div>
        </div>

        <div>
          {!isEditingAvatar && (
            <div className="pt-2">
              <Button onClick={() => setIsEditingAvatar(true)}>
                Edit Avatar
              </Button>
            </div>
          )}

          <div className="pt-4">
            {isEditingAvatar && <AvatarEditorComponent />}
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}
