import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Container,
  BgImage,
  BgOverlay,
  OrnamentNav,
  NavTitle,
  ContentWrapper,
  GlassCard,
  StarOverlay,
} from "./auth-styles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <BgImage
        style={{ backgroundImage: `url('/images/login-bg.png')` }}
      />
      <BgOverlay />

      <OrnamentNav>
        <Link href="/">
          <div className="flex items-center space-x-2 text-primary group">
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
              <ArrowRight className="rotate-180" size={18} />
            </div>
            <NavTitle>Path to Peace</NavTitle>
          </div>
        </Link>
      </OrnamentNav>

      <ContentWrapper>
        <GlassCard>
          <StarOverlay />
          <div className="relative z-10">{children}</div>
        </GlassCard>
      </ContentWrapper>
    </Container>
  );
}
