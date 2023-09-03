import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface AvatarEditorProps {
  yourImage: string; // assuming yourImage is a URL string
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ yourImage }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      const croppedImage = await getCroppedImg(yourImage, croppedAreaPixels);
      setCroppedImage(croppedImage);
    },
    [yourImage]
  );

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  async function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  }

  return (
    <>
      <div style={{ position: "relative", width: "200px", height: "200px" }}>
        <Cropper
          image={yourImage}
          crop={crop}
          zoom={zoom}
          aspect={1} // 1:1 ratio for a round image
          cropShape="round" // Crop shape set to round
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </>
  );
};

export default AvatarEditor;
