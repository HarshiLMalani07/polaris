import Image from "next/image";

/**
 * Shown while Clerk resolves the session. Deliberately quiet — it renders on
 * every cold load, so it stays a single asset with no data fetching.
 */
export const AuthLoadingView = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <span className="absolute size-20 rounded-full bg-ring/15 blur-2xl motion-safe:animate-pulse" />
        <Image
          src="/logo-alt.svg"
          alt="Loading Polaris"
          width={34}
          height={34}
          priority
          className="relative motion-safe:animate-pulse"
        />
      </div>
    </div>
  );
};
