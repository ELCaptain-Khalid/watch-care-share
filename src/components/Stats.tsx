
import { DollarSign, Users, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export const Stats = () => {
  const stats = [
    {
      value: "$50K+",
      label: "Raised This Month",
      icon: <DollarSign className="h-6 w-6" />,
      delay: 0.1
    },
    {
      value: "15K",
      label: "Active Contributors",
      icon: <Users className="h-6 w-6" />,
      delay: 0.2
    },
    {
      value: "30+",
      label: "Supported Causes",
      icon: <HeartHandshake className="h-6 w-6" />,
      delay: 0.3
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:gap-12 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
            >
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-accent">{stat.icon}</span>
              </div>
              <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
