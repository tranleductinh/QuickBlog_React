import React, { useContext, useState } from "react";
import AnimatedWave from "../../components/lightswind/animated-wave";
import AuthCard from "../../components/AuthCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/components/contexts/authContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      console.log(response);
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      <AnimatedWave />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
        <AuthCard
          loading={loading}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SignIn;
