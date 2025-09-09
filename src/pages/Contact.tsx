import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        type: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Bangalore, Karnataka, India",
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email", 
      content: "suppley@bloomly.co.in",
      color: "text-secondary"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 72595 36656",
      color: "text-accent"
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
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-8 text-white fade-in font-black tracking-tight">
                Get in{' '}
                <span className="gradient-text bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 slide-up font-medium">
                Ready to transform your fresh produce supply chain? Let's talk.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-foreground mb-8">Let's Connect</h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  Whether you're a retailer looking for reliable fresh produce supply, 
                  a farmer wanting to connect directly with buyers, or an investor 
                  interested in our growth story - we'd love to hear from you.
                </p>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div 
                        key={index}
                        className="flex items-start gap-4 scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`${info.color} mt-1`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                          <p className="text-muted-foreground">{info.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Business Hours */}
                <div className="mt-12 p-6 bg-subtle rounded-xl slide-up">
                  <h4 className="font-semibold text-foreground mb-3">Business Hours</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="slide-up">
                <div className="card-elevated p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-8">Send us a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                          placeholder="+91 72595 36656"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                          I am a... *
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                        >
                          <option value="">Select your role</option>
                          <option value="retailer">Retailer</option>
                          <option value="farmer">Farmer</option>
                          <option value="investor">Investor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                        placeholder="Your company name (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground resize-none"
                        placeholder="Tell us about your requirements or any questions you have..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section Placeholder */}
        <section className="section-padding section-alt">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6 fade-in">Visit Our Office</h2>
              <p className="text-xl text-muted-foreground slide-up">
                Located in the heart of Bangalore's tech hub
              </p>
            </div>
            
            <div className="card-elevated p-8 text-center scale-in">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Bangalore Office</h3>
              <p className="text-xl text-muted-foreground mb-6">
                Bangalore, Karnataka, India
              </p>
              <p className="text-muted-foreground">
                We're located in Bangalore's vibrant startup ecosystem, 
                close to major tech companies and easily accessible by public transport.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;