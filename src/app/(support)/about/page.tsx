import type { Metadata } from "next";
import { ArticlePage } from "@/components/support/parts";
import { articleBySlug } from "@/content";

const a = articleBySlug("about");

export const metadata: Metadata = { title: `${a.title} | Bizqwik`, description: a.intro, alternates: { canonical: a.path } };

export default function Page() {
  return <ArticlePage a={a} />;
}
