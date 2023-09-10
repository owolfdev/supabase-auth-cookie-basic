export async function downloadAvatarImage(
  path: string,
  supabase: any,
  setBlogUrl: any
) {
  // console.log("downloadImage, path: ", path);
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    console.log("url from downloadImage", url);
    setBlogUrl(url);
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}
