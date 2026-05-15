// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

const isSVG = (mimeType?: string, filename?: string, url?: string): boolean =>
  mimeType === 'image/svg+xml' ||
  (typeof filename === 'string' && /\.svg($|\?)/i.test(filename)) ||
  (typeof url === 'string' && /\.svg($|\?)/i.test(url))

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    disableLocalStorage: true,
    imageSizes: [],
    mimeTypes: ['image/*', 'image/svg+xml', 'video/*', 'application/pdf'],
    adminThumbnail: ({ doc }: { doc: Record<string, unknown> }) => {
      const url = doc?.url as string | undefined
      if (!url) return null
      if (isSVG(doc?.mimeType as string, doc?.filename as string, url)) return url
      if (url.includes('res.cloudinary.com'))
        return url.replace('/upload/', '/upload/c_fill,w_400,h_300,q_auto,f_auto/')
      return url
    },
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Alt Text', required: true },
    { name: 'caption', type: 'richText', label: 'Caption' },
  ],
}
