import { Navbar } from "@/components/nav/Navbar";

/** The landing site: the floating nav sits above every page in this group. Support and policy pages have their own shell. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
