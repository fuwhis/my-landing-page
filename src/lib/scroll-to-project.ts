const projectSlugToTitle: Record<string, string> = {
  'gia-phuoc-express': 'Gia Phuoc Express',
  'myliking': 'MyLiking',
  'knft-kumho-nft': 'KNFT - Kumho NFT',
};

export function scrollToProjectCard(projectSlug: string) {
  const title = projectSlugToTitle[projectSlug];

  if (!title) {
    return;
  }

  const projectsSection = document.getElementById('projects');

  if (!projectsSection) {
    return;
  }

  const headings = projectsSection.querySelectorAll('h3');

  for (const heading of headings) {
    if (heading.textContent?.trim() !== title) {
      continue;
    }

    const card = heading.closest('article');

    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return;
  }
}
