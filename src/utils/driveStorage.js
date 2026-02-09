const DRIVES_KEY = "arv_published_drives";
const DISMISSED_KEY = "arv_drive_dismissed";

// All drive type categories from Work + Initiatives pages
export const DRIVE_CATEGORIES = [
  // From Work page
  "Orphanage Support",
  "Old Age Home",
  "Slum Area Development",
  "Environment Protection",
  "Education",
  "Health Camp",
  "Old Clothes Distribution",
  "Food Drive",
  "Women Empowerment",
  "Skill Development",
  // From Initiatives page
  "Sanitary Pad Initiative",
  "Go For Sangam",
  "Blood Donation Drive",
  "Tree Plantation Drive",
  "Winter Blanket Distribution",
];

/** Get all published drives */
export const getDrives = () => {
  try {
    const raw = localStorage.getItem(DRIVES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/** Save a new drive (admin publishes) */
export const publishDrive = (drive) => {
  const drives = getDrives();
  const newDrive = {
    ...drive,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString(),
    active: true,
  };
  drives.unshift(newDrive); // newest first
  localStorage.setItem(DRIVES_KEY, JSON.stringify(drives));
  return newDrive;
};

/** Delete a drive by id */
export const deleteDrive = (id) => {
  const drives = getDrives().filter((d) => d.id !== id);
  localStorage.setItem(DRIVES_KEY, JSON.stringify(drives));
};

/** Toggle active status */
export const toggleDriveActive = (id) => {
  const drives = getDrives().map((d) =>
    d.id === id ? { ...d, active: !d.active } : d
  );
  localStorage.setItem(DRIVES_KEY, JSON.stringify(drives));
};

/** Get the latest active drive (for home page popup) */
export const getLatestActiveDrive = () => {
  return getDrives().find((d) => d.active) || null;
};

/** Check if user already dismissed the current popup this session */
export const isDriveDismissed = (driveId) => {
  return sessionStorage.getItem(DISMISSED_KEY) === driveId;
};

/** Mark the drive popup as dismissed for this session */
export const dismissDrive = (driveId) => {
  sessionStorage.setItem(DISMISSED_KEY, driveId);
};
