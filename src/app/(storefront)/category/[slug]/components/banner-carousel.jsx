"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Server } from 'lucide-react';
import Image from 'next/image';

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
}

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720415353460-957325a7267d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export const BannerCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, loop: true })
  )

  return (
    <div className="relative w-full h-[80vh] -mb-10 overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full absolute z-0"
      >
        <CarouselContent className="h-[80vh]">
          {BANNER_IMAGES.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="p-0 m-0 border-0 shadow-none">
                <CardContent className="min-w-full h-[80vh] flex items-center justify-center p-0">
                  <Image src={image} alt={`Banner ${index + 1}`} width={1920} height={1080} className="w-full h-full object-cover" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/20 via-zinc-50/60 to-zinc-50/80 z-5" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div variants={FADE_UP_VARIANTS} className="overflow-hidden">
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tight text-center text-zinc-900 leading-tight mb-6">
            Category <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-blue-700">Small Switches</span>
          </h1>
        </motion.div>
      </div>
    </div>
  )
}
