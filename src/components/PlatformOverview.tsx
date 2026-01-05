import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Smartphone, 
  ShoppingCart, 
  CreditCard, 
  Bell,
  MessageSquare,
  BarChart3,
  Ticket
} from "lucide-react";

const platforms = [
  {
    icon: Smartphone,
    title: "App + Website",
    description: "Your own branded Android app on Play Store with a fully responsive website",
  },
  {
    icon: ShoppingCart,
    title: "Course Store",
    description: "Complete e-commerce solution to sell courses with seamless checkout",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options including EMI and installment plans",
  },
  {
    icon: Ticket,
    title: "Coupon Codes",
    description: "Create discount codes and promotional offers for your courses",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Keep students engaged with push notifications and reminders",
  },
  {
    icon: MessageSquare,
    title: "Chat Support",
    description: "Built-in messaging for student-teacher communication",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Track performance with detailed insights and exportable reports",
  },
];

const PlatformOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="platform" className="py-24 relative overflow-hidden">
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
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Platform Features</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete suite of tools for modern educators and coaching institutes
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="glass-card p-6 h-full hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                  <platform.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                  {platform.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {platform.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;