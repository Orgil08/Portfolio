/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  url: string;
  tags: string[];
  description: string;
  features: string[];
  techStack: {
    frontend: string[];
    styling: string[];
    features: string[];
  };
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; experience: string }[];
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormState, string>>;
}

/**
 * Validates a single contact form field with clear Mongolian error messages.
 */
export function validateContactField(
  name: keyof ContactFormState,
  value: string
): string | null {
  const trimmed = value.trim();

  switch (name) {
    case 'name':
      if (!trimmed) return 'Нэрээ оруулна уу.';
      if (trimmed.length < 2) return 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.';
      return null;

    case 'email': {
      if (!trimmed) return 'И-мэйл хаягаа оруулна уу.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return 'Зөв и-мэйл хаяг оруулна уу (жишээ: example@domain.com).';
      }
      return null;
    }

    case 'subject':
      if (!trimmed) return 'Гарчиг оруулна уу.';
      if (trimmed.length < 3) return 'Гарчиг дор хаяж 3 тэмдэгттэй байх ёстой.';
      return null;

    case 'message':
      if (!trimmed) return 'Зурвасаа бичнэ үү.';
      if (trimmed.length < 10) return 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой.';
      return null;

    default:
      return null;
  }
}

/**
 * Validates the contact form inputs with strict checks and Mongolian error messages.
 */
export function validateContactForm(data: ContactFormState): ValidationResult {
  const errors: Partial<Record<keyof ContactFormState, string>> = {};

  const nameError = validateContactField('name', data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateContactField('email', data.email);
  if (emailError) errors.email = emailError;

  const subjectError = validateContactField('subject', data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateContactField('message', data.message);
  if (messageError) errors.message = messageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Filter projects by category or search term with Mongolian stem/token tolerance
 */
export function filterProjects(
  projects: ProjectData[],
  selectedCategory: string,
  searchQuery: string
): ProjectData[] {
  const rawQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'Бүгд' || project.category === selectedCategory;

    if (!matchesCategory) return false;
    if (!rawQuery) return true;

    // Search query tokens
    const tokens = rawQuery.split(/\s+/).filter(Boolean);

    // Collect all searchable text
    const searchableText = [
      project.title,
      project.subtitle,
      project.description,
      project.category,
      ...project.tags,
      ...project.features,
    ]
      .join(' ')
      .toLowerCase();

    // Mongolian common root stems: 'эмнэлэг' -> 'эмнэлг'
    const normalizeMongolianStem = (word: string) => {
      return word
        .replace(/эг$/, 'г')
        .replace(/өг$/, 'г')
        .replace(/аг$/, 'г')
        .replace(/ийн$|ын$|ны$|ний$|д$|т$|тай$|тэй$|той$|аар$|ээр$|оор$|өөр$/, '');
    };

    return tokens.every((token) => {
      if (searchableText.includes(token)) return true;
      const stem = normalizeMongolianStem(token);
      if (stem.length >= 3 && searchableText.includes(stem)) return true;
      return false;
    });
  });
}

/**
 * Calculates average skill proficiency across all categories
 */
export function calculateAverageSkill(categories: SkillCategory[]): number {
  let totalLevel = 0;
  let count = 0;

  for (const cat of categories) {
    for (const skill of cat.skills) {
      totalLevel += skill.level;
      count += 1;
    }
  }

  return count > 0 ? Math.round(totalLevel / count) : 0;
}

/**
 * Calculates clamped scroll progress (0 to 1) given current scroll position and total scrollable height.
 */
export function calculateScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 0) return 0;
  const progress = scrollTop / maxScroll;
  return Math.min(Math.max(progress, 0), 1);
}

export interface ContactAvailability {
  workDays: string;
  hours: string;
  timezone: string;
  responseTime: string;
  urgentChannel: string;
}

export const CONTACT_AVAILABILITY: ContactAvailability = {
  workDays: 'Даваа — Баасан',
  hours: '09:00 — 19:00',
  timezone: 'Улаанбаатарын цаг (UTC+8)',
  responseTime: '2–6 цагийн дотор (дээд тал нь 24 цаг)',
  urgentChannel: 'Telegram (@munkhorgil)',
};

/**
 * Formats contact availability summary into a clear Mongolian string
 */
export function formatAvailabilitySummary(info: ContactAvailability): string {
  return `${info.workDays}: ${info.hours} (${info.timezone}). Хариу өгөх хугацаа: ${info.responseTime}.`;
}
