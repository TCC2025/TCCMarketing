import SectionHeader from "@/components/ui/section-header";

export default function BrandColors() {
  const coreColors = [
    { name: "Magenta", hex: "#E7156A" },
    { name: "Warm Orange", hex: "#F07B1E" },
    { name: "Mustard Gold", hex: "#D89B2D" },
    { name: "Teal", hex: "#10676F" },
    { name: "Deep Navy", hex: "#0F2435" },
    { name: "Ivory", hex: "#F2E6D7" }
  ];

  const secondaryColors = [
    { name: "Coral", hex: "#F28B82" },
    { name: "Burgundy", hex: "#6B1C3E" },
    { name: "Pale Gold", hex: "#EBD8A1" },
    { name: "Slate Gray", hex: "#5C6770" },
    { name: "Cool Mint", hex: "#A8DADC" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="hero-brushstroke"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
              Brand Color System
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow max-w-3xl mx-auto mb-12 leading-relaxed">
              Editorial, modern-industrial, premium color palette for The Collective by Thompson & Co.
            </p>
          </div>
        </div>
      </section>

      {/* Core Palette Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Section 1 — Core Palette"
            className="mb-16 text-primary"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-8">
            {coreColors.map((color, index) => (
              <div key={index} className="text-center group">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 color-circle-hover elegant-hover"
                  style={{ 
                    backgroundColor: color.hex,
                    boxShadow: `0 8px 32px ${color.hex}20, 0 4px 16px ${color.hex}15`,
                    border: color.hex === "#F2E6D7" ? "2px solid #0F2435" : "2px solid rgba(255,255,255,0.2)"
                  }}
                  data-testid={`color-circle-${color.name.toLowerCase().replace(' ', '-')}`}
                ></div>
                <h3 className="font-medium text-primary mb-2 text-sm md:text-base group-hover:text-shimmer transition-all duration-300">
                  {color.name}
                </h3>
                <p className="font-mono text-slate-gray text-xs md:text-sm tracking-wider group-hover:text-primary transition-colors duration-300">
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Expansion Palette Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Section 2 — Secondary Expansion Palette"
            className="mb-16 text-primary"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-12 mb-8">
            {secondaryColors.map((color, index) => (
              <div key={index} className="text-center group">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 color-circle-hover elegant-hover"
                  style={{ 
                    backgroundColor: color.hex,
                    boxShadow: color.hex === "#000000" 
                      ? "0 8px 32px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)" 
                      : `0 8px 32px ${color.hex}20, 0 4px 16px ${color.hex}15`,
                    border: color.hex === "#FFFFFF" || color.hex === "#EBD8A1" ? "2px solid #5C6770" : "2px solid rgba(255,255,255,0.2)"
                  }}
                  data-testid={`color-circle-${color.name.toLowerCase().replace(' ', '-')}`}
                ></div>
                <h3 className="font-medium text-primary mb-2 text-sm md:text-base group-hover:text-shimmer transition-all duration-300">
                  {color.name}
                </h3>
                <p className="font-mono text-slate-gray text-xs md:text-sm tracking-wider group-hover:text-primary transition-colors duration-300">
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Industrial Grid */}
      <section className="py-20 bg-slate-gray/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
              Editorial Modern-Industrial Premium
            </h2>
            <div className="w-24 h-1 bg-teal mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg">
              <div className="w-full h-32 bg-warm-orange mb-6"></div>
              <h3 className="font-playfair text-xl font-semibold text-primary mb-3">
                Editorial Typography
              </h3>
              <p className="text-slate-gray leading-relaxed">
                Clean, sophisticated layouts with strategic white space and premium material finishes.
              </p>
            </div>
            
            <div className="bg-white p-8 shadow-lg">
              <div className="w-full h-32 bg-teal mb-6"></div>
              <h3 className="font-playfair text-xl font-semibold text-primary mb-3">
                Modern Industrial
              </h3>
              <p className="text-slate-gray leading-relaxed">
                Structured grids, precise alignment, and industrial-strength design systems.
              </p>
            </div>
            
            <div className="bg-white p-8 shadow-lg md:col-span-2 lg:col-span-1">
              <div className="w-full h-32 bg-mustard-gold mb-6"></div>
              <h3 className="font-playfair text-xl font-semibold text-primary mb-3">
                Premium Materials
              </h3>
              <p className="text-slate-gray leading-relaxed">
                Luxury finishes with sophisticated color relationships and premium brand experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}