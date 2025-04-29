import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import { Heart, AlertCircle, Clock, CheckCircle, Zap } from 'lucide-react';
import { AnimalType } from '../types';
import { motion } from 'framer-motion';

const Breeding: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('cow');

  const breedingGuides = {
    cow: {
      title: 'Cattle Breeding Guide',
      icon: '🐄',
      signs: [
        'Restlessness and mounting other animals',
        'Clear mucus discharge',
        'Swollen vulva',
        'Standing heat (primary sign)',
        'Decreased milk production'
      ],
      timing: 'Breed 12-18 hours after onset of standing heat',
      methods: [
        'Natural breeding with bulls',
        'Artificial Insemination (AI)',
        'Embryo transfer (for valuable genetics)'
      ],
      recommendations: [
        'Maintain breeding records meticulously',
        'Ensure good body condition before breeding',
        'Consult veterinarian for pregnancy confirmation',
        'Provide proper nutrition during pregnancy'
      ]
    },
    buffalo: {
      title: 'Buffalo Breeding Guide',
      icon: '🐃',
      signs: [
        'Bellowing and restlessness',
        'Vulvar swelling',
        'Clear mucus discharge',
        'Decreased milk yield',
        'Standing to be mounted'
      ],
      timing: 'Optimal breeding time is 24 hours after heat onset',
      methods: [
        'Natural breeding',
        'Artificial Insemination',
        'Synchronized breeding programs'
      ],
      recommendations: [
        'Regular heat detection checks',
        'Maintain proper nutrition',
        'Record keeping of heat cycles',
        'Seasonal breeding considerations'
      ]
    },
    goat: {
      title: 'Goat Breeding Guide',
      icon: '🐐',
      signs: [
        'Tail wagging',
        'Bleating frequently',
        'Decreased appetite',
        'Swollen vulva',
        'Mounting behavior'
      ],
      timing: 'Breed within 12-36 hours of heat onset',
      methods: [
        'Natural breeding',
        'Controlled breeding',
        'AI (less common)'
      ],
      recommendations: [
        'Age and size consideration for first breeding',
        'Buck-to-doe ratio planning',
        'Seasonal breeding patterns',
        'Proper buck management'
      ]
    },
    sheep: {
      title: 'Sheep Breeding Guide',
      icon: '🐑',
      signs: [
        'Restlessness',
        'Seeking ram attention',
        'Swollen vulva',
        'Standing heat',
        'Decreased feed intake'
      ],
      timing: 'Breed during standing heat (12-24 hours)',
      methods: [
        'Natural mating',
        'Controlled breeding',
        'Flock breeding management'
      ],
      recommendations: [
        'Seasonal breeding considerations',
        'Ram fertility testing',
        'Ewe preparation',
        'Lambing preparation'
      ]
    },
    pig: {
      title: 'Pig Breeding Guide',
      icon: '🐖',
      signs: [
        'Standing reflex',
        'Swollen vulva',
        'Restless behavior',
        'Mounting other pigs',
        'Loss of appetite'
      ],
      timing: 'Breed 12-36 hours after standing heat begins',
      methods: [
        'Natural mating',
        'Artificial Insemination',
        'Pen mating'
      ],
      recommendations: [
        'Proper boar management',
        'Sow condition scoring',
        'Breeding schedule maintenance',
        'Farrowing preparation'
      ]
    }
  };

  const animalOptions = [
    { value: 'cow', label: '🐄 Cattle' },
    { value: 'buffalo', label: '🐃 Buffalo' },
    { value: 'goat', label: '🐐 Goat' },
    { value: 'sheep', label: '🐑 Sheep' },
    { value: 'pig', label: '🐖 Pig' }
  ];

  const guide = breedingGuides[selectedAnimal];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Breeding Guide" />
      
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Select
              label={
                <div className="flex items-center">
                  <Zap size={18} className="mr-2 text-yellow-500" />
                  <span>Select Animal Type</span>
                </div>
              }
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value as AnimalType)}
              options={animalOptions}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            <Card 
              title={
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{guide.icon}</span>
                  <span>{guide.title}</span>
                </div>
              } 
              icon={<Heart size={20} className="text-pink-500" />}
              className="bg-gradient-to-br from-pink-50 to-pink-100"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Heart size={18} className="mr-2 text-pink-500" />
                    Signs of Heat
                  </h3>
                  <ul className="space-y-2">
                    {guide.signs.map((sign, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pink-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Clock size={18} className="mr-2 text-blue-500" />
                    Optimal Timing
                  </h3>
                  <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                    {guide.timing}
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              title="Breeding Methods" 
              icon={<CheckCircle size={20} className="text-green-500" />}
              className="bg-gradient-to-br from-green-50 to-green-100"
            >
              <ul className="space-y-3">
                {guide.methods.map((method, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full p-1 mr-3">
                      <CheckCircle size={14} />
                    </span>
                    <span className="text-gray-700">{method}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card 
              title={
                <div className="flex items-center">
                  <AlertCircle size={18} className="mr-2 text-blue-500" />
                  <span>Recommendations</span>
                </div>
              } 
              className="md:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.recommendations.map((rec, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Breeding;