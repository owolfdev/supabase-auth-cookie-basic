"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../ui/button";

interface AvatarEditorProps {
  setAvatarFileForUpdate: (file: File | null) => void;
  avatarUrl: string | null;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  setAvatarFileForUpdate,
  avatarUrl,
}) => {
  const [inputImage, setInputImage] = React.useState("");

  const getCroppedImageFromCropper = () => {
    const cropper = cropperRef.current?.cropper;
    const dataURL = cropper?.getCroppedCanvas().toDataURL();
    const file = dataURLtoFile(dataURL, "image.png");
    setAvatarFileForUpdate(file);
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

  const cropperRef = useRef<ReactCropperElement>(null);
  return (
    <>
      <div id="avatar-editor-container" className="flex flex-col gap-8">
        <Cropper
          src={inputImage || avatarUrl || "/avatar-placeholder.jpg"}
          style={{ height: 200, width: 200 }}
          // Cropper.js options
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          guides={false}
          ref={cropperRef}
          // viewMode={0}
        />

        <Button className="" onClick={getCroppedImageFromCropper}>
          Confirm
        </Button>
      </div>
    </>
  );
};

export default AvatarEditor;
