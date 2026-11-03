import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

type Post = CollectionEntry<'blog'>;

const postImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/blog/*/images/*.{png,jpg,jpeg,webp,gif}',
  { eager: true },
);

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
}

export function postUrl(post: Post): string {
  return `/blog/${post.id.replace(/\/index$/, '')}/`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * The first image in the post: optimizable metadata for images in the post's folder,
 * or a plain URL for files in public/. Remote images are skipped.
 */
export function postThumbnail(post: Post): ImageMetadata | string | undefined {
  const path = post.body?.match(/!\[[^\]]*\]\(([^)\s]+)/)?.[1];
  if (!path || /^https?:/.test(path)) return undefined;
  if (path.startsWith('/')) return path;
  const folder = post.filePath?.replace(/index\.md$/, '');
  return postImages[`/${folder}${decodeURI(path)}`]?.default;
}

/** The post's first paragraph of prose, as plain text. */
export function postExcerpt(post: Post): string {
  const prose = (post.body ?? '').replace(/```[\s\S]*?```/g, '');
  const paragraph = prose
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|!|\[!|-|>|\||<|\d+\. )/.test(block));
  return (paragraph ?? '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`\\]/g, '')
    .replace(/\s+/g, ' ');
}
