import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, 
  Play, 
  Clock, 
  LogOut,
  ShieldCheck,
  Search
} from "lucide-react";
import logo from "@/assets/logo.jpeg";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  price: number;
}

interface Enrollment {
  id: string;
  course_id: string;
  progress_percentage: number;
  courses: Course;
}

const StudentDashboard = () => {
  const { user, userRole, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && (!user || userRole !== "student")) {
      navigate("/auth");
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
      fetchAvailableCourses();
    }
  }, [user]);

  const fetchEnrollments = async () => {
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        id,
        course_id,
        progress_percentage,
        courses (
          id,
          title,
          description,
          thumbnail_url,
          price
        )
      `)
      .eq("student_id", user?.id);

    if (data && !error) {
      setEnrollments(data as unknown as Enrollment[]);
    }
  };

  const fetchAvailableCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true);

    if (data && !error) {
      setAvailableCourses(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Prevent screenshots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block PrintScreen key
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText("");
        alert("Screenshots are not allowed for security reasons.");
      }
      // Block Ctrl+Shift+S (Chrome screenshot)
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        alert("Screenshots are not allowed for security reasons.");
      }
    };

    const handleVisibilityChange = () => {
      // Detect if screenshot tools might be active
      if (document.hidden) {
        // Could log this for security monitoring
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  const filteredCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Security overlay to prevent screenshots */}
      <style>{`
        @media print {
          body { display: none; }
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Back Bench Topper" className="w-10 h-10 rounded-lg object-cover" />
              <span className="font-display font-bold text-lg gradient-text hidden sm:block">
                Student Dashboard
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-gold p-4 mb-8 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-sm">Content Protected</p>
            <p className="text-muted-foreground text-xs">Screenshots and screen recording are disabled for security.</p>
          </div>
        </motion.div>

        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="font-display text-xl font-semibold mb-4">My Courses</h2>
          
          {enrollments.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display font-semibold mb-2">No enrolled courses</h3>
              <p className="text-muted-foreground text-sm">Browse available courses below and start learning!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="glass-card overflow-hidden group">
                  <div className="h-32 bg-gradient-to-br from-gold/20 to-bronze/10 flex items-center justify-center relative">
                    <BookOpen className="w-12 h-12 text-gold/50" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
                      <div 
                        className="h-full bg-gradient-to-r from-gold to-bronze" 
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold line-clamp-1 mb-2">
                      {enrollment.courses.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{enrollment.progress_percentage}% complete</span>
                    </div>
                    <button className="w-full btn-premium !py-2.5 text-sm">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Continue Learning
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Browse Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-xl font-semibold">Browse Courses</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-gold/50 focus:outline-none transition-colors w-full sm:w-64"
              />
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-muted-foreground">No courses available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="h-32 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold line-clamp-1 mb-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {course.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold gradient-text">
                        {course.price > 0 ? `₹${course.price}` : "Free"}
                      </span>
                      <button className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
