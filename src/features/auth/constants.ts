import type { LucideIcon } from "lucide-react";
import {
  BotIcon,
  GitBranchIcon,
  MonitorPlayIcon,
  WandSparklesIcon,
} from "lucide-react";

export type ShowcaseSlide = {
  id: string;
  src: string;
  label: string;
  sub: string;
  /** Fake breadcrumb shown in the window chrome above the screenshot. */
  crumb: string;
};

/**
 * The signed-out showcase. Every screenshot is ~2000x1200, so the frame keeps a
 * fixed 5/3 box and nothing shifts as slides cross-fade.
 */
export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "prompt",
    src: "/images/new-project-dialog.png",
    label: "It starts with a sentence",
    sub: "Describe the app you want. Polaris scaffolds the whole project before you finish reading this.",
    crumb: "polaris / new project",
  },
  {
    id: "agent",
    src: "/images/code-editor-view.png",
    label: "An agent with real tools",
    sub: "It reads, writes, renames and deletes actual files — then tells you exactly what it changed.",
    crumb: "polaris / quiet-lunar-otter",
  },
  {
    id: "inline-ai",
    src: "/images/ai-in-editor.png",
    label: "AI inside the editor",
    sub: "Ghost-text as you type. Select a block, describe the change, watch it rewrite in place.",
    crumb: "polaris / src/app/api/messages/route.ts",
  },
  {
    id: "preview",
    src: "/images/preview-mode.png",
    label: "Your app runs. Right here.",
    sub: "Real install, real dev server, real terminal — booted in the same tab you wrote it in.",
    crumb: "polaris / localhost:3000",
  },
  {
    id: "import",
    src: "/images/import-from-github-dialog.png",
    label: "Bring your own repo",
    sub: "Paste a GitHub URL and pick up an existing codebase exactly where you left it.",
    crumb: "polaris / import",
  },
  {
    id: "ship",
    src: "/images/export-to-github-dialog.png",
    label: "Ship it in one click",
    sub: "Push any project straight to a new GitHub repo — public or private, description included.",
    crumb: "polaris / export",
  },
];

export type ShowcasePill = {
  icon: LucideIcon;
  label: string;
  /** Slide that lights this pill up while the carousel plays. */
  slideId: string;
};

export const SHOWCASE_PILLS: ShowcasePill[] = [
  { icon: BotIcon, label: "AI Agent", slideId: "agent" },
  { icon: WandSparklesIcon, label: "In-Editor AI", slideId: "inline-ai" },
  { icon: MonitorPlayIcon, label: "Live Preview", slideId: "preview" },
  { icon: GitBranchIcon, label: "GitHub Sync", slideId: "ship" },
];

export type ConstellationPoint = {
  x: number;
  y: number;
  r: number;
  /** Polaris itself — rendered brighter, with a halo. */
  bright?: boolean;
};

/**
 * Ursa Minor, drawn in percentages of the showcase panel. Polaris is the star
 * at the tip of the handle — the one the logo is shaped after.
 */
export const CONSTELLATION_POINTS: ConstellationPoint[] = [
  { x: 12, y: 15, r: 3.5, bright: true },
  { x: 19, y: 23, r: 1.5 },
  { x: 26, y: 30, r: 1.3 },
  { x: 34, y: 34, r: 1.7 },
  { x: 42, y: 28, r: 1.4 },
  { x: 47, y: 36, r: 1.2 },
  { x: 39, y: 42, r: 1.5 },
];

/** Index pairs into CONSTELLATION_POINTS: handle 0-3, then the bowl. */
export const CONSTELLATION_LINES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 3],
];

export type AmbientStar = {
  x: number;
  y: number;
  size: number;
  /** Seconds — staggered so the twinkle never looks like a single pulse. */
  delay: number;
  duration: number;
  opacity: number;
};

/**
 * Hand-placed rather than randomised: a random starfield would differ between
 * the server and client render and trip hydration.
 */
export const AMBIENT_STARS: AmbientStar[] = [
  { x: 6, y: 8, size: 2, delay: 0, duration: 4, opacity: 0.5 },
  { x: 31, y: 6, size: 1, delay: 1.4, duration: 5, opacity: 0.35 },
  { x: 58, y: 11, size: 2, delay: 0.7, duration: 4.5, opacity: 0.45 },
  { x: 71, y: 5, size: 1, delay: 2.1, duration: 6, opacity: 0.3 },
  { x: 84, y: 14, size: 2, delay: 1.1, duration: 4, opacity: 0.55 },
  { x: 93, y: 26, size: 1, delay: 2.8, duration: 5.5, opacity: 0.3 },
  { x: 66, y: 24, size: 1, delay: 0.4, duration: 4.5, opacity: 0.4 },
  { x: 78, y: 34, size: 2, delay: 1.9, duration: 5, opacity: 0.35 },
  { x: 88, y: 46, size: 1, delay: 0.9, duration: 6, opacity: 0.4 },
  { x: 95, y: 62, size: 2, delay: 2.4, duration: 4, opacity: 0.3 },
  { x: 5, y: 34, size: 1, delay: 1.6, duration: 5, opacity: 0.35 },
  { x: 3, y: 52, size: 2, delay: 0.2, duration: 4.5, opacity: 0.45 },
  { x: 9, y: 68, size: 1, delay: 2.6, duration: 5.5, opacity: 0.3 },
  { x: 4, y: 84, size: 2, delay: 1.2, duration: 4, opacity: 0.4 },
  { x: 17, y: 91, size: 1, delay: 0.6, duration: 6, opacity: 0.35 },
  { x: 38, y: 95, size: 2, delay: 2.2, duration: 4.5, opacity: 0.3 },
  { x: 57, y: 88, size: 1, delay: 1.7, duration: 5, opacity: 0.4 },
  { x: 74, y: 93, size: 2, delay: 0.3, duration: 4, opacity: 0.35 },
  { x: 90, y: 80, size: 1, delay: 2.9, duration: 5.5, opacity: 0.45 },
  { x: 63, y: 71, size: 1, delay: 1.5, duration: 6, opacity: 0.25 },
  { x: 22, y: 76, size: 1, delay: 0.8, duration: 4.5, opacity: 0.3 },
  { x: 50, y: 3, size: 1, delay: 2.5, duration: 5, opacity: 0.35 },
];
