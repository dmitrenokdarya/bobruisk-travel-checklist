'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BOBRUISK_INFO } from './constants';

const CheckList = () => {
  const [openItems, setOpenItems] = useState(new Array(BOBRUISK_INFO.length).fill(false));
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  
  return (
    <div>
      <div className="pt-7 pb-25 px-7 relative">
        <Image
          src="/images/main-page-photo.webp"
          alt="main photo"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="relative z-10">
          <h1 className="text-h1 mb-6 text-white">Пора начать наше путешествие!</h1>
          <p className="text-subtitle-l text-white">
            Бобры, крепость, старый город и немного мемной магии.
            <br />
            Бобруйск — это неожиданно, колоритно и очень душевно.
          </p>
        </div>
      </div>
      
      <div className="pt-7 pb-10 px-7">
        <p className="text-subtitle-s text-secondary mb-6">
          Перед вами карта главных мест. Бывали? Ставьте галочку. Не были? Самое
          время запланировать визит.
        </p>
        
        <div className="space-y-4">
          {BOBRUISK_INFO.map((info, index) => {
            const isOpen = openItems[index];
            
            return (
              <div key={index} className="border-stroke border rounded-lg p-4">
                <div 
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <p className="text-h3 text-primary">{info.title}</p>
                  <button className="text-brand-primary text-xl ml-4">
                    {isOpen ? '▲' : '▼'}
                  </button>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-body-s text-secondary">{info.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckList;