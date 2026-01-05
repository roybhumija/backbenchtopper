import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Info } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const charges = [
    {
      title: "Storage Charge",
      value: "6.8%",
      description: "Per video uploaded",
    },
    {
      title: "Payment Gateway",
      value: "5%",
      description: "Standard gateway charges",
    },
    {
      title: "Platform Fee",
      value: "₹20",
      description: "Per transaction (paid by students)",
    },
  ];

  const included = [
    "Unlimited courses",
    "Unlimited students",
    "Android app on Play Store",
    "Full website access",
    "Live class integration",
    "Test portal with analytics",
    "24/7 support",
    "Regular updates",
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
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
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Pricing</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Simple &{" "}
            <span className="gradient-text">Transparent</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No hidden fees. Pay only for what you use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Charges Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card-gold p-8 h-full">
              <h3 className="font-display text-2xl font-bold mb-8 gradient-text">
                Usage-Based Charges
              </h3>
              <div className="space-y-4">
                {charges.map((charge, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Info className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{charge.title}</p>
                        <p className="text-muted-foreground text-sm">{charge.description}</p>
                      </div>
                    </div>
                    <span className="font-display text-2xl font-bold gradient-text">
                      {charge.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Included Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card p-8 h-full flex flex-col">
              <h3 className="font-display text-2xl font-bold mb-8 text-foreground">
                Everything Included
              </h3>
              <div className="grid grid-cols-1 gap-3 flex-1">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/auth" className="btn-premium w-full mt-8 text-center">
                <span className="relative z-10">Get Started Free</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;