"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, ArrowLeft, Mail } from "lucide-react";
import Loading from "@/app/loading";
import { useSearchParams, useRouter } from "next/navigation";
import { requestPasswordReset, setNewPassword } from "@/lib/auth-actions";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setIsResetMode(true);
    }
  }, [token]);

  const handleRequestReset = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const result = await requestPasswordReset(formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Something went wrong. Please try again!`);
      console.error(`Error happened while resetting password:${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetNewPassword = async (formData: FormData) => {
    setIsLoading(true);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Add token to formData
      formData.append("token", token || "");
      const result = await setNewPassword(formData);
      if (result.success) {
        toast.success(result.message);
        router.push("/auth/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid pattern overlay - more visible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlRmlsdGVyIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] bg-repeat" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <Card className="bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 text-white">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex justify-center">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-bold text-xl">NovaHost</span>
              </Link>
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                {isSubmitted
                  ? "Check your email"
                  : token
                    ? "Set new password"
                    : "Reset your password"}
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                {isSubmitted
                  ? "We sent a password reset link to your email address"
                  : "Enter your email address and we'll send you a reset link"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {isSubmitted ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-blue-400" />
                </div>

                <div className="space-y-2">
                  <p className="text-gray-300">
                    We've sent a password reset link to your email address.
                    Please check your inbox and click the link to reset your
                    password.
                  </p>
                  <p className="text-sm text-gray-400">
                    Didn't receive the email? Check your spam folder or try
                    again.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
                  >
                    Send another email
                  </Button>

                  <Link href="/auth/login" className="cursor-pointer">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form
                action={!token ? handleRequestReset : handleSetNewPassword}
                className="space-y-6"
              >
                {!token ? (
                  // Email form (when no token)
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-200 font-medium"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  // New password form (when token exists)
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-gray-200 font-medium"
                      >
                        New Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your new password"
                        required
                        minLength={8}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-gray-200 font-medium"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        required
                        minLength={8}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading
                    ? token
                      ? "Updating password..."
                      : "Sending reset link..."
                    : token
                      ? "Update password"
                      : "Send reset link"}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Link href="/auth/login" className="cursor-pointer">
                    <ArrowLeft
                      className="h-4 w-4 mr-2"
                      aria-label="Back to sign in"
                    />
                    Back to sign in
                  </Link>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
