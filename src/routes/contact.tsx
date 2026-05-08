import { createFileRoute, Link } from '@tanstack/react-router'

import { Mail, MessageSquare, Search } from 'lucide-react'
import { FaXTwitter, FaGithub } from 'react-icons/fa6'

import { ContactCard } from '@/components/contact/contact-card'

const contactMethods = [
  { href: 'https://discord.gg/zv8C9F8', icon: MessageSquare, title: 'Discord Server', description: 'Real-time support and community discussions with the Mue team.', handle: 'discord.gg/zv8C9F8', external: true },
  { href: 'https://github.com/mue/mue/issues', icon: FaGithub, title: 'GitHub Issues', description: 'Report bugs, request features, or see what others have reported.', handle: 'github.com/mue', external: true },
  { href: 'mailto:hello@muetab.com', icon: Mail, title: 'Email', description: 'General inquiries, partnerships, or security issues.', handle: 'hello@muetab.com', external: false },
  { href: 'https://x.com/getmue', icon: FaXTwitter, title: 'X', description: 'Updates, tips, and news about Mue.', handle: '@getmue', external: true },
]

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact | Mue' },
      { name: 'description', content: 'Get in touch with the Mue team. Reach out for support, feedback, or inquiries.' },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Get in Touch with Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Need support? Have feedback or suggestions? We&apos;d love to hear from you!
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <ContactCard key={method.title} {...method} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/30 px-8 py-7">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Search className="h-4 w-4 text-muted-foreground" />
            Before reaching out
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-0">
            <p className="text-sm leading-relaxed text-muted-foreground sm:pr-8">
              Check the{' '}
              <Link to="/docs" className="text-foreground no-underline hover:underline underline-offset-2">
                documentation
              </Link>{' '}
              for answers to common questions.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:border-l sm:border-border sm:px-8">
              Search{' '}
              <a href="https://github.com/mue/mue/issues" target="_blank" rel="noreferrer" className="text-foreground no-underline hover:underline underline-offset-2">
                GitHub Issues
              </a>{' '}
              to see if your problem has been reported.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:border-l sm:border-border sm:pl-8">
              Our{' '}
              <a href="https://discord.gg/zv8C9F8" target="_blank" rel="noreferrer" className="text-foreground no-underline hover:underline underline-offset-2">
                Discord community
              </a>{' '}
              can usually help faster than email.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
