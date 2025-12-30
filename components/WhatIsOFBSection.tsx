'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const categories = [
  {
    label: 'Science & Technology',
    image: '/images/category-1.webp',
    topGap: 92,
  },
  {
    label: ' Industry & Enterprise',
    image: '/images/category-2.webp',
    topGap: 20,
  },
  {
    label: 'Policy & Governance',
    image: '/images/category-6.webp',
    topGap: 95,
  },
  {
    label: 'Education & Skills Development',
    image: '/images/category-3.webp',
    topGap: 0,
  },
  {
    label: 'Art & Culture ',
    image: '/images/category-4.webp',
    topGap: 60,
  },
  {
    label: 'Sustainable Development',
    image: '/images/category-5.webp',
    topGap: 0,
  },
];
const WhatIsOFBSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const categoryNames = categories.map((cat) => cat.label.trim());

  useEffect(() => {
    const currentCategory = categoryNames[currentIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentCategory.length) {
          setDisplayText(currentCategory.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % categoryNames.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, categoryNames]);

  return (
    <section
      className="bg-white py-[50px] md:py-[100px] shadow-brand"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(13, 13, 13, 3%) 50%), url('/images/bg-pattern.png')`,
      }}
    >
      <div className="tq-container">
        <div className="max-w-[970px] mx-auto text-center">
          <span className="text-[#888888] text-[14px] mb-2 font-extrabold uppercase tracking-widest">
            What is one big future?
          </span>
          <h2 className="text-[24px] md:text-[32px] font-normal leading-[32px] md:leading-[40px] text-[#434343] mb-[56px] mt-2 min-h-[290px] md:min-h-[160px]">
            One Big Future brings together influential voices from{' '}
            <br className="hidden md:block" />
            <span className="font-medium text-brand block md:inline">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>{' '}
            providing a platform for leaders <br className="hidden md:block" />
            to share their vision for India&apos;s future and the pathways{' '}
            <br className="hidden md:block" />
            to turn these possibilities into reality.
          </h2>
        </div>
      </div>
      <div className="overflow-hidden mt-12">
        <motion.div
          className="flex gap-[100px] will-change-transform"
          animate={{
            x: [0, -(168 + 100) * categories.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {[...categories, ...categories].map((category, index) => (
            <div
              key={`${category.label}-${index}`}
              style={{
                marginTop: `${category.topGap}px`,
              }}
            >
              <div className="bg-white border border-[#DAD8D6] p-6 shrink-0 w-[178px]">
                <Image
                  src={category.image}
                  alt={category.label}
                  width={120}
                  height={120}
                  className="mb-[6px] w-full h-auto object-cover"
                />
                <p className="text-[14px] font-medium text-black leading-[20px] text-center">
                  {category.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsOFBSection;
