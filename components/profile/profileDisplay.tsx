import { Profile } from "@/types/profile";

export const ProfileDisplay = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="font-medium">User Name</div>
        <div className="text-sm pl-4">{profile?.username}</div>
        <div className="text-sm text-muted-foreground">
          Your public display name.
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">Full Name</div>
        <div className="text-sm pl-4">{profile?.full_name}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">Company</div>
        <div className="text-sm pl-4">{profile?.company}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">Website</div>
        <div className="text-sm pl-4">{profile?.website}</div>
      </div>
    </div>
  );
};
