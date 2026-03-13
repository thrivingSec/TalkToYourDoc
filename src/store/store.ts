import axios from "axios";
import { create } from "zustand";
import {
  DocumentResponse,
  MessagesResponse,
  STORE,
  StoreDocument,
  StoreMessage,
} from "./storeTypes";

const API_BASE = `https://talk-to-your-doc-fk7e.vercel.app`;

export const useStore = create<STORE>((set, get) => ({
  // UI

  isSidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  //Documents

  documents: [],
  isDocsLoading: false,

  setDocuments: (docs) => set({ documents: docs }),

  addDocument: (doc) =>
    set((state) => ({
      documents: [...state.documents, doc],
    })),

  clearDocuments: () => set({ documents: [] }),

  fetchDocuments: async () => {
    set({ isDocsLoading: true });

    try {
      const response = await axios.post<DocumentResponse>(
        `${API_BASE}/files`,
        {},
        { withCredentials: true },
      );
      set({ documents: response.data.data });
    } catch (error) {
      console.error("Error fetching documents:", error);
      set({ documents: [] });
    } finally {
      set({ isDocsLoading: false });
    }
  },

  // Active Document

  activeDoc: null,

  setActiveDoc: (doc) => {
    set(() => ({
      activeDoc: doc,
      messages: [],
    }))
  },

  // Messages

  messages: [],
  isMessagesLoading: false,

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set({ messages: [] }),

  fetchMessages: async () => {
    const activeDocId = get().activeDoc?.documentID;

    if (!activeDocId){
      console.log('No active docs');
      return
    }; // Guard

    set({ isMessagesLoading: true });

    try {
      const response = await axios.post<MessagesResponse>(
        `${API_BASE}/message`,
        { documentID: activeDocId },
        { withCredentials: true },
      );
      set({ messages: response.data.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
