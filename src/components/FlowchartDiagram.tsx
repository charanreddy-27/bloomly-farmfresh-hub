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

          {/* Exact flowchart with L-shaped connecting arrows */}
          <div className="relative space-y-8">
            
            {/* Top Row: Two procurement modes */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-20 justify-items-center">
                
                {/* Left: Farm-Gate Purchase */}
                <div className="bg-white rounded-lg shadow-sm border-2 border-green-200 p-3 text-center w-[140px]">
                  <h3 className="font-semibold text-green-700 text-xs">Bloomly</h3>
                  <h3 className="font-semibold text-green-700 text-xs">purchases</h3>
                  <h3 className="font-semibold text-green-700 text-xs">at Farmgate</h3>
                </div>

                {/* Right: Farmer brings to DC */}
                <div className="bg-white rounded-lg shadow-sm border-2 border-orange-200 p-3 text-center w-[140px]">
                  <h3 className="font-semibold text-orange-700 text-xs">Farmer harvest</h3>
                  <h3 className="font-semibold text-orange-700 text-xs">& bring to</h3>
                  <h3 className="font-semibold text-orange-700 text-xs">DC</h3>
                </div>
              </div>

              {/* L-shaped arrows from top boxes to DC */}
              <div className="absolute top-full left-0 w-full h-16 pointer-events-none">
                {/* Left L-shaped arrow */}
                <div className="absolute left-[10%] top-0">
                  <svg className="w-40 h-16" viewBox="0 0 160 64">
                    {/* Vertical line down */}
                    <path d="M 20 0 L 20 32" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Horizontal line to center */}
                    <path d="M 20 32 L 80 32" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Vertical line to DC */}
                    <path d="M 80 32 L 80 60" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Arrowhead */}
                    <polygon points="80,60 76,56 84,56" fill="#059669" className="flow-arrow"/>
                  </svg>
                </div>
                
                {/* Right L-shaped arrow */}
                <div className="absolute right-[10%] top-0">
                  <svg className="w-40 h-16" viewBox="0 0 160 64">
                    {/* Vertical line down */}
                    <path d="M 140 0 L 140 32" stroke="#ea580c" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Horizontal line to center */}
                    <path d="M 140 32 L 80 32" stroke="#ea580c" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Vertical line to DC */}
                    <path d="M 80 32 L 80 60" stroke="#ea580c" strokeWidth="2" fill="none" className="flow-arrow"/>
                    {/* Arrowhead */}
                    <polygon points="80,60 76,56 84,56" fill="#ea580c" className="flow-arrow"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Middle: Distribution Center */}
            <div className="flex justify-center">
              <div className="bg-blue-50 rounded-lg shadow-sm border-2 border-blue-200 p-4 text-center w-[160px]">
                <h3 className="font-bold text-blue-800 text-sm">Bloomly Dispatch</h3>
                <h3 className="font-bold text-blue-800 text-sm">Center</h3>
              </div>
            </div>

            {/* L-shaped arrows from DC to retail channels */}
            <div className="relative h-16">
              {/* Left L-shaped arrow to Modern Trade */}
              <div className="absolute left-[10%] top-0">
                <svg className="w-40 h-16" viewBox="0 0 160 64">
                  {/* Vertical line down from DC */}
                  <path d="M 80 4 L 80 32" stroke="#7c3aed" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Horizontal line to left */}
                  <path d="M 80 32 L 20 32" stroke="#7c3aed" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Vertical line down to destination */}
                  <path d="M 20 32 L 20 60" stroke="#7c3aed" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Arrowhead */}
                  <polygon points="20,60 16,56 24,56" fill="#7c3aed" className="flow-arrow"/>
                </svg>
              </div>

              {/* Center straight arrow to Wholesale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
                <svg className="w-8 h-16" viewBox="0 0 32 64">
                  {/* Straight line down */}
                  <path d="M 16 4 L 16 60" stroke="#dc2626" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Arrowhead */}
                  <polygon points="16,60 12,56 20,56" fill="#dc2626" className="flow-arrow"/>
                </svg>
              </div>

              {/* Right L-shaped arrow to Retailers */}
              <div className="absolute right-[10%] top-0">
                <svg className="w-40 h-16" viewBox="0 0 160 64">
                  {/* Vertical line down from DC */}
                  <path d="M 80 4 L 80 32" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Horizontal line to right */}
                  <path d="M 80 32 L 140 32" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Vertical line down to destination */}
                  <path d="M 140 32 L 140 60" stroke="#059669" strokeWidth="2" fill="none" className="flow-arrow"/>
                  {/* Arrowhead */}
                  <polygon points="140,60 136,56 144,56" fill="#059669" className="flow-arrow"/>
                </svg>
              </div>
            </div>

            {/* Bottom Row: Three retail channels */}
            <div className="grid grid-cols-3 gap-8 justify-items-center">
              
              <div className="bg-white rounded-lg shadow-sm border p-3 text-center w-[120px]">
                <h3 className="font-semibold text-purple-700 text-xs">Modern Trade</h3>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-3 text-center w-[120px]">
                <h3 className="font-semibold text-red-700 text-xs">Wholesale</h3>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-3 text-center w-[120px]">
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
