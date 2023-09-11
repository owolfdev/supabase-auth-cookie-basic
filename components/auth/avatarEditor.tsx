"use client";

import React, { useRef, useEffect, useState, use } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Image from "next/image";
import { downloadAvatarImage } from "./avatarUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, buttonVariants } from "../ui/button";

interface AvatarEditorProps {
  setAvatarFileForUpdate: (file: File | null) => void;
  avatarUrl: string | null;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  setAvatarFileForUpdate,
  avatarUrl,
}) => {
  const [inputImage, setInputImage] = React.useState("");
  const [cropData, setCropData] = React.useState("");
  const cropperRef = useRef<ReactCropperElement>(null);
  const [blobUrlForImageRender, setBlobUrlForImageRender] =
    useState<string>("");
  const supabase = createClientComponentClient();

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const dataURL = cropper?.getCroppedCanvas().toDataURL();
    setCropData(cropper?.getCroppedCanvas().toDataURL() as any);
    const file = dataURLtoFile(dataURL, "image.png");
    setAvatarFileForUpdate(file);
    console.log(file);
  };

  useEffect(() => {
    if (avatarUrl)
      downloadAvatarImage(avatarUrl, supabase, setBlobUrlForImageRender);
  }, [avatarUrl, supabase]);

  function dataURLtoFile(dataurl: any, filename: string) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleInputFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setInputImage(reader.result as any);
      onCrop();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        name="avatar-input"
        id="avatar-input"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleInputFile}
      />
      <div id="cropper-container">
        <Cropper
          src={inputImage || blobUrlForImageRender || "/avatar-placeholder.jpg"}
          style={{ width: "100%" }}
          // Cropper.js options
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          guides={false}
          ref={cropperRef}
          // viewMode={0}
        />
      </div>
      <div className="mt-2">
        <div className="flex gap-2 w-full">
          <label
            className={`py-2 px-4 min-w-[110px] ${buttonVariants({
              variant: "ghost",
              size: "default",
            })}`}
            htmlFor="avatar-input"
          >
            Load New
          </label>
          <Button
            variant="ghost"
            className="py-2 px-4 min-w-[70px]"
            onClick={onCrop}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarEditor;
