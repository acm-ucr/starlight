import * as React from "react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export interface InputWithClearProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
}

const InputWithClear = React.forwardRef<HTMLInputElement, InputWithClearProps>(
  ({ className, type, onClear, ...props }, ref) => {
    return (
      <div className="flex w-full items-center rounded border border-slate-200 bg-white px-3 py-2">
        <input
          type={type}
          className={cn(
            "flex w-full text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        <X
          className="text-hackathon-gray-300 text-xl hover:cursor-pointer hover:text-red-500"
          onClick={onClear}
        />
      </div>
    );
  },
);
InputWithClear.displayName = "InputWithClear";

export { Input, InputWithClear };
