/*import { useEffect } from 'react';
import { ShoppingBasket, Truck, Network, ArrowRight, CheckCircle } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: ShoppingBasket,
      title: "Fresh Produce",
      description: "High-quality fruits and vegetables sourced from trusted growers with 99% freshness guarantee",
      features: ["Direct from farms", "Quality assured", "Daily harvest"],
      color: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
      iconColor: "text-green-600",
      shadowColor: "rgba(46, 125, 50, 0.15)"
    },
    {
      icon: Truck,
      title: "Produce Distribution", 
      description: "Reliable, temperature-controlled delivery network ensuring your produce arrives fresh every time",
      features: ["Cold chain logistics", "Real-time tracking", "On-time delivery"],
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
      iconColor: "text-emerald-600",
      shadowColor: "rgba(76, 175, 80, 0.15)"
    },
    {
      icon: Network,
      title: "Supply Chain Management",
      description: "AI-powered supply chain optimization that reduces waste, cuts costs, and improves efficiency",
      features: ["Demand forecasting", "Inventory optimization", "Cost reduction"],
      color: "bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200",
      iconColor: "text-lime-600",
      shadowColor: "rgba(139, 195, 74, 0.15)"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="solutions" className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
     
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-foreground mb-4">
            Our <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            End-to-end fresh produce solutions that transform your supply chain from farm to shelf
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div 
                key={index}
                className={`animate-on-scroll group relative overflow-hidden rounded-xl border-2 ${solution.color} p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  boxShadow: `0 4px 20px ${solution.shadowColor}`
                }}
              >
             
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
               
                <div className="relative mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-white shadow-md group-hover:scale-110 transition-transform duration-300 ${solution.iconColor}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>
                
              
                <div className="relative">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                    {solution.description}
                  </p>
                  
                
                  <ul className="space-y-2 mb-4">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
           
                  <button className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

               
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/30 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default Solutions; */