import { Language } from '../types';

type TranslationKey = 
  | 'common.dashboard'
  | 'common.animals'
  | 'common.health'
  | 'common.breeding'
  | 'common.production'
  | 'common.knowledge'
  | 'common.market'
  | 'common.settings'
  | 'common.notifications'
  | 'common.search'
  | 'common.filter'
  | 'common.all'
  | 'common.done'
  | 'common.pending'
  | 'common.cancel'
  | 'common.save'
  | 'common.edit'
  | 'common.delete'
  | 'common.view'
  | 'animals.total'
  | 'animals.male'
  | 'animals.female'
  | 'animals.addNew'
  | 'health.vaccination'
  | 'health.treatment'
  | 'health.checkup'
  | 'breeding.guide'
  | 'breeding.signs'
  | 'breeding.timing'
  | 'breeding.methods'
  | 'market.prices'
  | 'market.update'
  | 'settings.language'
  | 'settings.notifications'
  | 'settings.profile';

type Translations = {
  [key in TranslationKey]: string;
};

const translations: Record<Language, Translations> = {
  english: {
    'common.dashboard': 'Dashboard',
    'common.animals': 'Animals',
    'common.health': 'Health',
    'common.breeding': 'Breeding',
    'common.production': 'Production',
    'common.knowledge': 'Knowledge',
    'common.market': 'Market',
    'common.settings': 'Settings',
    'common.notifications': 'Notifications',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.done': 'Done',
    'common.pending': 'Pending',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'animals.total': 'Total Animals',
    'animals.male': 'Male',
    'animals.female': 'Female',
    'animals.addNew': 'Add Animal',
    'health.vaccination': 'Vaccination',
    'health.treatment': 'Treatment',
    'health.checkup': 'Check-up',
    'breeding.guide': 'Breeding Guide',
    'breeding.signs': 'Signs of Heat',
    'breeding.timing': 'Optimal Timing',
    'breeding.methods': 'Breeding Methods',
    'market.prices': 'Market Prices',
    'market.update': 'Update Prices',
    'settings.language': 'Language Settings',
    'settings.notifications': 'Notification Settings',
    'settings.profile': 'Profile Settings'
  },
  hindi: {
    'common.dashboard': 'डैशबोर्ड',
    'common.animals': 'पशु',
    'common.health': 'स्वास्थ्य',
    'common.breeding': 'प्रजनन',
    'common.production': 'उत्पादन',
    'common.knowledge': 'ज्ञान',
    'common.market': 'बाज़ार',
    'common.settings': 'सेटिंग्स',
    'common.notifications': 'सूचनाएं',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.all': 'सभी',
    'common.done': 'पूर्ण',
    'common.pending': 'लंबित',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'animals.total': 'कुल पशु',
    'animals.male': 'नर',
    'animals.female': 'मादा',
    'animals.addNew': 'नया पशु जोड़ें',
    'health.vaccination': 'टीकाकरण',
    'health.treatment': 'उपचार',
    'health.checkup': 'जांच',
    'breeding.guide': 'प्रजनन मार्गदर्शिका',
    'breeding.signs': 'गर्मी के लक्षण',
    'breeding.timing': 'सर्वोत्तम समय',
    'breeding.methods': 'प्रजनन विधियां',
    'market.prices': 'बाज़ार भाव',
    'market.update': 'मूल्य अपडेट करें',
    'settings.language': 'भाषा सेटिंग्स',
    'settings.notifications': 'सूचना सेटिंग्स',
    'settings.profile': 'प्रोफ़ाइल सेटिंग्स'
  },
  assamese: {
    'common.dashboard': "ডেশ্বব'ৰ্ড",
    'common.animals': 'পশু',
    'common.health': 'স্বাস্থ্য',
    'common.breeding': 'প্ৰজনন',
    'common.production': 'উৎপাদন',
    'common.knowledge': 'জ্ঞান',
    'common.market': 'বজাৰ',
    'common.settings': 'ছেটিংছ',
    'common.notifications': 'জাননী',
    'common.search': 'সন্ধান',
    'common.filter': 'ফিল্টাৰ',
    'common.all': 'সকলো',
    'common.done': 'সম্পন্ন',
    'common.pending': 'বাকী',
    'common.cancel': 'বাতিল',
    'common.save': 'সংৰক্ষণ',
    'common.edit': 'সম্পাদনা',
    'common.delete': 'মচক',
    'common.view': 'চাওক',
    'animals.total': 'মুঠ পশু',
    'animals.male': 'মতা',
    'animals.female': 'মাইকী',
    'animals.addNew': 'নতুন পশু যোগ',
    'health.vaccination': 'টীকাকৰণ',
    'health.treatment': 'চিকিৎসা',
    'health.checkup': 'পৰীক্ষা',
    'breeding.guide': 'প্ৰজনন নিৰ্দেশিকা',
    'breeding.signs': 'গৰম চিন',
    'breeding.timing': 'উত্তম সময়',
    'breeding.methods': 'প্ৰজনন পদ্ধতি',
    'market.prices': 'বজাৰ দাম',
    'market.update': 'দাম আপডেট',
    'settings.language': 'ভাষা ছেটিংছ',
    'settings.notifications': 'জাননী ছেটিংছ',
    'settings.profile': "প্ৰ'ফাইল ছেটিংছ"
  }
};

export const useTranslation = (language: Language) => {
  return (key: TranslationKey): string => {
    return translations[language][key] || key;
  };
};