"use client ";
import { Button } from "./ui/button";

export default function GoToSignupButton() {
  const handleGoToSignup = (e: any) => {
    e.preventDefault();
    window.location.href = "/signup";
  };

  return (
    <Button onClick={handleGoToSignup} variant="outline">
      Sign Up
    </Button>
  );
}
