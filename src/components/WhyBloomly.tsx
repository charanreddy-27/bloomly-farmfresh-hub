import { CheckCircle, BarChart3, RotateCcw, Laptop, Shield, Zap } from 'lucide-react';

const WhyBloomly = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Predictable Supply",
      description: "Reliable delivery schedules you can count on with 99.5% on-time delivery",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: BarChart3,
      title: "Better Margins",
      description: "25% higher profits through direct sourcing and elimination of middlemen",
      color: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: RotateCcw,
      title: "Zero Waste",
      description: "Sustainable practices that reduce waste by 30% through smart logistics",
      color: "from-lime-500 to-lime-600",
      iconBg: "bg-lime-100",
      iconColor: "text-lime-600"
    },
    {
      icon: Laptop,
      title: "Technology-Driven",
      description: "AI-powered demand forecasting and inventory management tools",
      color: "from-green-600 to-green-700",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "99% freshness guarantee with rigorous quality control at every step",
      color: "from-emerald-600 to-emerald-700",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "24-hour farm-to-store delivery with real-time tracking updates",
      color: "from-lime-600 to-lime-700",
      iconBg: "bg-lime-100",
      iconColor: "text-lime-600"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-green-50/30 to-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-4 fade-in">
            Why Choose <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Bloomly</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're not just another supplier. We're your partner in building a sustainable, profitable fresh produce business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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