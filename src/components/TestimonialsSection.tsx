import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "IIT-JEE Coach, Delhi",
    content: "Back Bench Topper transformed my coaching institute. The platform is intuitive, and my students love the learning experience.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "NEET Educator, Mumbai",
    content: "The live class feature with automatic recording saves me hours. My students can revisit lectures anytime, anywhere.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "CA Institute Owner, Ahmedabad",
    content: "EMI payment option increased my conversions by 40%. The support team is always there when I need help.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-gold mb-6">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Trusted by{" "}
            <span className="gradient-text">Educators</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what successful teachers and institute owners are saying about us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass-card-gold p-8 h-full relative hover:scale-[1.02] transition-transform duration-300">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/20" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.15 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-gold text-gold" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground/90 mb-8 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>

                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass-card p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.9/5", label: "App Rating" },
              { value: "50K+", label: "Happy Students" },
              { value: "1000+", label: "Educators" },
              { value: "₹10Cr+", label: "Revenue Generated" },
            ].map((metric, index) => (
              <div key={index}>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {metric.value}
                </div>
                <div className="text-muted-foreground text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;