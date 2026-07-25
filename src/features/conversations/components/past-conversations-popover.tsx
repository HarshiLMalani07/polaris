"use client";

import { useState } from "react";
import { HistoryIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { useConversations } from "../hooks/use-conversations";

import { Id } from "../../../../convex/_generated/dataModel";

interface PastConversationsPopoverProps {
  projectId: Id<"projects">;
  activeConversationId: Id<"conversations"> | null;
  onSelect: (conversationId: Id<"conversations">) => void;
};

export const PastConversationsPopover = ({
  projectId,
  activeConversationId,
  onSelect,
}: PastConversationsPopoverProps) => {
  const [open, setOpen] = useState(false);
  const conversations = useConversations(projectId);

  const handleSelect = (conversationId: Id<"conversations">) => {
    onSelect(conversationId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon-xs" variant="highlight">
              <HistoryIcon className="size-3.5" />
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          Chat History
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-72 p-0" align="end">
        <Command>
          <CommandInput placeholder="Search conversations..." />
          <CommandList>
            <CommandEmpty>No conversations found.</CommandEmpty>
            <CommandGroup heading="Conversations">
              {conversations?.map((conversation) => (
                <CommandItem
                  key={conversation._id}
                  value={`${conversation.title}-${conversation._id}`}
                  onSelect={() => handleSelect(conversation._id)}
                  data-active={conversation._id === activeConversationId}
                  className="data-[active=true]:bg-accent"
                >
                  <div className="flex flex-col gap-0.5 truncate">
                    <span className="truncate">{conversation.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(conversation._creationTime, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
