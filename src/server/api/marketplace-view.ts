import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const trackMarketplaceView = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ itemId: z.string() }))
  .handler(async ({ data }) => {
    const res = await fetch(
      `https://api.muetab.com/v2/marketplace/item/${data.itemId}/view`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    )
    if (!res.ok) throw new Error('Failed to track view')
    return res.json() as Promise<{ views?: number; downloads?: number }>
  })
