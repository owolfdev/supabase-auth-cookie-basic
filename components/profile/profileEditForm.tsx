// ProfileForm.tsx
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().nullable().optional(),
  full_name: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  info: z.string().nullable().optional(),
});

type FormValues = {
  username: string | null;
  full_name: string | null;
  website: string | null;
  company: string | null;
  role: string | null;
  info: string | null;
};

interface ProfileFormProps {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues: FormValues;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

type User = {
  id: string;
  email: string;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  defaultValues,
  setIsEditing,
  user,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <div className="flex flex-col gap-3 pb-4">
        <div className="text-sm">Email</div>
        <div className="text-lg sm:text-base pl-2">{user.email}</div>
        <div className="text-sm text-muted-foreground">
          Your account is linked to this email. (You cannot change this)
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[340px]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter user name."
                  {...field}
                  value={field.value || ""}
                  className="text-lg sm:text-base"
                />
              </FormControl>
              {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
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
                <Input
                  placeholder="Enter full name."
                  {...field}
                  value={field.value || ""}
                  className="text-lg sm:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter biographical information."
                  {...field}
                  value={field.value || ""}
                  className="text-lg sm:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter company name."
                  {...field}
                  value={field.value || ""}
                  className="text-lg sm:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your role."
                  {...field}
                  value={field.value || ""}
                  className="text-lg sm:text-base"
                />
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
                <Input
                  placeholder="Enter web site."
                  {...field}
                  value={field.value || ""}
                  className="text-lg sm:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 pt-2">
          <Button type="submit">Update Profile</Button>
          <Button variant={`destructive`} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
