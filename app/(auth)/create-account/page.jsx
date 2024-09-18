"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlobalApi from "@/utils/GlobalApi";
import { toast } from "sonner";

function CreateAccount() {
  const [name, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onCreateAccount = async () => {
    setLoader(true);
    try {
      const response = await GlobalApi.register(name, email, password);
      toast("Account created");
      router.push("/");
      setLoader(false);
    } catch (error) {
      toast("Error creating account");
      setLoader(false);
    }
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Create an Account</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to Create an account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="name@exapmle.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onCreateAccount()}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Create an Account"}
          </Button>
          <p>
            Already have an Account?{" "}
            <Link href={"/sign-in"} className="text-blue-500">
              Click here to Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
