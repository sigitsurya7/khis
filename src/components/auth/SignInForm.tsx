"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { login } from "@/services/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type loginForm = {
  username: string;
  password: string;
};

export default function SignInForm() {
  
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState<loginForm>({
    username: "",
    password: ""
  })
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password } = formData

    const newErrors = {
      username: "",
      password: "",
    };
  
    let hasError = false
  
    if (!username.trim()) {
      newErrors.username = "Form username tidak boleh kosong";
      hasError = true
    }
    if (!password.trim()) {
      newErrors.password = "Form password tidak boleh kosong";
      hasError = true
    }

    setErrors(newErrors);

    if (hasError) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500)
      return;
    }

    setIsLoading(true);
    try {
      await login(formData);
      toast.success("Login berhasil!");
      router.push(callbackUrl);
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle error response dari API
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Login gagal. Silakan coba lagi.";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukan username dan password anda!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className={isShaking ? "shake" : ""}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="Masukan username anda"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    defaultValue={formData.username}
                    error={errors.username ? true : false}
                    hint={errors.username}
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukan password anda"
                      name="password"
                      defaultValue={formData.password}
                      onChange={handleChange}
                      error={errors.password ? true : false}
                      hint={errors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                
                <div>
                  <Button className="w-full" size="sm" disabled={isLoading}>
                    { isLoading ? "Signing in..." : "Sign in" }
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
