import Link from "next/link";
import { Home, Zap, Shield, Cpu } from "lucide-react";
export default function Navbar() {
  const navItems = [
    {
      name: "CSR",
      href: "/csr",
      icon: <Zap size={20} />,
      description: "Client-Side Rendering",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "SSR",
      href: "/ssg",
      icon: <Shield size={20} />,
      description: "Server side rendering",
      color: "from-emerald-500 to-green-500",
    },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg">
                  <Cpu size={24} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Next.js Demo
                </span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-md bg-gradient-to-r ${
                          item.color || "from-gray-600 to-gray-700"
                        } text-white`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 group-hover:text-gray-700">
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="text-xs text-gray-500 group-hover:text-gray-400">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-full px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Rendering Comparison
                </span>
              </div>
            </div>
          </div>
          {}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50"
            >
              <div
                className={`p-2 rounded-md bg-gradient-to-r ${
                  item.color || "from-gray-600 to-gray-700"
                } text-white`}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{item.name}</span>
                {item.description && (
                  <span className="text-sm text-gray-500">
                    {item.description}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
