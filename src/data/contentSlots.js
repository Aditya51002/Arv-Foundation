/**
 * Central registry of all editable content slots across the website.
 * Each slot has a unique content key: "page:section:field"
 * This is used by the admin panel to show what content can be edited.
 */

export const CONTENT_SLOTS = [
  // ╭─────────────────────────────────────────────────────────╮
  // │                     HOME PAGE                           │
  // ╰─────────────────────────────────────────────────────────╯
  { page: "home", section: "hero", field: "tagline", label: "Home → Hero → Tagline", type: "text" },
  { page: "home", section: "hero", field: "intro", label: "Home → Hero → Introduction", type: "textarea" },
  { page: "home", section: "about", field: "who", label: "Home → About → Who We Are", type: "textarea" },
  { page: "home", section: "about", field: "mission", label: "Home → About → Our Mission", type: "textarea" },
  { page: "home", section: "about", field: "vision", label: "Home → About → Our Vision", type: "textarea" },

  // ╭─────────────────────────────────────────────────────────╮
  // │                   WORK DETAIL PAGES                     │
  // ╰─────────────────────────────────────────────────────────╯
  { page: "work", section: "orphanage-support", field: "title", label: "Work → Orphanage Support → Title", type: "text" },
  { page: "work", section: "orphanage-support", field: "description", label: "Work → Orphanage Support → Description", type: "textarea" },
  { page: "work", section: "orphanage-support", field: "content", label: "Work → Orphanage Support → Full Content", type: "richtext" },

  { page: "work", section: "old-age-home", field: "title", label: "Work → Old Age Home → Title", type: "text" },
  { page: "work", section: "old-age-home", field: "description", label: "Work → Old Age Home → Description", type: "textarea" },
  { page: "work", section: "old-age-home", field: "content", label: "Work → Old Age Home → Full Content", type: "richtext" },

  { page: "work", section: "slum-area-development", field: "title", label: "Work → Slum Area Development → Title", type: "text" },
  { page: "work", section: "slum-area-development", field: "description", label: "Work → Slum Area Development → Description", type: "textarea" },
  { page: "work", section: "slum-area-development", field: "content", label: "Work → Slum Area Development → Full Content", type: "richtext" },

  { page: "work", section: "environment-protection", field: "title", label: "Work → Environment Protection → Title", type: "text" },
  { page: "work", section: "environment-protection", field: "description", label: "Work → Environment Protection → Description", type: "textarea" },
  { page: "work", section: "environment-protection", field: "content", label: "Work → Environment Protection → Full Content", type: "richtext" },

  { page: "work", section: "education", field: "title", label: "Work → Education → Title", type: "text" },
  { page: "work", section: "education", field: "description", label: "Work → Education → Description", type: "textarea" },
  { page: "work", section: "education", field: "content", label: "Work → Education → Full Content", type: "richtext" },

  { page: "work", section: "health", field: "title", label: "Work → Health → Title", type: "text" },
  { page: "work", section: "health", field: "description", label: "Work → Health → Description", type: "textarea" },
  { page: "work", section: "health", field: "content", label: "Work → Health → Full Content", type: "richtext" },

  { page: "work", section: "old-clothes-distribution", field: "title", label: "Work → Old Clothes Distribution → Title", type: "text" },
  { page: "work", section: "old-clothes-distribution", field: "description", label: "Work → Old Clothes Distribution → Description", type: "textarea" },
  { page: "work", section: "old-clothes-distribution", field: "content", label: "Work → Old Clothes Distribution → Full Content", type: "richtext" },

  { page: "work", section: "food-drive", field: "title", label: "Work → Food Drive → Title", type: "text" },
  { page: "work", section: "food-drive", field: "description", label: "Work → Food Drive → Description", type: "textarea" },
  { page: "work", section: "food-drive", field: "content", label: "Work → Food Drive → Full Content", type: "richtext" },

  // ╭─────────────────────────────────────────────────────────╮
  // │                 INITIATIVES PAGES                       │
  // ╰─────────────────────────────────────────────────────────╯
  { page: "initiative", section: "sanitary-pad-initiative", field: "title", label: "Initiatives → Sanitary Pad Initiative → Title", type: "text" },
  { page: "initiative", section: "sanitary-pad-initiative", field: "description", label: "Initiatives → Sanitary Pad Initiative → Description", type: "textarea" },
  { page: "initiative", section: "sanitary-pad-initiative", field: "content", label: "Initiatives → Sanitary Pad Initiative → Full Content", type: "richtext" },

  { page: "initiative", section: "go-for-sangam", field: "title", label: "Initiatives → Go For Sangam → Title", type: "text" },
  { page: "initiative", section: "go-for-sangam", field: "description", label: "Initiatives → Go For Sangam → Description", type: "textarea" },
  { page: "initiative", section: "go-for-sangam", field: "content", label: "Initiatives → Go For Sangam → Full Content", type: "richtext" },

  { page: "initiative", section: "blood-donation-drive", field: "title", label: "Initiatives → Blood Donation Drive → Title", type: "text" },
  { page: "initiative", section: "blood-donation-drive", field: "description", label: "Initiatives → Blood Donation Drive → Description", type: "textarea" },
  { page: "initiative", section: "blood-donation-drive", field: "content", label: "Initiatives → Blood Donation Drive → Full Content", type: "richtext" },

  { page: "initiative", section: "tree-plantation-drive", field: "title", label: "Initiatives → Tree Plantation Drive → Title", type: "text" },
  { page: "initiative", section: "tree-plantation-drive", field: "description", label: "Initiatives → Tree Plantation Drive → Description", type: "textarea" },
  { page: "initiative", section: "tree-plantation-drive", field: "content", label: "Initiatives → Tree Plantation Drive → Full Content", type: "richtext" },

  { page: "initiative", section: "winter-blanket-distribution", field: "title", label: "Initiatives → Winter Blanket Distribution → Title", type: "text" },
  { page: "initiative", section: "winter-blanket-distribution", field: "description", label: "Initiatives → Winter Blanket Distribution → Description", type: "textarea" },
  { page: "initiative", section: "winter-blanket-distribution", field: "content", label: "Initiatives → Winter Blanket Distribution → Full Content", type: "richtext" },

  // ╭─────────────────────────────────────────────────────────╮
  // │                    ABOUT PAGE                           │
  // ╰─────────────────────────────────────────────────────────╯
  { page: "about", section: "main", field: "who", label: "About → Main → Who We Are", type: "textarea" },
  { page: "about", section: "main", field: "mission", label: "About → Main → Our Mission", type: "textarea" },
  { page: "about", section: "main", field: "vision", label: "About → Main → Our Vision", type: "textarea" },

  // ╭─────────────────────────────────────────────────────────╮
  // │                  PARTNER PAGES                          │
  // ╰─────────────────────────────────────────────────────────╯
  { page: "partner", section: "shuruat-ek-jyoti-shiksha-ki", field: "title", label: "Partners → Shuruat Ek Jyoti → Title", type: "text" },
  { page: "partner", section: "shuruat-ek-jyoti-shiksha-ki", field: "description", label: "Partners → Shuruat Ek Jyoti → Description", type: "textarea" },
  { page: "partner", section: "shuruat-ek-jyoti-shiksha-ki", field: "content", label: "Partners → Shuruat Ek Jyoti → Full Content", type: "richtext" },

  { page: "partner", section: "adharshila-vridhaashram", field: "title", label: "Partners → Adharshila Vridhaashram → Title", type: "text" },
  { page: "partner", section: "adharshila-vridhaashram", field: "description", label: "Partners → Adharshila Vridhaashram → Description", type: "textarea" },
  { page: "partner", section: "adharshila-vridhaashram", field: "content", label: "Partners → Adharshila Vridhaashram → Full Content", type: "richtext" },

  { page: "partner", section: "the-earth-modifications-team", field: "title", label: "Partners → Earth Modifications → Title", type: "text" },
  { page: "partner", section: "the-earth-modifications-team", field: "description", label: "Partners → Earth Modifications → Description", type: "textarea" },
  { page: "partner", section: "the-earth-modifications-team", field: "content", label: "Partners → Earth Modifications → Full Content", type: "richtext" },

  { page: "partner", section: "kedarsut-foundation", field: "title", label: "Partners → Kedarsut Foundation → Title", type: "text" },
  { page: "partner", section: "kedarsut-foundation", field: "description", label: "Partners → Kedarsut Foundation → Description", type: "textarea" },
  { page: "partner", section: "kedarsut-foundation", field: "content", label: "Partners → Kedarsut Foundation → Full Content", type: "richtext" },

  { page: "partner", section: "miopass-charitable-and-welfare-foundation", field: "title", label: "Partners → Miopass Charitable → Title", type: "text" },
  { page: "partner", section: "miopass-charitable-and-welfare-foundation", field: "description", label: "Partners → Miopass Charitable → Description", type: "textarea" },
  { page: "partner", section: "miopass-charitable-and-welfare-foundation", field: "content", label: "Partners → Miopass Charitable → Full Content", type: "richtext" },
];

/** Build a content key from parts */
export const makeContentKey = (page, section, field) => `${page}:${section}:${field}`;

/** Get label for a content key */
export const getContentLabel = (contentKey) => {
  const slot = CONTENT_SLOTS.find(
    s => makeContentKey(s.page, s.section, s.field) === contentKey
  );
  return slot?.label || contentKey;
};

/** Get all pages (unique) */
export const getContentPages = () => {
  const pages = [...new Set(CONTENT_SLOTS.map(s => s.page))];
  return pages.map(p => ({
    value: p,
    label: p === 'home' ? 'Home Page' :
           p === 'work' ? 'Work Pages' :
           p === 'initiative' ? 'Initiative Pages' :
           p === 'about' ? 'About Page' :
           p === 'partner' ? 'Partner Pages' : 
           p.charAt(0).toUpperCase() + p.slice(1),
  }));
};

/** Get sections for a page */
export const getContentSections = (page) => {
  const sections = [...new Set(CONTENT_SLOTS.filter(s => s.page === page).map(s => s.section))];
  return sections.map(sec => ({
    value: sec,
    label: sec.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  }));
};

/** Get fields for a page+section */
export const getContentFields = (page, section) => {
  return CONTENT_SLOTS.filter(s => s.page === page && s.section === section);
};

/** Get all content slots */
export const getAllContentSlots = () => CONTENT_SLOTS;