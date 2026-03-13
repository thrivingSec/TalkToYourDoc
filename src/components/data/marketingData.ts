export const md = {
  hero: {
    title: "Talk To Your Docs",
    subtitle: "Turn static documents into an interactive AI knowledge base.",
    description:
      "Upload your documents and interact with them through an AI-powered interface. This project demonstrates a full-stack implementation of document ingestion, vector search, and agent-driven retrieval using modern web and AI infrastructure.",
    primaryCTA: {
      text: "Try the Demo",
      link: "/dashboard",
    },
    secondaryCTA: {
      text: "View Source Code",
      link: "",
    },
    // note: "This is a personal project built to explore LLM-powered document retrieval systems and showcase engineering skills.",
  },
  features: [
    {
      title: "Document Upload & Parsing",
      description:
        "Upload documents such as PDFs, Markdown, or plain text. The system parses and prepares them for knowledge base ingestion.",
      icon: "",
    },
    {
      title: "Vector Search Powered Retrieval",
      description:
        "Document chunks are embedded and stored in a vector index, enabling semantic search instead of simple keyword matching.",
      icon: "",
    },
    {
      title: "AI Agent Interface",
      description:
        "Interact with your documents through a conversational interface that retrieves relevant knowledge and generates context-aware answers.",
      icon: "",
    },
    {
      title: "Namespaced Knowledge Bases",
      description:
        "Each document set can operate within its own namespace, allowing different system behaviors, prompts, and retrieval strategies.",
      icon: "",
    },
    {
      title: "Full-Stack Architecture",
      description:
        "Built using a modern stack including Next.js, TypeScript, vector search, and LLM orchestration tools.",
      icon: "",
    },
  ],
  working: {
    title: "How It Works",
    description:
      "The system follows a two-stage pipeline: knowledge base creation (ingestion) and intelligent retrieval through an AI agent.",
    sections: [
      {
        title: "1. Document Ingestion Pipeline",
        steps: [
          "User uploads a document (PDF / Markdown / Text).",
          "The file is parsed into raw text.",
          "Text is split into smaller semantic chunks.",
          "Each chunk is converted into vector embeddings.",
          "Embeddings are stored in a vector database along with metadata such as userID, docID, and namespace.",
        ],
      },
      {
        title: "2. Retrieval Pipeline",
        steps: [
          "User asks a question about a document.",
          "The query is converted into an embedding.",
          "A vector similarity search retrieves the most relevant chunks.",
          "Sytem also uses the previous conversation for more precise context hydration.",
          "Retrieved context is injected into the LLM prompt.",
          "The AI generates an answer grounded in the retrieved document content.",
        ],
      },
      {
        title: "3. Agentic Flow",
        steps: [
          "Retrieval pipeine is implemented via langchain/langgraph",
          "The agent determines which document or namespace should be queried.",
          "Relevant chunks are retrieved using vector search.",
          "The system composes a context-aware prompt.",
          "The LLM generates a response based strictly on retrieved knowledge.",
        ],
      },
    ],
    // techStack: ["Next.js", "TypeScript", "Vector Search", "LLM APIs", "", ""],
  },
  namespace: {
    title: "Why Namespaces Matter",
    description:
      "Namespaces allow the system to isolate different knowledge domains. Each namespace can represent a separate knowledge base, enabling different prompts, retrieval rules, and system behaviors.",
    details: [
      "Each document belongs to a specific namespace.",
      "Namespaces determine which knowledge base is queried during retrieval.",
      "Different namespaces can use different system prompts to guide the AI's behavior.",
      "This design allows the same infrastructure to support multiple domain-specific assistants.",
    ],
    example: {
      namespaceExample1: "finance",
      namespaceExample2: "scientific",
      explanation: "finanace namespace tells the agent to use sytem prompts specifically tailored for finance related document",
    },
  },
  pricing: {
    title: "Pricing",
    description: "This project is completely free to use.",
    details: [
      "This application is a prototype built for learning and demonstration purposes.",
      "No paid plans are available.",
      "The goal of this project is to explore AI-powered document retrieval systems and showcase full-stack engineering skills.",
    ],
    note: "",
  },
  footer: {
    tagline:
      "Built as a personal engineering project exploring LLM-powered knowledge systems.",
    links: {
      github: "https://github.com/thrivingSec/",
      portfolio: "https://srijan-personal-portfolio.vercel.app/",
      linkedin: "https://www.linkedin.com/in/srijan-karn-81507b27a/",
    },
    credits: "Created by Srijan",
    disclaimer:
      "This is a personal project and not a production enterprise product.",
  },
};
