import { create } from "zustand";

import { Id } from "../../../../convex/_generated/dataModel";

interface TabState {
  openTabs: Id<"conversations">[];
  activeTabId: Id<"conversations"> | null;
};

const defaultTabState: TabState = {
  openTabs: [],
  activeTabId: null,
};

interface ConversationTabsStore {
  tabs: Map<Id<"projects">, TabState>;
  getTabState: (projectId: Id<"projects">) => TabState;
  openConversation: (
    projectId: Id<"projects">,
    conversationId: Id<"conversations">
  ) => void;
  closeTab: (
    projectId: Id<"projects">,
    conversationId: Id<"conversations">
  ) => void;
  closeAllTabs: (projectId: Id<"projects">) => void;
  setActiveTab: (
    projectId: Id<"projects">,
    conversationId: Id<"conversations">
  ) => void;
};

export const useConversationTabsStore = create<ConversationTabsStore>()(
  (set, get) => ({
    tabs: new Map(),

    getTabState: (projectId) => {
      return get().tabs.get(projectId) ?? defaultTabState;
    },

    openConversation: (projectId, conversationId) => {
      const tabs = new Map(get().tabs);
      const state = tabs.get(projectId) ?? defaultTabState;
      const isOpen = state.openTabs.includes(conversationId);

      tabs.set(projectId, {
        openTabs: isOpen
          ? state.openTabs
          : [...state.openTabs, conversationId],
        activeTabId: conversationId,
      });
      set({ tabs });
    },

    closeTab: (projectId, conversationId) => {
      const tabs = new Map(get().tabs);
      const state = tabs.get(projectId) ?? defaultTabState;
      const { openTabs, activeTabId } = state;
      const tabIndex = openTabs.indexOf(conversationId);

      if (tabIndex === -1) return;

      const newTabs = openTabs.filter((id) => id !== conversationId);

      let newActiveTabId = activeTabId;
      if (activeTabId === conversationId) {
        if (newTabs.length === 0) {
          newActiveTabId = null;
        } else if (tabIndex >= newTabs.length) {
          newActiveTabId = newTabs[newTabs.length - 1];
        } else {
          newActiveTabId = newTabs[tabIndex];
        }
      }

      tabs.set(projectId, {
        openTabs: newTabs,
        activeTabId: newActiveTabId,
      });
      set({ tabs });
    },

    closeAllTabs: (projectId) => {
      const tabs = new Map(get().tabs);
      tabs.set(projectId, defaultTabState);
      set({ tabs });
    },

    setActiveTab: (projectId, conversationId) => {
      const tabs = new Map(get().tabs);
      const state = tabs.get(projectId) ?? defaultTabState;
      tabs.set(projectId, { ...state, activeTabId: conversationId });
      set({ tabs });
    },
  })
);
