
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { AdView } from "./AdView";

export const Hero = () => {
  const [showAdView, setShowAdView] = useState(false);

  const handleAdCompleted = () => {
    // In a real app, we would track this completion and update user stats
    console.log("Ad was completed successfully");
    setShowAdView(false);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-white py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Watch an ad, <span className="text-primary">make a difference</span>
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 text-center">
            Join thousands of students turning their screen time into positive
            change. Every ad you watch contributes to meaningful causes - from
            education to environmental protection.
          </p>
          
          {!showAdView ? (
            <div className="mt-8 flex flex-col items-center">
              <Button 
                className="bg-accent hover:bg-accent/90 w-full max-w-xs"
                onClick={() => setShowAdView(true)}
              >
                Start Making Impact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Already helped{" "}
                <span className="font-semibold text-accent">10,000+</span> students
                make a difference
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <AdView onAdCompleted={handleAdCompleted} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
