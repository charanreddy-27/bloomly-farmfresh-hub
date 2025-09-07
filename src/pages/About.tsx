import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle, Users, Target, Lightbulb, Leaf, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to reducing waste and promoting eco-friendly practices in agriculture"
    },
    {
      icon: CheckCircle,
      title: "Transparency", 
      description: "Building trust through open communication and honest business practices"
    },
    {
      icon: Target,
      title: "Quality",
      description: "Ensuring premium fresh produce reaches our partners in perfect condition"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging technology to revolutionize the fresh produce supply chain"
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Foundation",
      description: "Bloomly was founded with a vision to transform fresh produce supply chain"
    },
    {
      year: "2024",
      title: "First Partnerships", 
      description: "Secured partnerships with 50+ retailers and 25+ farms across Karnataka"
    },
    {
      year: "2024",
      title: "Rapid Growth",
      description: "Achieved ₹12L+ monthly revenue with 18% month-over-month growth"
    },
    {
      year: "2025", 
      title: "Expansion",
      description: "Scaling operations across South India with 100+ retail partners"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-gradient pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="floating-shapes">
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-8 text-white fade-in font-black tracking-tight">
                Revolutionizing Fresh Produce{' '}
                <span className="gradient-text bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Supply Chain
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 slide-up font-medium">
                Connecting farms directly to retailers since 2023
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-foreground mb-6 fade-in">Our Story</h2>
                <p className="text-xl text-muted-foreground slide-up">
                  Born from the frustration of inefficient supply chains and food waste
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">The Problem We Identified</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    The traditional fresh produce supply chain was broken. Farmers struggled to get fair prices, 
                    retailers faced unpredictable supply, and tons of fresh produce went to waste due to 
                    inefficient middleman systems.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We saw an opportunity to use technology to connect farms directly with retailers, 
                    eliminating waste and creating value for everyone in the chain.
                  </p>
                </div>
                
                <div className="slide-up">
                  <div className="card-elevated p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Our Solution</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Direct farm-to-retailer connections</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Technology-driven logistics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Zero waste commitment</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Predictable supply and pricing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding section-alt">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center md:text-left fade-in">
                <Target className="w-16 h-16 text-primary mb-6 mx-auto md:mx-0" />
                <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  To eliminate waste in fresh produce supply chain by connecting farms directly 
                  with retailers through innovative technology solutions.
                </p>
              </div>
              
              <div className="text-center md:text-left slide-up">
                <TrendingUp className="w-16 h-16 text-primary mb-6 mx-auto md:mx-0" />
                <h3 className="text-3xl font-bold text-foreground mb-6">Our Vision</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A world where every fruit and vegetable reaches its destination fresh, 
                  creating sustainable value for farmers, retailers, and consumers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-6 fade-in">Our Values</h2>
              <p className="text-xl text-muted-foreground slide-up max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="card-elevated p-8 text-center scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-6 flex justify-center">
                      <IconComponent className="w-12 h-12 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-4">{value.title}</h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="section-padding section-alt">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-6 fade-in">Our Journey</h2>
              <p className="text-xl text-muted-foreground slide-up">
                Key milestones in our mission to transform fresh produce supply chain
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div 
                    key={index}
                    className="flex gap-8 items-start reveal-animation"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 font-bold">
                        {item.year}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-6 fade-in">Leadership Team</h2>
              <p className="text-xl text-muted-foreground slide-up">
                The visionaries driving Bloomly's mission forward
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="card-elevated p-8 text-center scale-in">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-hover rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Founder & CEO</h4>
                <p className="text-primary font-semibold mb-4">Leadership</p>
                <p className="text-muted-foreground">
                  Passionate about transforming agriculture through technology and sustainable practices.
                </p>
              </div>
              
              <div className="card-elevated p-8 text-center scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-24 h-24 bg-gradient-to-br from-secondary to-secondary/80 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Lightbulb className="w-12 h-12 text-secondary-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Head of Technology</h4>
                <p className="text-secondary font-semibold mb-4">Innovation</p>
                <p className="text-muted-foreground">
                  Leading our tech initiatives to create seamless supply chain solutions.
                </p>
              </div>
              
              <div className="card-elevated p-8 text-center scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/80 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-accent-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Head of Operations</h4>
                <p className="text-accent font-semibold mb-4">Execution</p>
                <p className="text-muted-foreground">
                  Ensuring smooth operations and exceptional service delivery across all partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;