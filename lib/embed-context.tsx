import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import { useNavigate, useLocation, useSearch } from '@tanstack/react-router'
import { ScrollToTop } from '@/components/scroll-to-top'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

type EmbedContextType = {
  isEmbed: boolean
  isPreview: boolean
  sendMessage: (type: string, payload: unknown) => void
  config: EmbedConfig
  buildEmbedUrl: (path: string, hasExistingParams?: boolean) => string
}

type EmbedConfig = {
  theme?: 'light' | 'dark' | 'system'
  filters?: { type?: string; collection?: string }
  viewMode?: 'grid' | 'list'
}

const EmbedContext = createContext<EmbedContextType | undefined>(undefined)

export function EmbedProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const search = useSearch({ strict: false }) as Record<string, string>

  const isEmbed = search?.embed === 'true'
  const isPreview = search?.preview === 'true'
  const themeParam = (search?.theme ?? null) as 'light' | 'dark' | 'system' | null
  const [config, setConfig] = useState<EmbedConfig>({})
  const previousPathRef = useRef(pathname)

  const buildEmbedUrl = (path: string, hasExistingParams = false) => {
    if (!isEmbed) return path
    const separator = hasExistingParams ? '&' : '?'
    const params: string[] = ['embed=true']
    if (isPreview) params.push('preview=true')
    if (themeParam) params.push(`theme=${themeParam}`)
    return `${path}${separator}${params.join('&')}`
  }

  const sendMessage = (type: string, payload: unknown) => {
    if (isEmbed && typeof window !== 'undefined') {
      window.parent.postMessage({ type, payload }, '*')
    }
  }

  useEffect(() => {
    if (isEmbed && themeParam) {
      window.dispatchEvent(new CustomEvent('embed-theme-change', { detail: { theme: themeParam } }))
    }
  }, [isEmbed, themeParam])

  useEffect(() => {
    if (isEmbed) window.parent.postMessage({ type: 'marketplace:ready', payload: null }, '*')
  }, [isEmbed])

  useEffect(() => {
    if (!isEmbed) return
    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data
      if (type === 'marketplace:config') {
        setConfig(payload)
        if (payload.theme) {
          window.dispatchEvent(
            new CustomEvent('embed-theme-change', { detail: { theme: payload.theme } }),
          )
        }
      } else if (type === 'marketplace:navigate' && payload?.path) {
        const params = new URLSearchParams({ embed: 'true' })
        if (isPreview) params.set('preview', 'true')
        if (themeParam) params.set('theme', themeParam)
        navigate({ to: `${payload.path}?${params.toString()}` })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isEmbed, navigate, isPreview, themeParam])

  useEffect(() => {
    if (isEmbed && pathname !== previousPathRef.current) {
      const searchStr = new URLSearchParams(search as Record<string, string>).toString()
      sendMessage('marketplace:navigation', {
        path: pathname,
        fullPath: searchStr ? `${pathname}?${searchStr}` : pathname,
        search: searchStr,
      })
      previousPathRef.current = pathname
    }
  }, [pathname, search, isEmbed])

  return (
    <EmbedContext.Provider value={{ isEmbed, isPreview, sendMessage, config, buildEmbedUrl }}>
      {children}
    </EmbedContext.Provider>
  )
}

export function useEmbed() {
  const ctx = useContext(EmbedContext)
  if (!ctx) throw new Error('useEmbed must be used within EmbedProvider')
  return ctx
}

export function EmbedLayoutWrapper({ children }: { children: ReactNode }) {
  const { isEmbed } = useEmbed()
  if (isEmbed) return <main className="flex-1">{children}</main>
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50">
          <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-12">
            <Navbar />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
