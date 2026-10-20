export const company = {
  name: '[COMPANY NAME]',
  phoneDisplay: '[PHONE NUMBER]',
  phoneRaw: '[PHONE RAW]',
  email: 'bleronbiggie@gmail.com',
  location: 'Calgary, Alberta',
  businessHours: '[BUSINESS HOURS]',
  yearsExperience: null as number | null,
  projectsCompleted: null as number | null,
  serviceAreas: ['Calgary', '[AREA 1]', '[AREA 2]', '[AREA 3]', '[AREA 4]'],
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
  },
  siteUrl: 'https://calgary-craft-workmanship.wryaphid128.chatgpt.site',
};

export const hasConfiguredValue = (value: string) =>
  Boolean(value.trim()) && !/^\[[^\]]+\]$/.test(value.trim());

export const phoneHref = (scheme: 'tel' | 'sms') =>
  hasConfiguredValue(company.phoneRaw)
    ? `${scheme}:${company.phoneRaw.replace(/[^+\d]/g, '')}`
    : undefined;
