import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Play, CheckCircle, DollarSign, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { adMobService } from "@/services/AdMobService";

export const AdView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (progress >= 100) {
      setIsWatching(false);
      setCompleted(true);
      toast({
        title: "Thank you for your contribution!",
        description: "Your watch has contributed $0.10 to your selected cause.",
      });
    }
  }, [progress, toast]);
  
  const watchAd = () => {
    setIsLoading(true);
    setCompleted(false);
    
    // On mobile, show a real rewarded ad
    if (window.Capacitor) {
      adMobService.showRewardedAd(
        // onReward callback
        (reward) => {
          console.log(`User earned reward: ${reward.amount} ${reward.type}`);
          setCompleted(true);
        },
        // onDismiss callback
        () => {
          setIsLoading(false);
          // If the ad was dismissed without getting a reward, reset
          if (!completed) {
            toast({
              title: "Ad dismissed",
              description: "Please watch the entire ad to contribute.",
              variant: "destructive",
            });
          }
        }
      );
    } else {
      // Web simulation (for development)
      setTimeout(() => {
        setIsLoading(false);
        setIsWatching(true);
        setProgress(0);
        
        // Simulate ad progress
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }, 300);
      }, 1500);
    }
  };
  
  const resetView = () => {
    setCompleted(false);
  };
  
  if (completed) {
    return (
      <motion.div 
        className="w-full max-w-md mx-auto rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Ad Completed!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for supporting this cause. Your contribution makes a real difference.
            </p>
            <div className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm mb-4 w-full">
              <DollarSign className="h-5 w-5 text-accent mr-2" />
              <span className="font-medium text-accent">$0.10 contributed</span>
            </div>
            <Button 
              onClick={resetView} 
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Watch Another Ad
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  if (isWatching) {
    return (
      <motion.div 
        className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Ad in progress</h3>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-accent to-accent/80 h-3 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Please watch the entire ad</p>
          <span className="text-sm font-medium text-accent">{progress}%</span>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Support through watching</h3>
      <p className="text-base text-gray-600 mb-4">
        Watch a 30-second advertisement to contribute funds to your selected cause.
      </p>
      <Button 
        onClick={watchAd} 
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-white py-6 h-auto"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            Loading Ad...
          </span>
        ) : (
          <span className="flex items-center justify-center text-base">
            <Play className="mr-2 h-5 w-5" />
            Watch Ad Now
          </span>
        )}
      </Button>
    </motion.div>
  );
};
