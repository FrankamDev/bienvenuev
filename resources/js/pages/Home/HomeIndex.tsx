import React from 'react'
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import Hero from './Hero';
import LocalisationSection from './LocalisationSection';
import Programme from './Programme';
import Details from './Details';
import Colors from './Colors';
import RSVP from './RSVP';
import CouplePhoto from './CouplePhoto';
import { usePage } from '@inertiajs/react';
import ListGift from '../Gifts/ListGift';
import PartySection from './PartySection';
import Countdown from './Countdown';

const HomeIndex = () => {
    const {gifts} = usePage().props;
      useEffect(() => {
    // Optionnel : smooth scroll global
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 text-gray-800 font-lora overflow-x-hidden">
      {/* Overlay subtil pour ambiance */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://images.unsplash.com/photo-1519741497674-...')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        className="relative z-10"
      >
        <Hero />
        <Programme />
        <Details />
        <ListGift gifts={gifts}/>
        <PartySection/>
        <Colors/>
        <RSVP />
        <LocalisationSection  />
        <Countdown/>
        <CouplePhoto />
      </motion.div>

    </div>
  )
}

export default HomeIndex
