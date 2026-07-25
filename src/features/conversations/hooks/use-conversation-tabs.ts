import { useCallback } from "react";

import { useConversationTabsStore } from "../store/use-conversation-tabs-store";
import { Id } from "../../../../convex/_generated/dataModel";

export const useConversationTabs = (projectId: Id<"projects">) => {
  const store = useConversationTabsStore();
  const tabState = useConversationTabsStore((state) =>
    state.getTabState(projectId)
  );

  const openConversation = useCallback(
    (conversationId: Id<"conversations">) => {
      store.openConversation(projectId, conversationId);
    },
    [store, projectId]
  );

  const closeTab = useCallback(
    (conversationId: Id<"conversations">) => {
      store.closeTab(projectId, conversationId);
    },
    [store, projectId]
  );

  const closeAllTabs = useCallback(() => {
    store.closeAllTabs(projectId);
  }, [store, projectId]);

  const setActiveTab = useCallback(
    (conversationId: Id<"conversations">) => {
      store.setActiveTab(projectId, conversationId);
    },
    [store, projectId]
  );

  return {
    openTabs: tabState.openTabs,
    activeTabId: tabState.activeTabId,
    openConversation,
    closeTab,
    closeAllTabs,
    setActiveTab,
  };
};
