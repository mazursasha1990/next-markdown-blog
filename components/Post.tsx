import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Post({ post }: { post: any }) {
  return (
    <div className='card'>
      <Image
        src={post.frontmatter.cover_image}
        className='image'
        alt='Post image'
        width={300}
        height={200}
        priority
      />
      <div className='post-date'>Posted on {post.frontmatter.date}</div>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <span className='btn'>Read More</span>
      </Link>
    </div>
  );
}
