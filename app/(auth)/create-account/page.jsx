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
  const router = useRouter();

  const onCreateAccount = async () => {
    try {
      const response = await GlobalApi.register(name, email, password);
      toast("Account created");
      router.push("/");
    } catch (error) {
      toast("Error creating account");
    }
  };

  return (
    <div className="flex items-baseline justify-center m-10">
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
          <Button onClick={() => onCreateAccount()}> Create an Account</Button>
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
