// Create: apps/web/app/auth/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/auth-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { LogoWithText } from "@/components/ui/logo";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setStatus("success");
          setMessage(result.message);
        } else {
          setStatus("error");
          setMessage(result.message);
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Same background styling as your other auth pages */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 text-white">
          <CardHeader className="text-center space-y-4">
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
            <CardTitle className="text-2xl font-bold">
              Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {status === "loading" && (
              <>
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500" />
                <p className="text-gray-300">Verifying your email...</p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                <p className="text-gray-300">{message}</p>
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  Continue to Login
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="h-12 w-12 mx-auto text-red-500" />
                <p className="text-gray-300">{message}</p>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/auth/signup")}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer hover:from-blue-500 hover:to-purple-500"
                  >
                    Back to Signup
                  </Button>
                  <Link
                    href="/auth/login"
                    className="block text-blue-400 hover:text-blue-300"
                  >
                    Or sign in instead
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
