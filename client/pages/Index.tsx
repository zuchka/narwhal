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

            <div className="mt-12 md:mt-20 animate-fadeIn animation-delay-800">
              <span className="font-title text-f-180 md:text-f-240 text-dark leading-[0.85em] tracking-tighter inline-block transform hover:scale-105 transition-transform duration-300">
                BOLD
              </span>
            </div>

            {/* Decorative elements */}
            <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 w-[20vw] h-[20vw] bg-red rounded-full opacity-15 blur-3xl animate-pulse" />
            <div className="absolute left-[5vw] top-1/3 w-[15vw] h-[15vw] bg-dark rounded-full opacity-5 blur-3xl" />
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
      <section className="py-32 bg-dark border-t-2 border-cream">
        <div className="px-[0.7vw]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left side text */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-title text-f-80 md:text-f-120 text-cream mb-6">
                  Ready to
                </h2>
                <h2 className="font-title text-f-80 md:text-f-120 text-red">
                  Make Waves?
                </h2>
              </div>

              {/* Right side animated circle */}
              <div className="flex-shrink-0">
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

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-cream relative">
        <div className="px-[0.7vw]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-title text-f-120 text-dark mb-16">Contact</h2>

            {/* Team contacts */}
            <div className="mb-16">
              <div className="border-t-2 border-dark">
                {teamMembers.map((member) => (
                  <div
                    key={member.email}
                    className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b-2 border-dark"
                  >
                    <div className="mb-4 md:mb-0">
                      <h4 className="font-title text-2xl text-dark">
                        {member.name}
                      </h4>
                      <p className="font-copy text-sm uppercase tracking-wider text-dark/60">
                        {member.role}
                      </p>
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="font-copy text-dark hover:text-red transition-colors duration-300 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* General contact */}
            <div className="text-center mb-16">
              <p className="font-copy text-dark/60 mb-4">General Inquiries</p>
              <a
                href="mailto:hello@narwhal.studio"
                className="font-title text-f-60 text-dark hover:text-red transition-colors duration-300"
              >
                hello@narwhal.studio
              </a>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-8">
              <a
                href="#"
                className="text-dark hover:text-red transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-dark hover:text-red transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-dark hover:text-red transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
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
