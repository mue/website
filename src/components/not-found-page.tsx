import { Link } from '@tanstack/react-router'

import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <p className="pointer-events-none select-none text-[30vw] font-semibold leading-none tracking-tighter text-foreground/[0.06] md:absolute md:inset-0 md:flex md:items-center md:justify-center md:text-[22vw]">
        404
      </p>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Page not found
        </h1>

        <p className="max-w-md text-pretty text-base text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist (or it moved).
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return home
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            { label: "What's new", href: '/blog' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link key={item.href} to={item.href as any} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
