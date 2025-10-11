import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageContainerProps = {
  className?: string;
  children: ReactNode;
};

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <main className={cn("container mx-auto px-4 py-12 md:py-16", className)}>
      {children}
    </main>
  );
}

export default PageContainer;