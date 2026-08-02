import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          {/* FORM GENERIC TEXTS */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Login!</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* FORM */}
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            If you are a new user,{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
