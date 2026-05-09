"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStories } from "../../../hooks/use-stories";
import {
  DetailContainer,
  DetailHero,
  DetailHeroContent,
  DetailArabicName,
  DetailTitle,
  DetailSubtitle,
  DetailMain,
  NarrativeSection,
  LessonsCard,
  ReferenceCard,
} from "../style";
import { ArrowLeft, BookOpen, Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryDetailUIProps {
  id: string;
}

export default function StoryDetailUI({ id }: StoryDetailUIProps) {
  const { getStoryById } = useStories();
  const story = getStoryById(id);
  const router = useRouter();

  if (!story) {
    return (
      <DetailContainer>
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <h1 className="text-4xl font-serif text-primary/40">Story Not Found</h1>
          <Button 
            variant="outline" 
            onClick={() => router.back()}
          >
            Back to Library
          </Button>
        </main>
        <Footer />
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <Navbar />

      <DetailHero>
        <div className="absolute inset-0 opacity-10 star-pattern" />
        <DetailHeroContent>
          <button 
            onClick={() => router.back()}
            className="absolute left-0 top-0 flex items-center space-x-2 text-surface-container-low/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Library</span>
          </button>

          <DetailArabicName>{story.arabicName}</DetailArabicName>
          <DetailTitle>{story.name}</DetailTitle>
          <DetailSubtitle>{story.subtitle}</DetailSubtitle>
        </DetailHeroContent>
      </DetailHero>

      <DetailMain>
        {story.details ? (
          <>
            <NarrativeSection>
              {story.details.narrative.map((chapter, index) => (
                <div key={index} className="mb-16 last:mb-0">
                  <h2 className="text-3xl font-serif text-primary mb-6 flex items-center space-x-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-sans">
                      {index + 1}
                    </span>
                    <span>{chapter.title}</span>
                  </h2>
                  <div className="prose prose-stone max-w-none text-on-surface-variant leading-relaxed text-lg">
                    {chapter.content.split('\n').map((para, i) => (
                      <p key={i} className="mb-4">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </NarrativeSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
              <LessonsCard>
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-primary">Key Lessons</h3>
                </div>
                <ul className="space-y-4">
                  {story.details.lessons.map((lesson, index) => (
                    <li key={index} className="flex items-start space-x-3 text-on-surface-variant">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </LessonsCard>

              <ReferenceCard>
                <div className="flex items-center space-x-3 mb-6">
                  <Quote className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-primary">Quranic References</h3>
                </div>
                <div className="space-y-6">
                  {story.details.quranReferences.map((ref, index) => (
                    <div key={index} className="relative">
                      <p className="italic text-on-surface-variant mb-2 pl-4 border-l-2 border-primary/20">
                        "{ref.text}"
                      </p>
                      <p className="text-xs font-bold text-primary/60 uppercase tracking-wider pl-4">
                        — {ref.reference}
                      </p>
                    </div>
                  ))}
                </div>
              </ReferenceCard>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-on-surface-variant/40 italic">
            Full narrative for {story.name} is coming soon to the library.
          </div>
        )}
      </DetailMain>

      <Footer />
    </DetailContainer>
  );
}
