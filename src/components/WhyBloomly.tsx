import { CheckCircle, BarChart3, RotateCcw, Laptop } from 'lucide-react';

const WhyBloomly = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Predictable Supply",
      description: "Reliable delivery schedules you can count on"
    },
    {
      icon: BarChart3,
      title: "Better Margins",
      description: "Higher profits through direct sourcing"
    },
    {
      icon: RotateCcw,
      title: "Zero Waste",
      description: "Sustainable practices that reduce waste"
    },
    {
      icon: Laptop,
      title: "Technology-Driven",
      description: "Modern tools for efficient operations"
    }
  ];

  return (
    <section className="section-padding section-alt">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-foreground mb-6 fade-in">
            Why Bloomly
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center card-elevated p-6 scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBloomly;