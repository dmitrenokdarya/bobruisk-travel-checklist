'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BOBRUISK_INFO } from './constants';
import { Check, Triangle } from 'lucide-react';
import Link from 'next/link';

const CheckList = () => {
  const loadSavedProgress = () => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('bobruisk-checklist');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return {
          checkedItems:
            data.checkedItems || new Array(BOBRUISK_INFO.length).fill(false),
          openItems:
            data.openItems || new Array(BOBRUISK_INFO.length).fill(false),
        };
      } catch (e) {
        console.error('Failed to load saved progress', e);
      }
    }
    return null;
  };

  const savedProgress = loadSavedProgress();

  const [openItems, setOpenItems] = useState(
    savedProgress?.openItems || new Array(BOBRUISK_INFO.length).fill(false),
  );
  const [checkedItems, setCheckedItems] = useState(
    savedProgress?.checkedItems || new Array(BOBRUISK_INFO.length).fill(false),
  );
  const [autoScroll, setAutoScroll] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'bobruisk-checklist',
        JSON.stringify({
          checkedItems,
          openItems,
        }),
      );
      console.log('Saved to localStorage:', { checkedItems, openItems });
    }
  }, [checkedItems, openItems]);

  const toggleItem = (index: number) => {
    setOpenItems((prev: boolean[]) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleCheck = (index: number) => {
    setCheckedItems((prev: boolean[]) => {
      const newState = [...prev];
      newState[index] = !newState[index];

      if (newState[index] && autoScroll && index + 1 < BOBRUISK_INFO.length) {
        setTimeout(() => {
          itemRefs.current[index + 1]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 500);
      }

      return newState;
    });
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const totalCount = BOBRUISK_INFO.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div>
      <div className="pt-7 pb-15 px-7 relative min-h-[600px] flex items-center">
        <Image
          src="/images/main-page-photo.webp"
          alt="main photo"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-h1 mb-6 text-white">
            Пора начать наше путешествие!
          </h1>
          <p className="text-subtitle-l text-white">
            Бобры, крепости, Социалка и еще немного бобров.
            <br />
            Бобруйск — это неожиданно, колоритно и очень душевно со слов чата
            gpt. Наверное, стоит проверить.
          </p>

          <div className="mt-8 bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-brand-primary h-full transition-all duration-500 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: '#9acee6',
              }}
            />
          </div>
          <p className="text-white mt-2 text-body-s">
            Посещено: {completedCount} из {totalCount} мест
          </p>
        </div>
      </div>

      <div className="pt-5 pb-10 px-7 mx-auto">
        <div className="flex flex-col justify-center items-end gap-5 mb-10">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={() => setAutoScroll(!autoScroll)}
                className="w-4 h-4 opacity-0 absolute cursor-pointer"
              />
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                ${
                  autoScroll
                    ? 'bg-brand-primary border-brand-primary'
                    : 'border-stroke bg-transparent'
                }`}
              >
                {autoScroll && (
                  <Check size={10} color="white" strokeWidth={3} />
                )}
              </div>
            </div>
            <span className="text-body-s text-secondary">Автоскролл</span>
          </label>
          <p className="text-h2 text-secondary mx-auto p-2 bg-blue rounded-lg">
            🗺️ Ваш маршрут по Бобруйску:
          </p>
          <Link href="https://yandex.ru/maps?rtext=53.137939,29.195350~53.139008,29.208460~53.139360,29.221461~53.139439,29.225713~53.138305,29.226189~53.130881,29.228323~53.130124,29.229816~53.136716,29.229112~53.136429,29.249371~53.144709,29.251114~53.142961,29.236567~53.153033,29.247934~53.147586,29.232769~53.148705,29.229062~53.145831,29.224959~53.142619,29.224335~53.142625,29.222417~53.140694,29.221836~53.142078,29.218856~53.137939,29.195350&rtt=pd" className='text-link text-subtitle-s mx-auto border border-stroke p-3 rounded-lg'>Ссылка на маршрут в Яндекс.Карты</Link>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-tertiary opacity-30" />

          {BOBRUISK_INFO.map((info, index) => {
            const isOpen = openItems[index];
            const isLast = index === BOBRUISK_INFO.length - 1;

            return (
              <div key={index} className="grid">
                <div className="mb-4 mx-auto">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${
                        checkedItems[index]
                          ? 'bg-blue shadow-lg shadow-brand-primary/50'
                          : 'bg-secondary border-2 border-stroke'
                      }
                    `}
                  >
                    {checkedItems[index] ? (
                      <span className="text-white text-subtitle-l">✓</span>
                    ) : (
                      <span className="text-primary text-subtitle-l">
                        {index + 1}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                >
                  <div
                    className={`
                      border rounded-lg p-4 transition-all duration-300
                      ${
                        checkedItems[index]
                          ? 'border-muted bg-blue'
                          : 'border-stroke bg-primary'
                      }
                    `}
                  >
                    <div className="flex flex-col gap-4 items-start">
                      <div className="relative w-full h-50 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                        {info.img && (
                          <Image
                            src={info.img}
                            alt={info.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="flex justify-between items-center w-full">
                        <input
                          type="checkbox"
                          checked={checkedItems[index]}
                          onChange={() => handleCheck(index)}
                          className="hidden"
                          id={`checkbox-${index}`}
                        />
                        <label
                          htmlFor={`checkbox-${index}`}
                          className={`w-7 h-7 rounded border-2 flex items-center justify-center cursor-pointer
                          ${
                            checkedItems[index]
                              ? 'bg-brand-primary border-brand-primary'
                              : 'border-stroke bg-transparent'
                          }`}
                        >
                          {checkedItems[index] && (
                            <Check size={16} color="white" />
                          )}
                        </label>
                        <div className="flex items-center gap-3">
                          <h3 className="text-h3 text-primary max-w-57 text-right">
                            {info.title}
                          </h3>
                          <button
                            onClick={() => toggleItem(index)}
                            className="text-brand-primary text-xl px-2"
                          >
                            {!isOpen ? (
                              <Triangle
                                size={18}
                                color="white"
                                className="rotate-180"
                              />
                            ) : (
                              <Triangle size={18} color="gray" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen
                          ? 'max-h-[2000px] opacity-100 mt-4'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-body-s text-secondary leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center -ml-10 -mt-4 -z-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/arrow.svg" alt="route arrow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {completedCount === totalCount && totalCount > 0 && (
          <div className="text-center mt-12 p-6 bg-brand-primary/10 rounded-xl border border-brand-primary">
            <p className="text-h3 text-brand-primary mb-2">
              🎉 Путешествие завершено! 🎉
            </p>
            <p className="text-body-s text-secondary">
              Надеюсь, что у тебя остались самые приятные впечатления об этом
              небольшом городке! Спасибо, что посетил его! Всем бобра!
            </p>
            <div className="flex justify-between items-end mt-3">
              <div className="w-fit">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={50}
                  height={50}
                />
              </div>
              <p className="text-end">от Самуиловича</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckList;
