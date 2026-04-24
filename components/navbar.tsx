'use client';

import React from 'react';
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
import { Download, Menu, BookOpen, Package, Code2, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const docsQuickLinks: { title: string; href: string; description: string; icon: React.ElementType }[] = [
  {
    title: 'Introduction',
    href: '/docs/introduction',
    description: "Get oriented with Mue's core concepts and setup.",
    icon: BookOpen,
  },
  {
    title: 'Marketplace',
    href: '/docs/marketplace/introduction',
    description: 'Extend Mue with community-curated packs and presets.',
    icon: Package,
  },
  {
    title: 'API',
    href: '/docs/api/introduction',
    description: 'Integrate Mue into your apps with the REST API guide.',
    icon: Code2,
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
      href: '/showcase',
      label: 'Showcase',
      isActive: pathname?.startsWith('/showcase') ?? false,
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
      <div className="flex lg:hidden">
        <Link href={'/'} className="cursor-pointer">
          <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-lexend-deca)' }}>
            Mue
          </span>
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
                <div className="grid md:w-[440px] lg:w-[520px] lg:grid-cols-[1fr_1.4fr]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/docs"
                      className="flex flex-col justify-between rounded-l-md bg-linear-to-b from-[#FF5C25]/20 to-[#b02048]/20 px-4 py-6 no-underline outline-hidden select-none transition-colors hover:from-[#FF5C25]/30 hover:to-[#b02048]/30 focus:shadow-md"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5C25]/80">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="mb-1 text-sm font-semibold text-foreground">Documentation</div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Guides, references, and workflows for the entire Mue ecosystem.
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-[#FF5C25]">
                        Browse all docs <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </NavigationMenuLink>

                  <ul className="flex flex-col gap-1 p-3">
                    {docsQuickLinks.map((item) => {
                      const isActive = pathname?.startsWith(item.href) ?? false;
                      const Icon = item.icon;
                      return (
                        <li key={item.title}>
                          <NavigationMenuLink asChild active={isActive}>
                            <Link
                              href={item.href}
                              className={cn(
                                'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60',
                                isActive && 'bg-muted/60',
                              )}
                            >
                              <div className={cn(
                                'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background',
                                isActive && 'border-[#FF5C25]/40 bg-[#FF5C25]/5',
                              )}>
                                <Icon className={cn('h-3.5 w-3.5 text-muted-foreground', isActive && 'text-[#FF5C25]')} />
                              </div>
                              <div>
                                <div className={cn('text-sm font-medium leading-none mb-1', isActive && 'text-[#FF5C25]')}>
                                  {item.title}
                                </div>
                                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
                      <FaGithub className="mr-2 h-4 w-4" />
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
