import React from "react";
import AnimatedWave from "../../components/lightswind/animated-wave";
import AuthCard from "../../components/AuthCard";

const SignIn = () => {
  return (
    <div className="relative">
      <AnimatedWave />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
        <AuthCard className="w-full" />
      </div>
    </div>
  );
};

export default SignIn;
