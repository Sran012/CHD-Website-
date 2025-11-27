import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ContactFormModal } from "@/components/ContactFormModal";
import rugImage from "@/assets/product-rug.png";
import placematImage from "@/assets/product-placemat.png";
import runnerImage from "@/assets/product-runner.png";
import cushionImage from "@/assets/product-cushion.jpg";
import throwImage from "@/assets/product-throw.jpg";
import beddingImage from "@/assets/product-bedding.jpg";
import bathmatImage from "@/assets/product-bathmat.jpg";
import chairpadImage from "@/assets/product-chairpad.jpg";
import { ChevronRight, Star } from "lucide-react";

// Product data structure
const productData: Record<string, {
  id: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  images: string[];
  features: string[];
  materials: string[];
  sizes: Array<{ size: string; inStock: boolean; left?: number }>;
  colors: string[];
  rating: number;
  reviews: number;
}> = {
  rugs: {
    id: "rugs",
    name: "Handwoven Rugs",
    brand: "Creative Home Décor",
    description: "Premium quality handwoven rugs",
    longDescription: "Our handwoven rugs are crafted with precision and care, using traditional weaving techniques passed down through generations. Each piece is unique and adds warmth and character to any space.",
    images: [rugImage, rugImage, rugImage, rugImage],
    features: [
      "100% handwoven craftsmanship",
      "Durable and long-lasting",
      "Easy to clean and maintain",
      "Available in various sizes and patterns"
    ],
    materials: ["Cotton", "Jute", "Wool Blend"],
    sizes: [
      { size: "2x3 ft", inStock: true, left: 5 },
      { size: "3x5 ft", inStock: true, left: 3 },
      { size: "5x7 ft", inStock: true, left: 2 },
      { size: "8x10 ft", inStock: false }
    ],
    colors: ["Natural", "Beige", "Grey", "Blue", "Multicolor"],
    rating: 4.4,
    reviews: 156
  },
  placemats: {
    id: "placemats",
    name: "Elegant Placemats",
    brand: "Creative Home Décor",
    description: "Elegant table settings for dining",
    longDescription: "Transform your dining experience with our elegant placemats. Perfect for daily use or special occasions.",
    images: [placematImage, placematImage, placematImage, placematImage],
    features: [
      "Heat resistant",
      "Stain resistant finish",
      "Set of 4 or 6 available",
      "Machine washable"
    ],
    materials: ["Cotton", "Linen", "Cotton-Poly blend"],
    sizes: [
      { size: "13x18 inches", inStock: true, left: 10 },
      { size: "Round 15 inches", inStock: true, left: 8 }
    ],
    colors: ["White", "Cream", "Navy", "Sage Green", "Terracotta"],
    rating: 4.6,
    reviews: 89
  },
  runners: {
    id: "runners",
    name: "Table Runners",
    brand: "Creative Home Décor",
    description: "Beautiful runners for your tables",
    longDescription: "Add a touch of elegance to your dining table with our beautiful table runners.",
    images: [runnerImage, runnerImage, runnerImage, runnerImage],
    features: [
      "Premium quality fabric",
      "Versatile design",
      "Easy care",
      "Reversible options available"
    ],
    materials: ["Cotton", "Linen", "Jute"],
    sizes: [
      { size: "72 inches", inStock: true, left: 6 },
      { size: "90 inches", inStock: true, left: 4 },
      { size: "108 inches", inStock: true, left: 2 }
    ],
    colors: ["Natural", "White", "Grey", "Striped patterns"],
    rating: 4.5,
    reviews: 67
  },
  cushions: {
    id: "cushions",
    name: "Decorative Cushions",
    brand: "Creative Home Décor",
    description: "Comfortable cushions for your home",
    longDescription: "Our decorative cushions add comfort and style to any room.",
    images: [cushionImage, cushionImage, cushionImage, cushionImage],
    features: [
      "Soft and comfortable",
      "Removable covers",
      "Hidden zipper closure",
      "Premium filling"
    ],
    materials: ["Cotton", "Velvet", "Linen", "Cotton-Poly blend"],
    sizes: [
      { size: "12x12 inches", inStock: true, left: 15 },
      { size: "16x16 inches", inStock: true, left: 12 },
      { size: "18x18 inches", inStock: true, left: 8 },
      { size: "20x20 inches", inStock: true, left: 5 }
    ],
    colors: ["Wide range of colors available"],
    rating: 4.7,
    reviews: 234
  },
  throws: {
    id: "throws",
    name: "Cozy Throws",
    brand: "Creative Home Décor",
    description: "Soft throws and blankets",
    longDescription: "Wrap yourself in comfort with our cozy throws.",
    images: [throwImage, throwImage, throwImage, throwImage],
    features: [
      "Super soft texture",
      "Lightweight yet warm",
      "Machine washable",
      "Fade resistant"
    ],
    materials: ["Cotton", "Acrylic", "Cotton blend", "Fleece"],
    sizes: [
      { size: "50x60 inches", inStock: true, left: 7 },
      { size: "60x80 inches", inStock: true, left: 4 }
    ],
    colors: ["Solid colors", "Striped", "Patterned"],
    rating: 4.8,
    reviews: 189
  },
  bedding: {
    id: "bedding",
    name: "Premium Bedding",
    brand: "Creative Home Décor",
    description: "Luxury bedding collections",
    longDescription: "Experience luxury every night with our premium bedding collections.",
    images: [beddingImage, beddingImage, beddingImage, beddingImage],
    features: [
      "High thread count",
      "Breathable fabric",
      "Complete bedding sets",
      "Easy care instructions"
    ],
    materials: ["Cotton", "Egyptian Cotton", "Linen", "Cotton Sateen"],
    sizes: [
      { size: "Twin", inStock: true, left: 3 },
      { size: "Full", inStock: true, left: 5 },
      { size: "Queen", inStock: true, left: 8 },
      { size: "King", inStock: true, left: 4 }
    ],
    colors: ["White", "Ivory", "Grey", "Navy", "Various patterns"],
    rating: 4.9,
    reviews: 312
  },
  bathmats: {
    id: "bathmats",
    name: "Spa Bath Mats",
    brand: "Creative Home Décor",
    description: "Spa-quality bath mats",
    longDescription: "Bring spa-like luxury to your bathroom with our premium bath mats.",
    images: [bathmatImage, bathmatImage, bathmatImage, bathmatImage],
    features: [
      "Highly absorbent",
      "Quick-drying",
      "Non-slip backing",
      "Soft on feet"
    ],
    materials: ["Cotton", "Microfiber", "Memory foam"],
    sizes: [
      { size: "20x30 inches", inStock: true, left: 9 },
      { size: "24x36 inches", inStock: true, left: 6 }
    ],
    colors: ["White", "Grey", "Navy", "Spa Blue", "Beige"],
    rating: 4.6,
    reviews: 145
  },
  chairpads: {
    id: "chairpads",
    name: "Chair Pads",
    brand: "Creative Home Décor",
    description: "Comfortable seating solutions",
    longDescription: "Add comfort to your dining chairs with our chair pads.",
    images: [chairpadImage, chairpadImage, chairpadImage, chairpadImage],
    features: [
      "Cushioned comfort",
      "Tie fasteners",
      "Reversible designs",
      "Easy to clean"
    ],
    materials: ["Cotton", "Polyester fill", "Memory foam options"],
    sizes: [
      { size: "Standard chair", inStock: true, left: 12 },
      { size: "Bar stool", inStock: true, left: 8 }
    ],
    colors: ["Solid colors", "Patterned", "Seasonal designs"],
    rating: 4.5,
    reviews: 98
  }
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showContactForm, setShowContactForm] = useState(false);

  const product = productId ? productData[productId] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Product not found</h2>
          <Link to="/" className="text-accent hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden border border-border bg-card">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-6">
            {/* Brand & Rating */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-medium mb-3">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-b border-border py-4">
              <p className="text-muted-foreground">{product.longDescription}</p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-sm font-medium mb-3">Available Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-muted rounded-md text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Select Size</h3>
                <button className="text-sm text-accent hover:underline">
                  Size guide →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.sizes.map((sizeOption, index) => (
                  <button
                    key={index}
                    onClick={() => sizeOption.inStock && setSelectedSize(sizeOption.size)}
                    disabled={!sizeOption.inStock}
                    className={`relative p-3 border-2 rounded-lg text-sm transition-all ${
                      selectedSize === sizeOption.size
                        ? "border-accent bg-accent/5"
                        : sizeOption.inStock
                        ? "border-border hover:border-accent"
                        : "border-border opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="font-medium">{sizeOption.size}</div>
                    {sizeOption.inStock && sizeOption.left && sizeOption.left <= 5 && (
                      <div className="text-xs text-red-500 mt-1">
                        {sizeOption.left} left
                      </div>
                    )}
                    {!sizeOption.inStock && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Out of stock
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-muted-foreground mt-2">
                  Size not available? <button className="text-accent hover:underline">Notify me</button>
                </p>
              )}
            </div>

            {/* Price Badge */}
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-1 text-sm text-green-700 dark:text-green-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Best Quality Guaranteed</span>
              </div>
            </div>

            {/* Contact Button */}
            <button
              onClick={() => setShowContactForm(true)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-6 rounded-lg text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              CONTACT US
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Bulk orders & custom requirements welcome
            </p>

            {/* Features */}
            <div className="border-t border-border pt-6 space-y-3">
              <h3 className="text-sm font-medium mb-3">Key Features</h3>
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Trust Signals */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Handcrafted with premium materials from Panipat, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Custom Orders</h3>
              <p className="text-sm text-muted-foreground">
                Tailored to your specifications and requirements
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Direct Support</h3>
              <p className="text-sm text-muted-foreground">
                We're here to help with your order and inquiries
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactFormModal
          productName={product.name}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
}