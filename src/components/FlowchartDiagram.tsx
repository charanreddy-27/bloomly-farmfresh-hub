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

      <section className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Simple Header */}
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-gray-800 mb-2">
              Hybrid Purchase Model for<span className="text-green-600"> Fruits</span>
            </h2>
            <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Flowchart with properly connected arrows */}
          <div className="relative space-y-4">
            
            {/* Top Row: Two procurement modes */}
            <div className="relative">
              <div className="flex justify-between items-start max-w-3xl mx-auto">
                
                {/* Left: Farm-Gate Purchase */}
                <div className="bg-white rounded-lg shadow-sm border-2 border-green-200 p-3 text-center w-[140px]">
                  <h3 className="font-semibold text-green-700 text-xs">Bloomly purchases</h3>
                  <h3 className="font-semibold text-green-700 text-xs">at Farm-gate</h3>
                </div>

                {/* Right: Farmer brings to DC */}
                <div className="bg-white rounded-lg shadow-sm border-2 border-orange-200 p-3 text-center w-[140px]">
                  <h3 className="font-semibold text-orange-700 text-xs">Farmer harvest</h3>
                  <h3 className="font-semibold text-orange-700 text-xs">& bring to DC</h3>
                </div>
              </div>

              {/* Arrows connecting to center box */}
              <div className="absolute top-full left-0 w-full h-12 pointer-events-none">
                {/* Left arrow: from left box to center */}
                <div className="absolute left-[15%] top-0">
                  <svg className="w-48 h-12" viewBox="0 0 192 48">
                    {/* Vertical line down from left box */}
                    <path d="M 35 0 L 35 15" stroke="#059669" strokeWidth="3" fill="none" className="flow-arrow"/>
                    {/* Horizontal line across to center */}
                    <path d="M 35 15 L 96 15" stroke="#059669" strokeWidth="3" fill="none" className="flow-arrow"/>
                    {/* Vertical line down to DC */}
                    <path d="M 96 15 L 96 48" stroke="#059669" strokeWidth="3" fill="none" className="flow-arrow"/>
                    <polygon points="96,48 92,42 100,42" fill="#059669" className="flow-arrow"/>
                  </svg>
                </div>
                
                {/* Right arrow: from right box to center */}
                <div className="absolute right-[15%] top-0">
                  <svg className="w-48 h-12" viewBox="0 0 192 48">
                    {/* Vertical line down from right box */}
                    <path d="M 157 0 L 157 15" stroke="#ea580c" strokeWidth="3" fill="none" className="flow-arrow"/>
                    {/* Horizontal line across to center */}
                    <path d="M 157 15 L 96 15" stroke="#ea580c" strokeWidth="3" fill="none" className="flow-arrow"/>
                    {/* Vertical line down to DC */}
                    <path d="M 96 15 L 96 48" stroke="#ea580c" strokeWidth="3" fill="none" className="flow-arrow"/>
                    <polygon points="96,48 92,42 100,42" fill="#ea580c" className="flow-arrow"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Middle: Distribution Center */}
            <div className="flex justify-center">
              <div className="bg-blue-50 rounded-lg shadow-sm border-2 border-blue-200 p-4 text-center w-[180px]">
                <h3 className="font-bold text-blue-800 text-sm">Bloomly Dispatch</h3>
                <h3 className="font-bold text-blue-800 text-sm">Center</h3>
              </div>
            </div>

            {/* Arrows from DC to destinations */}
            <div className="relative h-12">
              {/* Left arrow: from center to Modern Trade */}
              <div className="absolute left-[15%] top-0">
                <svg className="w-48 h-12" viewBox="0 0 192 48">
                  {/* Vertical line down from DC */}
                  <path d="M 96 0 L 96 15" stroke="#7c3aed" strokeWidth="3" fill="none" className="flow-arrow"/>
                  {/* Horizontal line to left */}
                  <path d="M 96 15 L 35 15" stroke="#7c3aed" strokeWidth="3" fill="none" className="flow-arrow"/>
                  {/* Vertical line down to destination */}
                  <path d="M 35 15 L 35 48" stroke="#7c3aed" strokeWidth="3" fill="none" className="flow-arrow"/>
                  <polygon points="35,48 31,42 39,42" fill="#7c3aed" className="flow-arrow"/>
                </svg>
              </div>

              {/* Center straight arrow to Wholesale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
                <svg className="w-8 h-12" viewBox="0 0 32 48">
                  <path d="M 16 0 L 16 48" stroke="#dc2626" strokeWidth="3" fill="none" className="flow-arrow"/>
                  <polygon points="16,48 12,42 20,42" fill="#dc2626" className="flow-arrow"/>
                </svg>
              </div>

              {/* Right arrow: from center to Retailers */}
              <div className="absolute right-[15%] top-0">
                <svg className="w-48 h-12" viewBox="0 0 192 48">
                  {/* Vertical line down from DC */}
                  <path d="M 96 0 L 96 15" stroke="#059669" strokeWidth="3" fill="none" className="flow-arrow"/>
                  {/* Horizontal line to right */}
                  <path d="M 96 15 L 157 15" stroke="#059669" strokeWidth="3" fill="none" className="flow-arrow"/>
                  {/* Vertical line down to destination */}
                  <path d="M 157 15 L 157 48" stroke="#059669" strokeWidth="3" fill="none" className="flow-arrow"/>
                  <polygon points="157,48 153,42 161,42" fill="#059669" className="flow-arrow"/>
                </svg>
              </div>
            </div>

            {/* Bottom Row: Three retail channels */}
            <div className="flex justify-between items-start max-w-3xl mx-auto">
              
              <div className="bg-white rounded-lg shadow-sm border p-3 text-center w-[140px]">
                <h3 className="font-semibold text-purple-700 text-xs">Modern Trade</h3>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-3 text-center w-[140px]">
                <h3 className="font-semibold text-red-700 text-xs">Wholesale</h3>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-3 text-center w-[140px]">
                <h3 className="font-semibold text-green-700 text-xs">Retailers</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlowchartDiagram;
