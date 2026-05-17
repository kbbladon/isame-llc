import React from 'react'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'
import type { ArchiveBlock as ArchiveBlockProps, Post } from '@/payload-types'

type Props = ArchiveBlockProps & {
  id?: string
  posts?: (Post | null)[] | null // 👈 data comes from the server
}

export const ArchiveBlock: React.FC<Props> = ({ id, introContent, posts }) => {
  const safePosts = (posts?.filter(Boolean) as Post[]) ?? []

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={safePosts} />
    </div>
  )
}

export default ArchiveBlock
