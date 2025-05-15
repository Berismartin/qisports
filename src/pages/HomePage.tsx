import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLocation, Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero image data
const heroImages = [
  //   '/images/Amasaza (3).jpg',
  //   '/images/Amasaza (3).jpg',
  //   '/images/Amasaza (5).jpg',
  '/images/Qi logo Grn.png'
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

// Work examples - REMOVED
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


export default function HomePage() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImagesContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // GSAP ScrollTrigger Animations for sections (fade in and slide up)
    const sections = gsap.utils.toArray('section:not(#home)'); // Exclude hero for this animation
    sections.forEach(section => {
      gsap.fromTo(section as HTMLElement,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section as HTMLElement,
            start: 'top bottom', 
            end: 'top center', 
            scrub: true, 
          }
        }
      );

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
            stagger: 0.03,
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

    // Hero carousel animation
    if (heroImagesContainerRef.current) {
        const heroImagesElements = gsap.utils.toArray('.hero-carousel-item', heroImagesContainerRef.current);
        const dots = gsap.utils.toArray('.carousel-dot');
        const imageWidth = window.innerWidth; 
        const totalImages = heroImagesElements.length;
        let currentIndex = 0;
        let autoScrollInterval: any = null;

        const goToSlide = (index: number) => {
          currentIndex = index;
          gsap.to(heroImagesContainerRef.current, {
            x: -index * imageWidth,
            duration: 0.8,
            ease: 'power2.inOut'
          });

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

        dots.forEach((dot, index) => {
          (dot as HTMLElement).addEventListener('click', () => {
            goToSlide(index);
            resetAutoScroll();
          });
        });

        if (dots.length > 0 && dots[0]) { // Check if dots[0] exists
          (dots[0] as HTMLElement).classList.add('opacity-100');
          (dots[0] as HTMLElement).classList.remove('opacity-50');
        }
        
        const leftArrow = document.querySelector('.carousel-arrow.left');
        const rightArrow = document.querySelector('.carousel-arrow.right');

        leftArrow?.addEventListener('click', () => {
          const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
          goToSlide(prevIndex);
          resetAutoScroll();
        });

        rightArrow?.addEventListener('click', () => {
          const nextIndex = (currentIndex + 1) % totalImages;
          goToSlide(nextIndex);
          resetAutoScroll();
        });

        const startAutoScroll = () => {
          if (totalImages > 1) { // Only start auto-scroll if there's more than one image
            autoScrollInterval = setInterval(() => {
              const nextIndex = (currentIndex + 1) % totalImages;
              goToSlide(nextIndex);
            }, 5000);
          }
        };

        const resetAutoScroll = () => {
          clearInterval(autoScrollInterval);
          startAutoScroll();
        };
        
        startAutoScroll();

        return () => {
          clearInterval(autoScrollInterval);
        };
    }

    // Simple initial loading animation for hero content
     if (heroContentRef.current) {
      gsap.from(heroContentRef.current, { opacity: 0, duration: 1.5, delay: 0.5, ease: 'power2.out' });
    }

    // Parallax effect for hero images on scroll
    if (heroImagesContainerRef.current && totalImages > 0) { // Check totalImages
        gsap.to(heroImagesContainerRef.current, {
            y: () => -(heroImagesContainerRef.current!.offsetHeight * 0.2),
            ease: 'none',
            scrollTrigger: {
                trigger: '#home', 
                start: 'top top', 
                end: 'bottom top', 
                scrub: true, 
            }
        });
    }

    // Staggered entry animation for Service Items
    gsap.from('#services .service-item-card', { // Added specific class for targeting
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
    // gsap.from('#work .work-item-card', { // Added specific class for targeting
    //     opacity: 0,
    //     y: 50,
    //     stagger: 0.1,
    //     duration: 0.6,
    //     ease: 'power2.out',
    //     scrollTrigger: {
    //         trigger: '#work',
    //         start: 'top 80%',
    //         toggleActions: 'play none none none',
    //     }
    // });

  }, []);

  // useEffect for handling scroll to hash
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1); // Remove #
      const targetElement = document.getElementById(targetId);
      const headerElement = document.querySelector('header'); // Get header element
      const headerHeight = headerElement ? headerElement.offsetHeight : 0;

      if (targetElement) {
        gsap.to(window, {
          scrollTo: { y: targetElement, offsetY: headerHeight + 20 }, // Added offset
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.2 // Small delay to allow layout to settle
        });
      }
    }
  }, [location.hash]); // Rerun when hash changes

  const totalImages = heroImages.length; // Define totalImages here for use in JSX

  return (
    <>
      {/* Hero Section with Carousel */}
      <section id="home" className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel Images Container */}
        {totalImages > 0 && (
          <div ref={heroImagesContainerRef} className="absolute top-0 left-0 w-full h-full flex" style={{ width: `${totalImages * 100}vw` }}>
            {heroImages.map((imgSrc, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 hero-carousel-item"
                style={{ width: `100vw` }}
              >
                <img
                  src={imgSrc}
                  alt={`Sports Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* Hero Content Wrapper */}
        <div className="relative z-10 text-center max-w-4xl px-4 text-white" ref={heroContentRef}>
          <p>We are</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-2">
            {splitText("QI ")}
          </h1>
          <h1 className="text-4xl md:text-7xl font-bold mb-2">
            {splitText("SPORTS")}
          </h1>
          <h1 className="text-4xl md:text-7xl font-bold mb-2">
            {splitText("MANAGEMENT")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#A7C840]">
            {("Africa next great frontier of sports industry. We are at the vanguard of this revolution")}
          </p>
          <div>
            <Link to="/#services" className="inline-block bg-[#A7C840] text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              Our Services
            </Link>
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        {totalImages > 1 && (
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className="w-3 h-3 bg-white rounded-full opacity-50 focus:outline-none hover:opacity-75 transition-opacity carousel-dot"
                data-index={index}
              ></button>
            ))}
          </div>
        )}

        {/* Carousel Arrows */}
        {totalImages > 1 && (
          <>
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
          </>
        )}
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-[#2F2B2B] text-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {splitText("Our Services")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-[#3A3A3A] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow service-item-card" // Added class
              >
                <h3 className="text-xl font-bold mb-3 text-[#A7C840]">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Gallery Section - REMOVED */}
      
      <section id="work" className="py-24 px-4 bg-[#2F2B2B] text-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {splitText("Our Work")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workExamples.map((category) => (
              <div
                key={category.category}
                className="hover:scale-105 transition-transform duration-300 ease-in-out work-item-card" // Added class
              >
                <div className="bg-[#3A3A3A] h-56 rounded-t-lg overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#3A3A3A] p-5 rounded-b-lg shadow">
                  <h3 className="font-bold text-lg mb-2 text-[#A7C840]">{category.category}</h3>
                  <ul className="text-gray-300">
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
      <section id="csr" className="py-24 px-4 bg-[#A7C840] text-black">
        <div className="max-w-6xl mx-auto"> {/* Adjusted max-width for potentially wider content */}
          <h2 className="text-4xl font-bold text-center mb-12 md:mb-16">
            {splitText("Community Impact")}
          </h2>
          <div className="md:flex md:items-center md:gap-8 lg:gap-12"> {/* Flex container for two columns */}
            <div className="md:w-1/2 mb-8 md:mb-0 text-left"> {/* Text column */}
              <p className="text-xl md:text-lg leading-relaxed">
                We offer technical and material support to Hoops of Hope, a Community Development Organisation in Pader district
                started by Mr. Ochan Moses, which uses basketball as a tool to effect change in Education and Agriculture for
                the youth in the community.
              </p>
              <p className="text-xl md:text-lg leading-relaxed mt-4">
                This initiative not only fosters athletic skills but also provides crucial life skills, educational support, 
                and sustainable agricultural practices, contributing significantly to the well-being and future prospects of the youth in Pader.
              </p>
              <div className="mt-8">
                <Link to="/contact" className="inline-block bg-[#1E1E1E] text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors text-base">
                  Partner With Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2"> {/* Image column */}
              <img 
                src="/images/2B - ON THE FIELD, COURT & RING - We provide downstream solutions to deliver amazing fan experiences and Sports products in the African market.jpg" 
                alt="Hoops of Hope community activity" 
                className="rounded-lg shadow-xl w-full h-auto object-cover mx-auto" 
                style={{ maxHeight: '450px' }} // Constrain image height if needed
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 