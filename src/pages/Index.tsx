import { Hero } from "@/components/Hero";
import { ImpactCard } from "@/components/ImpactCard";
import { Stats } from "@/components/Stats";

const causes = [
  {
    cause: "Education for All",
    impact: "Providing textbooks and supplies to underprivileged students",
    raised: "$12,450",
  },
  {
    cause: "Mental Health Support",
    impact: "Funding counseling sessions for college students",
    raised: "$8,920",
  },
  {
    cause: "Environmental Action",
    impact: "Supporting campus sustainability initiatives",
    raised: "$15,730",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stats />
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Current Impact Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <ImpactCard key={index} {...cause} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;