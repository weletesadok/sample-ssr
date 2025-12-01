// app/ssg/page.js
import { Clock, Zap, Shield, Database, TrendingUp } from "lucide-react";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function SSGPage() {
  const products = await getProducts();
  const buildTime = new Date().toLocaleTimeString();

  const PerformanceMetrics = () => (
    <div className="mt-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-xl text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <Clock className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">Instant</div>
          <div className="text-sm opacity-90">Load Time</div>
        </div>
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <Shield className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">100%</div>
          <div className="text-sm opacity-90">Cache Hit Rate</div>
        </div>
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
          <Database className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm opacity-90">API Calls</div>
        </div>
        <div className="text-center p-4 bg-white/20 rounded-xl backdrop-xl backdrop-blur-sm">
          <TrendingUp className="inline-block mb-2" size={24} />
          <div className="text-3xl font-bold">100/100</div>
          <div className="text-sm opacity-90">Core Web Vitals</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg text-white">
              <Shield size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Static Site Generation (SSG)
            </h1>
          </div>
          <p className="text-gray-600 ml-12">
            Products delivered instantly from cache - No API calls on page load
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="overflow-y-auto max-h-[600px] pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gradient-to-br from-white to-emerald-50 rounded-xl shadow-md overflow-hidden border border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-sm">
                      CACHED
                    </div>
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-emerald-50">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 pr-2">
                        {product.title}
                      </h3>
                      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-lg font-bold text-lg shadow-sm">
                        ${product.price}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-500">
                          Pre-rendered
                        </span>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-medium">
                        CDN Delivered
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PerformanceMetrics />

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            SSG Performance Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    What Users Experience
                  </h3>
                  <p className="text-gray-600">
                    Products appear instantly - No loading spinner, no wait time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Database className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Zero Network Overhead
                  </h3>
                  <p className="text-gray-600">
                    HTML is fully formed - No API calls needed from user's
                    browser
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Shield className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Perfect SEO</h3>
                  <p className="text-gray-600">
                    Search engines see complete content immediately
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Built at {buildTime}
                  </h3>
                  <p className="text-gray-600">
                    Page generated once and served to millions instantly
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
