
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface AdViewProps {
  onAdCompleted?: () => void;
}

export const AdView = ({ onAdCompleted }: AdViewProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [adLoaded, setAdLoaded] = useState(false);

  // Simulate ad loading
  useEffect(() => {
    if (isWatching) {
      const loadTimer = setTimeout(() => {
        setAdLoaded(true);
      }, 1500);
      
      return () => clearTimeout(loadTimer);
    }
  }, [isWatching]);

  // Simulate ad progress
  useEffect(() => {
    if (isWatching && adLoaded) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsWatching(false);
            setAdLoaded(false);
            if (onAdCompleted) onAdCompleted();
            toast({
              title: "Ad completed!",
              description: "You've just contributed $0.25 to your selected cause. Thank you!",
            });
            return 0;
          }
          return prev + 5;
        });
      }, 500);
      
      return () => clearInterval(timer);
    }
  }, [isWatching, adLoaded, onAdCompleted]);

  const startAd = () => {
    setIsWatching(true);
    setProgress(0);
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
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            {!adLoaded ? (
              <div className="text-gray-500">Loading ad...</div>
            ) : (
              <div className="text-center p-4">
                <div className="text-lg font-medium text-gray-800 mb-2">Ad playing...</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">Please watch the entire ad to support your cause</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
