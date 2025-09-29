"use client";

import Logo from "./Logo";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Download, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const docsQuickLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    description: "Get oriented with Mue's core concepts and setup.",
  },
  {
    title: "Marketplace",
    href: "/docs/marketplace/introduction",
    description: "Extend Mue with community-curated packs and presets.",
  },
  {
    title: "API",
    href: "/docs/api/introduction",
    description: "Integrate Mue into your apps with the REST API guide.",
  },
];

export default function Navbar() {
  return (
    <nav className="bg-background/60 backdrop-blur-md flex w-full items-center justify-between gap-3 rounded-xl border border-foreground/20 px-4 py-3 shadow-lg sm:px-6 lg:px-12">
      <Link href={"/"} className="shrink-0">
        <Logo width={100} height={100} className="h-10 w-10" />
      </Link>
      <div className="hidden flex-1 justify-center lg:flex">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                        href="/docs"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium">
                          Mue documentation
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Dive into guides, references, and workflows for the
                          entire Mue ecosystem.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {docsQuickLinks.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/marketplace">Marketplace</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/blog">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="default" className="hidden sm:inline-flex">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-foreground/20 lg:hidden"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6">
            <SheetHeader className="items-start">
              <SheetTitle className="text-left">Menu</SheetTitle>
              <SheetDescription className="text-left">
                Browse documentation and explore the marketplace.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-5">
              <nav className="flex flex-col gap-3 text-base font-medium">
                <SheetClose asChild>
                  <Link
                    href="/docs"
                    className="transition-colors hover:text-primary"
                  >
                    Docs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/marketplace"
                    className="transition-colors hover:text-primary"
                  >
                    Marketplace
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-primary"
                  >
                    Blog
                  </Link>
                </SheetClose>
              </nav>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Docs quick links
                </p>
                <div className="flex flex-col gap-2">
                  {docsQuickLinks.map((item) => (
                    <SheetClose asChild key={item.title}>
                      <Link
                        href={item.href}
                        className="flex flex-col gap-1 rounded-md border border-border/60 p-3 transition hover:border-primary hover:bg-accent/50"
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="text-muted-foreground text-sm leading-snug">
                          {item.description}
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
              <SheetClose asChild>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
