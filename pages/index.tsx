import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Post from '../components/Post';

export default function Home({ posts }: { posts: [] }) {
  console.log('posts', posts);

  return (
    <>
      <Head>
        <title>NextJS Markdown Blog</title>
      </Head>
      <div className='posts'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  //  Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));

  //  Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '');
    // Get  frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  console.log('posts', posts);

  return {
    props: {
      posts,
    },
  };
}
