"use client";

import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useConversation } from "../hooks/use-conversations";

import { DEFAULT_CONVERSATION_TITLE } from "../constants";
import { Id } from "../../../../convex/_generated/dataModel";

interface TabProps {
  conversationId: Id<"conversations">;
  isActive: boolean;
  onSelect: (conversationId: Id<"conversations">) => void;
  onClose: (conversationId: Id<"conversations">) => void;
};

const Tab = ({ conversationId, isActive, onSelect, onClose }: TabProps) => {
  const conversation = useConversation(conversationId);
  const title = conversation?.title ?? DEFAULT_CONVERSATION_TITLE;

  return (
    <div
      onClick={() => onSelect(conversationId)}
      title={title}
      className={cn(
        "flex items-center gap-1.5 h-8.75 pl-2.5 pr-1 cursor-pointer text-muted-foreground group border-r shrink-0 hover:bg-accent/30",
        isActive && "bg-sidebar text-foreground"
      )}
    >
      <span className="text-xs whitespace-nowrap truncate max-w-28">
        {title}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose(conversationId);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            onClose(conversationId);
          }
        }}
        className={cn(
          "p-0.5 rounded-sm hover:bg-white/10 opacity-0 group-hover:opacity-100",
          isActive && "opacity-100"
        )}
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
};

interface ConversationTabsProps {
  openTabs: Id<"conversations">[];
  activeTabId: Id<"conversations"> | null;
  onSelect: (conversationId: Id<"conversations">) => void;
  onClose: (conversationId: Id<"conversations">) => void;
};

export const ConversationTabs = ({
  openTabs,
  activeTabId,
  onSelect,
  onClose,
}: ConversationTabsProps) => {
  return (
    <ScrollArea className="flex-1 min-w-0">
      <nav className="flex items-center h-8.75 bg-background">
        {openTabs.map((conversationId) => (
          <Tab
            key={conversationId}
            conversationId={conversationId}
            isActive={conversationId === activeTabId}
            onSelect={onSelect}
            onClose={onClose}
          />
        ))}
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
