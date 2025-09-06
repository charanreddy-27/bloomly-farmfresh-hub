const CallToAction = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-6 fade-in">
            Ready to power your fresh produce sourcing?
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-primary text-lg px-8 py-4 scale-in">
            RETAILER SIGNUP
          </button>
          <button className="btn-outline text-lg px-8 py-4 scale-in" style={{ animationDelay: '0.1s' }}>
            FARMER CONNECT
          </button>
          <button className="btn-outline text-lg px-8 py-4 scale-in" style={{ animationDelay: '0.2s' }}>
            INVESTOR ENQUIRY
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;