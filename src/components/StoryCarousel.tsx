
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { BookOpenText, Quote } from "lucide-react";

interface Story {
  id: number;
  name: string;
  avatar: string;
  story: string;
  cause: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "/avatars/emma.jpg",
    story: "With the help of ad funds, my school received new science equipment. Now we can perform experiments we only read about before!",
    cause: "Education for All"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    story: "The counseling services funded by this platform helped me manage my anxiety during finals. I'm now thriving in college!",
    cause: "Mental Health Support"
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    avatar: "/avatars/sophia.jpg",
    story: "Our campus installed solar panels thanks to the environmental initiative. We're now generating 30% of our energy needs sustainably!",
    cause: "Environmental Action"
  }
];

export function StoryCarousel() {
  const [api, setApi] = useState<{ scrollNext: () => void } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll the carousel
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);

  // Fallback avatars using initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <BookOpenText className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-semibold text-gray-800">Success Stories</h2>
      </div>
      
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {stories.map((story) => (
            <CarouselItem key={story.id} className="md:basis-1/1 lg:basis-1/1">
              <Card className="border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col p-6">
                  <div className="mb-4 text-accent">
                    <Quote className="h-8 w-8 opacity-50" />
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{story.story}"</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={story.avatar} alt={story.name} />
                        <AvatarFallback>{getInitials(story.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{story.name}</p>
                        <p className="text-sm text-primary">{story.cause}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static transform-none mx-1" />
          <CarouselNext className="relative static transform-none mx-1" />
        </div>
      </Carousel>
    </motion.div>
  );
}
