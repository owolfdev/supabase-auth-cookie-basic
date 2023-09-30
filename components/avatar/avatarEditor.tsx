"use client";

import React, { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useProfile } from "@/hooks/useProfile";

interface AvatarEditorProps {
  setAvatarFileForUpdate: (file: File | null) => void;
  avatarUrl: string | null;
  setIsEditingAvatar: (isEditingAvatar: boolean) => void;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  setAvatarFileForUpdate,
  avatarUrl,
  setIsEditingAvatar,
}) => {
  const [inputImage, setInputImage] = React.useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useUser();
  const supabase = createClientComponentClient();
  const { profile, loading, blobUrl, refetch } = useProfile(user?.id);

  function handleButtonClickForFileInput() {
    fileInputRef?.current?.click();
  }

  const getCroppedImageFromCropper = () => {
    const cropper = cropperRef.current?.cropper;
    const dataURL = cropper?.getCroppedCanvas().toDataURL();
    const file = dataURLtoFile(dataURL, "image.png");
    setAvatarFileForUpdate(file);
    setIsEditingAvatar(false);
    // console.log(file);
  };

  function dataURLtoFile(dataUrl: any, filename: string) {
    var arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const subscribeToAvatarUpdates = useCallback(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("schema-db-changes-for-avatar-editor")
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

  const cropperRef = useRef<ReactCropperElement>(null);
  return (
    <>
      <div id="avatar-editor-container" className="flex flex-col gap-4">
        <Cropper
          src={inputImage || blobUrl || "/avatar-placeholder.jpg"}
          style={{ height: 200, width: 200 }}
          // Cropper.js options
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          guides={false}
          ref={cropperRef}
          // viewMode={0}
        />

        <div className="flex gap-4">
          <Button className="" onClick={getCroppedImageFromCropper}>
            Update Avatar
          </Button>
          <Button
            variant="destructive"
            className=""
            onClick={() => setIsEditingAvatar(false)}
          >
            Cancel
          </Button>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={handleButtonClickForFileInput}
            className="bg-blue-500 text-white text-sm py-2 px-4 rounded-md" // Tailwind styling
          >
            Upload New Avatar Image
          </button>
        </div>
      </div>
    </>
  );
};

export default AvatarEditor;
