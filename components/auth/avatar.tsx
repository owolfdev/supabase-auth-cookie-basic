"use client";
import React, { use, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function Avatar({
  uid,
  avatarUrl,
  size,
  onUpload,
}: {
  uid: string;
  avatarUrl: string;
  size: number;
  onUpload: (avatarUrl: string) => void;
}) {
  const supabase = createClientComponentClient();
  const [urlLocal, setUrlLocal] = useState(avatarUrl);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    console.log("Avatar, url: ", avatarUrl);
  }, [avatarUrl, urlLocal]);

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl, supabase, setUrlLocal);
  }, [avatarUrl, supabase]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadAvatarImage(file);
    }
  };

  const loadAvatarImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setUrlLocal(url);
  };

  return (
    <div>
      <div>{urlLocal}</div>
      {urlLocal ? (
        <Image
          width={size}
          height={size}
          src={urlLocal}
          alt="Avatar"
          className="rounded-full"
          // style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          Load Image
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
    </div>
  );
}

export async function downloadImage(
  path: string,
  supabase: any,
  setAvatarUrl: any
) {
  console.log("downloadImage, path: ", path);
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    setAvatarUrl(url);
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}

//upload avatar

// const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
//   event
// ) => {
//   //
//   try {
//     setUploading(true);

//     if (!event.target.files || event.target.files.length === 0) {
//       throw new Error("You must select an image to upload.");
//     }

//     // Step 1: Check if an old image exists
//     if (avatarUrl) {
//       const { error: deleteError } = await supabase.storage
//         .from("avatars")
//         .remove(url); // Extract the file name from the URL
//       if (deleteError) {
//         throw deleteError;
//       }
//     }

//     // Steps 2 and 3: Upload the new image
//     const file = event.target.files[0];
//     const fileExt = file.name.split(".").pop();
//     const filePath = `${uid}-${Math.random()}.${fileExt}`;

//     let { error: uploadError } = await supabase.storage
//       .from("avatars")
//       .upload(filePath, file);

//     if (uploadError) {
//       throw uploadError;
//     }

//     onUpload(filePath);
//   } catch (error) {
//     alert("Error uploading avatar!");
//   } finally {
//     setUploading(false);
//   }

//   ///
// };
