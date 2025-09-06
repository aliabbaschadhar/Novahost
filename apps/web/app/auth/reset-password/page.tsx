'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ArrowLeft, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex justify-center">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-gray-900 font-bold text-xl">NovaHost</span>
              </Link>
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isSubmitted ? 'Check your email' : 'Reset your password'}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {isSubmitted 
                  ? 'We sent a password reset link to your email address'
                  : 'Enter your email address and we\'ll send you a reset link'
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {isSubmitted ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-600">
                    We've sent a password reset link to your email address. 
                    Please check your inbox and click the link to reset your password.
                  </p>
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold"
                  >
                    Send another email
                  </Button>
                  
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="w-full h-12 border-gray-300 hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending reset link...' : 'Send reset link'}
                </Button>

                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to sign in
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}