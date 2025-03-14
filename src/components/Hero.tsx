
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { AdView } from "@/components/AdView";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-white py-16 sm:py-24">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-white/80 to-white"></div>
      <div className="container relative mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="text-primary">Watch an ad</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
              to make a difference
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
            Join thousands of students turning their screen time into positive
            change. Every ad you watch contributes to meaningful causes - from
            education to environmental protection.
          </p>
          <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
            <AdView />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button className="bg-accent hover:bg-accent/90 px-6 py-6 h-auto text-lg shadow-md shadow-accent/20 w-full sm:w-auto">
              Choose a Cause
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-base text-gray-600">
              <Heart className="h-5 w-5 text-primary" fill="#FDA4AF" />
              Already helped{" "}
              <span className="font-semibold text-accent">10,000+</span> students
              make a difference
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
