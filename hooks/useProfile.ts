"use client";
import { useState, useEffect, useCallback, use } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { get } from "http";

export const useProfile = (userId: string | null) => {
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const downloadAvatarImage = async (path: string) => {
    console.log("Downloading avatar image: ", path);
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }

      // console.log("Avatar image downloaded: ", data);

      const url = URL.createObjectURL(data);
      setBlobUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  };

  const createProfile = async (userId: string) => {
    console.log("Creating profile for user: ", userId);

    if (!userId) return;

    try {
      setLoading(true);

      const initialProfileData = {
        id: userId,
        full_name: null,
        username: null,
        website: null,
        avatar_url: null,
        company: null,
        info: null,
        role: null,
      };

      console.log("Creating profile with data: ", initialProfileData);

      const { data, error } = await supabase
        .from("profiles")
        .upsert(initialProfileData);

      if (error) {
        throw error;
      }

      if (data) {
        // Profile created successfully, set the profile state
        setProfile(data[0]);
      }
    } catch (error) {
      console.error(`Error creating user profile: ${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    if (!userId) return;
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select("full_name, username, website, avatar_url, company, info, role")
        .eq("id", userId)
        .single();

      if (error && status !== 406) throw error;
      if (data) {
        // console.log("Profile data: ", data);
        setProfile(data);
        if (data.avatar_url) {
          // console.log("Downloading avatar image: ", data.avatar_url);
          await downloadAvatarImage(data.avatar_url);
        }
      }
    } catch (error) {
      console.error(`Error loading user data! ${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [userId]);

  return { profile, loading, blobUrl, refetch: getProfile, createProfile };
};
