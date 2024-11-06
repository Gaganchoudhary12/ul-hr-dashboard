"use client";

import { Button, Input } from "@nextui-org/react";

import Image from "@/components/atoms/Image";
import { useState } from "react";
import { EyeSlashFilledIcon } from "@/public/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/public/icons/EyeFilledIcon";
import fetchData, { ApiResponse } from "@/util/ApiHelper";
import Loader from "@/components/atoms/Loader";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { setCookieValue, setValueInLocalStorage } from "@/util/StorageHelper";

export default function Home() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { push } = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    setIsLoading(true);
    const data: ApiResponse<any> = await fetchData("api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });
    if (data.status === 401) {
      toast({
        variant: "destructive",
        title: `User not found,
        try with valid email and password`,
      });
    } else {
      setValueInLocalStorage("user", data.data);
      setCookieValue("login", "true");
      push("/dashboard");
    }
    setIsLoading(false);
  };
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-400">
      <div className="w-2/5 bg-white py-10 px-9 rounded-xl">
        <div className="flex justify-center mb-8">
          <Image
            alt="Logo"
            src="https://cdn.universityliving.com/files/1725865925662unicult-logo02-1.png"
            width={180}
            height={100}
          />
        </div>
        <p className="text-2xl font-semibold pb-7">Login</p>
        <div className="space-y-10">
          <Input
            type="email"
            label="Email*"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <Input
            label="Password*"
            placeholder="Enter your password"
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <Button
            isDisabled={!loginData.password || !loginData.email}
            color="primary"
            className="w-full mt-12"
            onClick={handleLogin}
          >
            {isLoading ? <Loader /> : "Login"}
          </Button>
        </div>
      </div>
    </main>
  );
}
