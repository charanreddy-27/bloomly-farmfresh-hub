import { ShoppingBasket, Truck, Network } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: ShoppingBasket,
      title: "Fresh Produce",
      description: "High-quality fruits and vegetables sourced from trusted growers",
      color: "bg-secondary/10 text-secondary"
    },
    {
      icon: Truck,
      title: "Produce Distribution",
      description: "Reliable. On time. Always.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Network,
      title: "Supply Chain Management",
      description: "Optimize operations to reduce costs and improve efficiency",
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <section id="solutions" className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-foreground mb-6 fade-in">
            Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto slide-up">
            We provide end-to-end solutions for the fresh produce industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div 
                key={index}
                className="card-elevated p-8 text-center scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto ${solution.color}`}>
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;