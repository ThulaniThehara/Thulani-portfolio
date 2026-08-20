import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;

const WORDS_PER_MINUTE = 200;

/**
 * Reading time in minutes. Prefers the `readingTime` frontmatter value (which mirrors
 * what the external blog shows), falling back to a word-count estimate of the local body.
 */
export function getReadingTime(article: ArticleEntry): number {
  if (article.data.readingTime) return article.data.readingTime;

  const words = (article.body || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Returns all published articles sorted by publish date (newest first)
 */
export async function getAllArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => data.status === 'Published');
  return articles.sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());
}

/**
 * Returns featured articles for home and showcase listings
 */
export async function getFeaturedArticles(): Promise<ArticleEntry[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.data.featured);
}

/**
 * Returns articles filtered by a specific category
 */
export async function getArticlesByCategory(category: string): Promise<ArticleEntry[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.data.category.toLowerCase() === category.toLowerCase());
}

/**
 * Returns the unique list of categories across all articles
 */
export async function getAllCategories(): Promise<string[]> {
  const all = await getAllArticles();
  const categories = new Set(all.map((a) => a.data.category));
  return Array.from(categories);
}
