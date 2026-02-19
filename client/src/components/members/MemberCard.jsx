import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const MemberCard = ({ member }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes scan {
            0% { top: -10%; }
            100% { top: 110%; }
          }
        `}
      </style>

      <div
        className="group w-full max-w-sm mx-auto 
                   h-[420px] sm:h-[450px] 
                   cursor-pointer px-2"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full h-full rounded-xl"
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* ================= FRONT ================= */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden bg-black 
                       border border-green-500/20
                       shadow-[0_0_15px_rgba(34,197,94,0.3)]
                       group-hover:shadow-[0_0_35px_rgba(34,197,94,0.6)]
                       transition-all duration-500"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative w-full h-full overflow-hidden">

              {/* Image */}
              <img
                // src={member.image}
                src = {"https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={member.name}
                className="w-full h-full object-cover 
                           transition-transform duration-700 
                           group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30" />

              {/* Scanner */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute w-full h-1 
                             bg-gradient-to-b 
                             from-transparent 
                             via-green-400 
                             to-transparent
                             opacity-0 group-hover:opacity-100"
                  style={{ animation: "scan 2s linear infinite" }}
                />
              </div>

              <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>

            {/* Bottom Info */}
            <div
              className="absolute bottom-0 left-0 w-full 
                         p-4 sm:p-6 text-center
                         bg-gradient-to-t 
                         from-green-900 via-green-700 to-green-500"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {member.name}
              </h3>

              <p className="text-xs sm:text-sm text-green-200 mt-1">
                {member.domain || "WEB DEVELOPER"}
              </p>

              <p className="text-[10px] sm:text-xs text-green-300 uppercase tracking-wider mt-1">
                {member.position || "MEMBER"}
              </p>

              <div className="flex justify-center gap-5 sm:gap-6 mt-3 sm:mt-4">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:scale-110 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} className="sm:w-6 sm:h-6" />
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:scale-110 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin size={20} className="sm:w-6 sm:h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ================= BACK ================= */}
          <div
            className="absolute inset-0 rounded-xl 
                       bg-gradient-to-br from-neutral-900 to-black 
                       border border-green-500/20
                       shadow-[0_0_20px_rgba(34,197,94,0.3)]
                       p-4 sm:p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-green-400 mb-2">
                ML CLUB PROFILE
              </p>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {member.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>

            <div className="border-t border-green-500/20 my-4 sm:my-5" />

            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs">Branch</p>
                <p className="text-white font-medium">{member.branch}</p>
              </div>

              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs">Year</p>
                <p className="text-white font-medium">{member.year}</p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500 text-[10px] sm:text-xs">Roll Number</p>
                <p className="text-white font-medium">{member.rollNo}</p>
              </div>
            </div>

            <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-4">
              Tap to flip back
            </p>
          </div>

        </motion.div>
      </div>
    </>
  );
};

export default MemberCard;
