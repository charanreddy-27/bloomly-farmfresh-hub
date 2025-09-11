import { ArrowRight, ArrowDown } from 'lucide-react';

const FlowchartDiagram = () => {
  return (
    <>
      <style>
        {`
          @keyframes arrowFlow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            50% {
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
          }

          .flow-arrow {
            animation: arrowFlow 3s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .flowchart-box {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            animation: slideInUp 0.6s ease-out;
          }

          .flowchart-box:hover {
            transform: translateY(-2px);
            animation: pulseGlow 2s ease-in-out infinite;
          }

          .flowchart-box:nth-child(1) {
            animation: slideInLeft 0.8s ease-out;
          }

          .flowchart-box:nth-child(2) {
            animation: slideInRight 0.8s ease-out;
          }

          /* Ensure proper text centering for all auto-size boxes */
          .auto-size-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.3s ease;
          }

          .auto-size-box h3 {
            margin: 0;
            line-height: 1.3;
            transition: all 0.3s ease;
          }

          /* Mobile responsive flowchart wrapper */
          .flowchart-mobile-wrapper {
            overflow: visible;
          }

          .flowchart-content {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Scale the entire flowchart on mobile while preserving design */
          @media (max-width: 640px) {
            .flowchart-content {
              transform: scale(0.7);
              transform-origin: center top;
              margin-bottom: -120px;
            }
            
            /* Auto-size boxes based on content in mobile */
            .auto-size-box {
              width: auto !important;
              min-width: fit-content !important;
              padding: 0.75rem 1rem !important;
              white-space: nowrap;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
              text-align: center !important;
            }
            
            .auto-size-box h3 {
              font-size: 0.75rem !important;
              margin: 0 !important;
              line-height: 1.2 !important;
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

      <section className="pt-0 pb-8 md:pb-12 lg:pb-16 bg-gradient-to-b from-background to-green-50/30 relative">
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
                    <div className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-4 text-center auto-size-box min-w-[140px] max-w-[180px] flowchart-box">
                      <h3 className="font-semibold text-purple-700 text-sm">Bloomly purchases</h3>
                      <h3 className="font-semibold text-purple-700 text-sm">at Farm-gate</h3>
                    </div>

                    {/* Right: Farmer brings to DC */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-orange-200 p-4 text-center auto-size-box min-w-[140px] max-w-[180px] flowchart-box">
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
                          stroke="#7c3aed" 
                          strokeWidth="2" 
                          fill="none" 
                          className="flow-arrow"
                        />
                        <polygon points="160,35 157,29 163,29" fill="#7c3aed" className="flow-arrow"/>
                        
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
                  <div className="bg-green-50 rounded-xl shadow-sm border-2 border-green-200 p-5 text-center auto-size-box min-w-[160px] max-w-[220px] flowchart-box">
                    <h3 className="font-bold text-green-800 text-base">Bloomly's Dispatch</h3>
                    <h3 className="font-bold text-green-800 text-base">Center</h3>
                  </div>
                </div>

                {/* Arrows from DC to bottom boxes */}
                <div className="relative h-16">
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                    <svg className="w-[500px] h-16" viewBox="0 0 500 64">
                      {/* Left curved arrow to Modern Trade */}
                      <path 
                        d="M 250 0 L 250 25 Q 250 30 245 30 L 50 30 Q 45 30 45 34 L 45 56" 
                        stroke="#0b42ccef" 
                        strokeWidth="2" 
                        fill="none" 
                        className="flow-arrow"
                      />
                      <polygon points="45,56 42,50 48,50" fill="#0b42ccef" className="flow-arrow"/>
                      
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
                        stroke="#006400" 
                        strokeWidth="2" 
                        fill="none" 
                        className="flow-arrow"
                      />
                      <polygon points="455,56 452,50 458,50" fill="#006400" className="flow-arrow"/>
                    </svg>
                  </div>
                </div>

                {/* Bottom Row: Three retail channels */}
                <div className="flex justify-center items-start gap-20 max-w-5xl mx-auto mt-1">
                  
                  <div className="bg-white rounded-xl shadow-sm border p-4 text-center auto-size-box min-w-[100px] max-w-[150px] flowchart-box">
                    <h3 className="font-semibold text-blue-700 text-sm">Modern Trade</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-4 text-center auto-size-box min-w-[100px] max-w-[150px] flowchart-box">
                    <h3 className="font-semibold text-red-700 text-sm">Wholesale</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-4 text-center auto-size-box min-w-[100px] max-w-[150px] flowchart-box">
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
