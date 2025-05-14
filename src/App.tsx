import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { motion, AnimatePresence } from "framer-motion"; // Removing Framer Motion

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Navigation links for the sports website
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

// Hero image data (placeholders)
const heroImages = [
  '/images/Amasaza (3).jpg',
  '/images/Amasaza (3).jpg',
  '/images/Amasaza (5).jpg',
];

// Services data
const services = [
  {
    title: "Marketing & Representation",
    description: "We offer expert guidance to brands and individuals looking to participate in African sports or grow their operations through sports sponsorships, business partnerships, and investments. We enable athletes and teams to optimize earnings from their profiles off the field, court, and track."
  },
  {
    title: "Matchmaking",
    description: "We attach brands and organisations to the right projects for sponsorship, partnership and social responsibility support, and steward these partnerships to ensure optimal delivery and return on investment. We vet and train sportspeople, teams and sports projects to deliver you well prepared brand ambassadors."
  },
  {
    title: "Sports Project Management",
    description: "We develop and operate our own sports properties, including sports events, conferences, media content, and campaigns. We also help those who have ideas for sports event or projects to bring them to fruition and profitability."
  },
  {
    title: "Research & Advisory",
    description: "Our team possesses expertise in varied fields including sports journalism, marketing and research, and we can be contracted to carry out market research in any sports related field in Uganda and Africa."
  },
  {
    title: "Facilities",
    description: "We work with private sector players to develop, update and manage well-planned sports facilities to maximize profitability and social impact."
  },
  {
    title: "Social Responsibility",
    description: "We guide brands, organizations and individuals looking to ideate and execute sports-driven community initiatives, and provide general advisory services on how sports can be best employed to deliver Environmental, Social and Governance objectives."
  }
];

// Work examples with placeholders for images
const workExamples = [
  {
    category: "Sponsorship Management",
    projects: ["StarTimes Falcons", "Amasaza Of Tooro"],
    imageUrl: "/images/TBI_3228.jpg"
  },
  {
    category: "Events",
    projects: ["Mbarara Golf Safari 2017", "Mbale Conservation Week", "FNL IX"],
    imageUrl: "/images/Amasaza (6).jpg"
  },
  {
    category: "Talent",
    projects: ["Patricia Apolot", "Nobert Okeny", "Ash & Timo Hockey"],
    imageUrl: "/images/Amasaza (5).jpg"
  },
  {
    category: "Facilities",
    projects: ["Great Outdoors"],
    imageUrl: "/images/FNL.jpg"
  },
  {
    category: "Media & Content",
    projects: ["7s Rugby", "Social Media"],
    imageUrl: "/images/TBI_3257.jpg"
  },
  {
    category: "CSR",
    projects: ["Hoops of Hope - Pader district"],
    imageUrl: "/images/TBI_3257.jpg"
  }
];

// Helper function to split text for animation
const splitText = (text: string) => {
  return text.split(" ").map((word, wordIndex) => (
    <span key={word + '-' + wordIndex} className="inline-block overflow-hidden">
      <span className="inline-block" style={{ display: 'inline-block' }}>
        {word + (wordIndex < text.split(" ").length - 1 ? " " : "")}
      </span>
    </span>
  ));
};

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroImagesContainerRef = useRef<HTMLDivElement>(null); // Ref for the container
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Get header height for scroll offset
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

    // GSAP ScrollTrigger Animations for sections (fade in and slide up)
    const sections = gsap.utils.toArray('section:not(#home)'); // Exclude hero for this animation
    sections.forEach(section => {
      gsap.fromTo(section as HTMLElement, 
        { opacity: 0, y: 50 }, // Adjusted y for a slightly less dramatic slide
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, // Slightly faster duration
          ease: 'power2.out', // Added ease
          scrollTrigger: {
            trigger: section as HTMLElement,
            start: 'top bottom', // Start when the top of the section hits the bottom of the viewport
            end: 'top center', // End when the top of the section hits the center of the viewport
            scrub: true, // Link animation progress to scroll position
          }
        }
      );

      // Text split animation for headings within sections
      const headings = (section as HTMLElement).querySelectorAll('h2, h3');
      headings.forEach(heading => {
        const words = heading.textContent?.split(' ');
        if (words) {
          let htmlContent = '';
          words.forEach((word, index) => {
            htmlContent += `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block;" class="word-animate">${word}${index < words.length - 1 ? ' ' : ''}</span></span>`;
          });
          heading.innerHTML = htmlContent;

          gsap.from(heading.querySelectorAll('.word-animate'), {
            y: '100%',
            duration: 0.5,
            stagger: 0.03, // Slightly reduced stagger
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading as HTMLElement,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        }
      });

    });

     // Smooth scrolling for navigation links with offset
     gsap.utils.toArray('nav a').forEach((link: any) => {
        const target = link.getAttribute('href');
        if (!target || target === '#') return;
        link.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            gsap.to(window, { scrollTo: { y: target, offsetY: headerHeight + 10 }, duration: 0.8, ease: "power2.inOut" }); // Added a little extra offset
        });
    });

    // Header animation (initially transparent, becomes solid on scroll)
    gsap.to('header', {
        backgroundColor: 'rgba(255, 255, 255, 1)', // Solid white on scroll
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Add shadow
        duration: 0.3,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: mainRef.current, // Use the main content as the trigger
            start: 'top top+=100', // Trigger after scrolling 100px past the top
            toggleActions: 'play none none reverse',
            onEnter: () => { gsap.to('header nav a', { color: '#4A4A5A', duration: 0.3 }); gsap.to('header .logo-text', { color: '#4A4A5A', duration: 0.3 }); }, // Change text color to qiDark
            onLeaveBack: () => { gsap.to('header nav a', { color: 'rgba(255, 255, 255, 0.8)', duration: 0.3 }); gsap.to('header .logo-text', { color: 'rgba(255, 255, 255, 0.8)', duration: 0.3 }); } // Change text color back to white
        }
    });

    // Initial state for header and navigation links
    gsap.set('header', { backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: 'none' });
    gsap.set('header nav a', { color: 'rgba(255, 255, 255, 0.8)' }); // Initial text color white
    gsap.set('header .logo-text', { color: 'rgba(255, 255, 255, 0.8)' }); // Initial text color white

    // Hero carousel animation
    if (heroImagesContainerRef.current) {
        const heroImagesElements = gsap.utils.toArray('.hero-carousel-item', heroImagesContainerRef.current);
        const dots = gsap.utils.toArray('.carousel-dot');
        const imageWidth = window.innerWidth; // Get the viewport width for animation
        const totalImages = heroImagesElements.length;
        let currentIndex = 0;
        let autoScrollInterval: any = null; // To hold the interval ID

        // Function to animate to a specific image
        const goToSlide = (index: number) => {
          currentIndex = index; // Update current index
          gsap.to(heroImagesContainerRef.current, {
            x: -index * imageWidth, // Animate to the left based on index and viewport width
            duration: 0.8,
            ease: 'power2.inOut'
          });

          // Update active dot class
          dots.forEach((dot, i) => {
            if (i === index) {
              (dot as HTMLElement).classList.add('opacity-100');
              (dot as HTMLElement).classList.remove('opacity-50');
            } else {
              (dot as HTMLElement).classList.remove('opacity-100');
              (dot as HTMLElement).classList.add('opacity-50');
            }
          });
        };

        // Add click listeners to dots
        dots.forEach((dot, index) => {
          (dot as HTMLElement).addEventListener('click', () => {
            goToSlide(index);
            resetAutoScroll(); // Reset auto-scroll on manual interaction
          });
        });

        // Set initial active dot
        if (dots.length > 0) {
          (dots[0] as HTMLElement).classList.add('opacity-100');
          (dots[0] as HTMLElement).classList.remove('opacity-50');
        }

        // Arrow Navigation
        const leftArrow = document.querySelector('.carousel-arrow.left');
        const rightArrow = document.querySelector('.carousel-arrow.right');

        leftArrow?.addEventListener('click', () => {
          const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
          goToSlide(prevIndex);
          resetAutoScroll(); // Reset auto-scroll on manual interaction
        });

        rightArrow?.addEventListener('click', () => {
          const nextIndex = (currentIndex + 1) % totalImages;
          goToSlide(nextIndex);
          resetAutoScroll(); // Reset auto-scroll on manual interaction
        });

        // Auto-scrolling
        const startAutoScroll = () => {
          autoScrollInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalImages;
            goToSlide(nextIndex);
          }, 5000); // Auto-scroll every 5 seconds
        };

        const resetAutoScroll = () => {
          clearInterval(autoScrollInterval);
          startAutoScroll(); // Restart auto-scroll
        };

        // Start auto-scroll on component mount
        startAutoScroll();

        // Cleanup interval on component unmount
        return () => {
          clearInterval(autoScrollInterval);
        };
    }

    // Simple initial loading animation (fade in the main content wrapper)
     if (mainRef.current) {
      gsap.from('main', { opacity: 0, duration: 1.5, delay: 0.5, ease: 'power2.out' });
    }

    // Parallax effect for hero images on scroll
    if (heroImagesContainerRef.current) {
        gsap.to(heroImagesContainerRef.current, {
            y: () => -heroImagesContainerRef.current!.offsetHeight * 0.2, // Move up 20% of its height
            ease: 'none',
            scrollTrigger: {
                trigger: '#home', // The hero section is the trigger
                start: 'top top', // Start when the top of the trigger hits the top of the viewport
                end: 'bottom top', // End when the bottom of the trigger leaves the top of the viewport
                scrub: true, // Link animation progress to scroll position
            }
        });
    }

    // Staggered entry animation for Service Items
    gsap.from('#services .bg-white', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
            toggleActions: 'play none none none',
        }
    });

    // Staggered entry animation for Work Examples
    gsap.from('#work > div > div', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#work',
            start: 'top 80%',
            toggleActions: 'play none none none',
        }
    });

  }, []);

  return (
    <div className="min-h-screen bg-qiYellow font-sans">
      {/* Fixed Header/Nav */}
      <header ref={headerRef} className="fixed w-full z-50 top-0 left-0">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center">
            {/* Replace with your logo image - Ensure it's in public/images */}
            <img src="/images/Qi logo Grn.png" alt="QI Sports Logo" className="h-10 mr-3" /> 
            <div className="text-2xl font-bold logo-text">
               QI SPORTS <span className="text-sm font-light">est. 2011</span> {/* Text color will be animated by GSAP */}
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium transition-colors hover:text-qiGreen"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-qiDark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section with Carousel */}
      <section id="home" className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel Images Container */}
        <div ref={heroImagesContainerRef} className="absolute top-0 left-0 w-full h-full flex" style={{ width: `${heroImages.length * 100}vw` }}>
          {heroImages.map((imgSrc, index) => (
            <div 
              key={index} 
              className="w-full h-full flex-shrink-0 hero-carousel-item" // Changed class name
              style={{ width: `100vw` }} // Ensure each item is full viewport width
            >
              <img 
                src={imgSrc} 
                alt={`Sports Image ${index + 1}`} 
                className="w-full h-full object-cover" // Use object-cover to maintain aspect ratio
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* Hero Content Wrapper */}
        <div className="relative z-10 text-center max-w-4xl px-4 text-white" ref={mainRef}> {/* Added ref here */}
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {splitText("QI SPORTS")}
          </h1>
          <p
            className="text-xl md:text-2xl mb-8"
          >
            {splitText("Developing innovative, cost-conscious solutions to create opportunities for Africa's sports industry since 2011")}
          </p>
          <div>
            <a href="#about" className="inline-block bg-qiGreen text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              Our Mission
            </a>
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 bg-white rounded-full opacity-50 focus:outline-none hover:opacity-75 transition-opacity carousel-dot"
              data-index={index} // Use data-index to identify the dot
            ></button>
          ))}
        </div>

        {/* Carousel Arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity focus:outline-none carousel-arrow left"
          aria-label="Previous Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity focus:outline-none carousel-arrow right"
          aria-label="Next Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </section>

      <main>
        {/* About Section */}
        <section id="about" className="py-24 px-4 bg-white text-qiDark">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              {splitText("About Us")}
            </h2>
            <div className="text-center space-y-6 text-lg">
              <p className="leading-relaxed">
                <span className="font-semibold text-qiGreen">QI SPORTS</span>
                <br/>
                EST: 2011<br/>
                REGISTERED: 2013<br/>
                UG. REG NO: 170893
                <br/><br/>
                Qi Sports is a full service Sports Agency which develops and delivers innovative, 
                cost-conscious solutions to create opportunities for Brands, Institutions, 
                Sportspeople and Investors in Africa's sports industry.
              </p>
              <h3 className="text-2xl font-bold mt-12 mb-6 text-qiGreen">What We Do</h3>
              <ul className="text-left list-disc list-inside space-y-4 text-gray-700">
                <li>
                  <span className="font-semibold text-qiGreen">For Brands</span> – We develop strategies, steward campaigns and optimise the 
                  value realized from and impact of your sponsorships and partnerships using 
                  sports and sports-entertainment properties in African markets.
                </li>
                <li>
                  <span className="font-semibold text-qiGreen">For Organisations/ Companies</span> – We use sports to deliver the highest 
                  impact messaging and experiences for internal audiences, external 
                  audiences and communities, from ideation to implementation.
                </li>
                <li>
                  <span className="font-semibold text-qiGreen">For Investors</span> – Qi Sports enables you make informed, data-driven and 
                  technology-driven decisions about investing in Ugandan and African sport, 
                  and proceed to steward and manage the performance of your investments.
                </li>
                <li>
                  <span className="font-semibold text-qiGreen">For Sportspeople/ Teams</span> – We provide guidance to help orient your career 
                  and maximize earnings from your talent on and off the pitch/ track/ court.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-4 bg-gray-100 text-qiDark">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
               {splitText("Our Services")}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-qiGreen">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Gallery Section */}
        <section id="work" className="py-24 px-4 bg-qiYellow text-qiDark">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              {splitText("Our Work")}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workExamples.map((category, index) => (
                <div
                  key={category.category}
                  className="hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="bg-gray-100 h-56 rounded-t-lg overflow-hidden">
                    <img 
                      src={category.imageUrl} 
                      alt={category.category} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white p-5 rounded-b-lg shadow">
                    <h3 className="font-bold text-lg mb-2 text-qiGreen">{category.category}</h3>
                    <ul className="text-gray-700">
                      {category.projects.map((project, i) => (
                        <li key={i} className="mb-1">{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CSR Highlight */}
        <section className="py-24 px-4 bg-qiGreen text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              {splitText("Community Impact")}
            </h2>
            <p className="text-xl mb-8">
              We offer technical and material support to Hoops of Hope, a Community Development Organisation in Pader district 
              started by Mr. Ochan Moses, which uses basketball as a tool to effect change in Education and Agriculture for 
              the youth in the community.
            </p>
            <a href="#contact" className="inline-block bg-qiDark text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              Partner With Us
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 bg-white text-qiDark">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
               {splitText("Get In Touch")}
            </h2>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-qiGreen">Contact Information</h3>
                  <div className="space-y-4">
                    <p><span className="font-medium">Email:</span> info@qisports.com</p>
                    <p><span className="font-medium">Phone:</span> +256 700 000000</p>
                    <p><span className="font-medium">Address:</span> Kampala, Uganda</p>
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium mb-2 text-qiGreen">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-qiDark hover:text-qiGreen transition-colors">
                        {/* Facebook icon */}
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="#" className="text-qiDark hover:text-qiGreen transition-colors">
                        {/* Instagram icon */}
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="#" className="text-qiDark hover:text-qiGreen transition-colors">
                        {/* Twitter icon */}
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-qiGreen">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-qiGreen" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-qiGreen" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-qiGreen"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-qiGreen text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors font-medium">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-qiDark text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-xl font-bold mb-6 md:mb-0">QI SPORTS</div>
              <div className="text-sm text-gray-300">© {new Date().getFullYear()} QI SPORTS. All rights reserved.</div>
            </div>
          </div>
        </footer>

        {/* CSS for scroll animations - Can be removed or adjusted based on GSAP */}
        <style>
          {`
          /* These styles are less relevant with GSAP handling animations */
          /* .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
          }
          
          .animate-on-scroll.show {
            opacity: 1;
            transform: translateY(0);
          } */
          `}
        </style>
      </main>
    </div>
  );
}
