import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, Users, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import logo from "@/assets/logo.jpeg";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");

type RoleType = "teacher" | "student";
type ModeType = "login" | "signup";

const Auth = () => {
  const [role, setRole] = useState<RoleType | null>(null);
  const [mode, setMode] = useState<ModeType>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  
  const { signIn, signUp, user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && userRole) {
      if (userRole === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    }
  }, [user, userRole, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (mode === "signup") {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) {
        newErrors.name = nameResult.error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !role) return;
    
    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message === "Invalid login credentials" 
              ? "Invalid email or password. Please try again."
              : error.message,
            variant: "destructive",
          });
        }
      } else {
        const { error } = await signUp(email, password, fullName, role);
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message.includes("already registered")
              ? "This email is already registered. Please login instead."
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to Back Bench Topper. You are now logged in.",
          });
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bronze/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <img src={logo} alt="Back Bench Topper" className="w-24 h-24 mx-auto rounded-2xl object-cover mb-4" />
          </a>
          <h1 className="font-display text-2xl font-bold gradient-text">Back Bench Topper</h1>
        </div>

        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="role-select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card-gold p-8"
            >
              <h2 className="font-display text-xl font-semibold text-center mb-6">
                I am a...
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setRole("teacher")}
                  className="group p-6 rounded-xl bg-card/50 border border-border hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-gold" />
                  </div>
                  <p className="font-display font-semibold text-foreground">Teacher</p>
                  <p className="text-muted-foreground text-xs mt-1">Create & manage courses</p>
                </button>

                <button
                  onClick={() => setRole("student")}
                  className="group p-6 rounded-xl bg-card/50 border border-border hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="font-display font-semibold text-foreground">Student</p>
                  <p className="text-muted-foreground text-xs mt-1">Learn & grow</p>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card-gold p-8"
            >
              <button
                onClick={() => setRole(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  role === "teacher" ? "bg-gold/20" : "bg-blue-500/20"
                }`}>
                  {role === "teacher" ? (
                    <GraduationCap className="w-6 h-6 text-gold" />
                  ) : (
                    <Users className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-muted-foreground text-sm capitalize">{role} Portal</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-gold/50 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-gold/50 focus:outline-none transition-colors pr-12"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isLoading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
                  </span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-gold hover:underline font-medium"
                  >
                    {mode === "login" ? "Sign up" : "Login"}
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
