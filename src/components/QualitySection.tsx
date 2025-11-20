import sedexLogo from "@/assets/sedex-logo.png";
import oekotexLogo from "@/assets/oekotex-logo.png";
import iso9001Logo from "@/assets/iso-9001-official.png";
import iso14001Logo from "@/assets/iso-14001-official.png";
import iso45001Logo from "@/assets/iso-45001-official.png";
import textilePatternBg from "@/assets/textile-pattern-bg.jpg";

export const QualitySection = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-light mb-8 text-center">Quality Management System</h2>
        
        <p className="text-xl text-foreground leading-relaxed font-light mb-16 text-center">
          Clear quality checks and control measures from sampling to dispatch.
        </p>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <h3 className="text-xl font-light mb-3">Inspection</h3>
            <p className="text-muted-foreground text-sm">Every stage</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-light mb-3">Timelines</h3>
            <p className="text-muted-foreground text-sm">Consistent delivery</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-light mb-3">Standards</h3>
            <p className="text-muted-foreground text-sm">Export-grade</p>
          </div>
        </div>

        <div className="border-t border-border pt-16 relative overflow-hidden rounded-xl">
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${textilePatternBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/40" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-3xl font-light mb-12 text-center">Certifications</h3>
            
            {/* Top row: SEDEX and OEKO-TEX */}
            <div className="flex justify-center items-center gap-12 mb-12 flex-wrap">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 transition-transform hover:scale-105 cursor-pointer group"
                title="View SEDEX 4 Pillar SMETA Certificate"
              >
                <img 
                  src={sedexLogo} 
                  alt="SEDEX 4 Pillar SMETA Certification" 
                  className="h-32 w-auto object-contain"
                />
                <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors">SEDEX 4 Pillar SMETA</p>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 transition-transform hover:scale-105 cursor-pointer group"
                title="View OEKO-TEX Standard 100 Certificate"
              >
                <img 
                  src={oekotexLogo} 
                  alt="OEKO-TEX Standard 100 Certification" 
                  className="h-32 w-auto object-contain"
                />
                <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors">OEKO-TEX Standard 100</p>
              </a>
            </div>

            {/* Bottom row: ISO Certifications */}
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 transition-transform hover:scale-105 cursor-pointer group"
                title="View ISO 9001:2015 Certificate"
              >
                <img 
                  src={iso9001Logo} 
                  alt="ISO 9001:2015 Quality Management Certification" 
                  className="h-28 w-auto object-contain"
                />
                <p className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">ISO 9001:2015</p>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 transition-transform hover:scale-105 cursor-pointer group"
                title="View ISO 14001:2015 Certificate"
              >
                <img 
                  src={iso14001Logo} 
                  alt="ISO 14001:2015 Environmental Management Certification" 
                  className="h-28 w-auto object-contain"
                />
                <p className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">ISO 14001:2015</p>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 transition-transform hover:scale-105 cursor-pointer group"
                title="View ISO 45001:2018 Certificate"
              >
                <img 
                  src={iso45001Logo} 
                  alt="ISO 45001:2018 Occupational Health & Safety Certification" 
                  className="h-28 w-auto object-contain"
                />
                <p className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">ISO 45001:2018</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
