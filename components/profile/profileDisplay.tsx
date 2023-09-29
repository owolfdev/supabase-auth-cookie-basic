import { Profile } from "@/types/profile";

export const ProfileDisplay = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col gap-3">
        <div className="text-sm">User Name</div>
        <div className="text-lg sm:text-base pl-2">{profile?.username}</div>
        <div className="text-sm text-muted-foreground">
          Your public display name.
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Full Name</div>
        <div className="text-lg sm:text-base pl-2">{profile?.full_name}</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Company</div>
        <div className="text-lg sm:text-base pl-2">{profile?.company}</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Website</div>
        <div className="text-lg sm:text-base pl-2">{profile?.website}</div>
      </div>
    </div>
  );
};
