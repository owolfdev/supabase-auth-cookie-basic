"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const useUser = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    return user;
  };

  useEffect(() => {
    getUser();
  }, []);

  return user;
};
