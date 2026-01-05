import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay for brown tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-bronze/5 to-transparent" />
        
        {/* Subtle glow spots */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-bronze/8 rounded-full blur-[100px] animate-pulse-soft animation-delay-400" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-40 h-40 mx-auto mb-8"
          >
            <img 
              src={logo} 
              alt="Back Bench Topper" 
              className="w-full h-full object-contain" 
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
          >
            Learning Made Simple.{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">Teaching Made Powerful.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Live classes, videos, tests, and notes — all in one trusted platform for students and educators.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/auth" className="btn-premium group flex items-center gap-2 text-lg">
              <span className="relative z-10">Explore Courses</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/auth" className="btn-outline-gold flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5" />
              Teach With Us
            </Link>
          </motion.div>

          {/* Animated Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: "50K+", label: "Active Students", delay: 0 },
              { value: "1000+", label: "Educators", delay: 0.1 },
              { value: "5000+", label: "Courses", delay: 0.2 },
              { value: "99.9%", label: "Uptime", delay: 0.3 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + stat.delay }}
                className="glass-card p-5 md:p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }} 
            className="w-1.5 h-1.5 rounded-full bg-gold" 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;