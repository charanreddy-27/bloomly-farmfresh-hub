import { useEffect } from 'react';
import { TrendingUp, Users, Truck, Network, Weight, CheckCircle2 } from 'lucide-react';
import Counter from './ui/Counter';

const Metrics = () => {
  const metrics = [
     {
      icon: Weight,
      value: 1800,
      suffix: '+',
      label: "Metric tonnes delivered",
 
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Network,
      value: 2400,
      suffix: '+',
      label: "Farmer connects",

      color: "from-green-500 to-green-600"
    },
   
    {
      icon: CheckCircle2,
      value: 95,
      suffix: '%',
      label: "Customers repeat orders",
  
      color: "from-lime-500 to-lime-600"
    }
  ];

  return (
    <section id="metrics" className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
      {/* Background Pattern - responsive positioning */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-8 right-5 w-16 h-16 md:top-16 md:right-20 md:w-32 md:h-32 
                        bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-8 left-5 w-20 h-20 md:bottom-16 md:left-20 md:w-40 md:h-40 
                        bg-green-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header - improved mobile typography */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-foreground mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4">
            Bloomly's{' '}
            <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Journey
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-0">
            Our growing network of partners proves that direct sourcing works for businesses of all sizes
          </p>
        </div>

        {/* Metrics Grid - enhanced mobile-first responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={index}
                className="group w-full"
              >
                <div className="bg-white rounded-lg shadow-md border border-green-100 
                                hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                                p-4 md:p-6 text-center h-full flex flex-col justify-between
                                min-h-[160px] sm:min-h-[180px]">
                  {/* Icon with gradient background */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 md:mb-4 rounded-lg bg-gradient-to-br ${metric.color} 
                                  flex items-center justify-center group-hover:scale-110 
                                  transition-transform duration-300`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  {/* Metric value */}
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-2">
                    <Counter 
                      end={metric.value} 
                      suffix={metric.suffix}
                      duration={1200 + index * 200}
                    />
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-green-700 leading-tight">
                    {metric.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Metrics;