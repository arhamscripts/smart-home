"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, CheckCircle } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function ContactUS() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        description: '',
      })
    }, 3000)
  }

  return (
    <section>
      {/* Hero Section - Dark Background with Form */}
      <div className="bg-[#1a1a1a] pt-8 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Side - Heading */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl font-light italic leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Elevate your<br />living<br />experience
              </h2>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60 md:text-base lg:mx-0">
                Register for a exclusive smart home demo at our custom built studio apartment.
              </p>
            </div>

            {/* Right Side - Form */}
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <Input
                name="fullName"
                type="text"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white h-12 px-0"
              />
              <Input
                name="mobile"
                type="tel"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white h-12 px-0"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white h-12 px-0"
              />
              <Input
                name="description"
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white h-12 px-0"
              />
              
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full h-12 rounded-md text-base font-medium mt-4 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 hover:bg-green-600 text-white'
                    : 'bg-gray-700 hover:bg-[#0d77e8] text-[#ffffff] '
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Submitted
                  </span>
                ) : (
                  "Contact Us"
                )}
              </Button>
            </form>

          </div>
        </div>
      </div>

      {/* Divider + Get in Touch Section */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-12">
          {/* "or" divider */}
          <div className="flex items-center justify-center py-6">
            <span className="text-white/40 text-sm">or</span>
          </div>

          {/* Get in touch heading */}
          <h3 className="text-2xl md:text-3xl font-medium text-center mb-12">
            Get in touch with us
          </h3>

          {/* Contact info - two columns */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Phone */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex items-center gap-3 mb-1">
                <Phone className="h-5 w-5 text-white" />
                <span className="break-all text-lg font-medium md:text-xl">+92 336 8882782</span>
              </div>
              <p className="text-white/50 text-sm">
                to speak to our smart home consultant
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex items-center gap-3 mb-1">
                <Mail className="h-5 w-5 text-white" />
                <a href="mailto:aquaelectrical@gmail.com" className="break-all text-lg font-medium transition-colors hover:text-[#7ec8c8] md:text-xl">
                  aquaelectrical@gmail.com
                </a>
              </div>
              <p className="text-white/50 text-sm">
                write to our sales team with specific requests
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
