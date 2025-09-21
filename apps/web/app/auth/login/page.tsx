"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  setClientRememberMeCookie,
  getClientRememberMeCookie,
} from "@/lib/client-cookie-utils";
import { LogoWithText } from "@/components/ui/logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  // Flow ==> when user tries to access a protected page, they might be redirected to the login page with a callbackUrl parameter in the URL (e.g. /auth/login?callbackUrl=/protected-page)
  // After successful logIn, in our code at line 44 router.push(callback) we send the user back to the page they wanted to visit. (Isn't it awesome?)
  // If there is not callback we send them by default to dashboard
  enum Provider {
    GOOGLE = "google",
    GITHUB = "github",
  }

  useEffect(() => {
    const remembered = getClientRememberMeCookie();
    setRememberMe(remembered);
  }, []);

  // ✅ Fixed credentials sign-in handler
  const handleCredentialsSignIn = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const rememberMe = formData.get("rememberMe") === "on";

      // Set Cookie based on remember me checkbox
      setClientRememberMeCookie(rememberMe);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Important: prevent automatic redirect
      });

      console.log("SignIn result:", result); // Debug log

      if (result?.error) {
        // Handle different types of errors
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid email or password. Please try again.");
        } else if (result.error === "AccessDenied") {
          toast.error("Access denied. Please verify your email first.");
        } else if (result.error === "Configuration") {
          toast.error(
            "Authentication configuration error. Please contact support.",
          );
        } else {
          toast.error("Authentication failed. Please try again.");
        }
      } else if (result?.ok) {
        toast.success("Welcome back!");
        setTimeout(() => {
          router.push(callbackUrl);
        }, 1000); // Give user time to see the toast
        // Immediately redirecting might prevent the toast from being seen
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: callbackUrl });
    } catch (error) {
      toast.error(`Failed to signIn using ${provider}`);
      setIsLoading(false);
    }
    //! how it works:

    // Calls signIn from next-auth/react with the provider name and a callbackUrl.
    // This starts the OAuth login flow(redirects the user to the provider's login page).
    // callbackUrl tells NextAuth where to send the user after successful authentication.
    // If the sign -in fails(e.g., network error), it shows a toast notification with an error message.
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
                className="hover:opacity-80 transition-opacity"
              >
                <LogoWithText
                  width={32}
                  height={32}
                  variant="white"
                  textSize="text-xl"
                  animate={true}
                />
              </Link>
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Sign in to your NovaHost account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form action={handleCredentialsSignIn} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-200 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    name="rememberMe"
                    className="rounded border-white/20 bg-white/10 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={() => handleOAuthSignIn(Provider.GITHUB)}
                  disabled={isLoading}
                >
                  <Github className="h-5 w-5" />
                  <span className="ml-2">GitHub</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={() => handleOAuthSignIn(Provider.GOOGLE)}
                  disabled={isLoading}
                >
                  <Mail className="h-5 w-5" />
                  <span className="ml-2">Google</span>
                </Button>
              </div>

              <div className="text-center text-sm text-gray-300">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
