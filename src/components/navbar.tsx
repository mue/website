import React from 'react';

import Logo from './logo';

import { Link, useLocation } from '@tanstack/react-router';

import { Download, Menu, BookOpen, Package, Code2, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from './ui/button';

import { cn } from '@/lib/utils';

const docsQuickLinks: {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
}[] = [
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
  const { pathname } = useLocation();
  const isDocsActive = pathname.startsWith('/docs');

  const navLinks = [
    {
      href: '/marketplace',
      label: 'Marketplace',
      isActive: pathname.startsWith('/marketplace'),
    },
    {
      href: '/showcase',
      label: 'Showcase',
      isActive: pathname.startsWith('/showcase'),
    },
    {
      href: '/blog',
      label: 'Blog',
      isActive: pathname.startsWith('/blog'),
    },
    {
      href: '/contact',
      label: 'Contact',
      isActive: pathname.startsWith('/contact'),
    },
  ];

  return (
    <nav className="bg-background/60 backdrop-blur-md flex w-full items-center gap-3 rounded-xl border border-foreground/20 px-4 py-3 shadow-lg sm:px-6 lg:px-12">
      <div className="flex flex-1 items-center">
        <Link to="/" search={{}} className="cursor-pointer shrink-0" aria-label="Mue home">
          <Logo width={100} height={100} className="h-10 w-10" />
        </Link>
      </div>

      <div className="flex lg:hidden">
        <Link to="/" search={{}} className="cursor-pointer" aria-label="Mue home">
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
                      to="/docs"
                      search={{}}
                      className="flex flex-col justify-between rounded-l-md bg-linear-to-b from-[#FF5C25]/20 to-[#b02048]/20 px-4 py-6 no-underline outline-hidden select-none transition-colors hover:from-[#FF5C25]/30 hover:to-[#b02048]/30 focus:shadow-md"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5C25]/80">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="mb-1 text-sm font-semibold text-foreground">
                          Documentation
                        </div>
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
                      const isActive = pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <li key={item.title}>
                          <NavigationMenuLink asChild active={isActive}>
                            <Link
                              to={item.href}
                              search={{}}
                              className={cn(
                                'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60',
                                isActive && 'bg-muted/60',
                              )}
                            >
                              <div
                                className={cn(
                                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background',
                                  isActive && 'border-[#FF5C25]/40 bg-[#FF5C25]/5',
                                )}
                              >
                                <Icon
                                  className={cn(
                                    'h-3.5 w-3.5 text-muted-foreground',
                                    isActive && 'text-[#FF5C25]',
                                  )}
                                />
                              </div>

                              <div>
                                <div
                                  className={cn(
                                    'text-sm font-medium leading-none mb-1',
                                    isActive && 'text-[#FF5C25]',
                                  )}
                                >
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
                  <Link to={href} search={{}}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="default" className="hidden lg:inline-flex" asChild>
          <Link to="/download" search={{}}>
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

          <SheetContent
            side="right"
            className="flex flex-col gap-0 p-0 [&>[data-slot='sheet-close']]:top-[10px] [&>[data-slot='sheet-close']]:right-[10px] [&>[data-slot='sheet-close']]:flex [&>[data-slot='sheet-close']]:items-center [&>[data-slot='sheet-close']]:justify-center [&>[data-slot='sheet-close']]:h-9 [&>[data-slot='sheet-close']]:w-9 [&>[data-slot='sheet-close']]:rounded-lg [&>[data-slot='sheet-close']]:border [&>[data-slot='sheet-close']]:border-foreground/20 [&>[data-slot='sheet-close']]:opacity-100 [&>[data-slot='sheet-close']_svg]:size-4"
          >
            <SheetHeader className="relative flex flex-row items-center border-b border-border px-4 py-3">
              <SheetClose asChild>
                <Link to="/" search={{}} aria-label="Mue home">
                  <Logo width={100} height={100} className="h-8 w-8" />
                </Link>
              </SheetClose>

              <SheetTitle
                className="absolute left-1/2 -translate-x-1/2 text-base font-bold"
                style={{ fontFamily: 'var(--font-lexend-deca)' }}
              >
                Mue
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3">
              <SheetClose asChild>
                <Link
                  to="/docs"
                  search={{}}
                  aria-current={isDocsActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                    isDocsActive ? 'text-[#FF5C25]' : 'text-foreground/70 hover:text-foreground',
                  )}
                >
                  Docs
                </Link>
              </SheetClose>

              {navLinks.map(({ href, label, isActive }) => (
                <SheetClose asChild key={href}>
                  <Link
                    to={href}
                    search={{}}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                      isActive ? 'text-[#FF5C25]' : 'text-foreground/70 hover:text-foreground',
                    )}
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-border px-3 py-3">
              <SheetClose asChild>
                <Button className="w-full" size="sm" asChild>
                  <Link to="/download" search={{}}>
                    <Download className="h-4 w-4" /> Download
                  </Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button className="w-full" variant="outline" size="sm" asChild>
                  <a href="https://github.com/mue/mue" target="_blank" rel="noreferrer">
                    <FaGithub className="h-4 w-4" /> GitHub
                  </a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
