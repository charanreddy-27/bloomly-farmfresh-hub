const Hero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-28 lg:pt-32 md:pb-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Headline */}
          <h1 className="mb-6 text-foreground fade-in">
            Fresh. Convenient.{' '}
            <span className="text-primary">Reliable.</span>
          </h1>
          
          {/* Hero Subheadline */}
          <p className="mb-12 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto slide-up">
            Delivering premium fruits directly to your business—on time, every time.
          </p>
          
          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center scale-in">
            <button className="btn-primary text-lg px-8 py-4">
              PARTNER WITH US
            </button>
            <button className="btn-outline text-lg px-8 py-4">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;