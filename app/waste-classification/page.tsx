import { useState, useEffect } from "react";
import { Search, Recycle, Leaf, AlertTriangle, Trash2, Mic, Moon, Sun, Upload, Star, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Waste Categories ---
const wasteCategories = [
  {
    id: "recyclable",
    name: "Recyclable",
    icon: Recycle,
    color: "recycle",
    description: "Items that can be processed into new products",
    examples: ["Plastic bottles", "Aluminum cans", "Cardboard", "Glass jars", "Paper", "Metal containers", "Pizza boxes"]
  },
  {
    id: "compostable",
    name: "Compostable",
    icon: Leaf,
    color: "compost",
    description: "Organic waste that can decompose naturally",
    examples: ["Food scraps", "Yard trimmings", "Coffee grounds", "Eggshells", "Fruit peels", "Leaves"]
  },
  {
    id: "hazardous",
    name: "Hazardous",
    icon: AlertTriangle,
    color: "hazard",
    description: "Dangerous materials requiring special disposal",
    examples: ["Batteries", "Paint", "Electronics", "Chemicals", "Light bulbs", "Motor oil"]
  },
  {
    id: "general",
    name: "General Waste",
    icon: Trash2,
    color: "general",
    description: "Non-recyclable items for regular disposal",
    examples: ["Broken ceramics", "Styrofoam", "Dirty paper", "Cigarette butts", "Plastic wrap", "Tissues"]
  }
];

const allItems = wasteCategories.flatMap(category =>
  category.examples.map(item => ({
    item,
    category: category.name
  }))
);

// --- Smart tips for tricky items ---
const smartTips: Record<string, string> = {
  "pizza box": "⚠️ Only recyclable if free of grease/oil.",
  "coffee cup": "⚠️ Many coffee cups have plastic lining, check before recycling.",
  "chip packet": "⚠️ Multi-layered, usually non-recyclable.",
  "tetra pak": "♻️ Recyclable only in specialized facilities.",
  "plastic bag": "⚠️ Recyclable, but avoid as they jam machines."
};

export default function WasteClassificationApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [tip, setTip] = useState<string | null>(null);

  // --- Search Filter ---
  const filteredItems = allItems.filter(({ item }) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Handle Search ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Add to history
    if (value && !history.includes(value)) {
      setHistory(prev => [...prev, value]);
    }

    // Check for smart tips
    const foundTip = Object.entries(smartTips).find(([key]) =>
      value.toLowerCase().includes(key)
    );
    setTip(foundTip ? foundTip[1] : null);
  };

  // --- Voice Search ---
  const handleVoiceSearch = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };
    recognition.start();
  };

  // --- Toggle Favorites ---
  const toggleFavorite = (item: string) => {
    setFavorites(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  // --- Fake AI Image Upload (stub for TF.js) ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`🖼️ AI classification coming soon! You uploaded: ${file.name}`);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-background text-foreground"}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Recycle className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">EcoSort+</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <label className="cursor-pointer">
              <Upload className="h-5 w-5" />
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6 flex items-center space-x-2">
        <Search className="text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1"
        />
        <Button onClick={handleVoiceSearch}><Mic className="h-5 w-5" /></Button>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Results for "{searchTerm}" ({filteredItems.length})
          </h2>
          {tip && <p className="text-sm text-yellow-500 mb-2">{tip}</p>}
          <div className="grid gap-2">
            {filteredItems.length > 0 ? (
              filteredItems.map(({ item, category }, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                >
                  <span className="font-medium">{item}</span>
                  <div className="flex items-center gap-2">
                    <Badge>{category}</Badge>
                    <button onClick={() => toggleFavorite(item)}>
                      <Star className={`h-5 w-5 ${favorites.includes(item) ? "text-yellow-400" : "text-muted-foreground"}`} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No items found.</p>
            )}
          </div>
        </div>
      )}

      {/* Favorites & History */}
      <div className="container mx-auto px-4 mb-8">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Star className="h-4 w-4" /> Favorites</h3>
        {favorites.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {favorites.map((fav, idx) => (
              <Badge key={idx} className="bg-yellow-200 text-black">{fav}</Badge>
            ))}
          </div>
        ) : <p className="text-muted-foreground">No favorites yet.</p>}

        <h3 className="text-lg font-semibold mt-6 flex items-center gap-2"><History className="h-4 w-4" /> History</h3>
        {history.length > 0 ? (
          <ul className="text-sm text-muted-foreground list-disc ml-4">
            {history.map((h, idx) => <li key={idx}>{h}</li>)}
          </ul>
        ) : <p className="text-muted-foreground">No history yet.</p>}
      </div>
    </div>
  );
}
