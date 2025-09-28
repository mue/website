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
import { Download } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

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
    <nav className="flex w-full flex-row items-center justify-between gap-3 rounded-lg border border-white/20 bg-white/10 px-6 py-4 shadow-lg backdrop-blur-md lg:px-12">
      <section className="flex flex-row items-center justify-center gap-10">
        <Link href={"/"}>
          <Logo width={100} height={100} className="h-10 w-10" />
        </Link>
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
              <NavigationMenuTrigger>List</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">Components</div>
                        <div className="text-muted-foreground">
                          Browse all components in the library.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">Documentation</div>
                        <div className="text-muted-foreground">
                          Learn how to use the library.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">Blog</div>
                        <div className="text-muted-foreground">
                          Read our latest blog posts.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      <section>
        <Button variant="default">
          <Download /> Download
        </Button>
      </section>
    </nav>
  );
}
