// import { useState } from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import factoryStore from "@/assets/factory-store.jpg";
// import factoryCutting from "@/assets/factory-cutting.jpg";
// import factoryStitching from "@/assets/factory-stitching.jpg";
// import factoryFinishing from "@/assets/factory-finishing.jpg";
// import factoryClipping from "@/assets/factory-clipping.jpg";
// import factoryTufting from "@/assets/factory-tufting.jpg";
// import factoryPackaging from "@/assets/factory-packaging.jpg";
// import factoryHandloom from "@/assets/factory-handloom.jpg";
// import factoryWeaving from "@/assets/factory-weaving.jpg";
// import factoryDyeing from "@/assets/factory-dyeing.jpg";

// const galleryImages = [
//   { src: factoryStore, title: "Store Department", category: "Organized fabric and yarn storage with quality materials" },
//   { src: factoryCutting, title: "Cutting Department", category: "Precision cutting with industrial machinery" },
//   { src: factoryStitching, title: "Stitching Department", category: "Expert craftsmanship on industrial sewing machines" },
//   { src: factoryFinishing, title: "Finishing Department", category: "Quality control and product finishing" },
//   { src: factoryClipping, title: "Clipping Department", category: "Detailed handwork and trimming process" },
//   { src: factoryTufting, title: "Tufting Section", category: "Advanced tufting machines creating patterns" },
//   { src: factoryPackaging, title: "Packaging Area", category: "Careful packaging and shipping preparation" },
//   { src: factoryHandloom, title: "Hand Loom Section", category: "Traditional craftsmanship meets modern production" },
//   { src: factoryWeaving, title: "Weaving Department", category: "Power looms creating intricate textile patterns" },
//   { src: factoryDyeing, title: "Dyeing Section", category: "Vibrant dyeing process with quality control" },
// ];

// export const ImageGallery = () => {
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const openGallery = (index: number) => {
//     setSelectedIndex(index);
//     document.body.style.overflow = "hidden";
//   };

//   const closeGallery = () => {
//     setSelectedIndex(null);
//     document.body.style.overflow = "unset";
//   };

//   const goToPrevious = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
//     }
//   };

//   const goToNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((selectedIndex + 1) % galleryImages.length);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Escape") closeGallery();
//     if (e.key === "ArrowLeft") goToPrevious();
//     if (e.key === "ArrowRight") goToNext();
//   };

//   return (
//     <>
//       <section className="py-20 md:py-28 px-6 bg-background">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-light mb-4">Our Factory</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Experience the craftsmanship and dedication behind our textiles at our Panipat facility
//             </p>
//           </div>
          
//           <Carousel
//             opts={{
//               align: "start",
//               loop: true,
//             }}
//             className="w-full"
//           >
//             <CarouselContent>
//               {galleryImages.map((image, index) => (
//                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//                   <div
//                     onClick={() => openGallery(index)}
//                     className="group relative aspect-[16/10] overflow-hidden bg-card border border-border cursor-pointer transition-all hover:border-accent rounded-lg"
//                   >
//                     <img
//                       src={image.src}
//                       alt={image.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                       <div>
//                         <h3 className="text-xl font-medium text-foreground mb-1">{image.title}</h3>
//                         <p className="text-sm text-muted-foreground">{image.category}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="hidden md:flex -left-12" />
//             <CarouselNext className="hidden md:flex -right-12" />
//           </Carousel>
//         </div>
//       </section>

//       {/* Fullscreen Gallery Modal */}
//       {selectedIndex !== null && (
//         <div
//           className="fixed inset-0 z-50 bg-background/98 animate-fade-in"
//           onClick={closeGallery}
//           onKeyDown={handleKeyDown}
//           tabIndex={0}
//         >
//           {/* Close Button */}
//           <button
//             onClick={closeGallery}
//             className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/50 border border-border hover:bg-background transition-colors"
//             aria-label="Close gallery"
//           >
//             <X className="w-6 h-6" />
//           </button>

//           {/* Navigation Buttons */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               goToPrevious();
//             }}
//             className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/50 border border-border hover:bg-background transition-colors"
//             aria-label="Previous image"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               goToNext();
//             }}
//             className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/50 border border-border hover:bg-background transition-colors"
//             aria-label="Next image"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Image Container */}
//           <div
//             className="w-full h-full flex items-center justify-center p-20"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative max-w-7xl max-h-full animate-scale-in">
//               <img
//                 src={galleryImages[selectedIndex].src}
//                 alt={galleryImages[selectedIndex].title}
//                 className="max-w-full max-h-[80vh] object-contain"
//               />
              
//               {/* Image Info */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-8">
//                 <p className="text-sm text-muted-foreground mb-1">
//                   {galleryImages[selectedIndex].category}
//                 </p>
//                 <p className="text-2xl font-light text-foreground">
//                   {galleryImages[selectedIndex].title}
//                 </p>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   {selectedIndex + 1} / {galleryImages.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
