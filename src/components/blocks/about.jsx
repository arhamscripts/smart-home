"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Zap,
  ArrowRight,
  Lightbulb,
  Heart,
  CheckCircle,
  Cpu,
  Activity,
  Network
} from 'lucide-react'
import { Button } from '../ui/button'
import OurTeam from './our-team'

const values = [
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    description: "We constantly push boundaries to bring you the latest in smart grid automation and contextual intelligence."
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description: "Military-grade testing ensures every Aqua Smart node operates flawlessly within your home's ecosystem."
  },
  {
    icon: Heart,
    title: "Human-Centric",
    description: "Technology should serve people, not confuse them. Our interfaces are designed for intuitive, seamless living."
  },
  {
    icon: Activity,
    title: "Profound Efficiency",
    description: "Our solutions are architected from the ground up to eliminate energy waste and optimize your entire property."
  },
]

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
}

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div className="bg-zinc-50 min-h-screen selection:bg-cyan-100 selection:text-cyan-900 pointer-events-auto">

      {/* Cinematic Ethereal Hero (Light Mode) */}
      <section className="relative w-full pt-40 pb-20 md:pt-52 md:pb-40 overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image with Light Mode Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop"
            alt="Aqua Smart Home Ecosystem"
            fill
            priority
            className="object-cover"
          />
          {/* Frosted / Bright Overlay to ensure dark text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-white/20 via-zinc-50/60 to-zinc-50/80 z-20" />
        </div>

        {/* Soft Ambient Mesh Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-cyan-200/40 blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-200/30 blur-[100px] opacity-60 animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col items-center max-w-5xl mx-auto"
          >
            <motion.div
              variants={FADE_UP_VARIANTS}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-600 text-xs font-bold tracking-[0.2em] uppercase mb-8"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-600" />
              Our Origin
            </motion.div>

            <motion.div variants={FADE_UP_VARIANTS} className="overflow-hidden">
              <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tight text-zinc-900 leading-[0.95] mb-6">
                Architecting the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-blue-700">Intelligent Home.</span>
              </h1>
            </motion.div>

            <motion.div variants={FADE_UP_VARIANTS}>
              <p className="text-lg md:text-2xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-medium">
                At Aqua Smart, we are passionate about transforming static environments into responsive, energy-efficient living ecosystems.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story Grid Section */}
      <section ref={containerRef} className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Asymmetric Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6 translate-y-8">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 relative shadow-2xl shadow-cyan-900/5 border border-zinc-100">
                    <motion.div style={{ y: yImage }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                      <Image src="/images/card-bg-one.jpg" alt="Our journey" fill className="object-cover" />
                    </motion.div>
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 relative shadow-lg shadow-zinc-200/50 border border-zinc-100">
                    <Image src="/images/card-bg-three.jpg" alt="Technology" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 relative shadow-lg shadow-zinc-200/50 border border-zinc-100">
                    <Image src="/images/product-one.png" alt="Products" fill className="object-cover p-4" />
                  </div>
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 relative shadow-2xl shadow-cyan-900/5 border border-zinc-100">
                    <motion.div style={{ y: yImage }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                      <Image src="/images/card-bg-two.jpg" alt="Showroom" fill className="object-cover" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-widest">
                The Journey
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-zinc-900 tracking-tight leading-[1.05]">
                From a single shop to a <span className="text-zinc-400">national network.</span>
              </h2>

              <div className="space-y-6 text-zinc-600 text-lg leading-relaxed">
                <p>
                  We began over a decade ago with a simple realization: homes were drawing power, but they weren't utilizing it intelligently. What started as an electrical supply operation evolved radically as we recognized the potential of interconnected ecosystems.
                </p>
                <p>
                  Today, Aqua Smart stands as a pioneer in home automation. We don't just sell devices—we engineer ambient environments that adapt to your behavioral patterns in real-time.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 border-t border-zinc-100 pt-8">
                {[
                  { label: "Military-Grade Testing", icon: Shield },
                  { label: "Certified Nodes", icon: Network },
                  { label: "24/7 Diagnostics", icon: Activity }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-zinc-900" />
                    </div>
                    <span className="font-semibold text-zinc-800">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values Bento Grid */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Our Core Architecture.
            </h2>
            <p className="text-zinc-500 text-lg">
              The fundamental principles that dictate how we design, build, and support the Aqua Smart ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className="group relative bg-white p-8 rounded-[2rem] border border-zinc-200/60 shadow-sm hover:shadow-2xl hover:shadow-cyan-900/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors duration-500">
                    <value.icon className="h-6 w-6 text-zinc-400 group-hover:text-cyan-600 transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{value.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team Component */}
      <OurTeam />

      {/* CTA Wrap-up */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-zinc-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
          >
            {/* Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white tracking-tight leading-none">
                Ready to elevate <br /> your environment?
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                Join the vanguard of homeowners experiencing unparalleled control, efficiency, and continuous peace of mind.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8 h-14 font-semibold">
                  <Link href="/products">
                    Explore Ecosystem
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
