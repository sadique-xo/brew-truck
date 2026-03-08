"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlurFade from "@/components/magicui/blur-fade";
import { menuItems, fullMenu } from "@/data/menu-data";

import BurgerIcon from "@/components/illustrations/burger-icon";
import FriesIcon from "@/components/illustrations/fries-icon";
import PizzaIcon from "@/components/illustrations/pizza-icon";
import IcedCoffeeIcon from "@/components/illustrations/iced-coffee-icon";
import HotCoffeeIcon from "@/components/illustrations/hot-coffee-icon";
import BobaTeaIcon from "@/components/illustrations/boba-tea-icon";
import CheesecakeIcon from "@/components/illustrations/cheesecake-icon";
import BrownieIcon from "@/components/illustrations/brownie-icon";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  burger: BurgerIcon,
  fries: FriesIcon,
  pizza: PizzaIcon,
  "iced-coffee": IcedCoffeeIcon,
  "hot-coffee": HotCoffeeIcon,
  "boba-tea": BobaTeaIcon,
  cheesecake: CheesecakeIcon,
  brownie: BrownieIcon,
};

const tagColors: Record<string, string> = {
  Bestseller: "bg-brew-orange/10 text-brew-orange border-brew-orange/30",
  "Must Try": "bg-brew-green/10 text-brew-green border-brew-green/30",
  Popular: "bg-blue-50 text-blue-600 border-blue-200",
  Signature: "bg-purple-50 text-purple-600 border-purple-200",
  "Fun Pick": "bg-pink-50 text-pink-600 border-pink-200",
  New: "bg-amber-50 text-amber-600 border-amber-200",
  Indulgence: "bg-rose-50 text-rose-600 border-rose-200",
};

const categories = [
  { value: "food", label: "Food" },
  { value: "drinks", label: "Drinks" },
  { value: "desserts", label: "Desserts" },
] as const;

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState("food");
  const [showFullMenu, setShowFullMenu] = useState(false);

  const filteredItems = menuItems.filter((item) => item.category === activeTab);

  return (
    <section id="menu" className="relative py-20 sm:py-28 bg-brew-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <BlurFade>
          <div className="text-center mb-12">
            <p className="font-accent text-lg text-brew-orange mb-2">
              just the highlights...
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark">
              What&apos;s Cooking
            </h2>
          </div>
        </BlurFade>

        {/* Featured Items Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white border border-brew-border">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-brew-green data-[state=active]:text-white px-6"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredItems.map((item) => {
                  const IconComponent = iconMap[item.iconName];
                  return (
                    <Card key={item.id} className="group overflow-hidden border-brew-border hover:border-brew-green/40 hover:shadow-lg transition-all duration-300 bg-white">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-16 h-16 rounded-xl bg-brew-cream flex items-center justify-center group-hover:scale-105 transition-transform">
                            {IconComponent && <IconComponent className="w-12 h-12" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-subheading font-semibold text-brew-text text-sm sm:text-base leading-tight">
                                {item.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`shrink-0 text-[10px] ${tagColors[item.tag] || ""}`}
                              >
                                {item.tagEmoji && `${item.tagEmoji} `}{item.tag}
                              </Badge>
                            </div>
                            <p className="text-brew-text-muted text-xs sm:text-sm mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            <p className="font-subheading font-bold text-brew-green-dark text-lg">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Full Menu Toggle */}
        <div className="mt-12">
          <button
            onClick={() => setShowFullMenu(!showFullMenu)}
            className="mx-auto flex items-center gap-2 text-brew-green hover:text-brew-green-dark font-subheading font-semibold text-lg transition-colors"
          >
            {showFullMenu ? "Hide Full Menu" : "View Full Menu (50+ items)"}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${showFullMenu ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Full Menu Grid */}
        {showFullMenu && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullMenu.map((category) => (
              <Card key={category.category} className="border-brew-border bg-white">
                <CardContent className="p-5">
                  <h3 className="font-subheading font-bold text-brew-green-dark text-base mb-3 pb-2 border-b border-brew-border">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-brew-text truncate">{item.name}</span>
                        <span className="text-sm font-semibold text-brew-green-dark shrink-0">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <BlurFade delay={0.2}>
          <div className="text-center mt-12">
            <p className="font-accent text-lg text-brew-text-muted mb-4">
              Want something specific? DM us!
            </p>
            <a
              href="https://www.instagram.com/brew_truck/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-brew-green hover:bg-brew-green-dark text-white rounded-full px-8"
              >
                DM on Instagram <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
