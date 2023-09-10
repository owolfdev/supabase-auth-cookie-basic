// import { useEffect, useState, useCallback, useRef } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { downloadAvatarImage } from "./avatarUtils";
// import Cropper from "react-easy-crop";
// // import { on } from "events";
// // import getCroppedImg from "./cropImage"; // You will create this utility function

// interface AvatarEditorProps {
//   avatarUrl: string | null;
//   setAvatarFileForUpdate: (file: File | null) => void;
// }

// function AvatarEditor({
//   avatarUrl,
//   setAvatarFileForUpdate,
// }: AvatarEditorProps) {
//   const [blobUrlForImageRender, setBlobUrlForImageRender] =
//     useState<string>("");
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     if (avatarUrl)
//       downloadAvatarImage(avatarUrl, supabase, setBlobUrlForImageRender);
//   }, [avatarUrl, supabase]);

//   const createImageFile = useCallback(async () => {
//     console.log("createImageFile");
//     try {
//       const blob = await getCroppedImg(
//         blobUrlForImageRender,
//         croppedAreaPixels
//       );
//       const file = new File([blob], "newAvatar.png", {
//         type: "image/png",
//       });
//       //
//       setAvatarFileForUpdate(file);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [blobUrlForImageRender, croppedAreaPixels, setAvatarFileForUpdate]);

//   const onCropComplete = useCallback(
//     async (_: any, croppedAreaPixels: any) => {
//       setCroppedAreaPixels(croppedAreaPixels);
//       createImageFile();
//     },
//     [createImageFile]
//   );

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // Resetting crop and zoom to their initial states
//       setCrop({ x: 0, y: 0 });
//       setZoom(1);

//       const reader = new FileReader();
//       reader.onload = async () => {
//         const img = new Image();
//         img.src = reader.result as string;

//         await new Promise((res) => (img.onload = res));

//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // set canvas to be a square
//         const size = Math.max(img.width, img.height);
//         canvas.width = size;
//         canvas.height = size;

//         // Fill the canvas with a black background
//         ctx?.fillRect(0, 0, canvas.width, canvas.height);

//         // draw the image onto the canvas in the center, maintaining aspect ratio
//         const offsetX = (size - img.width) / 2;
//         const offsetY = (size - img.height) / 2;
//         ctx?.drawImage(img, offsetX, offsetY, img.width, img.height);

//         // convert canvas to data URL and set it as source for Easy Cropper
//         const squaredImageUrl = canvas.toDataURL();
//         setBlobUrlForImageRender(squaredImageUrl);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCropDetails = () => {
//     console.log("crop: ", crop);
//     console.log("zoom: ", zoom);
//     console.log("croppedAreaPixels: ", croppedAreaPixels);
//   };

//   return (
//     <div className="">
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <div style={{ position: "relative", width: "200px", height: "200px" }}>
//         <Cropper
//           image={blobUrlForImageRender}
//           crop={crop}
//           zoom={zoom}
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={onCropComplete}
//           aspect={1}
//         />
//       </div>
//       <button onClick={getCropDetails}>Get crop details</button>
//     </div>
//   );
// }

// export default AvatarEditor;

// async function getCroppedImg(imageSrc: string, crop: any) {
//   const image = new Image();
//   image.crossOrigin = "anonymous";

//   await new Promise((resolve, reject) => {
//     image.addEventListener("load", resolve);
//     image.addEventListener("error", reject);
//     image.src = imageSrc;
//   });

//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (crop && ctx) {
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );
//   }

//   return new Promise<Blob>((resolve, reject) => {
//     canvas.toBlob((blob) => {
//       if (!blob) {
//         reject(new Error("Canvas is empty"));
//         return;
//       }
//       resolve(blob);
//     }, "image/png");
//   });
// }

//avatar editor new

// import { useEffect, useState, useCallback, useRef } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { downloadAvatarImage } from "./avatarUtils";
// import Cropper from "react-easy-crop";
// import { on } from "events";
// // import getCroppedImg from "./cropImage"; // You will create this utility function

// interface AvatarEditorProps {
//   avatarUrl: string | null;
//   setAvatarFileForUpdate: (file: File | null) => void;
// }

// function AvatarEditor({
//   avatarUrl,
//   setAvatarFileForUpdate,
// }: AvatarEditorProps) {
//   const [blobUrlForImageRender, setBlobUrlForImageRender] =
//     useState<string>("");
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     if (avatarUrl)
//       downloadAvatarImage(avatarUrl, supabase, setBlobUrlForImageRender);
//   }, [avatarUrl, supabase]);

//   const createImageFile = useCallback(async () => {
//     console.log("createImageFile");
//     try {
//       const blob = await getCroppedImg(
//         blobUrlForImageRender,
//         croppedAreaPixels
//       );
//       const file = new File([blob], "newAvatar.png", {
//         type: "image/png",
//       });
//       //
//       setAvatarFileForUpdate(file);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [blobUrlForImageRender, croppedAreaPixels, setAvatarFileForUpdate]);

//   const onCropComplete = useCallback(
//     async (_: any, croppedAreaPixels: any) => {
//       setCroppedAreaPixels(croppedAreaPixels);
//       createImageFile();
//     },
//     [createImageFile]
//   );

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // Resetting crop and zoom to their initial states
//       setCrop({ x: 0, y: 0 });
//       setZoom(1);

//       const reader = new FileReader();
//       reader.onload = async () => {
//         const img = new Image();
//         img.src = reader.result as string;

//         await new Promise((res) => (img.onload = res));

//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // set canvas to be a square
//         const size = Math.max(img.width, img.height);
//         canvas.width = size;
//         canvas.height = size;

//         // Fill the canvas with a black background
//         ctx?.fillRect(0, 0, canvas.width, canvas.height);

//         // draw the image onto the canvas in the center, maintaining aspect ratio
//         const offsetX = (size - img.width) / 2;
//         const offsetY = (size - img.height) / 2;
//         ctx?.drawImage(img, offsetX, offsetY, img.width, img.height);

//         // convert canvas to data URL and set it as source for Easy Cropper
//         const squaredImageUrl = canvas.toDataURL();
//         setBlobUrlForImageRender(squaredImageUrl);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCropDetails = () => {
//     console.log("crop: ", crop);
//     console.log("zoom: ", zoom);
//     console.log("croppedAreaPixels: ", croppedAreaPixels);
//   };

//   return (
//     <div className="">
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <div style={{ position: "relative", width: "200px", height: "200px" }}>
//         <Cropper
//           image={blobUrlForImageRender}
//           crop={crop}
//           zoom={zoom}
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={onCropComplete}
//           aspect={1}
//         />
//       </div>
//       <button onClick={getCropDetails}>Get crop details</button>
//     </div>
//   );
// }

// export default AvatarEditor;

// async function getCroppedImg(imageSrc: string, crop: any) {
//   const image = new Image();
//   image.crossOrigin = "anonymous";

//   await new Promise((resolve, reject) => {
//     image.addEventListener("load", resolve);
//     image.addEventListener("error", reject);
//     image.src = imageSrc;
//   });

//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (crop && ctx) {
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );
//   }

//   return new Promise<Blob>((resolve, reject) => {
//     canvas.toBlob((blob) => {
//       if (!blob) {
//         reject(new Error("Canvas is empty"));
//         return;
//       }
//       resolve(blob);
//     }, "image/png");
//   });
// }

// AVATAR EDITOR

// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// import { Button } from "@/components/ui/button";

// type Area = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// interface AvatarEditorProps {
//   yourImage: string; // assuming yourImage is a URL string
//   onImageCropped: (image: string | null) => void; // New prop
// }

// const AvatarEditor: React.FC<AvatarEditorProps> = ({
//   yourImage,
//   onImageCropped,
// }) => {
//   const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState<number>(1);
//   const [croppedImage, setCroppedImage] = useState<string | null>(null);

//   const onCropComplete = useCallback(
//     async (croppedArea: Area, croppedAreaPixels: Area) => {
//       const croppedImage = await getCroppedImg(yourImage, croppedAreaPixels);
//       setCroppedImage(croppedImage);
//       onImageCropped(croppedImage); // Call the callback
//     },
//     [yourImage, onImageCropped]
//   );

//   const createImage = (url: string) =>
//     new Promise<HTMLImageElement>((resolve, reject) => {
//       const image = new Image();
//       image.addEventListener("load", () => resolve(image));
//       image.addEventListener("error", (error) => reject(error));
//       image.src = url;
//     });

//   async function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
//     const image = await createImage(imageSrc);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d")!;

//     canvas.width = crop.width;
//     canvas.height = crop.height;

//     ctx.drawImage(
//       image,
//       crop.x,
//       crop.y,
//       crop.width,
//       crop.height,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );

//     return new Promise((resolve, reject) => {
//       canvas.toBlob((blob) => {
//         if (!blob) {
//           reject(new Error("Canvas is empty"));
//           return;
//         }
//         resolve(window.URL.createObjectURL(blob));
//       }, "image/jpeg");
//     });
//   }

//   return (
//     <>
//       <div style={{ position: "relative", width: "200px", height: "200px" }}>
//         <Cropper
//           image={yourImage}
//           crop={crop}
//           zoom={zoom}
//           aspect={1} // 1:1 ratio for a round image
//           cropShape="round" // Crop shape set to round
//           onCropChange={setCrop}
//           onCropComplete={onCropComplete}
//           onZoomChange={setZoom}
//         />
//       </div>
//     </>
//   );
// };

// export default AvatarEditor;

//AVATAR

// await updateProfile({ ...values, avatar_url: uploadedUrl });

// updateProfile({
//   full_name: fullname,
//   username,
//   website,
//   avatar_url: avatarUrl,
// });

{
  /* File upload input */
}
{
  /* <div>Avatar</div> */
}

// const [image, setImage] = useState<string | null>(null); // for the avatar image

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

// const [imageBlob, setImageBlob] = useState<Blob | null>(null); // For the cropped image blob
// const [imageDataUrl, setImageDataUrl] = useState<string | null>(null); // For the cropped image Data URL

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
