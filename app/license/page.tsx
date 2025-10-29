import type { Metadata } from 'next';
import Link from 'next/link';

import { Scale } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { PageHeader } from '@/components/shared/page-header';
import { LicenseSection } from '@/components/license/license-section';
import { CopyrightNotice } from '@/components/license/copyright-notice';
import { GitHubLinkButton } from '@/components/license/github-link-button';

export const metadata: Metadata = {
  title: 'License',
  description: 'Learn about the open source licenses used in Mue.',
  openGraph: {
    title: 'License | Mue',
    description: 'Learn about the open source licenses used in Mue.',
  },
};

const currentYear = new Date().getFullYear();

export default function LicensePage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <PageHeader icon={Scale} title="License" subtitle="Open source and free to use" />

        <div className="space-y-8">
          <LicenseSection
            title="Extension & Website"
            licenseName="BSD-3-Clause"
            licenseColor="#FF5C25"
            description={
              <>
                The Mue Tab extension and this website are licensed under the{' '}
                <strong>BSD-3-Clause License</strong>. This means you&apos;re free to use, modify,
                and distribute the code, as long as you give appropriate credit, provide a copy of
                the license, and don&apos;t use our names or trademarks for endorsement without
                permission.
              </>
            }
            copyrights={
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <div className="group flex items-start justify-between gap-2">
                  <p className="text-sm font-mono text-muted-foreground flex-1">
                    Copyright (c) 2019-{currentYear} The Mue Authors
                  </p>
                  <CopyButton
                    text={`Copyright (c) 2019-${currentYear} The Mue Authors`}
                    size="sm"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <div className="group flex items-start justify-between gap-2">
                  <p className="text-sm font-mono text-muted-foreground flex-1">
                    Copyright (c) 2018-2019 David Ralph
                  </p>
                  <CopyButton
                    text="Copyright (c) 2018-2019 David Ralph"
                    size="sm"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            }
            links={
              <>
                <GitHubLinkButton
                  href="https://github.com/mue/mue/blob/main/LICENSE"
                  label="View Extension License"
                />
                <GitHubLinkButton
                  href="https://github.com/mue/website"
                  label="View Website License"
                />
              </>
            }
          />

          <LicenseSection
            title="API & Marketplace"
            licenseName="MIT"
            licenseColor="#0078D4"
            description={
              <>
                The Mue API and Marketplace are licensed under the <strong>MIT License</strong>.
                This means you&apos;re free to use, copy, modify, merge, publish, distribute,
                sublicense, and/or sell copies of the software, as long as you include the original
                copyright notice and permission notice in all copies or substantial portions of the
                software.
              </>
            }
            copyrights={
              <>
                <CopyrightNotice
                  label="API"
                  year={`2019-${currentYear}`}
                  holder="The Mue Authors"
                />
                <CopyrightNotice
                  label="Marketplace"
                  year={`2020-${currentYear}`}
                  holder="The Mue Authors"
                />
              </>
            }
            links={
              <>
                <GitHubLinkButton href="https://github.com/mue/api" label="View API License" />
                <GitHubLinkButton
                  href="https://github.com/mue/marketplace"
                  label="View Marketplace License"
                />
              </>
            }
          />

          <section className="rounded-2xl border border-[#FF5C25]/20 bg-gradient-to-br from-[#FF5C25]/10 to-[#FF456E]/10 p-8 backdrop-blur">
            <h3 className="text-xl font-semibold text-foreground">Why Open Source?</h3>
            <p className="mt-4 text-muted-foreground">
              Mue is built by the community, for the community. We believe in transparency,
              collaboration, and empowering developers to create and contribute. All of our code is
              publicly available on GitHub, and we welcome contributions from everyone.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background/40 p-4">
                <h4 className="font-semibold text-foreground">Transparent</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every line of code is open for inspection and improvement.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/40 p-4">
                <h4 className="font-semibold text-foreground">Community-Driven</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Built with contributions from developers worldwide.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <p className="text-sm text-muted-foreground">
              Questions about licensing?{' '}
              <Link
                href="https://discord.gg/zv8C9F8"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#FF5C25] hover:underline"
              >
                Ask us on Discord
              </Link>
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/download">Get Started with Mue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
