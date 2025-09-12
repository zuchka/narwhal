import React from "react";
import { ArrowUpRight } from "lucide-react";

export const ContactCircle: React.FC = () => {
  return (
    <div className="relative w-[272px] h-[272px] md:w-[340px] md:h-[340px] mx-auto group cursor-pointer">
      {/* Border circle */}
      <div className="absolute inset-0 rounded-full border-2 border-cream group-hover:border-red transition-colors duration-500" />

      {/* Spinning text circle */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg
          viewBox="0 0 340 340"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="circle-path"
              d="M 170, 170 m -128, 0 a 128,128 0 1,1 256,0 a 128,128 0 1,1 -256,0"
            />
          </defs>
          <text
            className="fill-cream font-title text-[24px] md:text-[30px] font-bold uppercase"
            style={{ letterSpacing: "0.2em", fontWeight: "700" }}
          >
            <textPath href="#circle-path" startOffset="0%" textLength="800">
              HIT US UP • HIT US UP • HIT US UP • HIT US UP •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center arrow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-dark border-2 border-cream rounded-full p-7 md:p-9 group-hover:bg-red group-hover:border-red transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-45">
          <ArrowUpRight
            className="w-9 h-9 md:w-12 md:h-12 text-cream"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-red/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
