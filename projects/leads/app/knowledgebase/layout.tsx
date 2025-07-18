import { KnowledgebaseProvider } from "@/lib/contexts/knowledgebase-context";

export default function KnowledgebaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <KnowledgebaseProvider>
      {children}
    </KnowledgebaseProvider>
  );
} 