/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectData, SkillCategory } from '../utils/portfolio.ts';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
}

export const PERSONAL_INFO = {
  name: 'Сүхбат Мөнх-Оргил',
  age: 21,
  role: 'Full-Stack хөгжүүлэгч',
  educationSummary: 'МУИС (2023 — 2027) · Программ хангамж, 4-р курс',
  graduationDate: '4-р курсийн хавар (2027 он)',
  trainingSummary: 'Indra Institute — Full-Stack хөгжүүлэлт',
  certSummary: 'Coursera — Front-End Development, UI/UX Design',
  heroHeading: 'Санааг бодит дижитал шийдэл болгоно.',
  heroSubtitle:
    'Би Сүхбат Мөнх-Оргил. Орчин үеийн веб систем бүтээх, хэрэглэгчдэд ээлтэй интерфейс хөгжүүлэх, технологиор бодит асуудлыг шийдвэрлэхэд суралцаж, ажиллаж байна.',
  bio: [
    'Би Монгол Улсын Их Сургуульд программ хангамжийн чиглэлээр 4-р курст (2023 — 2027) суралцаж байгаа бөгөөд энэ хавар төгсөнө.',
    'Indra Institute-д Full-Stack чиглэлээр практик сургалт дүүргэж, Coursera дээр Front-End Development болон UI/UX Design сургалтуудыг судалсан.',
    'Хэрэглэхэд хялбар, цэгцтэй интерфейс болон найдвартай ажиллагаатай веб систем бүтээхэд анхаардаг.',
  ],
  contacts: {
    email: 'orgio1298@gmail.com',
    phone: '+976 9988-XXXX',
    location: 'Улаанбаатар хот',
    github: 'https://github.com/munkh-orgil',
    telegram: 'https://t.me/munkhorgil',
    linkedin: 'https://linkedin.com/in/munkhorgil',
  },
  stats: [
    { label: 'Боловсрол', value: 'МУИС 4-р курс', note: '2023 — 2027 · Хавар төгсөнө' },
    { label: 'Веб төсөл', value: '3 төсөл', note: 'Vercel дээр ажиллаж буй' },
    { label: 'Сургалт', value: 'Indra Institute', note: 'Full-Stack хөгжүүлэлт' },
    { label: 'Нас', value: '21 нас', note: 'Улаанбаатар' },
  ],
};

export const PROJECTS: ProjectData[] = [
  {
    id: 'labsmart',
    title: 'LabSmart',
    subtitle: 'Лабораторийн тоног төхөөрөмжийн удирдлагын систем',
    category: 'Систем',
    url: 'https://lab-smart-chi.vercel.app/',
    featured: true,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Удирдлагын систем', 'Dashboard'],
    description:
      'Лабораторийн багаж, тоног төхөөрөмжийн ашиглалтын хуваарь, захиалга, тогтмол засвар үйлчилгээний төлөв байдлыг зохион байгуулах веб систем.',
    features: [
      'Тоног төхөөрөмжийн ажиллах төлөв, бэлэн байдлын хяналтын самбар',
      'Ашиглалтын цаг товлох, урьдчилсан захиалгын систем',
      'Засвар, шалгалт тохируулгын сануулга бүртгэл',
      'Төхөөрөмжүүдийн байршил, төрлөөр шүүх хайлт',
      'Ашиглалтын тайлан, статистикийн график',
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Vite'],
      styling: ['Tailwind CSS', 'Dark Surface UI'],
      features: ['State Management', 'Data Tables', 'Chart Viz'],
    },
  },
  {
    id: 'medclinic',
    title: 'Med Clinic',
    subtitle: 'Эмнэлгийн үйлчилгээний веб сайт',
    category: 'Эрүүл мэнд',
    url: 'https://med-clinic-tixw-git-main-munkh-orgils-projects-d8c1db15.vercel.app/',
    featured: true,
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Эмнэлэг', 'Цаг захиалга', 'UI/UX'],
    description:
      'Эмнэлгийн нарийн мэргэжлийн эмч нарын хуваарь харах, үзлэгийн цаг цахимаар захиалах, үйлчилгээний мэдээлэл авах боломжтой веб шийдэл.',
    features: [
      'Эмчийн үзлэгийн цаг захиалах интерактив урсгал',
      'Мэргэжлийн эмч нарын танилцуулга, ажиллах хуваарь',
      'Багц шинжилгээ, оношилгооны үйлчилгээний цэс',
      'Бүх төхөөрөмжид тохирсон responsive загвар',
      'Шуурхай холбоо барих, цаг авах холбоос',
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Next.js'],
      styling: ['Tailwind CSS', 'Clean UI'],
      features: ['Appointment Booking', 'Filter', 'Modals'],
    },
  },
  {
    id: 'vibemedia',
    title: 'Vibe Media',
    subtitle: 'Веб төсөл',
    category: 'Креатив медиа',
    url: 'https://vibe-media-eosin.vercel.app/',
    featured: true,
    tags: ['React', 'Tailwind CSS', 'Creative Media', 'Дижитал маркетинг', 'Портфолио'],
    description:
      'Контент бүтээгчид болон сошиал медиа маркетингийн студиудад зориулсан загварлаг, дижитал бүтээгдэхүүнээ харуулах бүтээлч веб шийдэл.',
    features: [
      'Бараан дэвсгэр, өвөрмөц өнгө аястай креатив дизайн',
      'Видео болон мультимедиа бүтээлүүдийн үзүүлэн',
      'Маркетингийн үйлчилгээ, хамтын ажиллагааны урсгал',
      'Хүсэлт илгээх шуурхай маягт',
      'Хурдан ажиллагаатай, хөнгөн бүтэц',
    ],
    techStack: {
      frontend: ['React', 'Vite', 'JavaScript'],
      styling: ['Tailwind CSS', 'Gradients'],
      features: ['Showcase Grid', 'Inquiry Flow'],
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'code',
    skills: [
      { name: 'React', level: 90, experience: '3 жил' },
      { name: 'TypeScript', level: 85, experience: '2 жил' },
      { name: 'JavaScript', level: 90, experience: '3 жил' },
      { name: 'Next.js', level: 80, experience: '1.5 жил' },
      { name: 'Tailwind CSS', level: 92, experience: '3 жил' },
      { name: 'HTML5 & CSS3', level: 95, experience: '3 жил' },
      { name: 'Three.js & 3D Web', level: 75, experience: '1 жил' },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Node.js', level: 82, experience: '2 жил' },
      { name: 'Express', level: 84, experience: '2 жил' },
      { name: 'RESTful API', level: 86, experience: '2 жил' },
      { name: 'PostgreSQL', level: 78, experience: '1.5 жил' },
      { name: 'MongoDB', level: 80, experience: '2 жил' },
      { name: 'Firebase', level: 82, experience: '2 жил' },
    ],
  },
  {
    title: 'UI/UX Дизайн',
    icon: 'layout',
    skills: [
      { name: 'Figma', level: 88, experience: '2 жил' },
      { name: 'Хэрэглэгчийн судалгаа', level: 82, experience: '2 жил' },
      { name: 'Wireframing & Prototype', level: 86, experience: '2 жил' },
      { name: 'Responsive Design', level: 92, experience: '3 жил' },
    ],
  },
  {
    title: 'Хэрэгслүүд',
    icon: 'tool',
    skills: [
      { name: 'Git & GitHub', level: 90, experience: '3 жил' },
      { name: 'Vercel', level: 88, experience: '2 жил' },
      { name: 'VS Code', level: 94, experience: '3 жил' },
      { name: 'Postman', level: 85, experience: '2 жил' },
      { name: 'Linux', level: 78, experience: '2 жил' },
    ],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'num',
    institution: 'Монгол Улсын Их Сургууль (МУИС)',
    degree: 'Программ хангамжийн инженерчлэл — Бакалавр',
    period: '2023 — 2027',
    status: '4-р курс · Хавар төгсөнө',
    description:
      'Программ хангамжийн чиглэлээр суралцаж байгаа. Суралцах хугацаандаа алгоритм, өгөгдлийн сан, веб хөгжүүлэлтийн талаар судалж, мэдсэн зүйлсээ төсөл дээр туршиж хэрэгжүүлдэг.',
    highlights: [
      'Өгөгдлийн бүтэц, алгоритм',
      'Өгөгдлийн сантай ажиллах',
      'Веб систем хөгжүүлэх',
      'Программ хангамж боловсруулах',
    ],
  },
  {
    id: 'indra',
    institution: 'Indra Institute',
    degree: 'Full-Stack хөгжүүлэлтийн сургалт',
    period: 'Мэргэжлийн сургалт',
    status: 'Төгссөн',
    description:
      'Indra Institute-д Full-Stack хөгжүүлэлтээр суралцаж, веб сайтын урд болон арын хэсгийг хэрхэн хийх талаар мэдлэг, дадлага эзэмшсэн. React, Node.js болон өгөгдлийн сантай ажиллаж үзсэн.',
    highlights: [
      'React болон Node.js ашиглах',
      'REST API хөгжүүлэх, холбох',
      'Өгөгдлийн сантай ажиллах',
      'Git болон Vercel ашиглах',
    ],
  },
  {
    id: 'coursera',
    institution: 'Coursera',
    degree: 'Front-End Development & UI/UX Design',
    period: 'Сертификаттай сургалтууд',
    status: 'Сертификаттай',
    description:
      'Coursera-гаар Front-End Development болон UI/UX Design чиглэлээр суралцсан. Веб интерфейс хийх, дизайныг зөв зохион байгуулах, хэрэглэгчид ойлгомжтой, хэрэглэхэд хялбар байлгах талаар сурсан.',
    highlights: [
      'React болон JavaScript ашиглан веб хөгжүүлэх',
      'Figma дээр интерфейсийн загвар гаргах',
      'Хэрэглэгчийн хэрэгцээнд нийцсэн дизайн хийх',
      'Вебийн харагдах байдал, хэрэглээг сайжруулах',
    ],
  },
];
