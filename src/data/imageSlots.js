/**
 * Central registry of all image slots across the website.
 * Each slot has a unique placement key: "page:section:slotIndex"
 * This is used by the admin gallery to show where an image can be placed.
 */

export const IMAGE_SLOTS = [
  // ─── Work Detail Pages (8 pages × 3 slots = 24) ───
  { page: "work", section: "orphanage-support", slot: 0, label: "Work → Orphanage Support → Image 1" },
  { page: "work", section: "orphanage-support", slot: 1, label: "Work → Orphanage Support → Image 2" },
  { page: "work", section: "orphanage-support", slot: 2, label: "Work → Orphanage Support → Image 3" },

  { page: "work", section: "old-age-home", slot: 0, label: "Work → Old Age Home → Image 1" },
  { page: "work", section: "old-age-home", slot: 1, label: "Work → Old Age Home → Image 2" },
  { page: "work", section: "old-age-home", slot: 2, label: "Work → Old Age Home → Image 3" },

  { page: "work", section: "slum-area-development", slot: 0, label: "Work → Slum Area Development → Image 1" },
  { page: "work", section: "slum-area-development", slot: 1, label: "Work → Slum Area Development → Image 2" },
  { page: "work", section: "slum-area-development", slot: 2, label: "Work → Slum Area Development → Image 3" },

  { page: "work", section: "environment-protection", slot: 0, label: "Work → Environment Protection → Image 1" },
  { page: "work", section: "environment-protection", slot: 1, label: "Work → Environment Protection → Image 2" },
  { page: "work", section: "environment-protection", slot: 2, label: "Work → Environment Protection → Image 3" },

  { page: "work", section: "education", slot: 0, label: "Work → Education → Image 1" },
  { page: "work", section: "education", slot: 1, label: "Work → Education → Image 2" },
  { page: "work", section: "education", slot: 2, label: "Work → Education → Image 3" },

  { page: "work", section: "health", slot: 0, label: "Work → Health → Image 1" },
  { page: "work", section: "health", slot: 1, label: "Work → Health → Image 2" },
  { page: "work", section: "health", slot: 2, label: "Work → Health → Image 3" },

  { page: "work", section: "old-clothes-distribution", slot: 0, label: "Work → Old Clothes Distribution → Image 1" },
  { page: "work", section: "old-clothes-distribution", slot: 1, label: "Work → Old Clothes Distribution → Image 2" },
  { page: "work", section: "old-clothes-distribution", slot: 2, label: "Work → Old Clothes Distribution → Image 3" },

  { page: "work", section: "food-drive", slot: 0, label: "Work → Food Drive → Image 1" },
  { page: "work", section: "food-drive", slot: 1, label: "Work → Food Drive → Image 2" },
  { page: "work", section: "food-drive", slot: 2, label: "Work → Food Drive → Image 3" },

  // ─── Initiative Detail Pages (5 pages × 3 slots = 15) ───
  { page: "initiative", section: "sanitary-pad-initiative", slot: 0, label: "Initiatives → Sanitary Pad Initiative → Image 1" },
  { page: "initiative", section: "sanitary-pad-initiative", slot: 1, label: "Initiatives → Sanitary Pad Initiative → Image 2" },
  { page: "initiative", section: "sanitary-pad-initiative", slot: 2, label: "Initiatives → Sanitary Pad Initiative → Image 3" },

  { page: "initiative", section: "go-for-sangam", slot: 0, label: "Initiatives → Go For Sangam → Image 1" },
  { page: "initiative", section: "go-for-sangam", slot: 1, label: "Initiatives → Go For Sangam → Image 2" },
  { page: "initiative", section: "go-for-sangam", slot: 2, label: "Initiatives → Go For Sangam → Image 3" },

  { page: "initiative", section: "blood-donation-drive", slot: 0, label: "Initiatives → Blood Donation Drive → Image 1" },
  { page: "initiative", section: "blood-donation-drive", slot: 1, label: "Initiatives → Blood Donation Drive → Image 2" },
  { page: "initiative", section: "blood-donation-drive", slot: 2, label: "Initiatives → Blood Donation Drive → Image 3" },

  { page: "initiative", section: "tree-plantation-drive", slot: 0, label: "Initiatives → Tree Plantation Drive → Image 1" },
  { page: "initiative", section: "tree-plantation-drive", slot: 1, label: "Initiatives → Tree Plantation Drive → Image 2" },
  { page: "initiative", section: "tree-plantation-drive", slot: 2, label: "Initiatives → Tree Plantation Drive → Image 3" },

  { page: "initiative", section: "winter-blanket-distribution", slot: 0, label: "Initiatives → Winter Blanket Distribution → Image 1" },
  { page: "initiative", section: "winter-blanket-distribution", slot: 1, label: "Initiatives → Winter Blanket Distribution → Image 2" },
  { page: "initiative", section: "winter-blanket-distribution", slot: 2, label: "Initiatives → Winter Blanket Distribution → Image 3" },

  // ─── About Page (2 sections × 3 slots = 6) ───
  { page: "about", section: "volunteers", slot: 0, label: "About → Our Volunteers → Image 1" },
  { page: "about", section: "volunteers", slot: 1, label: "About → Our Volunteers → Image 2" },
  { page: "about", section: "volunteers", slot: 2, label: "About → Our Volunteers → Image 3" },

  { page: "about", section: "team", slot: 0, label: "About → Meet Our Team → Image 1" },
  { page: "about", section: "team", slot: 1, label: "About → Meet Our Team → Image 2" },
  { page: "about", section: "team", slot: 2, label: "About → Meet Our Team → Image 3" },

  // ─── Partner Detail Pages (5 pages × 3 slots = 15) ───
  { page: "partner", section: "shuruat-ek-jyoti-shiksha-ki", slot: 0, label: "Partners → Shuruat ek Jyoti Shiksha ki → Image 1" },
  { page: "partner", section: "shuruat-ek-jyoti-shiksha-ki", slot: 1, label: "Partners → Shuruat ek Jyoti Shiksha ki → Image 2" },
  { page: "partner", section: "shuruat-ek-jyoti-shiksha-ki", slot: 2, label: "Partners → Shuruat ek Jyoti Shiksha ki → Image 3" },

  { page: "partner", section: "adharshila-vridhaashram", slot: 0, label: "Partners → Adharshila Vridhaashram → Image 1" },
  { page: "partner", section: "adharshila-vridhaashram", slot: 1, label: "Partners → Adharshila Vridhaashram → Image 2" },
  { page: "partner", section: "adharshila-vridhaashram", slot: 2, label: "Partners → Adharshila Vridhaashram → Image 3" },

  { page: "partner", section: "the-earth-modifications-team", slot: 0, label: "Partners → The Earth Modifications Team → Image 1" },
  { page: "partner", section: "the-earth-modifications-team", slot: 1, label: "Partners → The Earth Modifications Team → Image 2" },
  { page: "partner", section: "the-earth-modifications-team", slot: 2, label: "Partners → The Earth Modifications Team → Image 3" },

  { page: "partner", section: "kedarsut-foundation", slot: 0, label: "Partners → Kedarsut Foundation → Image 1" },
  { page: "partner", section: "kedarsut-foundation", slot: 1, label: "Partners → Kedarsut Foundation → Image 2" },
  { page: "partner", section: "kedarsut-foundation", slot: 2, label: "Partners → Kedarsut Foundation → Image 3" },

  { page: "partner", section: "miopass-charitable-and-welfare-foundation", slot: 0, label: "Partners → Miopass Charitable → Image 1" },
  { page: "partner", section: "miopass-charitable-and-welfare-foundation", slot: 1, label: "Partners → Miopass Charitable → Image 2" },
  { page: "partner", section: "miopass-charitable-and-welfare-foundation", slot: 2, label: "Partners → Miopass Charitable → Image 3" },
];

/** Build a placement key from parts */
export const makePlacementKey = (page, section, slot) => `${page}:${section}:${slot}`;

/** Get label for a placement key */
export const getSlotLabel = (placementKey) => {
  const slot = IMAGE_SLOTS.find(
    s => makePlacementKey(s.page, s.section, s.slot) === placementKey
  );
  return slot?.label || placementKey;
};

/** Get all pages (unique) */
export const getPages = () => {
  const pages = [...new Set(IMAGE_SLOTS.map(s => s.page))];
  return pages.map(p => ({
    value: p,
    label: p === 'work' ? 'Work Pages' :
           p === 'initiative' ? 'Initiative Pages' :
           p === 'about' ? 'About Page' :
           p === 'partner' ? 'Partner Pages' : p,
  }));
};

/** Get sections for a page */
export const getSections = (page) => {
  const sections = [...new Set(IMAGE_SLOTS.filter(s => s.page === page).map(s => s.section))];
  return sections.map(sec => ({
    value: sec,
    label: sec.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  }));
};

/** Get slots for a page+section */
export const getSlots = (page, section) => {
  return IMAGE_SLOTS.filter(s => s.page === page && s.section === section);
};
