export const Stats = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">$50K+</div>
            <div className="mt-2 text-gray-600">Raised This Month</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">15K</div>
            <div className="mt-2 text-gray-600">Active Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">30+</div>
            <div className="mt-2 text-gray-600">Supported Causes</div>
          </div>
        </div>
      </div>
    </div>
  );
};