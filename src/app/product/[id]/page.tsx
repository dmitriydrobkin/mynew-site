export const runtime = 'edge';
import { mockProducts } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDetails from "@/components/product/ProductDetails";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);

  // Find product by ID
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-milk">
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:py-20 flex-grow">
        {/* Placeholder layout */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
