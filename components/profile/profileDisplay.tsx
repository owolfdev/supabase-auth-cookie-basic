import { Profile } from "@/types/profile";

type User = {
  id: string;
  email: string;
};

export const ProfileDisplay = ({
  profile,
  user,
}: {
  profile: Profile;
  user: User;
}) => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col gap-3">
        <div className="text-sm">Email</div>
        <div className="text-lg sm:text-base pl-2">{user.email}</div>
        <div className="text-sm text-muted-foreground">
          Your account is linked to this email.
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">User Name</div>
        <div className="text-lg sm:text-base pl-2">
          {profile?.username || (
            <span className="text-muted-foreground">No user name.</span>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Your public display name.
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Full Name</div>
        <div className="text-lg sm:text-base pl-2">
          {profile?.full_name || (
            <span className="text-muted-foreground">No full name.</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Bio</div>
        <div className="text-lg sm:text-base pl-2">
          {profile?.info || (
            <span className="text-muted-foreground">Bio not available.</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Company</div>
        <div className="text-lg sm:text-base pl-2">
          {profile?.company || (
            <span className="text-muted-foreground">No company.</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Role</div>
        <div className="text-lg sm:text-base pl-2">
          {profile?.role || (
            <span className="text-muted-foreground">No role.</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm">Website</div>
        <div className="text-lg sm:text-base pl-2">
          {profile?.website || (
            <span className="text-muted-foreground">No website.</span>
          )}
        </div>
      </div>
    </div>
  );
};
