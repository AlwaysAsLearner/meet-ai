import { Button } from "@/components/ui/button";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder,
  isSearchable,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleOpenChange = (value: boolean) => {
    onSearch?.("")
    setOpen(false)
  }
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
      </Button>
      <CommandResponsiveDialog shouldFilter={!onSearch} open={open} onOpenChange={handleOpenChange}>
        <CommandInput placeholder="Search..." value={selectedOption?.value} onValueChange={onSearch} />
        <CommandList>
            <CommandEmpty>
                <span className="text-muted-foreground text-sm">
                    No Options Found 
                </span>
            </CommandEmpty>
            {options.map((option) => (
                <CommandItem
                 key={option.id}
                 onSelect={() => {
                    onSelect(option.value)
                    setOpen(false)
                 }}
                >
                 {option.children}
                </CommandItem>
            ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
