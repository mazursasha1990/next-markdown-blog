import React from 'react';
import fs from 'fs';
import path, { join } from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Image from 'next/image';
import Link from 'next/link';

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}: any) {
  return (
    <>
      <Link href='/'>
        <span className='btn btn-back'>Go Back</span>
      </Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <Image
          src={cover_image}
          className='image'
          alt=''
          width={800}
          height={500}
        />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
