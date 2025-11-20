import rugImage from "@/assets/product-rug.png";
import placematImage from "@/assets/product-placemat.png";
import runnerImage from "@/assets/product-runner.png";

const showcaseProducts = [
  {
    image: rugImage,
    title: "Rugs & Floor Textiles",
    categories: ["Rugs", "Bath Mats"],
  },
  {
    image: placematImage,
    title: "Table Textiles",
    categories: ["Placemats", "Table Runners"],
  },
  {
    image: runnerImage,
    title: "Bedding & Soft Furnishings",
    categories: ["Cushions", "Throws", "Quilts", "Comforters"],
  },
];

export const ProductShowcase = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showcaseProducts.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-card border border-border transition-all hover:border-accent"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light mb-4 text-foreground">
                  {product.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {product.categories.map((cat) => (
                    <li key={cat} className="text-sm">
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
