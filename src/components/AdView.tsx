
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface AdViewProps {
  onAdCompleted?: () => void;
}

export const AdView = ({ onAdCompleted }: AdViewProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [adLoaded, setAdLoaded] = useState(false);

  // Simulate AdMob ad loading
  useEffect(() => {
    if (isWatching) {
      console.log("AdMob: Loading advertisement...");
      const loadTimer = setTimeout(() => {
        console.log("AdMob: Advertisement loaded successfully");
        setAdLoaded(true);
        toast({
          title: "Ad loaded",
          description: "Watch the entire ad to contribute to your cause",
        });
      }, 1500);
      
      return () => clearTimeout(loadTimer);
    }
  }, [isWatching]);

  // Simulate ad progress (AdMob would handle this internally)
  useEffect(() => {
    if (isWatching && adLoaded) {
      console.log("AdMob: Starting to play advertisement");
      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(timer);
            setIsWatching(false);
            setAdLoaded(false);
            console.log("AdMob: Advertisement completed, rewarding user");
            if (onAdCompleted) onAdCompleted();
            toast({
              title: "Ad completed!",
              description: "You've just contributed $0.25 to your selected cause. Thank you!",
            });
            return 0;
          }
          return newProgress;
        });
      }, 500);
      
      return () => clearInterval(timer);
    }
  }, [isWatching, adLoaded, onAdCompleted]);

  const startAd = () => {
    console.log("AdMob: Requesting advertisement");
    setIsWatching(true);
    setProgress(0);
  };

  const closeAd = () => {
    console.log("AdMob: User closed advertisement early");
    setIsWatching(false);
    setAdLoaded(false);
    toast({
      title: "Ad closed",
      description: "You can watch an ad anytime to contribute.",
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      {!isWatching ? (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ready to make an impact?</h3>
          <p className="text-gray-600 mb-6">Watch a short ad and contribute directly to your chosen cause.</p>
          <Button 
            onClick={startAd} 
            className="bg-accent hover:bg-accent/90 w-full"
          >
            Watch Ad Now
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-end mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeAd} 
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            {!adLoaded ? (
              <div className="text-gray-500 flex flex-col items-center">
                <div className="animate-pulse text-accent mb-2">Loading ad...</div>
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 rounded-full bg-accent/20"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 w-full">
                <div className="text-lg font-medium text-gray-800 mb-2">AdMob Advertisement</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="bg-gray-300 h-32 flex items-center justify-center rounded-lg mb-2">
                  <p className="text-sm text-gray-600 px-4 text-center">
                    [Ad content would appear here in a real implementation]
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {progress < 100 ? "Please watch the entire ad to support your cause" : "Thank you for your contribution!"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-400 text-center">
        Powered by AdMob - Advertisements that make a difference
      </div>
    </div>
  );
};
