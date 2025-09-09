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

      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Simple Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Hybrid Purchase <span className="text-green-600">Model</span>
            </h2>
            <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Flowchart with exact L-shaped arrows as drawn */}
          <div className="relative space-y-8">
            
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

              {/* Exact L-shaped arrows from your drawing */}
              <div className="absolute top-full left-0 w-full h-20 pointer-events-none">
                {/* Left L-arrow: down → right → down */}
                <div className="absolute left-[15%] top-0">
                  <svg className="w-48 h-20" viewBox="0 0 192 80">
                    {/* Vertical line down from left box */}
                    <path d="M 35 0 L 35 30" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Horizontal line across to center */}
                    <path d="M 35 30 L 96 30" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Vertical line down to DC */}
                    <path d="M 96 30 L 96 75" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                    <polygon points="96,78 92,74 100,74" fill="#059669" className="flow-arrow"/>
                  </svg>
                </div>
                
                {/* Right L-arrow: down → left → down */}
                <div className="absolute right-[15%] top-0">
                  <svg className="w-48 h-20" viewBox="0 0 192 80">
                    {/* Vertical line down from right box */}
                    <path d="M 157 0 L 157 30" stroke="#ea580c" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Horizontal line across to center */}
                    <path d="M 157 30 L 96 30" stroke="#ea580c" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Vertical line down to DC */}
                    <path d="M 96 30 L 96 75" stroke="#ea580c" strokeWidth="2" fill="none" className="flow-arrow"/>
                    <polygon points="96,78 92,74 100,74" fill="#ea580c" className="flow-arrow"/>
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

            {/* L-shaped arrows from DC to destinations - exactly as drawn */}
            <div className="relative h-20">
              {/* Left L-arrow: down → left → down to Modern Trade */}
              <div className="absolute left-[15%] top-0">
                <svg className="w-48 h-20" viewBox="0 0 192 80">
                  {/* Vertical line down from DC */}
                  <path d="M 96 5 L 96 30" stroke="#7c3aed" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Horizontal line to left */}
                  <path d="M 96 30 L 35 30" stroke="#7c3aed" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Vertical line down to destination */}
                  <path d="M 35 30 L 35 75" stroke="#7c3aed" strokeWidth="2" fill="none" className="flow-arrow"/>
                  <polygon points="35,78 31,74 39,74" fill="#7c3aed" className="flow-arrow"/>
                </svg>
              </div>

              {/* Center straight arrow to Wholesale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
                <svg className="w-8 h-20" viewBox="0 0 32 80">
                  <path d="M 16 5 L 16 75" stroke="#dc2626" strokeWidth="2" fill="none" className="flow-arrow"/>
                  <polygon points="16,78 12,74 20,74" fill="#dc2626" className="flow-arrow"/>
                </svg>
              </div>

              {/* Right L-arrow: down → right → down to Retailers */}
              <div className="absolute right-[15%] top-0">
                <svg className="w-48 h-20" viewBox="0 0 192 80">
                  {/* Vertical line down from DC */}
                  <path d="M 96 5 L 96 30" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Horizontal line to right */}
                  <path d="M 96 30 L 157 30" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Vertical line down to destination */}
                  <path d="M 157 30 L 157 75" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                  <polygon points="157,78 153,74 161,74" fill="#059669" className="flow-arrow"/>
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
