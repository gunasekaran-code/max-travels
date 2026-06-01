"use client";

import Image from "next/image";
import { MessageCircle, User } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Carousel } from "@/components/ui/Carousel";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="container-max">
        <SectionTitle align="left" tagline="Our Blog" title="Our Latest Blog" />
        <Carousel autoplay slidesToShow={{ base: 1, md: 2, lg: 3 }}>
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-max border border-max-border bg-white shadow-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-max-base px-3 py-1 text-xs font-semibold text-max-black">
                  {post.tag}
                </span>
                <div className="absolute bottom-4 right-4 flex h-16 w-14 flex-col items-center justify-center rounded-lg bg-max-base text-max-black">
                  <span className="font-display text-xl font-bold leading-none">
                    {post.date.day}
                  </span>
                  <span className="text-xs uppercase">{post.date.month}</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="flex gap-4 text-xs text-max-gray">
                  <li className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Admin
                  </li>
                  <li className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Comment
                  </li>
                </ul>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  <a href="#blog" className="hover:text-max-base">
                    {post.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-max-gray">{post.excerpt}</p>
                <a
                  href="#blog"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-max-base"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
