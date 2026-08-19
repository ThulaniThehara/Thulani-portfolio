import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

/**
 * Normalizes project tags & technologies so both arrays are populated seamlessly
 */
export function getProjectTechnologies(project: ProjectEntry): string[] {
  const combined = new Set([
    ...(project.data.technologies || []),
    ...(project.data.tags || []),
  ]);
  return Array.from(combined);
}

/**
 * Returns all projects sorted by year / publishDate (newest first)
 */
export async function getAllProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => {
    const yearA = Number(a.data.year) || 0;
    const yearB = Number(b.data.year) || 0;
    if (yearA !== yearB) return yearB - yearA;

    const dateA = a.data.publishDate ? new Date(a.data.publishDate).getTime() : 0;
    const dateB = b.data.publishDate ? new Date(b.data.publishDate).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Returns featured projects for home and showcase listings
 */
export async function getFeaturedProjects(): Promise<ProjectEntry[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.data.featured);
}

/**
 * Returns projects filtered by specific category
 */
export async function getProjectsByCategory(category: string): Promise<ProjectEntry[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.data.category.toLowerCase() === category.toLowerCase());
}

/**
 * Returns unique list of categories across all projects
 */
export async function getAllCategories(): Promise<string[]> {
  const all = await getAllProjects();
  const categories = new Set(all.map((p) => p.data.category));
  return Array.from(categories);
}

/**
 * Returns a specific project by id or custom slug
 */
export async function getProjectBySlug(slug: string): Promise<ProjectEntry | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.id === slug || p.data.slug === slug);
}

/**
 * Returns previous and next projects for pagination / navigation
 */
export async function getAdjacentProjects(currentId: string): Promise<{
  prev: ProjectEntry | null;
  next: ProjectEntry | null;
}> {
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.id === currentId || p.data.slug === currentId);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return { prev, next };
}
