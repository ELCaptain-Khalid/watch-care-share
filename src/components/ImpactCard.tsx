import { Heart } from "lucide-react";

interface ImpactCardProps {
  cause: string;
  impact: string;
  raised: string;
}

export const ImpactCard = ({ cause, impact, raised }: ImpactCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{cause}</h3>
        <Heart className="text-primary h-6 w-6" />
      </div>
      <p className="text-gray-600 mb-4">{impact}</p>
      <div className="flex items-center justify-between">
        <span className="text-accent font-medium">{raised} raised</span>
        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full" />
        </div>
      </div>
    </div>
  );
};