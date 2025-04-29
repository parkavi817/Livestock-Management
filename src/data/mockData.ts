import { 
  Animal, 
  HealthRecord, 
  BreedingRecord, 
  ProductionRecord, 
  MarketPrice, 
  DiseaseGuide, 
  KnowledgeArticle, 
  Notification, 
  AppState 
} from '../types';

// Mock Animals
const animals: Animal[] = [
  {
    id: '1',
    name: 'Lakshmi',
    type: 'cow',
    breed: 'Gir',
    birthDate: '2020-05-15',
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg',
    tagNumber: 'C001',
    weight: 450,
    purchaseDate: '2021-01-10',
    purchasePrice: 45000,
    notes: 'Good milk producer'
  },
  {
    id: '2',
    name: 'Kalu',
    type: 'goat',
    breed: 'Black Bengal',
    birthDate: '2022-03-12',
    gender: 'male',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Black_Bengal_Goat_00812.JPG/500px-Black_Bengal_Goat_00812.JPG',
    tagNumber: 'G001',
    weight: 25,
    purchaseDate: '2022-06-20',
    purchasePrice: 5000,
    notes: 'Breeding male'
  },
  {
    id: '3',
    name: 'Rani',
    type: 'buffalo',
    breed: 'Murrah',
    birthDate: '2019-09-22',
    gender: 'female',
    imageUrl: 'https://s.yimg.com/fz/api/res/1.2/mxGXGsHNiUtm6VzGA6SZLQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/bd7bed5e-d5e3-35e2-92dc-5d0d00645da9/t_500x300',
    tagNumber: 'B001',
    weight: 520,
    purchaseDate: '2020-11-05',
    purchasePrice: 65000,
    notes: 'High fat content in milk'
  },
  {
    id: '4',
    name: 'Raja',
    type: 'cow',
    breed: 'Sahiwal',
    birthDate: '2021-04-05',
    gender: 'male',
    imageUrl: 'https://s.yimg.com/fz/api/res/1.2/HyTF1JSbmnOJXp1qySjUwg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/f247e473-b88e-3a12-9eb2-937b1b90229a/t_500x300',
    tagNumber: 'C002',
    weight: 520,
    purchaseDate: '2022-01-15',
    purchasePrice: 55000,
    notes: 'Breeding bull'
  },
  {
    id: '5',
    name: 'Batch 1',
    type: 'chicken',
    breed: 'Broiler',
    birthDate: '2023-01-10',
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg',
    tagNumber: 'P001',
    weight: 2.5,
    purchaseDate: '2023-01-15',
    purchasePrice: 25000,
    notes: 'Batch of 50 egg layers'
  }
];

// Mock Health Records
const healthRecords: HealthRecord[] = [
  {
    id: '1',
    animalId: '1',
    date: '2023-01-15',
    type: 'vaccination',
    description: 'FMD Vaccination',
    medicine: 'FMD Vaccine',
    dosage: '5ml',
    veterinarian: 'Dr. Sharma',
    cost: 500,
    nextScheduledDate: '2023-07-15'
  },
  {
    id: '2',
    animalId: '1',
    date: '2023-02-20',
    type: 'deworming',
    description: 'Routine deworming',
    medicine: 'Albendazole',
    dosage: '10ml',
    cost: 300,
    nextScheduledDate: '2023-05-20'
  },
  {
    id: '3',
    animalId: '2',
    date: '2023-03-10',
    type: 'vaccination',
    description: 'PPR Vaccination',
    medicine: 'PPR Vaccine',
    dosage: '2ml',
    veterinarian: 'Dr. Patel',
    cost: 200,
    nextScheduledDate: '2024-03-10'
  },
  {
    id: '4',
    animalId: '5',
    date: '2023-01-20',
    type: 'vaccination',
    description: 'Newcastle Disease Vaccination',
    medicine: 'ND Vaccine',
    dosage: '0.5ml per bird',
    veterinarian: 'Dr. Kumar',
    cost: 1500,
    nextScheduledDate: '2023-04-20'
  }
];

// Mock Breeding Records
const breedingRecords: BreedingRecord[] = [
  {
    id: '1',
    femaleAnimalId: '1',
    maleAnimalId: '4',
    date: '2023-01-05',
    method: 'natural',
    notes: 'Observed mating',
    expectedDueDate: '2023-10-15',
    successStatus: 'pending'
  },
  {
    id: '2',
    femaleAnimalId: '3',
    date: '2022-11-10',
    method: 'artificial',
    notes: 'AI done by Dr. Reddy',
    expectedDueDate: '2023-08-20',
    successStatus: 'successful',
    actualBirthDate: '2023-08-18',
    offspringCount: 1
  }
];

// Mock Production Records
const productionRecords: ProductionRecord[] = [
  {
    id: '1',
    animalId: '1',
    date: '2023-04-28',
    type: 'milk',
    quantity: 12,
    notes: 'Morning and evening combined'
  },
  {
    id: '2',
    animalId: '1',
    date: '2023-04-29',
    type: 'milk',
    quantity: 11.5,
    notes: 'Morning and evening combined'
  },
  {
    id: '3',
    animalId: '3',
    date: '2023-04-28',
    type: 'milk',
    quantity: 16,
    notes: 'Morning and evening combined'
  },
  {
    id: '4',
    animalId: '5',
    date: '2023-04-28',
    type: 'eggs',
    quantity: 42,
    notes: 'Total batch production'
  }
];

// Mock Market Prices
const marketPrices: MarketPrice[] = [
  {
    id: '1',
    item: 'Cow Milk',
    price: 60,
    unit: 'per liter',
    location: 'Guwahati',
    date: '2023-04-28'
  },
  {
    id: '2',
    item: 'Buffalo Milk',
    price: 80,
    unit: 'per liter',
    location: 'Guwahati',
    date: '2023-04-28'
  },
  {
    id: '3',
    item: 'Eggs',
    price: 6,
    unit: 'per piece',
    location: 'Guwahati',
    date: '2023-04-28'
  },
  {
    id: '4',
    item: 'Goat',
    price: 8000,
    unit: 'per animal',
    location: 'Guwahati',
    date: '2023-04-25'
  },
  {
    id: '5',
    item: 'Chicken',
    price: 240,
    unit: 'per kg',
    location: 'Guwahati',
    date: '2023-04-28'
  }
];

// Mock Disease Guides
const diseaseGuides: DiseaseGuide[] = [
  {
    id: '1',
    name: 'Foot and Mouth Disease (FMD)',
    animalTypes: ['cow', 'buffalo', 'goat', 'sheep', 'pig'],
    symptoms: [
      'Fever',
      'Blisters on mouth, feet, teats',
      'Excessive salivation',
      'Lameness',
      'Reduced appetite'
    ],
    treatment: 'No specific treatment. Supportive care includes soft food, clean water, and antibiotics to prevent secondary infections.',
    prevention: 'Regular vaccination (every 6 months), quarantine new animals, maintain farm hygiene',
    emergencyCare: 'Isolate affected animals immediately, call veterinarian, disinfect premises'
  },
  {
    id: '2',
    name: 'Newcastle Disease',
    animalTypes: ['chicken', 'duck'],
    symptoms: [
      'Respiratory distress',
      'Nervous signs',
      'Greenish diarrhea',
      'Twisted neck',
      'Reduced egg production'
    ],
    treatment: 'No specific treatment. Supportive care and antibiotics for secondary infections.',
    prevention: 'Regular vaccination, biosecurity measures, proper ventilation',
    emergencyCare: 'Isolate affected birds, improve ventilation, call veterinarian'
  },
  {
    id: '3',
    name: 'Mastitis',
    animalTypes: ['cow', 'buffalo', 'goat', 'sheep'],
    symptoms: [
      'Swollen, hot udder',
      'Abnormal milk (clots, watery)',
      'Pain during milking',
      'Reduced milk production',
      'Fever'
    ],
    treatment: 'Antibiotics (prescribed by veterinarian), frequent milking of affected quarter, massage with warm water',
    prevention: 'Proper milking hygiene, clean housing, regular udder health checks',
    emergencyCare: 'Call veterinarian, apply cold compresses to reduce swelling'
  }
];

// Mock Knowledge Articles
const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: '1',
    title: 'Proper Feeding Practices for Dairy Cows',
    content: 'Dairy cows require a balanced diet consisting of roughage (fodder/hay) and concentrates. An adult cow needs about 15-20 kg of green fodder, 5-7 kg of dry fodder, and 2-3 kg of concentrate daily. Provide clean water at all times. Feeding should be done 3-4 times a day at regular intervals.',
    category: 'feeding',
    animalTypes: ['cow', 'buffalo'],
    imageUrl: 'https://media.gettyimages.com/id/944687438/photo/vet-farmer-at-work-with-cow.jpg?s=612x612&w=0&k=20&c=kyI2-Z-ZCcuJtCXTRbB2bQnJVk0hkfpCFxkZUBubR3A=',
    language: 'english'
  },
  {
    id: '2',
    title: 'Housing Requirements for Goats',
    content: 'Goats need well-ventilated, dry shelters that protect them from extreme weather. Provide at least 2 square meters per adult goat. The floor should be elevated with slats or be well-drained to prevent foot problems. Ensure proper cleaning daily to maintain hygiene and prevent diseases.',
    category: 'shelter',
    animalTypes: ['goat'],
    imageUrl: 'https://images.unsplash.com/photo-1588466585717-f8041aec7875?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hdHxlbnwwfHwwfHx8MA%3D%3D',
    language: 'english'
  },
  {
    id: '3',
    title: 'Poultry Vaccination Schedule',
    content: 'Day 1: Marek\'s disease, Day 7: Newcastle disease (B1 strain), Day 14: Infectious bursal disease, Day 21: Newcastle disease (booster), Day 28: Infectious bronchitis. Regular deworming every 3 months and coccidiosis prevention are also recommended.',
    category: 'health',
    animalTypes: ['chicken', 'duck'],
    imageUrl: 'https://img.freepik.com/free-photo/chicken-farm-scene-with-poultry-people_23-2151462302.jpg?ga=GA1.1.1463545432.1745896580&semt=ais_hybrid&w=740',
    language: 'english'
  },
  {
    id: '4',
    title: 'Signs of Heat in Cows',
    content: 'Signs include restlessness, mounting other cows, standing to be mounted, clear mucus discharge, swollen vulva, reduced milk yield, and bellowing. Heat typically lasts 18-24 hours. Best time for breeding is 12-18 hours after onset of heat signs.',
    category: 'breeding',
    animalTypes: ['cow', 'buffalo'],
    imageUrl: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
    language: 'english'
  }
];

// Mock Notifications
const notifications: Notification[] = [
  {
    id: '1',
    title: 'Vaccination Due',
    description: 'Lakshmi (C001) is due for FMD vaccination tomorrow',
    date: '2023-04-29',
    type: 'vaccination',
    status: 'pending',
    relatedId: '1'
  },
  {
    id: '2',
    title: 'Breeding Alert',
    description: 'Rani (B001) expected to deliver in 2 days',
    date: '2023-05-01',
    type: 'breeding',
    status: 'pending',
    relatedId: '3'
  },
  {
    id: '3',
    title: 'Deworming Due',
    description: 'Kalu (G001) needs deworming treatment',
    date: '2023-04-27',
    type: 'health',
    status: 'pending',
    relatedId: '2'
  },
  {
    id: '4',
    title: 'Low Market Price Alert',
    description: 'Milk prices have dropped by 5% in your region',
    date: '2023-04-26',
    type: 'general',
    status: 'done'
  }
];

// Complete App State
export const initialState: AppState = {
  language: 'english',
  animals,
  healthRecords,
  breedingRecords,
  productionRecords,
  marketPrices,
  diseaseGuides,
  knowledgeArticles,
  notifications
};