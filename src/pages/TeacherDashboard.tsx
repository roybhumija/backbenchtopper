import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Plus, 
  Video, 
  FileText, 
  Users, 
  TrendingUp, 
  LogOut,
  BookOpen,
  Upload,
  Radio
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface Course {
  id: string;
  title: string;
  description: string;
  is_published: boolean;
  created_at: string;
}

const TeacherDashboard = () => {
  const { user, userRole, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!loading && (!user || userRole !== "teacher")) {
      navigate("/auth");
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("teacher_id", user?.id)
      .order("created_at", { ascending: false });

    if (data && !error) {
      setCourses(data);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    setIsCreating(true);
    const { error } = await supabase
      .from("courses")
      .insert({
        teacher_id: user?.id,
        title: newCourseTitle,
        description: newCourseDescription,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Course created successfully!",
      });
      setShowCreateModal(false);
      setNewCourseTitle("");
      setNewCourseDescription("");
      fetchCourses();
    }
    setIsCreating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="fixed inset-0 bg-gradient-to-br from-background via-[hsl(20_15%_8%)] to-background" />
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full relative z-10" />
      </div>
    );
  }

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen, color: "text-gold" },
    { label: "Published", value: courses.filter(c => c.is_published).length, icon: TrendingUp, color: "text-green-400" },
    { label: "Students", value: 0, icon: Users, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-[hsl(20_15%_8%)] to-background" />
      
      {/* Background Effects */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-background/60 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Back Bench Topper" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]" />
              <span className="font-display font-bold text-lg gradient-text hidden sm:block">
                Teacher Dashboard
              </span>
            </motion.div>
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

      <main className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="glass-card-gold p-4 text-center hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gold/20 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-gold" />
              </div>
              <p className="font-medium text-sm">New Course</p>
            </button>
            <button className="glass-card p-4 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/20 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-red-400" />
              </div>
              <p className="font-medium text-sm">Upload Video</p>
            </button>
            <button className="glass-card p-4 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <p className="font-medium text-sm">Upload PDF</p>
            </button>
            <button className="glass-card p-4 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                <Radio className="w-6 h-6 text-green-400" />
              </div>
              <p className="font-medium text-sm">Start Live Class</p>
            </button>
          </div>
        </motion.div>

        {/* Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Your Courses</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-premium !py-2 !px-4 text-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Course
              </span>
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">Create your first course and start teaching!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-premium"
              >
                <span className="relative z-10">Create Your First Course</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="glass-card overflow-hidden group">
                  <div className="h-32 bg-gradient-to-br from-gold/20 to-bronze/10 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gold/50" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-semibold line-clamp-1">{course.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.is_published 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {course.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {course.description || "No description"}
                    </p>
                    <button className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                      Manage Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card-gold p-6 w-full max-w-md"
          >
            <h2 className="font-display text-xl font-semibold mb-6">Create New Course</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course Title</label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="Enter course title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  value={newCourseDescription}
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-gold/50 focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Describe your course"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="btn-premium flex-1 disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {isCreating ? "Creating..." : "Create Course"}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
