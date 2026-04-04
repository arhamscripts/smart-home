'use client';

import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Server } from 'lucide-react';
import Image from 'next/image';

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
}

export default function HeroBanner() {
    return (
        <section className="relative w-full h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-zinc-50">
            {/* Background Image with Light Mode Overlays */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/images/aqua-smart-banner.jpg" 
                    alt="Aqua Smart Home Ecosystem" 
                    fill 
                    priority
                    className="object-cover" 
                />
                <div className="absolute inset-0 bg-linear-to-b from-white/40 via-zinc-50/80 to-zinc-50/90 z-20" />
            </div>

            {/* Soft Ambient Mesh Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-cyan-200/40 blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-200/30 blur-[100px] opacity-60 animate-pulse" style={{ animationDuration: '12s' }} />
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center mt-12 md:mt-20">
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
                        <Server className="w-3.5 h-3.5 text-cyan-600" />
                        Aqua Smart System
                    </motion.div>

                    <motion.div variants={FADE_UP_VARIANTS} className="overflow-hidden">
                        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tight text-zinc-900 leading-[0.95] mb-6">
                            Experience Pure Power <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-blue-700">Intelligent Living.</span>
                        </h1>
                    </motion.div>

                    <motion.div variants={FADE_UP_VARIANTS}>
                        <p className="text-lg md:text-2xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-medium mb-12">
                            An engineering marvel that transforms your entire property into a self-regulating, energy-efficient ecosystem.
                        </p>
                    </motion.div>

                    {/* Feature Icons Row from the reference image */}
                    <motion.div
                        variants={FADE_UP_VARIANTS}
                        className="flex items-start justify-center gap-6 md:gap-16 pt-8 border-t border-zinc-200"
                    >
                        {[
                            { icon: Cpu, label: "Adaptive Power Routing" },
                            { icon: ShieldCheck, label: "Active Surge Protection" },
                            { icon: Zap, label: "Up to 99% Energy Efficiency" }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-3 max-w-[140px] group">
                                <div className="w-14 h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-200 transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-cyan-600" />
                                </div>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-800 transition-colors leading-tight">
                                    {feature.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
