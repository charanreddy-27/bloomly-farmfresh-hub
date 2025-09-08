import { Trash2, TrendingUp, Users, Truck, User, CheckCircle2, Shield, Clock } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-green-50/30 to-background relative">
      {/* Background Pattern - responsive positioning */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-5 w-16 h-16 md:top-20 md:left-20 md:w-32 md:h-32 
                        bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-5 right-5 w-20 h-20 md:bottom-10 md:right-10 md:w-40 md:h-40 
                        bg-green-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header - improved mobile typography */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-foreground mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            From <span className="text-red-600">Problems</span> to{' '}
            <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Solutions
            </span>
          </h2>
          <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed
                        px-4 sm:px-6 md:px-0">
            Traditional sourcing is broken. We've built a better way that connects farms directly to retailers.
          </p>
        </div>

        {/* Problem vs Solution Grid - mobile-first responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 md:mb-12">
          
          {/* Problem Section */}
          <div className="space-y-6 fade-in">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Trash2 className="w-6 h-6 md:w-7 md:h-7 text-red-500 flex-shrink-0" />
              What's Broken Today
            </h3>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 md:p-5 rounded-r-xl 
                              hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-lg font-semibold text-red-800 block">Food Waste</span>
                    <span className="text-red-700 text-sm leading-relaxed">
                      30% of produce wasted due to quality issues
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4 md:p-5 rounded-r-xl 
                              hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-lg font-semibold text-red-800 block">Unpredictable Costs</span>
                    <span className="text-red-700 text-sm leading-relaxed">
                      Price volatility disrupts business planning
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4 md:p-5 rounded-r-xl 
                              hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-lg font-semibold text-red-800 block">Too Many Middlemen</span>
                    <span className="text-red-700 text-sm leading-relaxed">
                      Multiple intermediaries increase costs by 40%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="space-y-6 slide-up">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-green-500 flex-shrink-0" />
              The Bloomly Way
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 md:p-5 rounded-r-xl 
                              hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-lg font-semibold text-green-800 block">Quality Guaranteed</span>
                    <span className="text-green-700 text-sm leading-relaxed">
                      99% freshness guarantee with rigorous quality control
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 md:p-5 rounded-r-xl 
                              hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-lg font-semibold text-green-800 block">Predictable Pricing</span>
                    <span className="text-green-700 text-sm leading-relaxed">
                      Transparent, stable pricing with no surprises
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 md:p-5 rounded-r-xl 
                              hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-lg font-semibold text-green-800 block">Direct Connection</span>
                    <span className="text-green-700 text-sm leading-relaxed">
                      Farm-to-retailer direct sourcing, saving 25% on costs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Connection Diagram - mobile-responsive */}
        <div className="bg-white rounded-xl shadow-lg border border-green-100 max-w-4xl mx-auto
                        p-6 sm:p-8 lg:p-6 xl:p-8">
          <div className="text-center mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-green-800">
              Direct Farm-to-Retailer Connection
            </h4>
            <p className="text-sm text-green-600 mt-2">
              Skip the middlemen, maximize freshness & profits
            </p>
          </div>
          
          {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
            {/* Farm */}
            <div className="text-center flex-shrink-0">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center 
                              mb-3 mx-auto border-2 border-green-300 hover:scale-110 
                              transition-transform duration-300">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-green-800 block">Farm</span>
              <p className="text-xs text-green-600 mt-1">Fresh Produce</p>
            </div>
            
            {/* Arrow - responsive design */}
            <div className="flex-1 min-w-0 max-w-xs sm:max-w-none mx-6">
              {/* Mobile: Vertical arrow */}
              <div className="sm:hidden flex flex-col items-center">
                <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-green-600 relative rounded-full">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 
                                  w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent 
                                  border-t-8 border-t-green-600"></div>
                </div>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Direct
                  </span>
                </div>
              </div>
              
              {/* Desktop: Horizontal arrow */}
              <div className="hidden sm:block">
                <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 relative rounded-full">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 
                                  w-0 h-0 border-l-8 border-l-green-600 border-t-4 border-t-transparent 
                                  border-b-4 border-b-transparent"></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Direct Connection
                  </span>
                </div>
              </div>
            </div>
            
            {/* Retailer */}
            <div className="text-center flex-shrink-0">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center 
                              mb-3 mx-auto border-2 border-green-300 hover:scale-110 
                              transition-transform duration-300">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-green-800 block">Retailer</span>
              <p className="text-xs text-green-600 mt-1">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;