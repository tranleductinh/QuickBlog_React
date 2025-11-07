import { getMe, login, register } from "@/services/api/user";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const navigate = useNavigate();
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("userInfo"))?.user?.role || ""
  );
  console.log("userInfo", userInfo);
  const loginUser = async (payload) => {
    try {
      const res = await login(payload);
      if (res.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        try {
          const me = await getMe();
          console.log("me", me);
          if (me.status === 200) {
            setUserInfo({ ...res.data, ...me.data });
            setRole(me.data.user.role);
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ ...res.data, ...me.data })
            );
          }
          toast.success("Đăng nhập thành công");
          navigate("/");
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Not me");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const signUpUser = async (email, username, password) => {
    try {
      const res = await register({ email, username, password });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      console.log("res", res);
      toast.success("Đăng ký thành công");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  const logOut = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    toast.success("Đăng xuất thành công");
  };

  console.log(userInfo);

  return (
    <AuthContext.Provider
      value={{ userInfo, loginUser, signUpUser, role, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
