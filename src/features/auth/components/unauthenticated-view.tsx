"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ProductShowcase } from "./product-showcase";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const REPO_URL = "https://github.com/HarshiLMalani07/polaris";

export const UnauthenticatedView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-sidebar lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Second in the DOM order on mobile so the sign-in buttons stay above
          the fold, first on desktop where both panels are visible at once. */}
      <ProductShowcase className="order-2 lg:order-1 lg:h-full lg:w-[58%]" />

      <div className="order-1 flex flex-1 flex-col justify-center border-border/50 bg-background px-6 py-14 lg:order-2 lg:border-l lg:px-10">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
          <div className="flex items-center gap-2.5 lg:hidden">
            <Image src="/logo.svg" alt="" width={30} height={30} priority />
            <span className={cn("text-xl font-semibold", font.className)}>
              Polaris
            </span>
          </div>

          <div className="space-y-3">
            <h1
              className={cn(
                "text-4xl font-semibold leading-[1.12] tracking-tight",
                font.className
              )}
            >
              <span className="block text-foreground/55">
                You&apos;ve got the idea.
              </span>
              <span className="block">Polaris has the helm.</span>
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your AI pair sits in the editor, writes real files, and boots your
              app in the browser. You steer — it does the typing.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <SignInButton>
              <Button className="h-10 w-full text-sm font-medium">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outline"
                className="h-10 w-full text-sm font-medium"
              >
                Create a free account
              </Button>
            </SignUpButton>
            <p className="pt-0.5 text-center text-xs text-muted-foreground/70">
              Free to start · No card required · Your code stays yours
            </p>
          </div>

          <div className="border-t border-border/50" />

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaGithub className="size-4 shrink-0" />
            <span>Open source — view on GitHub</span>
            <span className="ml-auto text-xs opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
