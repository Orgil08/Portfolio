/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  validateContactField,
  filterProjects,
  calculateAverageSkill,
  calculateScrollProgress,
  formatAvailabilitySummary,
  CONTACT_AVAILABILITY,
  ProjectData,
  SkillCategory,
} from './portfolio.ts';

test('validateContactForm rejects empty fields', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, 'Нэрээ оруулна уу.');
  assert.equal(result.errors.email, 'И-мэйл хаягаа оруулна уу.');
  assert.equal(result.errors.subject, 'Гарчиг оруулна уу.');
  assert.equal(result.errors.message, 'Зурвасаа бичнэ үү.');
});

test('validateContactForm validates invalid email and short text', () => {
  const result = validateContactForm({
    name: 'A',
    email: 'notanemail',
    subject: 'Hi',
    message: 'Short',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.');
  assert.equal(result.errors.email, 'Зөв и-мэйл хаяг оруулна уу (жишээ: example@domain.com).');
  assert.equal(result.errors.subject, 'Гарчиг дор хаяж 3 тэмдэгттэй байх ёстой.');
  assert.equal(result.errors.message, 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой.');
});

test('validateContactForm accepts valid Mongolian form data', () => {
  const result = validateContactForm({
    name: 'Сүхбат Мөнх-Оргил',
    email: 'orgio1298@gmail.com',
    subject: 'Вэб хөгжүүлэлтийн хамтын ажиллагаа',
    message: 'Сайн байна уу, шинэ төсөл дээр хамтран ажиллах хүсэлтэй байна.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateContactField validates email format and individual fields correctly', () => {
  // Email checks
  assert.equal(validateContactField('email', ''), 'И-мэйл хаягаа оруулна уу.');
  assert.equal(validateContactField('email', 'plainaddress'), 'Зөв и-мэйл хаяг оруулна уу (жишээ: example@domain.com).');
  assert.equal(validateContactField('email', '@missinguser.com'), 'Зөв и-мэйл хаяг оруулна уу (жишээ: example@domain.com).');
  assert.equal(validateContactField('email', 'user@domain'), 'Зөв и-мэйл хаяг оруулна уу (жишээ: example@domain.com).');
  assert.equal(validateContactField('email', 'orgio1298@gmail.com'), null);
  assert.equal(validateContactField('email', 'contact@num.edu.mn'), null);

  // Name checks
  assert.equal(validateContactField('name', ''), 'Нэрээ оруулна уу.');
  assert.equal(validateContactField('name', 'С'), 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.');
  assert.equal(validateContactField('name', 'Сүхбат'), null);

  // Subject checks
  assert.equal(validateContactField('subject', ''), 'Гарчиг оруулна уу.');
  assert.equal(validateContactField('subject', 'Са'), 'Гарчиг дор хаяж 3 тэмдэгттэй байх ёстой.');
  assert.equal(validateContactField('subject', 'Төслийн санал'), null);

  // Message checks
  assert.equal(validateContactField('message', ''), 'Зурвасаа бичнэ үү.');
  assert.equal(validateContactField('message', 'Богино'), 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой.');
  assert.equal(validateContactField('message', 'Энэ бол 10-аас дээш тэмдэгттэй зурвас.'), null);
});

test('filterProjects handles category filtering and search queries', () => {
  const mockProjects: ProjectData[] = [
    {
      id: 'labsmart',
      title: 'LabSmart',
      subtitle: 'Лабораторийн тоног төхөөрөмжийн удирдлагын систем',
      category: 'Систем',
      url: 'https://lab-smart-chi.vercel.app/',
      tags: ['React', 'TypeScript', 'Dashboard'],
      description: 'Лабораторийн тоног төхөөрөмжийн удирдлага',
      features: ['Хуваарь', 'Хяналт'],
      techStack: { frontend: ['React'], styling: ['Tailwind'], features: ['Auth'] },
    },
    {
      id: 'medclinic',
      title: 'Med Clinic',
      subtitle: 'Эмнэлгийн үйлчилгээний веб сайт',
      category: 'Эрүүл мэнд',
      url: 'https://med-clinic-tixw-git-main-munkh-orgils-projects-d8c1db15.vercel.app/',
      tags: ['React', 'Next.js', 'UI/UX'],
      description: 'Эмнэлгийн цаг захиалга',
      features: ['Цаг авах', 'Эмчийн мэдээлэл'],
      techStack: { frontend: ['React'], styling: ['Tailwind'], features: ['Booking'] },
    },
  ];

  // All category
  const all = filterProjects(mockProjects, 'Бүгд', '');
  assert.equal(all.length, 2);

  // Category filter
  const systems = filterProjects(mockProjects, 'Систем', '');
  assert.equal(systems.length, 1);
  assert.equal(systems[0].id, 'labsmart');

  // Search filter
  const searchClinic = filterProjects(mockProjects, 'Бүгд', 'эмнэлэг');
  assert.equal(searchClinic.length, 1);
  assert.equal(searchClinic[0].id, 'medclinic');
});

test('calculateAverageSkill computes accurate average percentage', () => {
  const mockCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'code',
      skills: [
        { name: 'React', level: 90, experience: '3 жил' },
        { name: 'TypeScript', level: 85, experience: '2 жил' },
      ],
    },
    {
      title: 'Backend',
      icon: 'server',
      skills: [
        { name: 'Node.js', level: 80, experience: '2 жил' },
        { name: 'Express', level: 85, experience: '2 жил' },
      ],
    },
  ];

  // (90 + 85 + 80 + 85) / 4 = 340 / 4 = 85
  const avg = calculateAverageSkill(mockCategories);
  assert.equal(avg, 85);
});

test('calculateScrollProgress accurately clamps and scales scroll depth', () => {
  // Top of page
  assert.equal(calculateScrollProgress(0, 2000, 1000), 0);

  // Halfway through
  assert.equal(calculateScrollProgress(500, 2000, 1000), 0.5);

  // Bottom of page
  assert.equal(calculateScrollProgress(1000, 2000, 1000), 1);

  // Clamps negative overscroll (elastic bounce on iOS/macOS)
  assert.equal(calculateScrollProgress(-50, 2000, 1000), 0);

  // Clamps bottom overscroll
  assert.equal(calculateScrollProgress(1200, 2000, 1000), 1);

  // Non-scrollable page (scrollHeight <= clientHeight)
  assert.equal(calculateScrollProgress(0, 800, 1000), 0);
  assert.equal(calculateScrollProgress(0, 1000, 1000), 0);
});

test('formatAvailabilitySummary formats Mongolian contact availability string correctly', () => {
  const summary = formatAvailabilitySummary(CONTACT_AVAILABILITY);
  assert.match(summary, /Даваа — Баасан/);
  assert.match(summary, /09:00 — 19:00/);
  assert.match(summary, /Улаанбаатарын цаг/);
  assert.match(summary, /2–6 цагийн дотор/);
});
