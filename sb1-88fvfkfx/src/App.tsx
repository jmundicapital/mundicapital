import React from 'react';
import { ArrowDown, ArrowRight, Building2, BarChart as ChartBar, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'thesis', 'team', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = {
      to_email: 'jose@mundi.capital',
      from_name: form.name.value,
      from_email: form.email.value,
      message: form.message.value,
    };

    try {
      await emailjs.send(
        'default_service',
        'template_default',
        formData,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      setFormStatus('success');
      form.reset();
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Building2 className="h-8 w-8 text-navy-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Mundi Capital</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'thesis', 'team', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`${
                    activeSection === item
                      ? 'text-navy-600 border-b-2 border-navy-600'
                      : 'text-gray-500 hover:text-gray-900'
                  } px-1 py-2 text-sm font-medium capitalize transition-colors duration-200`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'about', 'thesis', 'team', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Modern building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Visionary Capital for Game-Changing Companies
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Mundi Capital empowers founders and businesses with capital, strategy, and growth expertise.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 transition-colors duration-200"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
        
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        >
          <ArrowDown className="h-8 w-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Team meeting"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
                At Mundi Capital, we believe in the transformative power of visionary entrepreneurs. Our mission is to identify, invest in, and nurture exceptional businesses that are reshaping industries and creating lasting impact.
              </p>
              <p className="text-lg text-gray-600">
                With a founder-first approach and deep operational expertise, we provide more than just capital. We're partners in growth, offering strategic guidance, industry connections, and the resources needed to scale successfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section id="thesis" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Investment Thesis</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                We acquire minority stakes in Amazon FBA brands at 2-3x EBITDA, then create brand omnipresence by expanding to Shopify, livestream selling, influencer marketing, paid ads, and retail. This transforms the brand from Amazon-dependent to a multi-channel powerhouse, increasing both revenue and valuation multiples to 5-10x EBITDA. By holding for 3-5 years, we aim to 3x investor capital through growth and strategic exits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Jose Rodriguez */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img
                src="https://static.wixstatic.com/media/2147fc_9a11a8bb95d947b6ab79d56822370675~mv2.png/v1/crop/x_36,y_2,w_557,h_557/fill/w_286,h_286,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202023-08-19%20at%206_06_53%20PM.png"
                alt="Jose Rodriguez"
                className="w-48 h-48 mx-auto rounded-full object-cover mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Jose Rodriguez</h3>
              <p className="text-lg text-navy-600 mb-4">Managing Partner</p>
              <p className="text-gray-600">
                With over 15 years of experience in private equity and venture capital,
                Jose leads our investment strategy and portfolio management.
              </p>
            </div>

            {/* Adam Carlo */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img
                src="https://static.wixstatic.com/media/2147fc_d4b0ee418fd34857bcf8ce3c39f13b20~mv2.png/v1/crop/x_0,y_0,w_1060,h_1061/fill/w_286,h_286,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2147fc_d4b0ee418fd34857bcf8ce3c39f13b20~mv2.png"
                alt="Adam Carlo"
                className="w-48 h-48 mx-auto rounded-full object-cover mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Adam Carlo</h3>
              <p className="text-lg text-navy-600 mb-4">Managing Partner</p>
              <p className="text-gray-600">
                Adam brings deep operational expertise and a track record of scaling
                technology companies from startup to market leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Let's Build Something Extraordinary</h2>
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;