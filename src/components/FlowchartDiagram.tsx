import { ArrowRight, ArrowDown } from 'lucide-react';

const FlowchartDiagram = () => {
  return (
    <>
      <style>
        {`
          @keyframes arrowFlow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }

          .flow-arrow {
            animation: arrowFlow 2s ease-in-out infinite;
          }
        `}
      </style>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Simple Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Supply Chain <span className="text-green-600">Flow</span>
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Simplified Flowchart */}
          <div className="space-y-8">
            
            {/* Stage 1: Inputs to DC */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              
              {/* Input Sources */}
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-lg shadow-sm border p-4 text-center min-w-[140px]">
                  <h3 className="font-semibold text-green-700 text-sm">Farmgate</h3>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-4 text-center min-w-[140px]">
                  <h3 className="font-semibold text-orange-700 text-sm">Farmer Direct</h3>
                </div>
              </div>

              {/* Arrow to DC */}
              <div className="flex items-center">
                <ArrowRight className="text-green-600 flow-arrow hidden md:block" size={24} />
                <ArrowDown className="text-green-600 flow-arrow md:hidden" size={24} />
              </div>

              {/* Distribution Center */}
              <div className="bg-blue-50 rounded-lg shadow-sm border-2 border-blue-200 p-6 text-center">
                <h3 className="font-bold text-blue-800 text-lg">Distribution Center</h3>
                <p className="text-blue-600 text-xs mt-1">Processing Hub</p>
              </div>
            </div>

            {/* Vertical Arrow */}
            <div className="flex justify-center">
              <ArrowDown className="text-green-600 flow-arrow" size={24} />
            </div>

            {/* Stage 2: DC to Retail Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              
              <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
                <h3 className="font-semibold text-purple-700 text-sm">Modern Trade</h3>
                <p className="text-xs text-gray-600 mt-1">Retail Chains</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
                <h3 className="font-semibold text-red-700 text-sm">Wholesale</h3>
                <p className="text-xs text-gray-600 mt-1">Bulk Distribution</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
                <h3 className="font-semibold text-green-700 text-sm">Retailers</h3>
                <p className="text-xs text-gray-600 mt-1">Local Stores</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlowchartDiagram;
