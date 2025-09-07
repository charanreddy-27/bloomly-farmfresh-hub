import { ArrowRight, Users, Sprout, TrendingUp } from 'lucide-react';

const CallToAction = () => {
  const actionCards = [
    {
      icon: Users,
      title: "Retailer Signup",
      description: "Join 500+ retailers already saving 25% on fresh produce costs",
      buttonText: "Start Saving Today",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 border-green-200"
    },
    {
      icon: Sprout,
      title: "Farmer Connect",
      description: "Partner with us to reach more retailers and grow your business",
      buttonText: "Become a Partner",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200"
    },
    {
      icon: TrendingUp,
      title: "Investor Enquiry",
      description: "Invest in the future of sustainable agriculture and food supply",
      buttonText: "Learn More",
      color: "from-lime-500 to-lime-600",
      bgColor: "bg-lime-50 border-lime-200"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-200 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-6 fade-in">
            Ready to Power Your <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Fresh Produce</span> Sourcing?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose your path to better sourcing, higher profits, and sustainable growth with Bloomly
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {actionCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={index}
                className={`${card.bgColor} rounded-xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <button className={`w-full bg-gradient-to-r ${card.color} text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3`}>
                    {card.buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Transform Your Business Today</h3>
          <p className="text-xl mb-8 opacity-95">
            Join the fresh produce revolution. Better sourcing, higher profits, sustainable growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button className="bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-green-50 transition-colors duration-300 flex items-center justify-center gap-2 text-lg">
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300 text-lg">
              Schedule a Demo
            </button>
          </div>
          
          <div className="mt-6 text-sm opacity-80">
            ✓ No setup fees  ✓ 30-day free trial  ✓ Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;