'use client';

import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { Download, Menu, BookOpen, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const docsQuickLinks: { title: string; href: string; description: string }[] = [
  {
    title: 'Introduction',
    href: '/docs/introduction',
    description: "Get oriented with Mue's core concepts and setup.",
  },
  {
    title: 'Marketplace',
    href: '/docs/marketplace/introduction',
    description: 'Extend Mue with community-curated packs and presets.',
  },
  {
    title: 'API',
    href: '/docs/api/introduction',
    description: 'Integrate Mue into your apps with the REST API guide.',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isDocsActive = pathname?.startsWith('/docs') ?? false;
  const navLinks = [
    {
      href: '/marketplace',
      label: 'Marketplace',
      isActive: pathname?.startsWith('/marketplace') ?? false,
    },
    {
      href: '/blog',
      label: 'Blog',
      isActive: pathname?.startsWith('/blog') ?? false,
    },
    {
      href: '/contact',
      label: 'Contact',
      isActive: pathname?.startsWith('/contact') ?? false,
    },
  ];
  const mobileLinks = [{ href: '/docs', label: 'Docs', isActive: isDocsActive }, ...navLinks];

  return (
    <nav className="bg-background/60 backdrop-blur-md flex w-full items-center gap-3 rounded-xl border border-foreground/20 px-4 py-3 shadow-lg sm:px-6 lg:px-12">
      <div className="flex flex-1 items-center">
        <Link href={'/'} className="cursor-pointer shrink-0">
          <Logo width={100} height={100} className="h-10 w-10" />
        </Link>
      </div>
      <div className="hidden lg:flex">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger data-active={isDocsActive ? 'true' : undefined}>
                Docs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="items-start from-muted/50 to-muted flex h-full w-full cursor-pointer flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                        href="/docs"
                      >
                        <div className="dark:bg-neutral-900 bg-neutral-200 p-4 grid place-content-center aspect-square rounded-full mb-2">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <div className="mb-2 text-lg font-medium">Documentation</div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Dive into guides, references, and workflows for the entire Mue ecosystem.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {docsQuickLinks.map((item) => {
                    const isActive = pathname?.startsWith(item.href) ?? false;
                    return (
                      <li key={item.title}>
                        <NavigationMenuLink asChild active={isActive}>
                          <Link href={item.href}>
                            <div
                              className={cn(
                                'text-sm font-medium leading-none',
                                isActive && 'text-primary',
                              )}
                            >
                              {item.title}
                            </div>
                            <p
                              className={cn(
                                'text-muted-foreground line-clamp-2 text-sm leading-snug',
                                isActive && 'text-primary/80',
                              )}
                            >
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {navLinks.map(({ href, label, isActive }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                  active={isActive}
                >
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="default" className="hidden sm:inline-flex" asChild>
          <Link href="/download">
            <Download className="mr-2 h-4 w-4" /> Download
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-foreground/20 lg:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4">
            <SheetHeader className="items-start">
              <SheetTitle className="text-left text-lg">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col gap-2 text-sm">
                {mobileLinks.map(({ href, label, isActive }) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'cursor-pointer py-2 transition-colors hover:text-primary',
                        isActive && 'text-primary font-semibold',
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="flex flex-col gap-2 mt-auto">
                <SheetClose asChild>
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/download">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full" variant="outline" size="sm" asChild>
                    <Link href="https://github.com/mue/mue" target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
