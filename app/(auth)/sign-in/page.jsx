"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GlobalApi from "@/utils/GlobalApi";
import { AuthContext } from "../../_context/AuthContext";
import { LoaderIcon } from "lucide-react";

function SignIn() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onSignIn = async () => {
    setLoader(true);
    try {
      const response = await GlobalApi.login(email, password, rememberMe);
      toast("Successfully signed in");
      setIsAuthenticated(true);
      setUser(response.user);
      router.push("/");
      setLoader(false);
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast(error?.response?.data?.error);
      setLoader(false);
    }
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Sign in</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to Sign in
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="ml-2">
              Remember Me
            </label>
          </div>

          <Button onClick={onSignIn}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an Account?{" "}
            <Link href="/create-account" className="text-blue-500">
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
