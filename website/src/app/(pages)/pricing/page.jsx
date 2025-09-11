import Pricing from "@/components/sections/Pricing";

export const metadata = {
  title: "Pricing | Attendance Tracker",
  description: "Choose the perfect plan for your needs",
  keywords: "pricing, attendance, tracker, plan, pricing page",
  robots: "index, follow",
  // authors: [
  //   { name: "Attendance Tracker", url: "https://attendance-tracker.com" },
  // ],
  openGraph: {
    title: "Pricing | Attendance Tracker",
    description: "Choose the perfect plan for your needs",
    // url: "https://attendance-tracker.com",
    siteName: "Attendance Tracker",
    // images: [{ url: "https://attendance-tracker.com/og-image.png" }],
    locale: "en_US",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Pricing />
    </main>
  );
}
