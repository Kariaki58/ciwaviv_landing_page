// app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

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

  const setRef = (section) => (el) => {
    sectionRefs.current[section] = el;
  };

  const ScrollAnimation = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [delay]);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 transform ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0fdff] font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-gray-800">Ciwaviv</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['about', 'values', 'services', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`transition-colors ${
                  activeSection === section ? 'text-[#00ffff] font-semibold' : 'text-gray-700 hover:text-[#00ffff]'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#00ffff] transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

          {/* Desktop CTA Button */}
          <button className="hidden md:block bg-[#00ffff] text-gray-900 px-6 py-2 rounded-full hover:bg-[#00e6e6] transition-colors text-base font-semibold">
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              {['about', 'values', 'services', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors ${
                    activeSection === section ? 'text-[#00ffff] font-semibold' : 'text-gray-700 hover:text-[#00ffff]'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <button className="bg-[#00ffff] text-gray-900 px-6 py-3 rounded-full hover:bg-[#00e6e6] transition-colors text-base font-semibold mt-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      <section ref={setRef('home')} className="pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 relative overflow-hidden">
        {/* Highly Visible Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff20_1px,transparent_1px),linear-gradient(to_bottom,#00ffff20_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent_70%)]"></div>
        
        {/* Optional: Add a subtle animated pulse */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff40_1px,transparent_1px),linear-gradient(to_bottom,#00ffff40_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent_70%)] animate-pulse-slow"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Elevate Your 
            <span className="text-[#00ffff]"> Wellness</span> 
            Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Quality sports, physiotherapy, and health equipment empowering individuals, 
            clinics, and gyms across Nigeria to achieve fitness and recovery goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="bg-[#00ffff] text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#00e6e6] transition-all transform hover:scale-105 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl">
              Explore Products
            </button>
            <button className="border-2 border-[#00ffff] text-[#00ffff] px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#00ffff] hover:text-gray-900 transition-all text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <ScrollAnimation>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-[#00ffff] mb-2">500+</div>
                <div className="text-gray-600 text-sm sm:text-base">Products Available</div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-[#00ffff] mb-2">100+</div>
                <div className="text-gray-600 text-sm sm:text-base">Partner Brands</div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-[#00ffff] mb-2">50+</div>
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
                  Fithub Co. Ltd is a Nigerian company dedicated to promoting wellness through 
                  quality sports, physiotherapy, and health equipment. We partner with trusted brands 
                  to provide durable, affordable, and effective products.
                </p>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Our mission is simple: to make fitness and rehabilitation accessible to everyone while 
                  supporting a culture of health, strength, and resilience.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="bg-[#00ffff] bg-opacity-20 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium">Quality Equipment</div>
                  <div className="bg-[#00ffff] bg-opacity-20 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium">Trusted Brands</div>
                  <div className="bg-[#00ffff] bg-opacity-20 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium">Expert Support</div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="relative">
                <div className="flex items-center justify-center overflow-hidden relative">
                  <img 
                    src="/fithub_6.jpg" 
                    alt="Ciwaviv Community - People exercising and using fitness equipment"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl"></div> */}
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00ffff] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">🛡️</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quality You Can Trust</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Every product meets high standards for safety and performance, ensuring 
                  reliability for all your wellness needs.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="text-center p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00ffff] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">💡</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Innovation That Inspires</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  We constantly seek new ways to enhance wellness experiences through 
                  cutting-edge equipment and solutions.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={400}>
              <div className="text-center p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00ffff] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">🤝</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Community & Care</h3>
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
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏠</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Individual Users</h3>
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
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏥</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Clinics & Gyms</h3>
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
      <section className="py-16 sm:py-20 bg-[#00ffff]">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Transform Your Wellness Journey?
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 font-medium">
              Join thousands of satisfied customers across Nigeria who trust FitHub 
              for their health and fitness equipment needs.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={400}>
            <button className="bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-gray-800 transition-colors text-base sm:text-lg">
              Get Started Today
            </button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={setRef('contact')} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#00ffff] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl">🏢</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Head Office</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Benin Asaba Express Way<br />
                  By Koka Junction<br />
                  Asaba, Delta State
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#00ffff] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl">📍</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Branch Office</h3>
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
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#00ffff] rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-xs sm:text-sm">FH</span>
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
                <li><a href="#about" className="hover:text-[#00ffff] transition-colors">About</a></li>
                <li><a href="#values" className="hover:text-[#00ffff] transition-colors">Values</a></li>
                <li><a href="#services" className="hover:text-[#00ffff] transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-[#00ffff] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>Email: info@fithubhealth.com</li>
                <li>Phone: +234 XXX XXX XXXX</li>
                <li>Hours: Mon-Sat 8AM-6PM</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00ffff] hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-white text-sm sm:text-base">f</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00ffff] hover:text-gray-900 transition-colors cursor-pointer">
                  <span className="text-white text-sm sm:text-base">t</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00ffff] hover:text-gray-900 transition-colors cursor-pointer">
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