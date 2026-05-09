import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/hooks/use-blog";
import { Clock, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border/40 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5">
      <div className="relative h-64 overflow-hidden">
        {/* Color fallback for images */}
        <div className="absolute inset-0 bg-emerald-100" />
        
        {/* The Image (placeholder for now) */}
        <div className="absolute inset-0 bg-emerald-800/10 group-hover:bg-transparent transition-colors duration-300" />
        
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-white/80 backdrop-blur-md border border-white/40 rounded-full text-[10px] font-bold tracking-widest uppercase text-emerald-800">
          {post.category}
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} reading</span>
          </div>
        </div>

        <h3 className="text-2xl font-serif text-foreground mb-3 group-hover:text-emerald-800 transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-8">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/30">
          <span className="text-xs text-muted-foreground font-medium">{post.date}</span>
          <Link 
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800 group/link transition-colors"
          >
            Read Article
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
