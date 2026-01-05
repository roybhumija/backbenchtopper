import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Video, 
  PlayCircle, 
  FileCheck, 
  FileText, 
  Award,
  Clock
} from "lucide-react";

const studentFeatures = [
  {
    icon: Video,
    title: "Live Classes",
    description: "Join interactive live sessions with expert teachers and get your doubts cleared in real-time",
    color: "from-gold/20 to-bronze/10",
  },
  {
    icon: PlayCircle,
    title: "Recorded Videos",
    description: "Watch pre-recorded lessons anytime, anywhere with replay functionality",
    color: "from-gold/20 to-bronze/10",
  },
  {
    icon: FileCheck,
    title: "Online Tests",
    description: "Practice with MCQ and subjective tests with instant results and detailed analytics",
    color: "from-gold/20 to-bronze/10",
  },
  {
    icon: FileText,
    title: "Notes (PDF)",
    description: "Download comprehensive study materials and notes prepared by experts",
    color: "from-gold/20 to-bronze/10",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn verified certificates upon successful completion of courses",
    color: "from-gold/20 to-bronze/10",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Access all content 24/7 and learn according to your own schedule",
    color: "from-gold/20 to-bronze/10",
  },
];

const ForStudentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="courses" className="py-24 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-gold mb-6">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">For Students</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Everything You Need to{" "}
            <span className="gradient-text">Excel</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete learning experience designed to help you achieve your academic goals
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-8 h-full hover:scale-[1.02] transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForStudentsSection;