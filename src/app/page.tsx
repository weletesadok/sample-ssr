// app/page.js
import Link from "next/link";
import {
  Zap,
  Shield,
  Cpu,
  ArrowRight,
  TrendingUp,
  Clock,
  Globe,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Client-Side Rendering (CSR)",
      href: "/csr",
      icon: <Zap className="text-red-500" size={24} />,
      color: "from-red-50 to-pink-50 border-red-200",
      buttonColor:
        "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
      points: [
        "Renders in browser after page load",
        "Shows loading states",
        "Good for user-specific content",
        "SEO challenges",
      ],
    },
    {
      title: "Static Site Generation (SSG)",
      href: "/ssg",
      icon: <Shield className="text-emerald-500" size={24} />,
      color: "from-emerald-50 to-green-50 border-emerald-200",
      buttonColor:
        "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
      points: [
        "Pre-built at build time",
        "Instant page loads",
        "CDN cacheable",
        "Best for SEO",
      ],
    },
    {
      title: "Static Only",
      href: "/static",
      icon: <Cpu className="text-blue-500" size={24} />,
      color: "from-blue-50 to-cyan-50 border-blue-200",
      buttonColor:
        "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
      points: [
        "Fully static HTML",
        "Zero API calls",
        "Maximum performance",
        "Perfect for CDNs",
      ],
    },
  ];

  const performanceData = [
    { metric: "CSR Load Time", value: "1-3s", color: "text-red-500" },
    { metric: "SSG Load Time", value: "Instant", color: "text-emerald-500" },
    { metric: "SEO Impact", value: "High", color: "text-blue-500" },
    { metric: "Cache Efficiency", value: "100%", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Next.js Rendering
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Strategies Comparison
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Compare different rendering methods in Next.js 15 with real-time
            examples. See how caching, performance, and SEO differ between
            approaches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className={`${feature.buttonColor} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
              >
                Try {feature.title.split(" ")[0]}
                <ArrowRight size={20} />
              </Link>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.color} border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white rounded-xl shadow-md">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {feature.title}
                </h2>
              </div>

              <ul className="space-y-3 mb-8">
                {feature.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={feature.href}
                className={`${feature.buttonColor} text-white w-full py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
              >
                View Demo
                <ArrowRight size={20} />
              </Link>
            </div>
          ))}
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Performance Comparison
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Real metrics showing the impact of different rendering strategies
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {performanceData.map((item) => (
              <div
                key={item.metric}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-gray-600">{item.metric}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
              <TrendingUp className="text-red-500" size={24} />
              <div>
                <div className="font-semibold text-gray-900">CSR</div>
                <div className="text-sm text-gray-600">
                  Interactive after load
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
              <Clock className="text-emerald-500" size={24} />
              <div>
                <div className="font-semibold text-gray-900">SSG</div>
                <div className="text-sm text-gray-600">Instant TTFB</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <Globe className="text-blue-500" size={24} />
              <div>
                <div className="font-semibold text-gray-900">CDN</div>
                <div className="text-sm text-gray-600">Global distribution</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to see the difference?
            </h3>
            <p className="mb-6 text-white/90">
              Navigate using the menu above to compare real implementations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                >
                  {feature.icon}
                  {feature.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
