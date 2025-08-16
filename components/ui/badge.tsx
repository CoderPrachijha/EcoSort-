import * as React from "react";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
