/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Phone, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  TreePine,
  Trees, 
  Scissors, 
  Tractor,
  CalendarCheck, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown,
  Plus,
  Minus,
  Menu, 
  X,
  Sprout,
  Map,
  BadgeCheck,
  CalendarDays,
  Star,
  Quote,
  Lock,
  Upload,
  Trash2
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { getPhotos, addPhoto, deletePhoto } from './db';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [captionInputVisible, setCaptionInputVisible] = useState(false);
  const [pendingPhotoData, setPendingPhotoData] = useState<string | null>(null);
  const [pendingCaption, setPendingCaption] = useState("");

  const defaultPhotos = [
    { id: 'default1', dataUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=800&q=80', caption: 'Lawn Aeration & Maintenance', isDefault: true },
    { id: 'default2', dataUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', caption: 'Residential Lawn Care', isDefault: true },
    { id: 'default3', dataUrl: 'https://images.unsplash.com/photo-1416879598446-d0df614b6bdd?auto=format&fit=crop&w=800&q=80', caption: 'Front Yard Landscaping', isDefault: true },
    { id: 'default4', dataUrl: 'https://images.unsplash.com/photo-1622383563227-0440263309a6?auto=format&fit=crop&w=800&q=80', caption: 'Hardscape & Garden Design', isDefault: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    getPhotos().then(stored => {
      if (stored.length > 0) {
        setPhotos(stored);
      } else {
        setPhotos(defaultPhotos);
      }
      setIsLoadingPhotos(false);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const caption = window.prompt("Enter an optional caption for this photo:");
        addPhoto(event.target.result, caption || '').then(() => {
          getPhotos().then(updated => {
             setPhotos(updated);
          });
        });
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeletePhoto = async (id: number | string) => {
    if (typeof id === 'number') {
      await deletePhoto(id);
      const updated = await getPhotos();
      setPhotos(updated.length > 0 ? updated : defaultPhotos);
    } else {
      setPhotos(photos.filter(p => p.id !== id));
    }
  };

  const scrollToQuote = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-brand-600 selection:text-white">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-brand-900/10 ${
          isScrolled ? 'py-3 shadow-sm' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-stone-50" />
            </div>
            <div>
              <h1 className="font-bold text-xl uppercase tracking-tight leading-none text-brand-900">Central Alabama</h1>
              <p className="text-[10px] tracking-widest uppercase opacity-70 text-brand-900">Land Care • Since 2005</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase font-semibold opacity-60 text-brand-900">Call for a free quote</p>
              <a href="tel:3342795390" className="text-xl font-bold text-brand-900 hover:text-accent-600 transition-colors">
                (334) 279-5390
              </a>
            </div>
            <button 
              onClick={scrollToQuote}
              className="px-6 py-3 bg-brand-900 hover:bg-brand-800 text-stone-50 rounded-full font-bold text-sm shadow-lg uppercase transition-colors"
            >
              Get Free Quote
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-brand-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white shadow-xl md:hidden border-t border-stone-100"
          >
            <div className="p-4 flex flex-col gap-4">
              <a 
                href="tel:3342795390" 
                className="flex items-center justify-center gap-2 p-4 bg-brand-50 text-brand-900 rounded-xl font-semibold text-lg"
              >
                <Phone className="w-6 h-6" />
                (334) 279-5390
              </a>
              <button 
                onClick={scrollToQuote}
                className="w-full p-4 bg-accent-600 text-white rounded-xl font-semibold text-lg hover:bg-accent-700 transition"
              >
                Get a Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-brand-900 text-stone-50 overflow-hidden flex-none">
          {/* Abstract background graphics */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"></path>
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 text-center md:text-left mb-12 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-accent-600 text-[10px] font-bold tracking-widest rounded mb-4 uppercase text-stone-50">
                  Licensed Alabama Contractor #39907
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none mb-4 text-stone-50 tracking-tight">
                  Professional Land Care for <span className="text-accent-600">Central Alabama.</span>
                </h2>
                <p className="text-lg opacity-90 max-w-xl mx-auto md:mx-0 mb-6 font-light">
                  Montgomery's most reliable team for lawn maintenance, clearing, and design since 2005. Licensed, insured, and family-run.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <button 
                    onClick={scrollToQuote}
                    className="w-full sm:w-auto px-8 py-3 bg-accent-600 hover:bg-accent-700 text-stone-50 rounded-full font-bold text-sm shadow-xl uppercase transition-colors"
                  >
                    Request Quote
                  </button>
                  <div className="flex items-center gap-2 text-sm opacity-80 italic">
                    <span>Serving Montgomery, Pike Road & Cecil</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-64 h-64 border-2 border-white/20 rounded-full flex items-center justify-center pointer-events-none"
              >
                <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center">
                   <svg className="w-24 h-24 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3L4 9v12h16V9l-8-6zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                   </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-stone-100 py-8 border-b border-brand-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-brand-900/10 text-center">
              <div className="flex flex-col items-center justify-center gap-2 pt-4 md:pt-0">
                <BadgeCheck className="w-8 h-8 text-accent-600" />
                <h3 className="font-bold uppercase text-sm text-stone-900">Alabama Licensed</h3>
                <p className="text-xs opacity-70 text-stone-900">General Contractor (License #39907)</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pt-6 md:pt-0">
                <CalendarDays className="w-8 h-8 text-accent-600" />
                <h3 className="font-bold uppercase text-sm text-stone-900">Established 2005</h3>
                <p className="text-xs opacity-70 text-stone-900">Decades of Local Experience</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pt-6 md:pt-0">
                <ShieldCheck className="w-8 h-8 text-accent-600" />
                <h3 className="font-bold uppercase text-sm text-stone-900">Fully Insured</h3>
                <p className="text-xs opacity-70 text-stone-900">Reliable & Professional Service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-2">Expert Services</h3>
              <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">Our Services</h2>
              <p className="text-lg text-stone-600">
                Comprehensive property maintenance and landscaping from a local crew that shows up when they say they will.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Trees className="w-8 h-8" />,
                  title: 'Lawn Maintenance & Mowing',
                  desc: 'Consistent, precise mowing, edging, and trimming to keep your property looking pristine week after week.'
                },
                {
                  icon: <Sprout className="w-8 h-8" />,
                  title: 'Landscaping Design & Install',
                  desc: 'Professional planning and installation of beds, shrubs, and hardscapes tailored to Central Alabama climates.'
                },
                {
                  icon: <Tractor className="w-8 h-8" />,
                  title: 'Lot & Land Clearing',
                  desc: 'Heavy-duty brush removal, grading, and site preparation for new properties or overgrown lots.'
                },
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: 'Garden Care & Plantings',
                  desc: 'Expert care for your specialized garden areas, seasonal flower rotations, and mulch installation.'
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8" />,
                  title: 'Property Maintenance',
                  desc: 'Routine upkeep and full-service management for commercial lots, HOAs, and large estates.'
                },
                {
                  icon: <Scissors className="w-8 h-8" />,
                  title: 'Seasonal Cleanup',
                  desc: 'Heavy leaf removal, pruning, and storm debris clearing to prepare your property for changing seasons.'
                }
              ].map((service, idx) => (
                <div key={idx} className="bg-stone-50 border border-brand-900/5 rounded-2xl p-8 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-white text-brand-900 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-brand-900/5">
                    {service.icon}
                  </div>
                  <h3 className="text-sm uppercase font-bold text-stone-900 mb-3">{service.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed opacity-80">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-brand-900 text-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-3">Why Choose Us</h3>
                <h2 className="text-3xl md:text-5xl font-extrabold text-stone-50 mb-6 tracking-tight">Built on Reliability & Hard Work</h2>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed font-light">
                  We aren't a massive national chain treating you like a number. We're a local, family-run operation serving the Montgomery area since 2005. We believe in fair pricing, detailed work, and simply showing up when we promise.
                </p>
                
                <ul className="flex flex-col gap-6">
                  {[
                    { title: 'Licensed Professional', text: 'Holding Alabama General Contractor License #39907.' },
                    { title: 'Dependable Scheduling', text: 'We respect your time. Our crews keep a tight, reliable schedule.' },
                    { title: 'Local & Family Run', text: 'Rooted right here in Central Alabama, understanding local soil and climate.' },
                    { title: 'Attention to Detail', text: 'From crisp edges to perfectly graded beds, we don\'t cut corners.' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1 flex items-center justify-center p-1 bg-accent-600 rounded-full text-stone-50 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-stone-50 mb-1">{item.title}</h4>
                        <p className="text-brand-100 opacity-90">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative rounded-3xl overflow-hidden aspect-4/3 border-[8px] border-white/5 bg-brand-800 shadow-2xl animate-none">
                  <div className="absolute inset-0 bg-brand-800 opacity-50"></div>
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-brand-700 rounded-t-[100%] scale-150 transform translate-y-1/2 opacity-80"></div>
                  <div className="absolute bottom-0 inset-x-0 h-1/4 bg-brand-600 rounded-t-[100%] scale-125 transform translate-y-1/2 opacity-90"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                     <TreePine className="w-24 h-24 text-brand-400 opacity-50 mb-4" />
                     <h3 className="font-bold text-2xl uppercase tracking-tight text-stone-50">Central Alabama</h3>
                     <p className="text-accent-600 mt-2 font-bold tracking-widest text-[10px] uppercase">Land Care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-24 bg-stone-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-4">Service Areas</h3>
            <MapPin className="w-12 h-12 text-brand-900 mx-auto mb-6 opacity-20" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">Our Service Area</h2>
            <p className="text-lg text-stone-600 mb-12">
              Proudly serving residential and commercial properties across Central Alabama, focusing on our local communities.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Montgomery', 'Mount Meigs', 'Waugh', 'Pike Road', 'Cecil', 'Central Alabama'].map((area, idx) => (
                <span key={idx} className="px-4 py-2 bg-white border border-brand-900/10 rounded text-[11px] font-bold text-stone-900 shadow-sm uppercase tracking-wide">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white border-t border-brand-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-2">Social Proof</h3>
              <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">What Our Clients Say</h2>
              <p className="text-lg text-stone-600">
                Don't just take our word for it. Here's what property owners across Central Alabama think about our work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  text: "After cycling through three different lawn care 'professionals' who wouldn't show up consistently, finding Central Alabama Land Care was a relief. They come on the same day every week, and the yard looks perfect.",
                  author: "Sarah M.",
                  location: "Pike Road, AL"
                },
                {
                  text: "We needed extensive lot clearing and grading before building our new home. Their team tackled the thick brush and pine trees without breaking a sweat. Honest pricing and fantastic communication throughout the project.",
                  author: "David L.",
                  location: "Montgomery, AL"
                },
                {
                  text: "They redesigned our front flower beds and added fresh mulch — the curb appeal is night and day! The crew was polite, cleaned up every stray leaf before leaving, and the price was exactly what they quoted.",
                  author: "Emily R.",
                  location: "Mount Meigs, AL"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-stone-50 border border-brand-900/5 rounded-2xl p-8 shadow-sm flex flex-col">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-900/10 mb-4" />
                  <p className="text-stone-700 italic flex-grow mb-8 leading-relaxed text-sm">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-stone-900">{testimonial.author}</h4>
                    <p className="text-[11px] text-accent-600 font-bold tracking-widest uppercase mt-1">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Showcase Gallery */}
        <section className="py-24 bg-white border-t border-brand-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-2">Our Work</h3>
                <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight">Recent Projects</h2>
              </div>
              {isAdmin && (
                <div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="px-6 py-3 bg-brand-900 hover:bg-brand-800 text-stone-50 rounded font-bold text-sm shadow-sm uppercase transition-colors flex items-center gap-2 animate-none"
                  >
                    <Upload className="w-4 h-4" /> Upload Photo
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoadingPhotos ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl bg-stone-200 animate-pulse border border-brand-900/5"></div>
                ))
              ) : (
                photos.map((photo) => (
                  <div key={photo.id} className="flex flex-col gap-3 group">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-brand-900/5">
                      <img src={photo.dataUrl} alt="Landscaping project showcase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-white border flex items-center justify-center animate-none"
                          title="Delete Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {photo.caption && (
                      <p className="text-sm font-medium text-stone-700 px-1">{photo.caption}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-stone-100 border-t border-brand-900/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-2">Common Questions</h3>
              <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "Do you provide free estimates?",
                  a: "Yes, we provide free, no-obligation estimates for all of our services. Simply fill out our quote form or give us a call, and we'll be happy to assess your property's needs and provide a clear, transparent price."
                },
                {
                  q: "Are you licensed and insured?",
                  a: "Absolutely. We hold an Alabama General Contractor License (#39907) and carry comprehensive liability insurance, giving you complete peace of mind when we are working on your property."
                },
                {
                  q: "What areas do you serve?",
                  a: "We proudly serve the Central Alabama region, with a primary focus on Montgomery, Mount Meigs, Waugh, Pike Road, and Cecil. If you're slightly outside these areas, give us a call to see if we can accommodate your needs."
                },
                {
                  q: "Do you offer weekly or bi-weekly lawn maintenance schedules?",
                  a: "Yes, we offer both weekly and bi-weekly maintenance schedules depending on the season, grass type, and your specific preferences. We work with you to develop a schedule that keeps your property looking immaculate year-round."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-brand-900/10 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
                  >
                    <span className="font-bold text-stone-900 pr-8">{faq.q}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${openFaq === idx ? 'bg-brand-900 text-stone-50 border-brand-900' : 'border-brand-900/20 text-brand-900 bg-stone-50'}`}>
                      {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-brand-900/5 mt-2 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-24 bg-white border-t border-brand-900/10" id="quote-form">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-stone-50 rounded-3xl p-8 md:p-12 border border-brand-900/10 shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                <div className="lg:w-5/12">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-600 mb-2">Get Your Free Estimate</h3>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">Request a Free Quote</h2>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    Ready to upgrade your property's care? Fill out the form strictly outlining your needs, and we'll get back to you promptly with a transparent, honest estimate.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-brand-900/10 rounded-full flex items-center justify-center shadow-sm text-brand-900 shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-600 font-medium uppercase tracking-wide">Call Us Directly</p>
                        <a href="tel:3342795390" className="text-xl font-bold text-stone-900 hover:text-accent-600 transition">(334) 279-5390</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-brand-900/10 rounded-full flex items-center justify-center shadow-sm text-brand-900 shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-600 font-medium uppercase tracking-wide">Business Hours</p>
                        <p className="text-lg font-bold text-stone-900">Mon-Sat: 7am - 6pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-7/12">
                  <form 
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-900/10 grid grid-cols-1 sm:grid-cols-2 gap-6"
                    onSubmit={(e) => { e.preventDefault(); alert('Form submitted! In a real app this would post data.'); }}
                  >
                    <div className="space-y-2">
                      <input required type="text" id="name" className="w-full px-4 py-3 bg-stone-50 rounded border border-brand-900/10 text-sm outline-none focus:border-accent-600 transition" placeholder="Full Name *" />
                    </div>
                    <div className="space-y-2">
                      <input required type="tel" id="phone" className="w-full px-4 py-3 bg-stone-50 rounded border border-brand-900/10 text-sm outline-none focus:border-accent-600 transition" placeholder="Phone Number *" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <input type="text" id="address" className="w-full px-4 py-3 bg-stone-50 rounded border border-brand-900/10 text-sm outline-none focus:border-accent-600 transition" placeholder="Property Address" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <select id="service" className="w-full px-4 py-3 bg-stone-50 rounded border border-brand-900/10 text-sm outline-none focus:border-accent-600 transition">
                        <option>Service Needed...</option>
                        <option>Lawn Maintenance & Mowing</option>
                        <option>Landscaping Design & Install</option>
                        <option>Lot & Land Clearing</option>
                        <option>Property Maintenance</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <textarea id="message" rows={4} className="w-full px-4 py-3 bg-stone-50 rounded border border-brand-900/10 text-sm outline-none focus:border-accent-600 transition resize-none" placeholder="Project details..."></textarea>
                    </div>
                    <div className="sm:col-span-2 flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <input id="follow-up" type="checkbox" className="w-4 h-4 text-accent-600 bg-stone-50 border-brand-900/20 rounded focus:ring-accent-500 focus:ring-2" />
                      </div>
                      <label htmlFor="follow-up" className="text-sm text-stone-600">
                        Request a follow-up phone call
                      </label>
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <button type="submit" className="w-full px-8 py-4 bg-accent-600 hover:bg-accent-700 text-stone-50 rounded font-bold text-sm uppercase transition-colors shadow-md flex items-center justify-center gap-2">
                        Send Request <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-stone-50/60 py-16 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center text-stone-50">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-xl uppercase tracking-tight text-stone-50 leading-none">Central Alabama</h2>
                <p className="text-[10px] tracking-widest uppercase opacity-70">Land Care</p>
              </div>
            </div>
            <p className="max-w-md mb-6 leading-relaxed font-light">
              Professional, reliable land care and landscaping services serving Montgomery and surrounding Central Alabama areas since 2005. 
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-widest font-bold text-accent-600">
              <span>AL GC Lic #39907</span>
              <span>Insured & Bonded</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-stone-50 text-sm uppercase tracking-widest mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="tel:3342795390" className="flex items-center gap-3 hover:text-stone-50 transition">
                  <Phone className="w-4 h-4" />
                  (334) 279-5390
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                Montgomery, Alabama
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                Mon-Sat: 7:00 AM - 6:00 PM
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-stone-50 text-sm uppercase tracking-widest mb-4">Service Area</h3>
            <ul className="space-y-2 text-sm">
              <li>Montgomery</li>
              <li>Mount Meigs</li>
              <li>Waugh</li>
              <li>Pike Road</li>
              <li>Cecil</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-brand-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-50/60 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Central Alabama Land Care. All Rights Reserved.</p>
          <button 
            onClick={() => {
              const pass = prompt('Enter admin password (hint: "admin"):');
              if (pass === 'admin') setIsAdmin(!isAdmin);
            }} 
            className="flex items-center gap-2 hover:text-stone-50 transition animate-none"
          >
            <Lock className="w-3 h-3" /> {isAdmin ? 'Exit Admin Mode' : 'Admin Login'}
          </button>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-brand-900/10 z-50 flex gap-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <a 
          href="tel:3342795390"
          className="flex-1 flex items-center justify-center gap-2 bg-brand-900 text-stone-50 py-3.5 rounded font-bold uppercase text-sm transition active:scale-95 animate-none"
        >
          <Phone className="w-5 h-5" /> Call Now
        </a>
        <button
          onClick={scrollToQuote}
          className="flex-1 flex items-center justify-center gap-2 bg-accent-600 text-stone-50 py-3.5 rounded font-bold uppercase text-sm transition active:scale-95 animate-none"
        >
           Get Quote
        </button>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/13342795390?text=I%27m%20interested%20in%20your%20landscaping%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform right-4 bottom-[88px] md:right-8 md:bottom-8 animate-none"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {/* Add padding to body to account for mobile sticky footer */}
      <style>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </div>
  );
}
