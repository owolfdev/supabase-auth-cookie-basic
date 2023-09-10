"use client";
import { useEffect, useState, useCallback, use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { downloadAvatarImage } from "./avatarUtils";
//
export function AuthAvatar() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [initials, setInitials] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [blobUrlForImageRender, setBlobUrlForImageRender] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  interface PayloadNew {
    avatar_url: string;
    // define other properties here, if necessary
  }

  interface Payload {
    new: PayloadNew;
    // define other properties here, if necessary
  }

  interface User {
    id: string;
    email: string[];
    // define other properties here, if necessary
  }

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
    })();

    const profile = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          // filter: `id=eq.${user?.id}`,
        },
        (payload: any) => {
          console.log("change to profiles table!!", payload);
          downloadAvatarImage(
            payload.new.avatar_url,
            supabase,
            setBlobUrlForImageRender
          );
        }
      )
      .subscribe();

    // Unsubscribe when the component unmounts
    return () => {
      profile.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (avatarUrl)
      downloadAvatarImage(avatarUrl, supabase, setBlobUrlForImageRender);
  }, [avatarUrl, supabase]);

  // useEffect(() => {
  //   console.log("avatarUrl:", avatarUrl);
  //   console.log("urlForRender:", blobUrlForImageRender);
  // }, [avatarUrl, blobUrlForImageRender]);

  useEffect(() => {
    // console.log("user", user);
    // console.log("user email", user?.email);
    setInitials(getInitialsAndCapitalize(user?.email[0]));
  }, [user]);

  const getInitialsAndCapitalize = (name: string) => {
    // console.log("name from get initials", name);
    // const nameArray = name?.split(" ");
    // const initials = nameArray?.map((name) => name[0]?.toUpperCase());
    // const initialsString = initials?.join("");
    // const initialsString = name.split("")[0].toUpperCase();
    // return initialsString;
    return name?.toUpperCase();
  };

  const getProfile = async () => {
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

      console.log("data from get profile", data);

      if (data) {
        // alert("data from get profile");
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(`Error loading user data! ${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <>
      <div className="flex items-center text-xs text-gray-400">
        <div className="flex items-center ">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={blobUrlForImageRender}
              alt={`avatar`}
              className="rounded-full border w-8 h-8"
            />
            <AvatarFallback>
              <span className="text-lg">{initials}</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
