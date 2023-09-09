"use client";
import { useState, useCallback, useEffect, use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Avatar from "./avatar";

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
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const storageUrl =
  "https://pvtdkxgnseqfwxsistpq.supabase.co/storage/v1/object/sign/avatars";

const formSchema = z.object({
  username: z.string().optional(),
  full_name: z.string().optional(),
  website: z.string().optional(),
});

export function ProfileForm({ session }: { session: Session | null }) {
  // const [image, setImage] = useState<string | null>(null); // for the avatar image
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true); // Fixed initialization and naming
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  // const [imageBlob, setImageBlob] = useState<Blob | null>(null); // For the cropped image blob
  // const [imageDataUrl, setImageDataUrl] = useState<string | null>(null); // For the cropped image Data URL
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // Fixed initialization and naming
  const user = session?.user;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username || "",
      full_name: fullname || "",
      website: website || "",
    },
  });

  useEffect(() => {
    console.log("avatarUrl:", avatarUrl);
  }, [avatarUrl]);

  const { setValue } = form;
  //get profile
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log("data:", data);
        setValue("username", data.username);
        setValue("full_name", data.full_name);
        setValue("website", data.website);

        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    full_name,
    avatar_url,
  }: {
    username: string | null;
    full_name: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name, // Updated to use the function parameter
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      // alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  // async function blobUrlToBlob(blobUrl: string) {
  //   const response = await fetch(blobUrl);
  //   const blob = await response.blob();
  //   return blob;
  // }

  // const handleImageFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result as string); // assuming it's a Data URL
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const onImageCropped = (imageDataUrl: string | null) => {
  //   if (imageDataUrl) {
  //     setImageDataUrl(imageDataUrl); // Storing the Data URL to be uploaded later
  //   }
  // };

  // function dataURLtoBlob(dataurl: string) {
  //   const arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)?.[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], { type: mime });
  // }

  // const uploadImageToSupabase = async (
  //   imageBlob: Blob,
  //   oldAvatarUrl: string | null
  // ) => {
  //   try {
  //     if (oldAvatarUrl) {
  //       const { error: deleteError } = await supabase.storage
  //         .from("avatars")
  //         .remove([oldAvatarUrl]); // Extract the file name from the URL
  //       if (deleteError) {
  //         throw deleteError;
  //       }
  //     }
  //     // Generate a unique path for storing the image
  //     const fileExt = "png"; // or jpg or whatever you need
  //     const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

  //     // Upload the image
  //     const { error } = await supabase.storage
  //       .from("avatars")
  //       .upload(filePath, imageBlob);
  //     if (error) throw error;

  //     // Generate the public URL for the new image
  //     const avatarUrl = `${filePath}`;

  //     return avatarUrl;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     return null;
  //   }
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit values:", values);

    try {
      setLoading(true);

      // let uploadedUrl = null;

      // if (imageDataUrl) {
      //   let imageBlob = null;

      //   if (imageDataUrl.startsWith("blob:")) {
      //     imageBlob = await blobUrlToBlob(imageDataUrl);
      //   } else {
      //     imageBlob = dataURLtoBlob(imageDataUrl);
      //   }
      //   uploadedUrl = await uploadImageToSupabase(imageBlob, avatarUrl);
      //   setAvatarUrl(uploadedUrl);
      // }

      const finalValues = {
        username: values.username ?? null,
        full_name: values.full_name ?? null,
        website: values.website ?? null,
        avatar_url: "",
      };

      // Update other profile data
      await updateProfile(finalValues);
      // await updateProfile({ ...values, avatar_url: uploadedUrl });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Caught an error:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Email</div>
          <div className="text-sm pl-4">{user?.email}</div>
          <div className="text-sm text-muted-foreground">
            Your account is linked to this email.
          </div>
        </div>
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
                    <Input placeholder="Enter user name." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name." {...field} />
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
                    <Input placeholder="Enter web site." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              id="avatar"
              className="flex flex-col gap-2
         w-1/2"
            >
              {/* File upload input */}
              {/* <div>Avatar</div> */}
              <div>{avatarUrl}</div>
              <Avatar
                uid={user?.id as string}
                avatarUrl={avatarUrl as string}
                size={300}
                onUpload={(url) => {
                  setAvatarUrl(url);
                  // updateProfile({
                  //   full_name: fullname,
                  //   username,
                  //   website,
                  //   avatar_url: avatarUrl,
                  // });
                }}
              />
            </div>

            <div className="pt-0">
              <Button type="submit" className="">
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

{
  /* <div>{JSON.stringify(`${avatarUrl}`)}</div>
              <Image
                alt="avatar"
                src={`${avatarUrl}` || "/avatar-placeholder.png"}
                width={200}
                height={200}
                className="rounded-full"
              /> */
}
{
  /* <label
                htmlFor="fileUpload"
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
              >
                <div className="">Choose File</div>
                <input
                  id="fileUpload"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileSelection}
                />
              </label> */
}
{
  /* Conditional Avatar Editor */
}
{
  /* {image && (
                <AvatarEditor
                  yourImage={image}
                  onImageCropped={onImageCropped}
                />
              )} */
}
