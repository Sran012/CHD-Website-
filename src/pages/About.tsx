const About = () => {
  return (
    <div className="min-h-screen">
      <div className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-12">About</h1>
          
          <p className="text-2xl text-foreground leading-relaxed mb-12 font-light">
            Manufacturing-led home textile company serving global retailers with export-grade quality and consistent delivery.
          </p>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 text-lg text-muted-foreground">
            <div>
              <p className="font-light">Export-focused</p>
            </div>
            <div>
              <p className="font-light">Natural fiber-based products</p>
            </div>
            <div>
              <p className="font-light">US & international markets</p>
            </div>
            <div>
              <p className="font-light">B2B partnerships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
