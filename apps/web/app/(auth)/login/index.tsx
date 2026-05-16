"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Header,
  Title,
  Subtitle,
  FormGroup,
  InputLabel,
  InputWrapper,
  FormInput,
  ForgotPassword,
  SubmitButton,
  DividerSection,
  DividerWrapper,
  DividerLine,
  DividerText,
  SocialGrid,
  SocialButton,
  SocialIconGoogle,
  SocialIconGithub,
  ApplyText,
} from "./style";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data, error } = await authClient.signIn.email({
        email,
        password
    });

    setIsLoading(false);

    if (error) {
        alert(error.message || "Login failed");
        return;
    }

    const role = data?.user.role;
    if (role === "admin") {
        router.push("/admin");
    } else {
        router.push("/dashboard");
    }
  };

  return (
    <>
      <Header>
        <Title>Admin Sanctuary</Title>
        <Subtitle>Continue your journey of stewardship</Subtitle>
      </Header>

      <form onSubmit={handleLogin} className="space-y-6">
        <FormGroup>
          <InputLabel>Email Sanctuary</InputLabel>
          <InputWrapper>
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <FormInput
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="guardian@pathtopeace.com"
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <div className="flex justify-between items-center ml-1">
            <InputLabel>Secret Key</InputLabel>
            <ForgotPassword type="button">Forgotten?</ForgotPassword>
          </div>
          <InputWrapper>
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <FormInput
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </InputWrapper>
        </FormGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
          ) : (
            <>
              <span>Enter Sanctuary</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </SubmitButton>
      </form>


      <ApplyText>
        Not a guardian?{" "}
        <Link
          href="/register"
          className="text-primary font-bold hover:text-secondary-container transition-colors"
        >
          Apply for stewardship
        </Link>
      </ApplyText>
    </>
  );
}
