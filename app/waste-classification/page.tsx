"use client";

import { useState } from "react";
import { Search, Recycle, Leaf, AlertTriangle, Trash2 } from "lucide-react";

const wasteCategories = [
  {
    id: "recyclable",
    name: "Recyclable",
    icon: Recycle,
    color: "text-green-600",
    bg: "bg-green-50",
    description: "Items that can be processed into new products",
    examples: ["Plastic bottles", "Aluminum cans", "Cardboard", "Glass jars"]
  },
  {
    id: "compostable",
    name: "Compostable",
    icon: Leaf,
    color: "text-lime-600",
    bg: "bg-lime-50",
    description: "Organic waste that decomposes naturally",
    examples: ["Food scraps", "Fruit peels", "Coffee grounds"]
  },
  {
    id: "hazardous",
    name: "Hazardous",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
    description: "Requires special handling",
    examples: ["Batteries", "Paint", "Electronics"]
  },
  {
    id: "general",
    name: "General Waste",
    icon: Trash2,
    color: "text-gray-600",
    bg: "bg-gray-50",
    description: "Non-recyclable waste",
    examples: ["Broken ceramics", "Styrofoam", "Tissues"]
  }
];

const allItems = wasteCategories.flatMap(cat =>
  cat.examples.map(item => ({ item, category: cat.name }))
);

export default function Page() {
  const [search, setSearch] = useState("");

  const filtered = allItems.filter(i =>
    i.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-4">🌱 EcoSort+</h1>
      <p className="text-gray-600 mb-6">
        Smart waste classification system
      </p>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search an item..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </div>

      {/* Search Results */}
      {search && (
        <div className="mb-8">
          <h2 className="font-semibold mb-2">Results:</h2>
          {filtered.length > 0 ? (
            filtered.map((i, idx) => (
              <div key={idx} className="border p-2 rounded mb-1">
                {i.item} → <span className="font-medium">{i.category}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>
      )}

      {/* Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {wasteCategories.map(cat => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className={`p-4 rounded-lg border ${cat.bg}`}>
              <Icon className={`w-8 h-8 mb-2 ${cat.color}`} />
              <h3 className={`font-semibold ${cat.color}`}>{cat.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {cat.description}
              </p>
              <ul className="text-sm list-disc ml-4">
                {cat.examples.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
