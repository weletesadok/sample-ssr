"use client";

import { useEffect, useState, useRef } from "react";
import { Clock, Zap, WifiOff, Download } from "lucide-react";
import Image from "next/image";

export default function CSRPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadTime, setLoadTime] = useState(0);
  const [networkData, setNetworkData] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    let controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=50", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products || []);

        // Simulate network performance metrics
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        setLoadTime(duration);

        // Estimate data size
        const dataSize = new Blob([JSON.stringify(data)]).size;
        setNetworkData({
          size: (dataSize / 1024).toFixed(1) + " KB",
          transferTime: duration,
          requests: 1,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const PerformanceMetrics = () => (
    <div className="mt-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-xl text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <Clock className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">{loadTime}ms</div>
          <div className="text-sm opacity-90">Total Load Time</div>
        </div>
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <WifiOff className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm opacity-90">Cache Hits</div>
        </div>
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <Zap className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">1</div>
          <div className="text-sm opacity-90">API Requests</div>
        </div>
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <Download className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">
            {networkData?.size || "0 KB"}
          </div>
          <div className="text-sm opacity-90">Data Transfer</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white">
              <Zap size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Client-Side Rendering (CSR)
            </h1>
          </div>
          <p className="text-gray-600 ml-12">
            Products load after JavaScript executes in the browser
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div
            className="overflow-y-auto max-h-[600px] pr-2"
            ref={containerRef}
          >
            {loading ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-red-500 animate-pulse" size={24} />
                  </div>
                </div>
                <div className="mt-6 text-lg font-semibold text-gray-700">
                  Fetching products from API...
                </div>
                <div className="mt-2 text-gray-500">
                  This happens every time you visit or refresh this page
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-red-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100 relative">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 pr-2">
                          {product.title}
                        </h3>
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg font-bold text-lg shadow-sm">
                          ${product.price}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-gray-500">
                            Live Data
                          </span>
                        </div>
                        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                          Client Fetched
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {products.length === 0 && (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    Failed to load products — please refresh.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <PerformanceMetrics />

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            CSR Performance Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Zap className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    What Users Experience
                  </h3>
                  <p className="text-gray-600">
                    Blank page → loading spinner → products appear after{" "}
                    {loadTime}ms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Time to Interactive
                  </h3>
                  <p className="text-gray-600">
                    ~{loadTime + 100}ms (JS execution + fetch)
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <WifiOff className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Network Overhead
                  </h3>
                  <p className="text-gray-600">
                    {networkData?.size || "0 KB"} downloaded for every visit
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Download className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">SEO Impact</h3>
                  <p className="text-gray-600">
                    Search engines may see empty content before JS runs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
