"use client";

import { useState } from "react";
import { Search, Recycle, Leaf, AlertTriangle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const wasteCategories = [
  {
    id: "recyclable",
    name: "Recyclable", 
    icon: Recycle,
    color: "recycle",
    bgClass: "bg-recycle",
    textClass: "text-recycle",
    iconBgClass: "bg-recycle/10",
    badgeClass: "bg-recycle/10 text-recycle border-recycle/20",
    buttonClass: "bg-recycle text-recycle-foreground",
    hoverBadgeClass: "hover:bg-recycle/10",
    description: "Items that can be processed into new products",
    examples: ["Plastic bottles", "Aluminum cans", "Cardboard", "Glass jars", "Paper", "Metal containers", "Pizza boxes"]
  },
  {
    id: "compostable",
    name: "Compostable",
    icon: Leaf,
    color: "compost",
    bgClass: "bg-compost",
    textClass: "text-compost",
    iconBgClass: "bg-compost/10",
    badgeClass: "bg-compost/10 text-compost border-compost/20",
    buttonClass: "bg-compost text-compost-foreground",
    hoverBadgeClass: "hover:bg-compost/10",
    description: "Organic waste that can decompose naturally",
    examples: ["Food scraps", "Yard trimmings", "Coffee grounds", "Eggshells", "Fruit peels", "Leaves"]
  },
  {
    id: "hazardous",
    name: "Hazardous",
    icon: AlertTriangle,
    color: "hazard",
    bgClass: "bg-hazard",
    textClass: "text-hazard",
    iconBgClass: "bg-hazard/10",
    badgeClass: "bg-hazard/10 text-hazard border-hazard/20",
    buttonClass: "bg-hazard text-hazard-foreground",
    hoverBadgeClass: "hover:bg-hazard/10",
    description: "Dangerous materials requiring special disposal",
    examples: ["Batteries", "Paint", "Electronics", "Chemicals", "Light bulbs", "Motor oil"]
  },
  {
    id: "general",
    name: "General Waste",
    icon: Trash2,
    color: "general",
    bgClass: "bg-general",
    textClass: "text-general",
    iconBgClass: "bg-general/10",
    badgeClass: "bg-general/10 text-general border-general/20",
    buttonClass: "bg-general text-general-foreground",
    hoverBadgeClass: "hover:bg-general/10",
    description: "Non-recyclable items for regular disposal",
    examples: ["Broken ceramics", "Styrofoam", "Dirty paper", "Cigarette butts", "Plastic wrap", "Tissues"]
  }
];

const allItems = wasteCategories.flatMap(category => 
  category.examples.map(item => ({ 
    item, 
    category: category.name, 
    color: category.color,
    badgeClass: category.badgeClass
  }))
);

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = allItems.filter(({ item }) => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCategories = selectedCategory
    ? wasteCategories.filter(cat => cat.id === selectedCategory)
    : wasteCategories;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Recycle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  EcoSort+
                </h1>
                <p className="text-muted-foreground">Smart Waste Classification System</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for an item to classify..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Results */}
        {searchTerm && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Search Results for "{searchTerm}" ({filteredItems.length} items found)
            </h2>
            <div className="grid gap-2">
              {filteredItems.length > 0 ? (
                filteredItems.map(({ item, category, badgeClass }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <span className="font-medium">{item}</span>
                    <Badge variant="secondary" className={badgeClass}>
                      {category}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No items found matching "{searchTerm}"</p>
              )}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              All Categories
            </button>
            {wasteCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `${category.buttonClass} shadow-lg`
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Waste Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto p-4 rounded-full ${category.iconBgClass} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${category.textClass}`} />
                  </div>
                  <CardTitle className={`${category.textClass} text-xl`}>
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground mb-3">Examples:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.examples.map((example, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={`text-xs ${category.badgeClass} ${category.hoverBadgeClass} transition-colors duration-200`}
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-accent/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">💡 Quick Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Clean before recycling:</p>
              <p>Rinse containers to remove food residue for better recycling.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Check local guidelines:</p>
              <p>Waste disposal rules may vary by location and facility.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Reduce first:</p>
              <p>Consider reusing items before disposing of them.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Special collections:</p>
              <p>Many communities have special pickup days for hazardous waste.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
