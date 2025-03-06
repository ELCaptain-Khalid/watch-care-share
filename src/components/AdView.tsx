
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Play, CheckCircle } from "lucide-react";

export const AdView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const watchAd = () => {
    setIsLoading(true);
    
    // Simulate ad loading
    setTimeout(() => {
      setIsLoading(false);
      setIsWatching(true);
      
      // Simulate ad progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsWatching(false);
            toast({
              title: "Thank you!",
              description: "Your watch has contributed $0.10 to your selected cause.",
            });
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }, 1500);
  };
  
  if (isWatching) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Ad in progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-accent h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">Please watch the entire ad to contribute</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Support through watching</h3>
      <p className="text-sm text-gray-600 mb-4">
        Watch a 30-second advertisement to contribute funds to your selected cause.
      </p>
      <Button 
        onClick={watchAd} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <span className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Loading Ad...
          </span>
        ) : (
          <span className="flex items-center">
            <Play className="mr-2 h-4 w-4" />
            Watch Ad Now
          </span>
        )}
      </Button>
    </div>
  );
};
