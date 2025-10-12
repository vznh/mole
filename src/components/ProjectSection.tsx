// components/ExperimentSection
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiments, ExperimentProps } from "@/presets/work";

const ExperimentEntity: React.FC<ExperimentProps> = ({
  title,
  videoPath,
  accent,
  leftText,
  rightText,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause based on hover only
  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div
      className={`relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Container - 1:1 aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xs">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoPath} type="video/mp4" />
        </video>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col justify-end p-4"
            >
              <div className="flex justify-between items-end border-t border-black/50 opacity-50  pt-2">
                <span className="font-jb text-black text-xs  tracking-wide ml-4">
                  {leftText || ""}
                </span>
                <span className="font-jb text-black text-xs uppercase tracking-wide mr-4" >
                  {rightText || ""}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ExperimentSection = () => {
  return (
    <section className="">
      <div className="c">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          {experiments.map((experiment) => (
            <ExperimentEntity
              key={experiment.key}
              title={experiment.title}
              videoPath={experiment.videoPath}
              accent={experiment.accent}
              leftText={experiment.leftText}
              rightText={experiment.rightText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentSection;
