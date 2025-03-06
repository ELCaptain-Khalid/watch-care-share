
import { Hero } from "@/components/Hero";
import { ImpactCard } from "@/components/ImpactCard";
import { Stats } from "@/components/Stats";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";

const causes = [
  {
    cause: "Education for All",
    impact: "Providing textbooks and supplies to underprivileged students",
    raised: "$12,450",
    progress: 62,
    icon: "heart" as const
  },
  {
    cause: "Mental Health Support",
    impact: "Funding counseling sessions for college students",
    raised: "$8,920",
    progress: 45,
    icon: "users" as const
  },
  {
    cause: "Environmental Action",
    impact: "Supporting campus sustainability initiatives",
    raised: "$15,730",
    progress: 78,
    icon: "trend" as const
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stats />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Current Impact Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a cause that resonates with you. Your ad views directly support these initiatives.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <ImpactCard key={index} {...cause} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="#" 
            className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
          >
            View more causes
            <ArrowRightCircle className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
