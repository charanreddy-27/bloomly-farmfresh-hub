const Metrics = () => {
  const metrics = [
    {
      value: "₹12L+",
      label: "Monthly Revenue",
      color: "text-primary"
    },
    {
      value: "18%",
      label: "MoM Growth",
      color: "text-secondary"
    },
    {
      value: "100+",
      label: "Retail Partners",
      color: "text-accent"
    },
    {
      value: "3x",
      label: "Higher Margins on Key SKUs",
      color: "text-primary"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="text-center scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;