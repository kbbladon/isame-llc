import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'

import {
  TextColorFeature,
  TextSizeFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextFontFamilyFeature,
} from 'payload-lexical-typography'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

// SVG‑safe URL builder – never transform SVGs
const getStorageURL = ({ public_id, version, resource_type, format }: any) => {
  const isSVG = (typeof public_id === 'string' && public_id.endsWith('.svg')) || format === 'svg'

  return cloudinary.url(public_id, {
    secure: true,
    resource_type: 'image',
    version,
    transformation: isSVG ? [] : [{ quality: 'auto', fetch_format: 'auto' }],
  })
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || getServerSideURL(),
  cors: [
    getServerSideURL(),
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter((url): url is string => url !== null),

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Spanish', code: 'es' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin#default'],
      beforeDashboard: ['@/components/BeforeDashboard#default'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      TextColorFeature({
        colors: ['#000000', '#FFFFFF', '#FFD700', '#C0C0C0', '#FF0000', '#00FF00', '#0000FF'],
        colorPicker: true,
      }),
      TextSizeFeature(),
      TextLetterSpacingFeature(),
      TextLineHeightFeature(),
      TextFontFamilyFeature({
        fontFamilies: [
          { label: 'Default', value: 'default' },
          { label: 'Baskervville (Serif)', value: 'Baskervville, serif' },
          { label: 'Prompt (Sans-serif)', value: 'Prompt, sans-serif' },
          { label: 'Playfair Display (Serif)', value: 'Playfair Display, serif' },
          { label: 'Poppins (Sans-serif)', value: 'Poppins, sans-serif' },
          { label: 'Georgia (Serif)', value: 'Georgia, serif' },
          { label: 'Arial (Sans-serif)', value: 'Arial, sans-serif' },
          { label: 'Times New Roman (Serif)', value: 'Times New Roman, serif' },
        ],
        customFontFamily: false,
      }),
    ],
  }),

  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),

  collections: [Pages, Posts, Media, Categories, Users],
  globals: [Header, Footer, Settings],

  plugins: [
    ...plugins,
    // Inside plugins array
    cloudinaryStorage({
      cloudConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections: {
        media: {
          // All properties go directly on the media object – no nested "options"
          folder: 'media',
          resourceType: 'image', // forces SVG as image, never raw
          public_id: ({ originalname }: { originalname: string }) => {
            return `media/${originalname}` // keeps filename.svg extension
          },
          transformation: [], // no upload‑time transforms
          deleteFromCloudinary: true,

          getStorageURL: ({ public_id, version, resource_type, format }: any) => {
            const isSVG =
              (typeof public_id === 'string' && public_id.endsWith('.svg')) || format === 'svg'
            return cloudinary.url(public_id, {
              secure: true,
              resource_type: 'image',
              version,
              transformation: isSVG ? [] : [{ quality: 'auto', fetch_format: 'auto' }],
            })
          },
        } as any, // ← cast to any to skip missing type definitions
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
