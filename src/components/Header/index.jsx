import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import DropMenu from "../DropMenu";
import AuthContext from "../../contexts/authContext";
const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { role, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("role", role);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <>
      <div className="xl:container py-4 mx-auto fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32">
          <Link to="/">
            <img className="max-w-12 cursor-pointer" src={logo} alt="" />
          </Link>
          <div className="flex justify-end items-center gap-2">
            <Link to="create-blog">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-plus text-white"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Create Blog
              </Button>
            </Link>
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`bg-[#0000] hover:bg-accent ${
                theme === "dark" && "hover:bg-accent/50"
              }`}
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-brightness-down"
                >
                  <path d="M0 0h24v24H0z" stroke="none" fill="none"></path>
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  <path d="M12 5l0 .01"></path>
                  <path d="M17 7l0 .01"></path>
                  <path d="M19 12l0 .01"></path>
                  <path d="M17 17l0 .01"></path>
                  <path d="M12 19l0 .01"></path>
                  <path d="M7 17l0 .01"></path>
                  <path d="M5 12l0 .01"></path>
                  <path d="M7 7l0 .01"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="tabler-icon tabler-icon-moon text-foreground"
                >
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                </svg>
              )}
            </Button>
            <DropMenu theme={theme} role={role} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
