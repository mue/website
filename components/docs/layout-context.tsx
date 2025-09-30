import { getAllDocsMeta, getDocsTree } from '@/lib/docs';

type DocsNavigation = {
  tree: Awaited<ReturnType<typeof getDocsTree>>;
  docsMeta: Awaited<ReturnType<typeof getAllDocsMeta>>;
};

let navigationPromise: Promise<DocsNavigation> | null = null;

export function getDocsNavigation(): Promise<DocsNavigation> {
  if (!navigationPromise) {
    navigationPromise = Promise.all([getDocsTree(), getAllDocsMeta()]).then(([tree, docsMeta]) => ({
      tree,
      docsMeta,
    }));
  }

  return navigationPromise;
}

export function invalidateDocsNavigation() {
  navigationPromise = null;
}
