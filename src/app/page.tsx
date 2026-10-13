import { redirect } from "next/navigation";

// Temporary: the landing page is not designed yet. See docs/progress/0001.
export default function Home() {
  redirect("/foundation");
}
