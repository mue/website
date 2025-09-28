"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DocMeta = {
  title: string;
  href: string;
  slug: string[];
  description?: string;
};

type DocsSearchProps = {
  docs: DocMeta[];
};

export function DocsSearch({ docs }: DocsSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = useMemo(
    () => [...docs].sort((a, b) => a.title.localeCompare(b.title)),
    [docs]
  );

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-between bg-card text-left text-muted-foreground shadow-sm"
        onClick={handleOpen}
      >
        <span className="flex items-center gap-2">
          Search docs
          <span className="text-muted-foreground/70">(title, keywords...)</span>
        </span>
        <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-2 py-1 text-[10px] font-medium uppercase text-muted-foreground">
          Ctrl
          <span className="text-xs">K</span>
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-xl">
        <Command>
          <CommandInput placeholder="Search documentation..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.title} ${item.description ?? ""}`}
                  onSelect={() => handleSelect(item.href)}
                  className={cn(pathname === item.href && "bg-primary/10")}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {item.slug.join(" / ")}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
