import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Watch Ads,{" "}
            <span className="text-primary">Make a Real Difference</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join thousands of students turning their screen time into positive
            change. Every ad you watch contributes to meaningful causes - from
            education to environmental protection.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button className="bg-accent hover:bg-accent/90">
              Start Making Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-500">
              Already helped{" "}
              <span className="font-semibold text-accent">10,000+</span> students
              make a difference
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};