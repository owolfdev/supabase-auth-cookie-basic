"use client ";
import { Button } from "./ui/button";

export default function GoToLoginButton() {
  const handleGoToLogin = (e: any) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  return (
    <Button onClick={handleGoToLogin} variant="outline">
      Log In
    </Button>
  );
}
