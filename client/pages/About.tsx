import React from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { ContactCircle } from "../components/ContactCircle";

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      {/* About Section */}
      <section className="py-32 pt-[120px] bg-cream">
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
                <ContactCircle />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
