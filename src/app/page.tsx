import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="#" className="flex items-center justify-center">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="sr-only">EduVerse</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    The Future of Global Education is Here
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    EduVerse is a revolutionary platform offering a YouTube-like experience for high-quality educational content, complete with AI-powered tools for students and teachers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/101/600/400"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="online learning student"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center h-16 border-t">
        <p className="text-sm text-muted-foreground">&copy; 2024 EduVerse. All rights reserved.</p>
      </footer>
    </div>
  );
}
