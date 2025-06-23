import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Input } from "@/components/ui/input";

type Item = string | { name: string };

interface VirtualizedContentProps {
  items: Item[];
  setSelected: (label: string) => void;
  userFn: (item: Item) => void;
  searchable: boolean;
}

interface SelectProps<
  U extends Record<F, string | undefined>,
  F extends keyof U,
> {
  items: Item[];
  title?: string;
  required?: boolean;
  placeholder: string;
  user: U;
  setUser: React.Dispatch<React.SetStateAction<U>>;
  field: F;
  disabled?: boolean;
  searchable?: boolean;
  userFn?: (item: Item) => void;
}

const VirtualizedContent = ({
  items,
  setSelected,
  userFn,
  searchable,
}: VirtualizedContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [options, setOptions] = useState(items);
  const { getTotalSize, getVirtualItems } = useVirtualizer({
    count: options.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 50,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setOptions(
      items.filter((item) => {
        const text = typeof item === "string" ? item : item.name;
        return text.toLowerCase().includes(value);
      }),
    );
  };

  return (
    <DropdownMenuContent
      ref={ref}
      className="dropdown-content h-fit max-h-[400px] w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-scroll pt-0"
    >
      <div className="sticky top-0 z-50 bg-white pt-1">
        {searchable && (
          <Input
            placeholder="Search"
            onKeyDown={(event) => event.stopPropagation()}
            onChange={handleInput}
          />
        )}
      </div>
      <DropdownMenuGroup className="relative w-full">
        <div style={{ height: `${getTotalSize()}px` }}>
          {getVirtualItems().map((virtualRow) => {
            const option = options[virtualRow.index];
            const label = typeof option === "string" ? option : option.name;

            return (
              <DropdownMenuItem
                key={virtualRow.index}
                className="absolute top-0 left-0 w-full capitalize"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => {
                  setSelected(label);
                  userFn(option);
                }}
              >
                {label}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

const Select = <U extends Record<F, string | undefined>, F extends keyof U>({
  items,
  title,
  required,
  placeholder,
  user,
  setUser,
  field,
  disabled = false,
  searchable = false,
  userFn = (value) => setUser({ ...user, [field]: value }),
}: SelectProps<U, F>) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  return (
    <>
      {title && (
        <p className="mb-1 font-semibold">
          {title}
          {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="w-full" asChild>
          <Button
            className="w-full justify-between text-left break-words whitespace-normal capitalize"
            variant="outline"
            disabled={disabled}
          >
            {selected ? (
              selected
            ) : (
              <p className="text-hackathon-gray-200 font-normal">
                {placeholder}
              </p>
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <VirtualizedContent
            items={items}
            setSelected={(label) => {
              setSelected(label);
              setOpen(false);
            }}
            userFn={(item) => {
              userFn(item);
            }}
            searchable={searchable}
          />
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  );
};

export default Select;
