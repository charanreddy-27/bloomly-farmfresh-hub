import { useEffect } from 'react';
import { ShoppingBasket, Truck, Network, ArrowRight } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: ShoppingBasket,
      title: "Fresh Produce",
      description: "High-quality fruits and vegetables sourced from trusted growers with 99% freshness guarantee",
      features: ["Direct from farms", "Quality assured", "Daily harvest"],
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
      iconColor: "text-emerald-600"
    },
    {
      icon: Truck,
      title: "Produce Distribution",
      description: "Reliable, temperature-controlled delivery network ensuring your produce arrives fresh every time",
      features: ["Cold chain logistics", "Real-time tracking", "On-time delivery"],
      color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: Network,
      title: "Supply Chain Management",
      description: "AI-powered supply chain optimization that reduces waste, cuts costs, and improves efficiency",
      features: ["Demand forecasting", "Inventory optimization", "Cost reduction"],
      color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
      iconColor: "text-purple-600"
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
    <section id="solutions" className="section-padding bg-gradient-to-b from-background to-subtle">
      <div className="container">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-foreground mb-6">
            Our <span className="gradient-text bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            End-to-end fresh produce solutions that transform your supply chain from farm to shelf
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div 
                key={index}
                className={`animate-on-scroll group relative overflow-hidden rounded-2xl border-2 ${solution.color} p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 cursor-pointer`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon with floating animation */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto bg-white shadow-lg group-hover:scale-110 transition-transform duration-300 ${solution.iconColor}`}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {solution.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Learn more button */}
                  <button className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/30 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="card-glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Supply Chain?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join hundreds of retailers who have already revolutionized their fresh produce sourcing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary btn-interactive">
                Get Started Today
              </button>
              <button className="btn-outline">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;