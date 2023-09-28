"use client";
import { useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";

interface ProfileData {
  fullname: string | null;
  username: string | null;
  website: string | null;
  avatarUrl: string | null;
  company: string | null;
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const user = useUser();

  const supabase = createClientComponentClient();

  const updateProfile = useCallback(
    async ({
      username,
      website,
      fullname,
      avatarUrl,
      company,
    }: ProfileData): Promise<void> => {
      try {
        setLoading(true);

        const { error } = await supabase.from("profiles").upsert({
          id: user?.id as string,
          full_name: fullname,
          username: username,
          website: website,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
          company: company,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error updating the profile: ", error);
        setError("Error updating the profile");
      } finally {
        setLoading(false);
        toast({
          title: "Profile updated successfully",
          description: "Your profile has been updated.",
        });
      }
    },
    [supabase, toast]
  );

  return {
    loading,
    error,
    updateProfile,
  };
}
