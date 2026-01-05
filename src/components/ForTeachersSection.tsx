import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  BookOpen, 
  DollarSign, 
  Video, 
  FileText, 
  BarChart3,
  Users
} from "lucide-react";

const teacherBenefits = [
  {
    icon: BookOpen,
    title: "Create & Sell Courses",
    description: "Build comprehensive courses with videos, notes, and tests. Start earning from day one.",
  },
  {
    icon: DollarSign,
    title: "Set Your Own Prices",
    description: "You decide how much to charge. Keep maximum profits with transparent pricing.",
  },
  {
    icon: Video,
    title: "Teach Live or Upload",
    description: "Conduct live classes or upload pre-recorded content. Flexibility is yours.",
  },
  {
    icon: FileText,
    title: "Share Notes & Tests",
    description: "Upload PDFs, create quizzes, and track student progress with ease.",
  },
  {
    icon: BarChart3,
    title: "Track Earnings",
    description: "Monitor your revenue, student enrollments, and course performance in real-time.",
  },
  {
    icon: Users,
    title: "Grow Your Audience",
    description: "Reach thousands of students across India with your own branded app and website.",
  },
];

const ForTeachersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="for-teachers" className="py-24 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/3 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-gold mb-6">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">For Teachers</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Turn Your Knowledge Into{" "}
              <span className="gradient-text">Income</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of educators who are building successful online teaching businesses with Back Bench Topper.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teacherBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 glass-card group hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <benefit.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card-gold p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">Teacher Dashboard</h3>
              </div>
              
              {/* Mock Dashboard */}
              <div className="space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">₹45K</div>
                    <div className="text-xs text-muted-foreground">This Month</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">892</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">12</div>
                    <div className="text-xs text-muted-foreground">Courses</div>
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="glass-card p-4">
                  <div className="text-sm text-muted-foreground mb-3">Revenue Trend</div>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-gold/40 to-gold/80 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-4">
                  <div className="text-sm text-muted-foreground mb-3">Recent Enrollments</div>
                  <div className="space-y-2">
                    {[
                      { name: "Physics Crash Course", students: "+12 today" },
                      { name: "Math Foundation", students: "+8 today" },
                      { name: "Chemistry Basics", students: "+5 today" },
                    ].map((course, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-foreground">{course.name}</span>
                        <span className="text-gold">{course.students}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForTeachersSection;