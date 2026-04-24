"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User, ShieldCheck } from "lucide-react";
import {
  Header,
  IconBox,
  Title,
  Subtitle,
  FormGroup,
  InputLabel,
  InputWrapper,
  FormInput,
  CheckboxGroup,
  CheckboxInput,
  CheckboxLabel,
  SubmitButton,
  FooterDivider,
  FooterText,
} from "./style";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1500);
  };

  return (
    <>
      <Header>
        <IconBox>
          <ShieldCheck size={32} />
        </IconBox>
        <Title>Join the Stewardship</Title>
        <Subtitle>Become a guardian of digital peace</Subtitle>
      </Header>

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormGroup>
            <InputLabel>Guardian Name</InputLabel>
            <InputWrapper>
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <FormInput
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <InputLabel>Sanctuary Email</InputLabel>
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
                placeholder="name@pathtopeace.com"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <InputLabel>Sanctuary Key</InputLabel>
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
                placeholder="Create a strong key"
              />
            </InputWrapper>
          </FormGroup>
        </div>

        <CheckboxGroup>
          <CheckboxInput type="checkbox" required />
          <CheckboxLabel>
            I agree to uphold the sanctuary's values of peace, patience, and
            stewardship in all my actions.
          </CheckboxLabel>
        </CheckboxGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
          ) : (
            <>
              <span>Apply for Stewardship</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </SubmitButton>
      </form>

      <div className="mt-10 text-center">
        <FooterDivider />
        <FooterText>
          Already a guardian?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:text-secondary-container transition-colors"
          >
            Enter the Portal
          </Link>
        </FooterText>
      </div>
    </>
  );
}
