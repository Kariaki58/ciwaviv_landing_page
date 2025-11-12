'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Dumbbell, Shield, Lightbulb, Users, Home, Building, MapPin, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

interface SectionRefs {
  [key: string]: HTMLElement | null;
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const sectionRefs = useRef<SectionRefs>({});

  const router = useRouter();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'values', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to set section refs
  const setRef = (section: string) => (el: HTMLElement | null) => {
    sectionRefs.current[section] = el;
  };

  // Smooth scroll handler
  const handleScrollToSection = (section: string) => {
    setIsMobileMenuOpen(false);
    const element = sectionRefs.current[section];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  // Scroll animation component
  const ScrollAnimation = ({ children, delay = 0 }: ScrollAnimationProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      if (ref.current) observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [delay]);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    );
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Building },
    { id: 'values', label: 'Values', icon: Shield },
    { id: 'services', label: 'Services', icon: Users },
    { id: 'contact', label: 'Contact', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0fdff] font-sans scroll-smooth">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-white/40 shadow-lg border-b border-white/20 py-2'
            : 'bg-transparent py-4'
        }`}

      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#265287] rounded-full flex items-center justify-center">
              <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-800">Ciwaviv</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={`transition-colors flex items-center space-x-1 ${
                  activeSection === item.id
                    ? 'text-[#265287] font-semibold'
                    : 'text-gray-700 hover:text-[#265287]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#265287] transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop CTA Button */}
          <button
            onClick={() => router.push('https://fithub.ng')}
            className="hidden md:flex items-center space-x-2 bg-[#265287] text-gray-50 px-6 py-2 rounded-full hover:bg-[#265287ce] transition-colors text-base font-semibold"
          >
            <span>Get Started</span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setIsMobileMenuOpen(false)} />

        {/* Sidebar */}
        <div className="relative w-80 max-w-full h-full bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#265287] rounded-full flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold text-gray-800">Ciwaviv</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-6">
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className="flex items-center space-x-3 p-3 rounded-lg transition-all text-gray-800 w-full text-left"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-lg">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              onClick={() => router.push('https://fithub.ng')}
              className="w-full mt-8 flex items-center justify-center space-x-2 bg-[#265287] text-gray-900 px-6 py-4 rounded-full hover:bg-[#00e6e6] transition-colors text-base font-semibold"
            >
              <span>Get Started</span>
            </button>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">admin@ciwaviv.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+234 XXX XXX XXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === HERO SECTION === */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff20_1px,transparent_1px),linear-gradient(to_bottom,#00ffff20_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff40_1px,transparent_1px),linear-gradient(to_bottom,#00ffff40_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent_70%)] animate-pulse-slow"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Elevate Your <span className="text-[#265287]">Wellness</span> Journey
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Quality sports, physiotherapy, and health equipment empowering individuals,
                clinics, and gyms across Nigeria to achieve fitness and recovery goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  className="bg-[#265287] text-gray-50 px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#265287ce] transition-all transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Explore Products
                </button>
                <button
                  className="border-2 border-[#265287] text-[#265287] px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#265287] hover:text-gray-900 transition-all text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/banner.png" 
                    alt="Fitness equipment and wellness products" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <ScrollAnimation>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-[#265287] mb-2">500+</div>
                <div className="text-gray-600 text-sm sm:text-base">Products Available</div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-[#265287] mb-2">100+</div>
                <div className="text-gray-600 text-sm sm:text-base">Partner Brands</div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-[#265287] mb-2">50+</div>
                <div className="text-gray-600 text-sm sm:text-base">Cities Served</div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={setRef('about')} className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <ScrollAnimation>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">About Ciwaviv</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Ciwaviv is a Nigerian company dedicated to promoting wellness through 
                  quality sports, physiotherapy, and health equipment. We partner with trusted brands 
                  to provide durable, affordable, and effective products.
                </p>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Our mission is simple: to make fitness and rehabilitation accessible to everyone while 
                  supporting a culture of health, strength, and resilience.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="bg-[#265287] bg-opacity-20 text-gray-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium">Quality Equipment</div>
                  <div className="bg-[#265287] bg-opacity-20 text-gray-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium">Trusted Brands</div>
                  <div className="bg-[#265287] bg-opacity-20 text-gray-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium">Expert Support</div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="relative">
                <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/fithub_6.jpg" 
                    alt="Ciwaviv Community - People exercising and using fitness equipment"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={setRef('values')} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <ScrollAnimation>
              <div className="text-center p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20  bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Shield className="w-8 h-8 sm:w-20 sm:h-20 text-[#265287]" />
                </div>
                <h3 className="text-lg text-gray-800 sm:text-xl font-bold mb-3 sm:mb-4">Quality You Can Trust</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Every product meets high standards for safety and performance, ensuring 
                  reliability for all your wellness needs.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="text-center p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Lightbulb className="w-8 h-8 sm:w-20 sm:h-20 text-[#265287]" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-800 font-bold mb-3 sm:mb-4">Innovation That Inspires</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  We constantly seek new ways to enhance wellness experiences through 
                  cutting-edge equipment and solutions.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={400}>
              <div className="text-center p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="w-8 h-8 sm:w-20 sm:h-20 text-[#265287]" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-800 font-bold mb-3 sm:mb-4">Community & Care</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Supporting both professionals and everyday users in their health journeys 
                  with personalized care and guidance.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={setRef('services')} className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollAnimation>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                {/* <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏠</div> */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 sm:mb-4">Individual Users</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  Transform your home into a personal wellness sanctuary with our 
                  carefully curated equipment for fitness enthusiasts and those on 
                  recovery journeys.
                </p>
                <ul className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                  <li>• Home gym equipment</li>
                  <li>• Personal recovery tools</li>
                  <li>• Fitness accessories</li>
                  <li>• Wellness monitoring devices</li>
                </ul>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                {/* <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏥</div> */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 sm:mb-4">Clinics & Gyms</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  Equip your professional space with reliable, high-performance 
                  equipment that meets the demands of your clients and patients.
                </p>
                <ul className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                  <li>• Professional gym equipment</li>
                  <li>• Physiotherapy tools</li>
                  <li>• Rehabilitation machines</li>
                  <li>• Commercial wellness solutions</li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#265287]">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-4 sm:mb-6">
              Ready to Transform Your Wellness Journey?
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-lg sm:text-xl text-gray-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 font-medium">
              Join thousands of satisfied customers across Nigeria who trust Ciwaviv 
              for their health and fitness equipment needs.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={400}>
            <button onClick={() => router.push("https://fithub.ng")} className="bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-gray-800 transition-colors text-base sm:text-lg">
              Get Started Today
            </button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section id="#contact" ref={setRef('contact')} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border">
                <div className="w-14 h-14 sm:w-16 sm:h-16  bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Building className="w-8 h-8 sm:w-12 sm:h-12 text-[#265287]" />
                </div>
                <h3 className="text-xl text-gray-800 sm:text-2xl font-bold mb-3 sm:mb-4">Head Office</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Benin Asaba Express Way<br />
                  By Koka Junction<br />
                  Asaba, Delta State
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-[#265287]" />
                </div>
                <h3 className="text-xl sm:text-2xl text-gray-800 font-bold mb-3 sm:mb-4">Branch Office</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  No 1 Uga Street<br />
                  Bridge Head Market<br />
                  Onitsha, Anambra State
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#265287] rounded-full flex items-center justify-center">
                  <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                </div>
                <span className="text-lg sm:text-xl font-bold">Ciwaviv</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Empowering wellness through quality equipment and trusted partnerships.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#about" className="hover:text-[#265287] transition-colors">About</a></li>
                <li><a href="#values" className="hover:text-[#265287] transition-colors">Values</a></li>
                <li><a href="#services" className="hover:text-[#265287] transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-[#265287] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>admin@ciwaviv.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+234 XXX XXX XXXX</span>
                </li>
                <li>Hours: Mon-Sat 8AM-6PM</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#265287] hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-white text-sm sm:text-base">f</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#265287] hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-white text-sm sm:text-base">t</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#265287] hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-white text-sm sm:text-base">i</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2024 Ciwaviv Co. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}