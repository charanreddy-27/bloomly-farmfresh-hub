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

          /* Mobile responsive flowchart wrapper */
          .flowchart-mobile-wrapper {
            overflow-x: auto;
            overflow-y: visible;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .flowchart-mobile-wrapper::-webkit-scrollbar {
            display: none;
          }

          /* Scale the entire flowchart on mobile while preserving design */
          @media (max-width: 640px) {
            .flowchart-content {
              transform: scale(0.7);
              transform-origin: center top;
              margin-bottom: -120px;
            }
          }

          @media (min-width: 641px) and (max-width: 768px) {
            .flowchart-content {
              transform: scale(0.85);
              transform-origin: center top;
              margin-bottom: -60px;
            }
          }

          @media (min-width: 769px) {
            .flowchart-content {
              transform: scale(1);
              margin-bottom: 0;
            }
          }
        `}
      </style>

      <section className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
        <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
          {/* Simple Header */}
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 mb-2">
              Hybrid Purchase Model for<span className="text-green-600"> Fruits</span>
            </h2>
            <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Mobile responsive flowchart wrapper */}
          <div className="flowchart-mobile-wrapper">
            <div className="flowchart-content">
              {/* Compact Flowchart with proper arrows */}
              <div className="relative space-y-4">
                
                {/* Top Row: Two procurement modes */}
                <div className="relative pb-8">
                  <div className="flex justify-center items-start gap-12 max-w-3xl mx-auto">
                    
                    {/* Left: Farm-Gate Purchase */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-green-200 p-4 text-center w-[180px]">
                      <h3 className="font-semibold text-green-700 text-sm">Bloomly purchases</h3>
                      <h3 className="font-semibold text-green-700 text-sm">at Farm-gate</h3>
                    </div>

                    {/* Right: Farmer brings to DC */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-orange-200 p-4 text-center w-[180px]">
                      <h3 className="font-semibold text-orange-700 text-sm">Farmer harvests</h3>
                      <h3 className="font-semibold text-orange-700 text-sm">& brings to DC</h3>
                    </div>
                  </div>

                  {/* Arrows from top boxes to center */}
                  <div className="absolute top-full left-0 w-full h-16 pointer-events-none">
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                      <svg className="w-80 h-16" viewBox="0 0 320 64">
                        {/* Left curved path */}
                        <path 
                          d="M 70 0 L 70 20 Q 70 25 74 25 L 156 25 Q 160 25 160 29 L 160 35" 
                          stroke="#059669" 
                          strokeWidth="2" 
                          fill="none" 
                          className="flow-arrow"
                        />
                        <polygon points="160,35 157,29 163,29" fill="#059669" className="flow-arrow"/>
                        
                        {/* Right curved path */}
                        <path 
                          d="M 250 0 L 250 20 Q 250 25 246 25 L 164 25 Q 160 25 160 29 L 160 35" 
                          stroke="#ea580c" 
                          strokeWidth="2" 
                          fill="none" 
                          className="flow-arrow"
                        />
                        <polygon points="160,35 157,29 163,29" fill="#ea580c" className="flow-arrow"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Spacer between arrows and DC */}
                <div aria-hidden className="h-4 md:h-6"></div>

                {/* Middle: Distribution Center */}
                <div className="flex justify-center mt-20 mb-4">
                  <div className="bg-blue-50 rounded-xl shadow-sm border-2 border-blue-200 p-5 text-center w-[220px]">
                    <h3 className="font-bold text-blue-800 text-base">Bloomly's Dispatch</h3>
                    <h3 className="font-bold text-blue-800 text-base">Center</h3>
                  </div>
                </div>

                {/* Arrows from DC to bottom boxes */}
                <div className="relative h-16">
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                    <svg className="w-[500px] h-16" viewBox="0 0 500 64">
                      {/* Left curved arrow to Modern Trade */}
                      <path 
                        d="M 250 0 L 250 25 Q 250 30 245 30 L 50 30 Q 45 30 45 34 L 45 56" 
                        stroke="#7c3aed" 
                        strokeWidth="2" 
                        fill="none" 
                        className="flow-arrow"
                      />
                      <polygon points="45,56 42,50 48,50" fill="#7c3aed" className="flow-arrow"/>
                      
                      {/* Center straight arrow to Wholesale */}
                      <path 
                        d="M 250 0 L 250 56" 
                        stroke="#dc2626" 
                        strokeWidth="2" 
                        fill="none" 
                        className="flow-arrow"
                      />
                      <polygon points="250,56 247,50 253,50" fill="#dc2626" className="flow-arrow"/>
                      
                      {/* Right curved arrow to Retailers */}
                      <path 
                        d="M 250 0 L 250 25 Q 250 30 255 30 L 450 30 Q 455 30 455 34 L 455 56" 
                        stroke="#059669" 
                        strokeWidth="2" 
                        fill="none" 
                        className="flow-arrow"
                      />
                      <polygon points="455,56 452,50 458,50" fill="#059669" className="flow-arrow"/>
                    </svg>
                  </div>
                </div>

                {/* Bottom Row: Three retail channels */}
                <div className="flex justify-center items-start gap-20 max-w-5xl mx-auto mt-1">
                  
                  <div className="bg-white rounded-xl shadow-sm border p-4 text-center w-[180px]">
                    <h3 className="font-semibold text-purple-700 text-sm">Modern Trade</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-4 text-center w-[180px]">
                    <h3 className="font-semibold text-red-700 text-sm">Wholesale</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-4 text-center w-[180px]">
                    <h3 className="font-semibold text-green-700 text-sm">Retailers</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlowchartDiagram;
