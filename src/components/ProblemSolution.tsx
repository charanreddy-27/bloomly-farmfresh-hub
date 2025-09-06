import { Trash2, TrendingUp, Users, Truck, User } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Problem Section */}
          <div className="space-y-8 fade-in">
            <h2 className="text-foreground mb-8">
              What's broken in sourcing today?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-destructive" />
                </div>
                <span className="text-lg font-semibold text-foreground">Waste</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <span className="text-lg font-semibold text-foreground">Unpredictability</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">Middlemen</span>
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="space-y-8 slide-up">
            <h2 className="text-foreground mb-8">
              The Bloomly Way
            </h2>
            
            {/* Direct Connection Diagram */}
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-between">
                {/* Farm */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Truck className="w-8 h-8 text-secondary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">Farm</span>
                </div>
                
                {/* Arrow */}
                <div className="flex-1 mx-6">
                  <div className="h-0.5 bg-primary relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
                
                {/* Retailer */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">Retailer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;