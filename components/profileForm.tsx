"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AvatarEditor from "./avatarEditor";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  full_name: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
});

export function ProfileForm() {
  const [image, setImage] = useState<string | null>(null); // for the avatar image

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      full_name: "",
      website: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // assuming it's a Data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[340px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="text-sm">email@email.com</div>
              {/* <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl> */}
              <FormDescription>
                Your account is linked to this email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className="flex flex-col gap-2
         w-1/2"
        >
          {/* File upload input */}
          <div>Avatar</div>
          <label
            htmlFor="fileUpload"
            className={buttonVariants({ variant: "default", size: "default" })}
          >
            <div className="">Choose File</div>
            <input
              id="fileUpload"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {/* Conditional Avatar Editor */}
          {image && <AvatarEditor yourImage={image} />}
        </div>

        <div className="pt-0">
          <Button type="submit" className="">
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
