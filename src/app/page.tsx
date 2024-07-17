import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen grainy from-rose-100 to-teal-100 ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          Take <span className="text-rose-500 font-bold">notes</span> with an AI
          assistant
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>
        <Link href="/dashboard">
          <div className="flex justify-center">
            <Button className="bg-rose-500">Get Started
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
