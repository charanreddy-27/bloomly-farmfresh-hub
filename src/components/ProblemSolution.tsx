import { Trash2, TrendingUp, Users, Truck, User, CheckCircle2, Shield, Clock } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-green-50/30 to-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-4">
            From <span className="text-red-600">Problems</span> to <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Traditional sourcing is broken. We've built a better way that connects farms directly to retailers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          {/* Problem Section */}
          <div className="space-y-6 fade-in">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Trash2 className="w-7 h-7 text-red-500" />
              What's Broken Today
            </h3>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-red-800 block">Food Waste</span>
                    <span className="text-red-700 text-sm">30% of produce wasted due to quality issues</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-red-800 block">Unpredictable Costs</span>
                    <span className="text-red-700 text-sm">Price volatility disrupts business planning</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-red-800 block">Too Many Middlemen</span>
                    <span className="text-red-700 text-sm">Multiple intermediaries increase costs by 40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="space-y-6 slide-up">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-green-500" />
              The Bloomly Way
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-green-800 block">Quality Guaranteed</span>
                    <span className="text-green-700 text-sm">99% freshness guarantee with rigorous quality control</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-green-800 block">Predictable Pricing</span>
                    <span className="text-green-700 text-sm">Transparent, stable pricing with no surprises</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-green-800 block">Direct Connection</span>
                    <span className="text-green-700 text-sm">Farm-to-retailer direct sourcing, saving 25% on costs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Connection Diagram */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h4 className="text-lg font-bold text-green-800">Direct Farm-to-Retailer Connection</h4>
            <p className="text-sm text-green-600">Skip the middlemen, maximize freshness & profits</p>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Farm */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto border-2 border-green-300">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-green-800">Farm</span>
              <p className="text-xs text-green-600 mt-1">Fresh Produce</p>
            </div>
            
            {/* Arrow */}
            <div className="flex-1 mx-6">
              <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 relative rounded-full">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-green-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Direct Connection
                </span>
              </div>
            </div>
            
            {/* Retailer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto border-2 border-green-300">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-green-800">Retailer</span>
              <p className="text-xs text-green-600 mt-1">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;