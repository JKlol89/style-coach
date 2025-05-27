import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { WiDaySunny } from 'react-icons/wi';
import { motion } from 'framer-motion';

const outfits = [
  { id: 1, image: '/outfits/casual1.jpg', label: 'Casual Day' },
  { id: 2, image: '/outfits/business1.jpg', label: 'Work Meeting' },
  { id: 3, image: '/outfits/date1.jpg', label: 'Date Night' },
];

const wardrobeItems = [
  { id: 1, image: '/wardrobe/jacket.jpg', label: 'Denim Jacket', type: 'outerwear' },
  { id: 2, image: '/wardrobe/tee.jpg', label: 'White Tee', type: 'top' },
  { id: 3, image: '/wardrobe/pants.jpg', label: 'Black Trousers', type: 'bottom' },
];

export default function StyleCoachApp() {
  const [selectedType, setSelectedType] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedOuterwear, setSelectedOuterwear] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredWardrobe = selectedType === 'all'
    ? wardrobeItems
    : wardrobeItems.filter(item => item.type === selectedType);

  const handleSelectForOutfit = (item) => {
    if (item.type === 'top') setSelectedTop(item);
    if (item.type === 'bottom') setSelectedBottom(item);
    if (item.type === 'outerwear') setSelectedOuterwear(item);
  };

  const generateAIStyleTip = () => {
    const tip = `Try pairing ${selectedTop?.label || 'a bold top'} with ${selectedBottom?.label || 'neutral pants'} and ${selectedOuterwear?.label || 'a standout jacket'} for a balanced look.`;
    return tip;
  };

  return (
    <div className="p-4 grid gap-6">
      <h1 className="text-3xl font-bold">Style Coach</h1>

      {/* Style Persona */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Your Style Persona</h2>
          <div className="flex items-center gap-4">
            <Avatar />
            <span>Modern Streetwear Aesthetic</span>
            <Button variant="outline">Change</Button>
          </div>
        </CardContent>
      </Card>

      {/* Outfit Builder */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Build an Outfit</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="font-semibold">Top</p>
              {selectedTop ? <img src={selectedTop.image} className="h-24 mx-auto" alt="top" /> : <p>Select a top</p>}
            </div>
            <div className="text-center">
              <p className="font-semibold">Bottom</p>
              {selectedBottom ? <img src={selectedBottom.image} className="h-24 mx-auto" alt="bottom" /> : <p>Select a bottom</p>}
            </div>
            <div className="text-center">
              <p className="font-semibold">Outerwear</p>
              {selectedOuterwear ? <img src={selectedOuterwear.image} className="h-24 mx-auto" alt="outerwear" /> : <p>Select outerwear</p>}
            </div>
          </div>
          <p className="mt-4 italic text-gray-600">{generateAIStyleTip()}</p>
        </CardContent>
      </Card>

      {/* Outfit Recommendations */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Today’s Outfit Suggestions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {outfits.map(outfit => (
              <motion.div key={outfit.id} whileHover={{ scale: 1.05 }}>
                <Card className="overflow-hidden rounded-xl">
                  <img src={outfit.image} alt={outfit.label} className="w-full h-40 object-cover" />
                  <CardContent className="p-2 text-center font-medium">{outfit.label}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Context Integration */}
      <Tabs defaultValue="weather" className="rounded-2xl shadow-md">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="weather">
          <Card className="p-4 flex items-center gap-4">
            <WiDaySunny size={40} className="text-yellow-400" />
            <div>
              <p className="font-semibold">Sunny, 75°F</p>
              <p>Great day for lighter fabrics and shades</p>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card className="p-4">
            <Calendar mode="single" selected={new Date()} />
            <p className="mt-2 text-sm text-gray-500">Plan your outfit for an upcoming event</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Wardrobe */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Upload Your Wardrobe</h2>
          <Input type="file" accept="image/*" multiple />
        </CardContent>
      </Card>

      {/* Virtual Closet */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Your Virtual Closet</h2>
            <select
              onChange={(e) => setSelectedType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option value="top">Tops</option>
              <option value="bottom">Bottoms</option>
              <option value="outerwear">Outerwear</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredWardrobe.map(item => (
              <motion.div key={item.id} whileHover={{ scale: 1.05 }}>
                <Card className="overflow-hidden rounded-xl relative">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-32 object-cover cursor-pointer"
                    onClick={() => handleSelectForOutfit(item)}
                  />
                  <CardContent className="p-2 text-center text-sm">{item.label}</CardContent>
                  <Button
                    size="sm"
                    className={`absolute top-1 right-1 ${favorites.includes(item.id) ? 'bg-red-500' : 'bg-white text-black'}`}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    ♥
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Style Challenges */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Style Challenge of the Day</h2>
          <p>Style a look with only neutrals + one pop of color</p>
          <Button className="mt-2">Submit My Look</Button>
        </CardContent>
      </Card>
    </div>
  );
}
