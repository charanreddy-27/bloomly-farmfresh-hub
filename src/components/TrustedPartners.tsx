import { useEffect } from 'react';

const TrustedPartners = () => {
  const partners = [
    {
      name: "Big Basket",
      logo: "/BigBasket_Logo.webp",
      alt: "BigBasket Logo"
    },
    {
      name: "Zepto",
      logo: "/Logo_of_Zepto.png",
      alt: "Zepto Logo"
    },
    {
      name: "Swiggy",
      logo: "/Swiggy_Logo.webp",
      alt: "Swiggy Logo"
    },
    {
      name: "Reliance Fresh",
      logo: "/ril-fresh-logo.jpg",
      alt: "Reliance Fresh Logo"
    },
    {
      name: "STAR",
      logo: "/STAR_Logo.jpg",
      alt: "STAR Logo"
    },
    {
      name: "KPN",
      logo: "/KPN-Logo.svg",
      alt: "KPN Logo"
    },
    {
      name: "Superplum",
      logo: "/big-logo.png",
      alt: "Superplum Logo"
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
    <section className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-16 w-24 h-24 bg-green-300 rounded-full blur-2xl" />
        <div className="absolute bottom-16 right-16 w-32 h-32 bg-green-400 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Leading <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Retailers</span>
          </h2>
          
          {/* Decorative line similar to the image */}
          <div className="flex justify-center mt-4 mb-8">
            <div className="w-32 h-1 rounded-full" style={{
              background: 'linear-gradient(90deg, #22c55e 0%, #f97316 25%, #3b82f6 50%, #ef4444 75%, #8b5cf6 100%)'
            }} />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join the growing network of successful retailers who trust Bloomly for their fresh produce needs
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="animate-on-scroll group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full h-24 flex items-center justify-center group-hover:border-green-300">
                <img 
                  src={partner.logo}
                  alt={partner.alt}
                  className="max-h-12 max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center animate-on-scroll">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-green-700 font-semibold">Happy Retailers</div>
                <div className="text-sm text-green-600">Across India</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.5%</div>
                <div className="text-green-700 font-semibold">On-Time Delivery</div>
                <div className="text-sm text-green-600">Guaranteed Fresh</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
                <div className="text-green-700 font-semibold">Cost Savings</div>
                <div className="text-sm text-green-600">Direct Sourcing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center animate-on-scroll">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Them?</h3>
            <p className="mb-6 opacity-95">
              Experience the same success as these leading retailers with our proven fresh produce solutions.
            </p>
            <button className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors duration-300">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
