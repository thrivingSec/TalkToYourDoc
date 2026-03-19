export interface StoreDocument {
  documentID: string;
  source: string;
  namespace: string;
}

export interface DocumentResponse {
  success: boolean;
  message: string;
  data: StoreDocument[];
}

export interface StoreMessage {
  role: "user" | "agent";
  content: string;
  chunkIDs?:number[]
}

export interface MessagesResponse {
  success: boolean;
  message: string;
  data: StoreMessage[];
}

export interface NamespaceResponse {
  success:boolean;
  message:string;
  data?:{
    docTypes:string[]
  }
}

export interface STORE {
  // UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // Document State
  documents: Array<StoreDocument>;
  isDocsLoading: boolean;
  setDocuments: (docs: StoreDocument[]) => void;
  addDocument: (doc: StoreDocument) => void;
  fetchDocuments: () => Promise<void>;
  clearDocuments: () => void;
  // Active Doc
  activeDoc: StoreDocument | null;
  setActiveDoc: (doc: StoreDocument | null) => void;

  // Message State
  messages: Array<StoreMessage>;
  isMessagesLoading: boolean;
  setMessages: (messages: StoreMessage[]) => void;
  addMessage: (message: StoreMessage) => void;
  fetchMessages: () => Promise<void>;
  clearMessages: () => void;

  // Namespace State
  namespaces: Array<string> | null;
  isNamespacesLoading:boolean;
  setNamespaces: (data:Array<string>) => void;
  fetchNamespaces: () => Promise<void>;
}


