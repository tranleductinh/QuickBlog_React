import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

export function AuthCard({
  loading,
  setEmail,
  setPassword,
  handleLogin,
  setUsername,
  handleRegister,
}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Card className="w-full max-w-sm p-8">
      <div className="flex justify-center">
        <img className="w-15 h-15" src={logo} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Input
          className={`outline-0 border-0 focus-visible:border shadow-xs`}
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className={`outline-0 border-0 focus-visible:border shadow-xs ${
            path === "/sign-up" ? "" : "hidden"
          }`}
          id="username"
          type="text"
          placeholder="Enter your username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="outline-0 border-0 focus-visible:border shadow-xs"
          id="password"
          type="password"
          required
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {path === "/login" ? (
          <Button 
            disabled={loading}
            onClick={() => handleLogin()}
            className="w-full"
            type="submit"
          >
            {loading === true ? "Signing in..." : "Sign in"}
          </Button>
        ) : (
          <Button
            disabled={loading}

            onClick={() => handleRegister()}
            className="w-full"
            type="submit"
          >
            {loading === true ? "Signing up..." : "Sign up"}
          </Button>
        )}
        <div variant="outline" className="mt-4 text-center">
          {path === "/login" ? (
            <span className="text-sm text-gray-500">
              Don't have an account?
              <Link className="text-primary" to="/sign-up">
                {" "}
                Signup
              </Link>
            </span>
          ) : (
            <span className="text-sm text-gray-500">
              Already have an account?
              <Link className="text-primary" to="/login">
                {" "}
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
export default AuthCard;
