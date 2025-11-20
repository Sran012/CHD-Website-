import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import rugImage from "@/assets/product-rug.png";
import placematImage from "@/assets/product-placemat.png";
import runnerImage from "@/assets/product-runner.png";
import cushionImage from "@/assets/product-cushion.jpg";
import throwImage from "@/assets/product-throw.jpg";
import beddingImage from "@/assets/product-bedding.jpg";
import bathmatImage from "@/assets/product-bathmat.jpg";
import chairpadImage from "@/assets/product-chairpad.jpg";
import lifestyleRug from "@/assets/lifestyle-rug.jpg";
import lifestyleRunner from "@/assets/lifestyle-runner.jpg";
import lifestylePlacemat from "@/assets/lifestyle-placemat.jpg";
import lifestyleBedding from "@/assets/lifestyle-bedding.jpg";
import lifestyleBathmat from "@/assets/lifestyle-bathmat.jpg";
import lifestyleChairpad from "@/assets/lifestyle-chairpad.jpg";

const categoryData: Record<string, { name: string; images: Array<{ src: string; title: string; tags: string[] }> }> = {
  rugs: {
    name: "Rugs",
    images: [
      { src: lifestyleRug, title: "Handwoven Rug in Living Space", tags: ["handwoven", "living room", "natural"] },
      { src: rugImage, title: "Handwoven Rug - Product View", tags: ["handwoven", "beige", "neutral"] },
    ],
  },
  placemats: {
    name: "Placemats",
    images: [
      { src: lifestylePlacemat, title: "Placemats - Morning Scene", tags: ["dining", "breakfast", "natural"] },
      { src: placematImage, title: "Placemat Set", tags: ["set", "beige", "dining"] },
    ],
  },
  runners: {
    name: "Table Runners",
    images: [
      { src: lifestyleRunner, title: "Elegant Table Runner Setting", tags: ["elegant", "dining", "centerpiece"] },
      { src: runnerImage, title: "Table Runner - Product View", tags: ["beige", "dining", "table"] },
    ],
  },
  cushions: {
    name: "Cushions",
    images: [
      { src: cushionImage, title: "Embroidered Cushion Collection", tags: ["embroidered", "decorative", "comfort", "living room"] },
    ],
  },
  throws: {
    name: "Throws",
    images: [
      { src: throwImage, title: "Throw Collection", tags: ["soft", "cozy", "blanket"] },
    ],
  },
  bedding: {
    name: "Premium Bedding",
    images: [
      { src: lifestyleBedding, title: "Luxurious Bedding Collection", tags: ["luxury", "bedroom", "comfortable"] },
      { src: beddingImage, title: "Premium Bedding Set", tags: ["premium", "bedding", "set"] },
    ],
  },
  bathmats: {
    name: "Bath Mats",
    images: [
      { src: lifestyleBathmat, title: "Spa Bath Mat Experience", tags: ["spa", "bathroom", "absorbent"] },
      { src: bathmatImage, title: "Bath Mat", tags: ["bathroom", "soft", "bath"] },
    ],
  },
  chairpads: {
    name: "Chair Pads",
    images: [
      { src: lifestyleChairpad, title: "Dining Chair Pads in Context", tags: ["dining", "comfortable", "cushion", "chair"] },
      { src: chairpadImage, title: "Chair Pad Collection", tags: ["chair", "pad", "comfort", "dining"] },
    ],
  },
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const category = categoryId ? categoryData[categoryId] : null;

  const filteredImages = useMemo(() => {
    if (!category) return [];
    if (!searchQuery.trim()) return category.images;

    const query = searchQuery.toLowerCase();
    return category.images.filter(
      (image) =>
        image.title.toLowerCase().includes(query) ||
        image.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [category, searchQuery]);

  const openGallery = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Category Not Found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
            <h1 className="text-4xl md:text-6xl font-light mb-4">{category.name}</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by keywords (e.g., handwoven, natural)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Images Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openGallery(index)}
                  className="group relative aspect-square overflow-hidden bg-card border border-border cursor-pointer transition-all hover:border-accent hover:shadow-lg"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-lg font-light text-foreground mb-2">{image.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {image.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No designs found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-accent hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 p-2 hover:bg-accent/10 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-6 p-3 hover:bg-accent/10 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 p-3 hover:bg-accent/10 rounded-full transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full mx-6 flex flex-col">
            <img
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].title}
              className="w-full h-auto object-contain"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-light mb-2">{filteredImages[selectedIndex].title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {filteredImages[selectedIndex].tags.map((tag) => (
                  <span key={tag} className="text-sm px-3 py-1 bg-accent/20 text-accent rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
