import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Lock, Eye, Clock } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Protected Content",
    description: "Your videos and materials are secured with advanced encryption",
  },
  {
    icon: Eye,
    title: "Controlled Access",
    description: "Set viewing limits and control how students access your content",
  },
  {
    icon: Clock,
    title: "Time-based Access",
    description: "Define course validity periods and expiry dates for content",
  },
  {
    icon: ShieldCheck,
    title: "Secure Learning",
    description: "Complete peace of mind with enterprise-grade security measures",
  },
];

const SecuritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="security" className="py-20 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold">Safe Learning Environment</span>
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                Your Content is{" "}
                <span className="gradient-text">Protected</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                We understand how valuable your content is. Our platform ensures a secure learning experience for everyone.
              </p>
            </div>

            {/* Right - Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;