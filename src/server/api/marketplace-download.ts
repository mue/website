import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const trackMarketplaceDownload = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ itemId: z.string() }))
  .handler(async ({ data }) => {
    const res = await fetch(
      `https://api.muetab.com/v2/marketplace/item/${data.itemId}/download`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    )
    if (!res.ok) throw new Error('Failed to track download')
    return res.json()
  })
