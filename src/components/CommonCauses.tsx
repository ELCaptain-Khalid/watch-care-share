
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Leaf, GraduationCap, Heart, Users, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
import { adMobService } from "@/services/AdMobService";
import { useToast } from "@/hooks/use-toast";

interface Cause {
  id: string;
  title: string;
  description: string;
  icon: "education" | "environment" | "health" | "community" | "children" | "hunger";
  color: string;
}

const causes: Cause[] = [
  {
    id: "education",
    title: "Education Access",
    description: "Support educational resources for underprivileged students around the world.",
    icon: "education",
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "environment",
    title: "Environmental Protection",
    description: "Help fund conservation efforts and climate change initiatives.",
    icon: "environment",
    color: "bg-green-100 text-green-600"
  },
  {
    id: "health",
    title: "Health Services",
    description: "Contribute to healthcare access for communities in need.",
    icon: "health",
    color: "bg-red-100 text-red-600"
  },
  {
    id: "community",
    title: "Community Development",
    description: "Support local community projects and social initiatives.",
    icon: "community",
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: "children",
    title: "Children's Welfare",
    description: "Help provide essential services to children in vulnerable situations.",
    icon: "children",
    color: "bg-pink-100 text-pink-600"
  },
  {
    id: "hunger",
    title: "Hunger Relief",
    description: "Support food distribution programs in areas affected by poverty.",
    icon: "hunger",
    color: "bg-amber-100 text-amber-600"
  }
];

export const CommonCauses = () => {
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSupportCause = (causeId: string) => {
    setSelectedCause(causeId);
    setIsLoading(true);
    
    // Show an ad to support the cause
    adMobService.showRewardedAd(
      // onReward callback
      (reward) => {
        console.log(`User earned reward: ${reward.amount} ${reward.type}`);
        toast({
          title: "Thank you for your support!",
          description: `You've contributed to ${causes.find(c => c.id === causeId)?.title}.`,
        });
      },
      // onDismiss callback
      () => {
        setIsLoading(false);
        setSelectedCause(null);
      }
    );
  };

  const renderIcon = (iconName: string, className: string) => {
    switch(iconName) {
      case "education":
        return <GraduationCap className={className} />;
      case "environment":
        return <Leaf className={className} />;
      case "health":
        return <Heart className={className} />;
      case "community":
        return <Users className={className} />;
      case "children":
        return <HandHeart className={className} />;
      case "hunger":
        return <Book className={className} />;
      default:
        return <Heart className={className} />;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Causes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These causes need your support the most. Watch an ad to make a direct contribution to any cause below.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {causes.map((cause) => (
            <motion.div key={cause.id} variants={item}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${cause.color} flex items-center justify-center mb-4`}>
                    {renderIcon(cause.icon, "h-6 w-6")}
                  </div>
                  <CardTitle>{cause.title}</CardTitle>
                  <CardDescription>{cause.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* Additional content could go here */}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSupportCause(cause.id)} 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isLoading && selectedCause === cause.id}
                  >
                    {isLoading && selectedCause === cause.id ? (
                      <span className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Loading Ad...
                      </span>
                    ) : (
                      "Support with Ad View"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
