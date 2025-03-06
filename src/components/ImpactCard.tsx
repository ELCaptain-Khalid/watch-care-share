
import { Heart, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ImpactCardProps {
  cause: string;
  impact: string;
  raised: string;
  progress?: number;
  icon?: "heart" | "users" | "trend";
  delay?: number;
}

export const ImpactCard = ({ 
  cause, 
  impact, 
  raised, 
  progress = 66, 
  icon = "heart",
  delay = 0
}: ImpactCardProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold: 0.2,
    delay: delay * 100
  });

  const renderIcon = () => {
    switch(icon) {
      case "users":
        return <Users className="text-primary h-6 w-6" />;
      case "trend":
        return <TrendingUp className="text-primary h-6 w-6" />;
      default:
        return <Heart className="text-primary h-6 w-6" fill="#FDA4AF" />;
    }
  };

  return (
    <motion.div 
      ref={ref as any}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{cause}</h3>
        {renderIcon()}
      </div>
      <p className="text-gray-600 mb-6">{impact}</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-accent font-medium">{raised} raised</span>
          <span className="text-sm text-gray-500">{progress}% of goal</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" 
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${progress}%` } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};
