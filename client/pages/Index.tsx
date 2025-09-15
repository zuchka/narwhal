import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  PlayCircle,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { ContactCircle } from "../components/ContactCircle";

// Work item data
const workItems = [
  {
    id: 1,
    title: "Ocean Spray Rebrand",
    subtitle: "Full Brand Identity",
    videoUrl: "/placeholder.svg",
    imageUrl:
      "https://images.pexels.com/photos/7466999/pexels-photo-7466999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    title: "TechWave Summit",
    subtitle: "Digital Campaign",
    videoUrl: "/placeholder.svg",
    imageUrl:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    title: "Neon Dreams",
    subtitle: "Urban Fashion Film",
    videoUrl: "/placeholder.svg",
    imageUrl:
      "https://images.pexels.com/photos/722245/pexels-photo-722245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    title: "StartUp Launch",
    subtitle: "Product Reveal",
    videoUrl: "/placeholder.svg",
    imageUrl:
      "https://images.pexels.com/photos/30965502/pexels-photo-30965502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 5,
    title: "Brand Strategy Co.",
    subtitle: "Corporate Identity",
    videoUrl: "/placeholder.svg",
    imageUrl:
      "https://images.pexels.com/photos/7661184/pexels-photo-7661184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 6,
    title: "Digital Horizons",
    subtitle: "Social Campaign",
    videoUrl: "/placeholder.svg",
    imageUrl:
      "https://images.pexels.com/photos/8970684/pexels-photo-8970684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

// Media feed items
const mediaItems = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/4515793/pexels-photo-4515793.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
    title: "Behind the Scenes: Neon Dreams",
    date: "2 days ago",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/7640433/pexels-photo-7640433.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
    title: "Award Win: Creative Excellence",
    date: "1 week ago",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
    title: "Narwhal Studio Opening",
    date: "2 weeks ago",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/8970684/pexels-photo-8970684.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
    title: "Team Strategy Session",
    date: "3 weeks ago",
  },
];

// Team members
const teamMembers = [
  {
    name: "Alex Chen",
    role: "Creative Director",
    email: "alex@narwhal.studio",
  },
  {
    name: "Sarah Johnson",
    role: "Strategy Lead",
    email: "sarah@narwhal.studio",
  },
  {
    name: "Mike Williams",
    role: "Production Head",
    email: "mike@narwhal.studio",
  },
  { name: "Emma Davis", role: "New Business", email: "emma@narwhal.studio" },
];

export default function Index() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add any animations or interactions here
  }, []);

  return (
    <div className="min-h-screen bg-cream noise-overlay">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[60px]"
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-cream mix-difference z-10 pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-20 w-full px-4 md:px-[2vw] text-center">
          <div className="max-w-[90vw] mx-auto">
            <h1 className="font-title leading-none">
              <span className="block text-f-60 md:text-f-80 text-dark/80 mb-2 animate-fadeIn">
                We make
              </span>
              <span className="block text-f-120 md:text-f-180 text-red font-bold animate-fadeIn animation-delay-200 relative">
                Waves
                <span className="absolute -inset-2 bg-red/10 blur-2xl -z-10"></span>
              </span>
              <span className="block text-f-60 md:text-f-80 text-dark/80 mt-2 animate-fadeIn animation-delay-400">
                That break
              </span>
              <span className="block text-f-60 md:text-f-80 text-dark mb-8 animate-fadeIn animation-delay-600">
                The norm
              </span>
            </h1>

            {/* Decorative elements */}
            <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 w-[20vw] h-[20vw] bg-red rounded-full opacity-15 blur-3xl animate-pulse" />
            <div className="absolute left-[5vw] top-1/3 w-[15vw] h-[15vw] bg-dark rounded-full opacity-5 blur-3xl" />

            {/* Narwhal SVG Background - Right */}
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 opacity-[0.15] animate-fadeIn animation-delay-600 hover:opacity-[0.25] transition-opacity duration-700">
              <svg
                className="w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] text-dark animate-spin-slow"
                viewBox="0 0 100 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="scale(-1, 1) translate(-100, 0)">
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    d="M30.66,38.84c-1.21-0.33-1.92-1.58-1.59-2.79c0.33-1.21,1.57-1.93,2.78-1.6c1.21,0.33,1.92,1.58,1.59,2.79   C33.11,38.45,31.86,39.17,30.66,38.84z M37.5,48.78c-0.26-0.2-0.64-0.15-0.84,0.11c-0.2,0.26-0.15,0.64,0.11,0.84   c6.18,4.71,8.8,8.89,8.19,13.1c-5.46,0.65-9.78-2.04-13.19-8.19c-0.16-0.29-0.52-0.39-0.81-0.23c-0.29,0.16-0.39,0.52-0.23,0.81   c3.28,5.91,7.55,8.9,12.71,8.9c0.69,0,1.4-0.05,2.13-0.16c0.25-0.04,0.45-0.23,0.5-0.48C47.01,58.62,44.28,53.95,37.5,48.78z    M67.31,87.45H33.95c-0.33,0-0.6,0.27-0.6,0.6c0,0.33,0.27,0.6,0.6,0.6h33.37c0.33,0,0.6-0.27,0.6-0.6   C67.91,87.71,67.64,87.45,67.31,87.45z M47.75,81.04c0,0.33,0.27,0.6,0.6,0.6h15.97c0.33,0,0.6-0.27,0.6-0.6   c0-0.33-0.27-0.6-0.6-0.6H48.34C48.01,80.44,47.75,80.71,47.75,81.04z M92.56,73.23H60.55c-0.33,0-0.6,0.27-0.6,0.6   s0.27,0.6,0.6,0.6h32.02c0.33,0,0.6-0.27,0.6-0.6S92.89,73.23,92.56,73.23z M95,66.54c0,0.33-0.27,0.6-0.6,0.6H5.6   c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6h16.7l-7.22-9.65c-2.98-3.98-4.23-8.91-3.53-13.88c0.12-0.87,0.3-1.73,0.54-2.56   c0,0,0,0,0,0c0,0,0,0,0,0c0.14-0.48,0.29-0.96,0.47-1.43c0,0,0,0,0,0c1.11-2.99,2.97-5.64,5.43-7.72L6.7,12.27   c-0.16-0.26-0.1-0.6,0.14-0.78c0.24-0.19,0.58-0.16,0.8,0.06l15.01,15.6l1.41-1.07c3.96-2.99,8.86-4.25,13.8-3.55   c4.95,0.7,9.32,3.29,12.3,7.27l16.78,22.44c1.23,1.64,2.93,3.4,3.68,3.51c1.07,0.05,1.56-0.82,1.59-0.85   c1.24-2.35,1.76-4.39,2.19-6.03c0.33-1.28,0.61-2.35,1.13-3.14c-3.63-2.11-5.51-5.11-5.74-9.14c-0.02-0.29,0.18-0.55,0.46-0.62   c2.84-0.64,5.67,0.38,7.7,2.73c2.04-2.35,4.87-3.37,7.7-2.73c0.29,0.06,0.48,0.33,0.46,0.62c-0.23,4.03-2.12,7.03-5.75,9.14   c1.14,1.67,1.42,4.09,1.76,7.07c0.09,0.8,0.19,1.63,0.31,2.51c0,0.01,0,0.01,0,0.02c0.15,1.39,0.33,3.78,0.37,5.91   c0.04,2.59-0.14,3.96-0.38,4.72H94.4C94.73,65.94,95,66.21,95,66.54z M18.93,29.95l0.63,1.02l1.23,2.01   c1.88,0.08,2.94-0.76,3.33-2.6l-1.59-1.65l-0.83-0.87L10.58,16.32L18.93,29.95z M23.78,65.94h57.34c0.12-0.18,0.53-1.04,0.48-4.58   c-0.04-2.77-0.32-5.56-0.36-5.91c-0.12-0.89-0.21-1.72-0.31-2.52c-0.38-3.26-0.65-5.61-1.92-6.99c-0.13-0.14-0.18-0.32-0.15-0.51   c0.03-0.18,0.15-0.34,0.31-0.43c3.53-1.85,5.35-4.4,5.7-7.98c-2.42-0.35-4.81,0.74-6.46,2.97c-0.11,0.15-0.29,0.24-0.48,0.24   c-0.19,0-0.37-0.09-0.48-0.24c-1.65-2.23-4.03-3.32-6.46-2.97c0.35,3.58,2.18,6.13,5.71,7.98c0.17,0.09,0.29,0.26,0.31,0.45   c0.02,0.19-0.05,0.39-0.19,0.52c-0.62,0.57-0.9,1.66-1.3,3.18c-0.44,1.7-0.99,3.81-2.29,6.29c-0.03,0.06-0.85,1.59-2.73,1.49   c-0.01,0-0.02,0-0.04,0c-1.56-0.19-3.85-3.09-4.51-3.98L49.21,30.51c-2.79-3.73-6.88-6.15-11.51-6.81   c-4.62-0.66-9.21,0.52-12.91,3.32L23.48,28l1.71,1.77c0.13,0.13,0.19,0.32,0.16,0.51c-0.41,2.56-1.9,3.9-4.33,3.9   c-0.2,0-0.41-0.01-0.63-0.03c-0.19-0.02-0.36-0.12-0.46-0.28l-1.31-2.15c-2.44,2.1-4.17,4.76-5.15,7.65c1.77,1.76,3.26,2,5.21,0.91   c0.32-0.18,0.72-0.06,0.89,0.27s0.06,0.73-0.26,0.9c-1.04,0.57-1.97,0.81-2.81,0.81c-1.35,0-2.48-0.62-3.45-1.47c0,0,0,0,0,0   c-1.22,4.95-0.3,10.38,2.98,14.77L23.78,65.94z M52.06,73.19H24.53c-0.33,0-0.6,0.27-0.6,0.6c0,0.33,0.27,0.6,0.6,0.6h27.53   c0.33,0,0.6-0.27,0.6-0.6C52.66,73.46,52.39,73.19,52.06,73.19z M40.55,81.04c0-0.33-0.27-0.6-0.6-0.6H12.42   c-0.33,0-0.6,0.27-0.6,0.6c0,0.33,0.27,0.6,0.6,0.6h27.53C40.28,81.63,40.55,81.37,40.55,81.04z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="font-copy text-xs uppercase tracking-wider">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-dark" />
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-dark">
        {/* Marquee stripe */}
        <div className="relative h-[140px] md:h-[200px] flex items-center overflow-hidden mb-16 w-full">
          <div
            className="flex absolute whitespace-nowrap animate-marquee"
            style={{ lineHeight: "1" }}
          >
            <span className="font-title text-f-80 md:text-f-120 text-cream uppercase inline-block px-4">
              Work • Selected Projects • Work • Selected Projects • Work •
              Selected Projects •
            </span>
            <span className="font-title text-f-80 md:text-f-120 text-cream uppercase inline-block px-4">
              Work • Selected Projects • Work • Selected Projects • Work •
              Selected Projects •
            </span>
            <span className="font-title text-f-80 md:text-f-120 text-cream uppercase inline-block px-4">
              Work • Selected Projects • Work • Selected Projects • Work •
              Selected Projects •
            </span>
            <span className="font-title text-f-80 md:text-f-120 text-cream uppercase inline-block px-4">
              Work • Selected Projects • Work • Selected Projects • Work •
              Selected Projects •
            </span>
          </div>
        </div>

        {/* Work grid */}
        <div className="px-[0.7vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.7vw]">
            {workItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-cream rounded-md overflow-hidden cursor-pointer transition-smooth hover:scale-[1.02]"
              >
                <div className="aspect-video-16-9 relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-cream" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-copy text-xs uppercase tracking-wider text-dark/60 mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="font-title text-2xl text-dark">
                    {item.title}
                  </h3>
                  {/* Progress bar */}
                  <div className="mt-4 h-[6px] bg-dark/10 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-red rounded-full group-hover:w-full transition-all duration-1000" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all work button */}
        <div className="flex justify-center mt-16">
          <button className="btn-outline flex items-center gap-3">
            View All Work
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-32 px-[0.7vw] bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <div className="w-32 h-32 bg-red rounded-full opacity-20 blur-2xl" />
            </div>
            <div className="w-full md:w-2/3">
              <blockquote className="font-copy text-f-36 leading-[1.2em] text-dark">
                "Like the mythical narwhal piercing through Arctic waters, we
                break through the noise with bold creativity that can't be
                ignored."
              </blockquote>
              <p className="font-copy text-sm uppercase tracking-wider text-dark/60 mt-8">
                — Founder & Creative Director
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media/Feed Section */}
      <section id="media" className="py-20 bg-dark">
        <div className="px-[0.7vw]">
          <h2 className="font-title text-f-80 text-cream mb-12">
            In Your Feed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[0.7vw]">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-cream rounded-md overflow-hidden cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="font-copy text-xs uppercase tracking-wider text-dark/60 mb-2">
                    {item.date}
                  </p>
                  <h4 className="font-copy font-semibold text-dark">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hit Us Up Section with Animation */}
      <section className="py-32 bg-cream border-t-2 border-dark">
        <div className="px-[0.7vw]">
          <div className="max-w-[90vw] mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
              {/* Left side - 2/3 column */}
              <div className="flex-1 lg:w-2/3">
                <div className="flex flex-col h-full justify-between">
                  {/* Top section with title and social */}
                  <div className="flex flex-col md:flex-row justify-between mb-12 md:items-start">
                    {/* Title and location */}
                    <div className="mb-8 md:mb-0">
                      <h2 className="font-title text-f-80 md:text-f-120 text-dark uppercase mb-4 leading-[0.85]">
                        NARWHAL
                      </h2>
                      <h3 className="font-title text-f-24 md:text-f-32 text-dark uppercase">
                        San Francisco, CA
                      </h3>
                    </div>

                    {/* Social icons - aligned to top of NARWHAL text */}
                    <div className="flex gap-3 md:mt-[-0.25rem]">
                      <a
                        href="#"
                        className="flex items-center justify-center w-12 h-12 bg-dark rounded hover:bg-red transition-colors duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-6 h-6 text-cream" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-12 h-12 bg-dark rounded hover:bg-red transition-colors duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-6 h-6 text-cream" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-12 h-12 bg-dark rounded hover:bg-red transition-colors duration-300"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-6 h-6 text-cream" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-12 h-12 bg-dark rounded hover:bg-red transition-colors duration-300"
                        aria-label="Email"
                      >
                        <Mail className="w-6 h-6 text-cream" />
                      </a>
                    </div>
                  </div>

                  {/* Team list */}
                  <div>
                    <ul className="space-y-0">
                      <li className="flex flex-col md:flex-row justify-between py-3 border-t-2 border-b-2 border-dark">
                        <span className="font-copy font-semibold text-sm uppercase tracking-wider text-dark">
                          John Anderson
                        </span>
                        <span className="font-copy font-semibold text-sm uppercase tracking-wider text-dark">
                          Creative Director / Managing Partner
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between py-3 border-b-2 border-dark">
                        <span className="font-copy font-semibold text-sm uppercase tracking-wider text-dark">
                          Sarah Mitchell
                        </span>
                        <span className="font-copy font-semibold text-sm uppercase tracking-wider text-dark">
                          Executive Producer
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between py-3 border-b-2 border-dark">
                        <span className="font-copy font-semibold text-sm uppercase tracking-wider text-dark">
                          David Chen
                        </span>
                        <span className="font-copy font-semibold text-sm uppercase tracking-wider text-dark">
                          Head of Strategy
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between py-3 border-b-2 border-dark">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                          <a
                            href="mailto:hello@narwhal.studio"
                            className="font-copy font-semibold text-sm uppercase tracking-wider text-dark hover:text-red transition-colors duration-300"
                          >
                            hello@narwhal.studio
                          </a>
                        </div>
                        <a
                          href="tel:415.555.0100"
                          className="font-copy font-semibold text-sm uppercase tracking-wider text-dark hover:text-red transition-colors duration-300"
                        >
                          415.555.0100
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right side animated circle - 1/3 column */}
              <div className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-end">
                <a
                  href="mailto:hello@narwhal.studio"
                  className="inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <ContactCircle />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 bg-dark">
        <div className="px-[0.7vw] text-center">
          <p className="font-copy text-xs uppercase tracking-wider text-cream/60">
            © 2024 Narwhal Studio. All rights reserved. Made with creativity &
            laughs.
          </p>
        </div>
      </footer>
    </div>
  );
}
