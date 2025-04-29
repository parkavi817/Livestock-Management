export type Language = 'english' | 'hindi' | 'assamese';

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  breed: string;
  birthDate: string;
  gender: 'male' | 'female';
  imageUrl?: string;
  notes?: string;
  tagNumber?: string;
  weight?: number;
  purchaseDate?: string;
  purchasePrice?: number;
}

export type AnimalType = 'cow' | 'goat' | 'sheep' | 'chicken' | 'duck' | 'pig' | 'buffalo' | 'other';

export interface HealthRecord {
  id: string;
  animalId: string;
  date: string;
  type: 'vaccination' | 'deworming' | 'treatment' | 'checkup';
  description: string;
  medicine?: string;
  dosage?: string;
  veterinarian?: string;
  cost?: number;
  nextScheduledDate?: string;
}

export interface BreedingRecord {
  id: string;
  femaleAnimalId: string;
  maleAnimalId?: string;
  date: string;
  method: 'natural' | 'artificial';
  notes?: string;
  expectedDueDate?: string;
  actualBirthDate?: string;
  offspringCount?: number;
  successStatus?: 'pending' | 'successful' | 'unsuccessful';
}

export interface ProductionRecord {
  id: string;
  animalId: string;
  date: string;
  type: 'milk' | 'eggs' | 'weight';
  quantity: number;
  notes?: string;
}

export interface MarketPrice {
  id: string;
  item: string;
  price: number;
  unit: string;
  location: string;
  date: string;
}

export interface DiseaseGuide {
  id: string;
  name: string;
  animalTypes: AnimalType[];
  symptoms: string[];
  treatment: string;
  prevention: string;
  emergencyCare?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: 'feeding' | 'shelter' | 'hygiene' | 'breeding' | 'health' | 'general';
  animalTypes: AnimalType[];
  imageUrl?: string;
  language: Language;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'vaccination' | 'breeding' | 'health' | 'general';
  status: 'pending' | 'done' | 'snoozed';
  relatedId?: string; // could be animalId, healthRecordId, etc.
}

export interface AppState {
  language: Language;
  animals: Animal[];
  healthRecords: HealthRecord[];
  breedingRecords: BreedingRecord[];
  productionRecords: ProductionRecord[];
  marketPrices: MarketPrice[];
  diseaseGuides: DiseaseGuide[];
  knowledgeArticles: KnowledgeArticle[];
  notifications: Notification[];
}