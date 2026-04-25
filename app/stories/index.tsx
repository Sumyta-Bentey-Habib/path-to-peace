"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProphetIcon } from "@/components/shared/ProphetIcon";
import { Search, ArrowRight, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStories } from "../../hooks/use-stories";
import {
  Container,
  Main,
  HeroSection,
  HeroTextBox,
  MainTitle,
  HeroDesc,
  HeroImageBox,
  FilterSection,
  SearchWrapper,
  StoriesGrid,
  FeaturedCard,
  FeaturedArabicTitle,
  ProphetCard,
  ProphetIconBox,
  CardArabicName,
  CardLink,
} from "./style";

function ProphetStoriesContent() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeEra = searchParams.get("era") || "All Eras";
  const { prophets, eras } = useStories();

  const handleEraChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All Eras") {
      params.delete("era");
    } else {
      params.set("era", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredProphets = prophets.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesEra = activeEra === "All Eras" || p.era === activeEra;
    return matchesSearch && matchesEra;
  });

  const featuredProphet = prophets.find(p => p.isFeatured);
  const otherProphets = filteredProphets.filter(p => !p.isFeatured);

  return (
    <Container>
      <Navbar />

      <Main>
        <HeroSection>
          <HeroTextBox>
            <MainTitle>
               Prophet Stories <br />
               <span className="italic font-light text-primary/60">Library</span>
            </MainTitle>
            <HeroDesc>
              Journey through the lives of the Messengers, from the dawn of creation to the final revelation. A digital sanctuary for timeless wisdom and sacred narratives.
            </HeroDesc>
          </HeroTextBox>
          <HeroImageBox>
            <div className="absolute inset-0 rounded-full border-2 border-outline-variant/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full overflow-hidden shadow-meditative">
              <Image
                src="/images/hero-manuscript.png"
                alt="Ancient Manuscript"
                fill
                className="object-cover"
              />
            </div>
          </HeroImageBox>
        </HeroSection>

        <FilterSection>
          <SearchWrapper>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <Input
              placeholder="Search Prophet by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-surface-container/60 border-none rounded-xl"
            />
          </SearchWrapper>
          <div className="flex-1 w-full overflow-x-auto">
            <Tabs value={activeEra} onValueChange={handleEraChange} className="w-full">
              <TabsList className="bg-transparent space-x-2">
                {eras.filter(era => era !== "Banu Isra'il" && era !== "Early Creation").map(era => (
                  <TabsTrigger
                    key={era}
                    value={era}
                    className="data-[state=active]:bg-primary data-[state=active]:text-on-primary rounded-xl px-6 py-2 text-sm transition-all"
                  >
                    {era}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </FilterSection>

        <StoriesGrid>
          {featuredProphet && (
            <FeaturedCard>
              <FeaturedArabicTitle>
                {featuredProphet.arabicName}
              </FeaturedArabicTitle>
              <div className="space-y-4 relative z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-container">
                  {featuredProphet.title}
                </span>
                <h2 className="text-5xl font-serif text-white">
                  {featuredProphet.name}
                  <span className="block text-2xl mt-2 font-arabic text-surface-container-highest/60">
                    ({featuredProphet.salutation})
                  </span>
                </h2>
                <p className="text-surface-container-low/70 max-w-md leading-relaxed">
                  {featuredProphet.subtitle}
                </p>
                <Link
                  href={featuredProphet.link}
                  className="inline-flex items-center space-x-3 text-secondary-container font-medium pt-8 group/link"
                >
                  <span className="border-b border-transparent group-hover/link:border-secondary-container transition-all">Read the Seerah</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FeaturedCard>
          )}

          {otherProphets.map((prophet) => (
            <ProphetCard key={prophet.id}>
              <div className="flex justify-between items-start mb-6">
                <ProphetIconBox>
                   <ProphetIcon type={prophet.icon} />
                </ProphetIconBox>
                <CardArabicName>
                  {prophet.arabicName}
                </CardArabicName>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-primary">{prophet.name}</h3>
                <p className="text-xs text-on-surface-variant/60 leading-relaxed line-clamp-3">
                  {prophet.subtitle}
                </p>
              </div>

              <Link
                href={prophet.link}
              >
                <CardLink>
                  <span>Explore Story</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
                </CardLink>
              </Link>
            </ProphetCard>
          ))}
        </StoriesGrid>
      </Main>

      <Footer />
    </Container>
  );
}

export default function ProphetStoriesUI() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center font-serif italic text-primary/40 text-2xl">Loading Sanctuary...</div>}>
      <ProphetStoriesContent />
    </Suspense>
  );
}
