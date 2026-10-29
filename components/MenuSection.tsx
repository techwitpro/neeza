"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  description: string;
  tag?: string;
  pairing?: string;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  Starters: [
    {
      id: "s1",
      name: "Mushroom Soup",
      subtitle: "earthy, creamy, truffle-rich",
      price: "20$",
      image: "/assets/menu_soup.png",
      description: "Wild foraged morel & chanterelle mushrooms slow-simmered in a velvety cream broth, finished with black winter truffle oil and garlic croutons.",
      tag: "Chef Signature",
      pairing: "Chardonnay / Natural White"
    },
    {
      id: "s2",
      name: "Burrata Caprese",
      subtitle: "creamy, vibrant, basil-oil",
      price: "22$",
      image: "/assets/story_dish.png",
      description: "Artisan buffalo burrata, heirloom cherry tomatoes, cold-pressed basil olive oil, and 12-year aged Modena balsamic reduction.",
      tag: "Vegetarian",
      pairing: "Pinot Grigio / Prosecco"
    },
    {
      id: "s3",
      name: "Seared Scallops",
      subtitle: "delicate, caramelized, citrus",
      price: "26$",
      image: "/assets/experience_dish.png",
      description: "Diver caught Hokkaido scallops seared in cultured butter, served on a parsnip purée with yuzu citrus foam.",
      tag: "Seafood",
      pairing: "Sauvignon Blanc"
    },
    {
      id: "s4",
      name: "Beef Tartare",
      subtitle: "savory, umami, cured yolk",
      price: "24$",
      image: "/assets/testimonial_dish.png",
      description: "Hand-chopped prime Wagyu tenderloin with shallots, capers, smoked sea salt, and cured quail egg on sourdough crisps.",
      tag: "Prime Cut",
      pairing: "Gamay / Light Pinot"
    },
    {
      id: "s5",
      name: "Crispy Calamari",
      subtitle: "crisp, zesty, garlic-lime",
      price: "19$",
      image: "/assets/about_table.png",
      description: "Tender ocean calamari tossed in lightly spiced batter, served with house-made smoked garlic aioli and charred lemon.",
      pairing: "Dry Riesling"
    },
    {
      id: "s6",
      name: "Garden Herb Salad",
      subtitle: "fresh, crisp, pickled shallots",
      price: "18$",
      image: "/assets/gallery_3.png",
      description: "Organic baby greens, micro herbs, shaved radish, toasted pistachios, and Champagne vinaigrette.",
      tag: "Vegan",
      pairing: "Sparkling Rosé"
    },
    {
      id: "s7",
      name: "Truffle Arancini",
      subtitle: "golden, molten, parmesan",
      price: "21$",
      image: "/assets/gallery_1.png",
      description: "Crispy risotto bites stuffed with taleggio cheese, wild forest herbs, and served over sun-ripened tomato coulis.",
      tag: "Vegetarian",
      pairing: "Nebbiolo"
    },
    {
      id: "s8",
      name: "Charred Octopus",
      subtitle: "smoky, tender, paprika glaze",
      price: "25$",
      image: "/assets/about_sunlit.png",
      description: "Spanish octopus braised and flame-charred, served with fingerling potato crisps and saffron emulsion.",
      pairing: "Albariño"
    }
  ],
  Mains: [
    {
      id: "m1",
      name: "Grilled Herb Sea Bass",
      subtitle: "flaky, herb-crusted, fennel",
      price: "38$",
      image: "/assets/story_dish.png",
      description: "Pan-roasted Mediterranean sea bass over caramelized braised fennel, saffron emulsion, and crispy caper berries.",
      tag: "Fresh Catch",
      pairing: "Chablis / Vermentino"
    },
    {
      id: "m2",
      name: "Wagyu Striploin",
      subtitle: "tender, marbling, red wine jus",
      price: "56$",
      image: "/assets/testimonial_dish.png",
      description: "A5 Kagoshima striploin grilled over binchotan charcoal, glazed with bone marrow jus and black winter garlic purée.",
      tag: "Prime Cut",
      pairing: "Cabernet Sauvignon"
    },
    {
      id: "m3",
      name: "Handmade Tagliatelle",
      subtitle: "silky, wild mushroom, parmesan",
      price: "32$",
      image: "/assets/experience_dish.png",
      description: "Egg pasta crafted fresh each morning, tossed with morel ragù, 36-month Parmigiano Reggiano, and cultured butter.",
      tag: "Handmade Daily",
      pairing: "Barolo"
    },
    {
      id: "m4",
      name: "Duck Confit",
      subtitle: "crispy skin, spiced plum glaze",
      price: "36$",
      image: "/assets/menu_soup.png",
      description: "Slow-rendered heritage duck leg with celeriac purée, braised puy lentils, and star anise roasted plum reduction.",
      pairing: "Syrah / Shiraz"
    },
    {
      id: "m5",
      name: "Lobster Risotto",
      subtitle: "luxurious, bisque, saffron",
      price: "44$",
      image: "/assets/gallery_2.png",
      description: "Acquerello carnaroli rice simmered in lobster bisque, finished with butter-poached Maine lobster claw and tarragon.",
      tag: "Signature",
      pairing: "White Burgundy"
    },
    {
      id: "m6",
      name: "Roasted Lamb Rack",
      subtitle: "herb-crusted, rosemary, jus",
      price: "46$",
      image: "/assets/about_table.png",
      description: "Free-range pasture lamb roasted with dijon herb crust, sweet garlic mash, and minted natural jus.",
      pairing: "Rioja Gran Reserva"
    },
    {
      id: "m7",
      name: "Charred Cauliflower",
      subtitle: "smoky, tahini, pomegranate",
      price: "28$",
      image: "/assets/gallery_4.png",
      description: "Whole roasted heirloom cauliflower head with whipped green tahini, za'atar spice, and tart pomegranate molasses.",
      tag: "Vegan",
      pairing: "Orange Wine"
    },
    {
      id: "m8",
      name: "Pan-Roasted Halibut",
      subtitle: "buttery, clams, dashi broth",
      price: "42$",
      image: "/assets/about_guest.png",
      description: "Wild Pacific halibut fillet steamed over sea dashi broth with Manila clams, sea succulents, and chive oil.",
      pairing: "Chenin Blanc"
    }
  ],
  Drinks: [
    {
      id: "d1",
      name: "Neeza Cold Brew",
      subtitle: "single-origin, floral, stone fruit",
      price: "9$",
      image: "/assets/about_guest.png",
      description: "Slow-steeped Bali Kintamani beans for 18 hours, showcasing natural notes of ripe peach, bergamot, and raw honey.",
      tag: "House Specialty"
    },
    {
      id: "d2",
      name: "Velvet Flat White",
      subtitle: "silky microfoam, cacao, toasted nuts",
      price: "8$",
      image: "/assets/about_table.png",
      description: "Double ristretto shot pulled on our custom espresso machine with organic grass-fed micro-steamed milk."
    },
    {
      id: "d3",
      name: "Rosemary Spritz",
      subtitle: "botanical, sparkling, bitter citrus",
      price: "16$",
      image: "/assets/gallery_1.png",
      description: "Italian herbal aperitivo, prosecco, freshly pressed grapefruit juice, and torched garden rosemary.",
      tag: "Aperitif"
    },
    {
      id: "d4",
      name: "Matcha Tonic",
      subtitle: "ceremonial grade, effervescent, yuzu",
      price: "11$",
      image: "/assets/gallery_3.png",
      description: "Single-estate Uji matcha whisked tableside over fever-tree tonic water and cold-pressed Japanese yuzu juice."
    },
    {
      id: "d5",
      name: "Platter Negroni",
      subtitle: "barrel-aged, juniper, orange peel",
      price: "18$",
      image: "/assets/gallery_2.png",
      description: "Dry London gin, sweet red vermouth, and Campari aged for 45 days in charred French oak barrels.",
      tag: "Oak Aged"
    },
    {
      id: "d6",
      name: "Hibiscus Kombucha",
      subtitle: "tangy, floral, probiotics",
      price: "10$",
      image: "/assets/gallery_4.png",
      description: "House-fermented effervescent tea with wild organic hibiscus flowers, lemongrass, and ginger root."
    },
    {
      id: "d7",
      name: "Reserve Pinot Noir",
      subtitle: "cherry, earth, elegant oak",
      price: "22$",
      image: "/assets/menu_soup.png",
      description: "Glass of 2021 Burgundy Pinot Noir from biodynamic vines, featuring delicate red fruit and forest floor nuances."
    },
    {
      id: "d8",
      name: "Citrus Garden Fizz",
      subtitle: "zero proof, cucumber, elderflower",
      price: "12$",
      image: "/assets/story_dish.png",
      description: "Distilled botanical non-alcoholic spirit, crushed English cucumber, elderflower cordial, and soda.",
      tag: "Zero Proof"
    }
  ],
  Desserts: [
    {
      id: "de1",
      name: "Classic Italian Tiramisu",
      subtitle: "espresso-soaked, mascarpone, cocoa",
      price: "16$",
      image: "/assets/story_dish.png",
      description: "Savoiardi ladyfingers soaked in NEEZA espresso and amaretto, layered with whipped zabaglione mascarpone.",
      tag: "Guest Favorite"
    },
    {
      id: "de2",
      name: "Dark Chocolate Tart",
      subtitle: "70% Valrhona, smoked sea salt",
      price: "17$",
      image: "/assets/menu_soup.png",
      description: "Warm single-origin chocolate ganache tart with salted caramel core and Tahitian vanilla gelato."
    },
    {
      id: "de3",
      name: "Yuzu Lemon Tart",
      subtitle: "crisp crust, torched meringue",
      price: "15$",
      image: "/assets/experience_dish.png",
      description: "Butter sable crust filled with silky yuzu citrus curd, topped with delicate peaks of torched Italian meringue."
    },
    {
      id: "de4",
      name: "Pistachio Gelato",
      subtitle: "Sicilian Bronte, roasted crunch",
      price: "14$",
      image: "/assets/testimonial_dish.png",
      description: "Churned daily in small batches with authentic roasted Bronte pistachios, extra virgin olive oil drizzle, and sea salt."
    },
    {
      id: "de5",
      name: "Berry Mille-Feuille",
      subtitle: "caramelized puff, vanilla bean",
      price: "18$",
      image: "/assets/about_sunlit.png",
      description: "Paper-thin caramelized puff pastry sheets layered with Madagascar vanilla mousseline and fresh wild berries."
    },
    {
      id: "de6",
      name: "Basque Cheesecake",
      subtitle: "creamy center, caramelized crust",
      price: "15$",
      image: "/assets/about_table.png",
      description: "Traditional Spanish baked cheesecake with an intentionally charred, caramelized crust and molten creamy center."
    },
    {
      id: "de7",
      name: "Cardamom Panna Cotta",
      subtitle: "silky, blood orange coulis",
      price: "14$",
      image: "/assets/gallery_1.png",
      description: "Infused with green cardamom pods and organic vanilla bean, paired with tangy Sicilian blood orange reduction."
    },
    {
      id: "de8",
      name: "Affogato al Caffè",
      subtitle: "fior di latte, hot espresso shot",
      price: "12$",
      image: "/assets/about_guest.png",
      description: "House-churned fior di latte gelato drowned tableside with a piping hot double shot of NEEZA espresso."
    }
  ]
};

export default function MenuSection() {
  const categories = ["Starters", "Mains", "Drinks", "Desserts"];
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const currentItems = MENU_DATA[activeCategory] || MENU_DATA["Starters"];

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // Staggered card entrance on scroll
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 45, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 82%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Webflow-style smooth card cascading on category change
  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;

    if (cardsContainerRef.current) {
      gsap.to(cardsContainerRef.current.children, {
        opacity: 0,
        y: -18,
        scale: 0.95,
        duration: 0.24,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(cat);
          gsap.fromTo(
            cardsContainerRef.current!.children,
            { opacity: 0, y: 26, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: { amount: 0.22, from: "start" },
              ease: "power4.out",
            }
          );
        },
      });
    } else {
      setActiveCategory(cat);
    }
  };

  const handleNext = () => {
    const nextIdx = (categories.indexOf(activeCategory) + 1) % categories.length;
    handleCategoryChange(categories[nextIdx]);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDish(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="w-full bg-[#1D1D02] text-[#F0EDCC] py-[100px] px-6 lg:px-[100px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Top Header Row (#6698:17912, height 63.5px) */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-[48px]"
        >
          <h2 className="font-serif-title font-normal text-4xl lg:text-[48px] uppercase tracking-normal text-[#F0EDCC]">
            The Menu
          </h2>
          <p className="font-manrope font-normal text-[15.12px] leading-[21.17px] text-white max-w-[498.9px]">
            Platter’s menu is a blend of artistry and seasonality. From the ocean
            to the garden, every ingredient is chosen for its freshness and
            character.
          </p>
        </div>

        {/* Main Content Area (#6698:18048, gap 83px) */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-[83px]">
          {/* Left Column (#6698:18047, width 168.31px) */}
          <div className="w-full lg:w-[168.31px] shrink-0 flex flex-col justify-between py-2">
            {/* Category Links (#6698:18043, gap 22px) */}
            <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-[22px]">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`font-serif-title text-[24px] leading-[31.45px] text-left transition-all duration-300 relative cursor-pointer select-none ${
                      isActive
                        ? "text-[#F36E3F] translate-x-2 font-bold"
                        : "text-white/80 hover:text-white hover:translate-x-1"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F36E3F] inline-block animate-pulse" />
                      )}
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next Button (#6698:18107) */}
            <div className="pt-6 lg:pt-0">
              <button
                onClick={handleNext}
                className="btn-magnetic w-full bg-[#F36E3F] hover:bg-[#e25b2a] text-white font-manrope font-semibold text-[18px] leading-[21.17px] py-[12px] text-center shadow-lg shadow-[#F36E3F]/20 hover:shadow-xl cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Container (#6698:17948): width 990, height 627, fill #F0EDCC */}
          <div className="flex-1 bg-[#F0EDCC] rounded-[2px] p-[20px] lg:p-[21px] flex items-center justify-center shadow-2xl">
            {/* 2 Rows of 4 Cards */}
            <div
              ref={cardsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] lg:gap-[15px] w-full max-w-[949.96px]"
            >
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  data-cursor="view"
                  onClick={() => setSelectedDish(item)}
                  className="card-hover-lift bg-[#4F4E0F] w-full max-w-[226.24px] mx-auto h-[283.02px] p-[9.07px] flex flex-col justify-between items-center cursor-pointer group shadow-md will-change-transform"
                >
                  {/* Card Image: 208.1 x 129.43 */}
                  <div className="w-[208.1px] h-[129.43px] relative overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="208px"
                      className="object-cover img-hover-zoom"
                    />
                  </div>

                  {/* Card Text Container: 208.1 x 117.31 */}
                  <div className="w-[208.1px] h-[117.31px] flex flex-col justify-between items-center text-center pt-2">
                    <div className="w-full">
                      <h3 className="font-serif-title font-bold text-[18.14px] leading-[25.4px] text-[#F0EDCC] group-hover:text-white transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-serif-title font-normal text-[15.12px] leading-[21.17px] text-[#F0EDCC] opacity-90 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Divider (#6698:17960, stroke #5E5D18 0.76px) */}
                    <div className="w-full h-[0.76px] bg-[#5E5D18]" />

                    {/* Price (#6698:17962, Manrope Bold 28px, white) */}
                    <div className="font-manrope font-bold text-[28px] leading-[31.45px] text-white pb-1 group-hover:text-[#F36E3F] transition-colors">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dish Detail Modal (Interactive modal when dish is clicked) */}
      {selectedDish && (
        <div
          onClick={() => setSelectedDish(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal bg-[#1D1D02] border border-[#F0EDCC]/20 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative text-[#F0EDCC] p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-[#F36E3F] text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
            >
              &times;
            </button>

            {/* Modal Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-black/30">
              <Image
                src={selectedDish.image}
                alt={selectedDish.name}
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
              {selectedDish.tag && (
                <span className="absolute top-3 left-3 bg-[#F36E3F] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {selectedDish.tag}
                </span>
              )}
            </div>

            {/* Modal Title & Price */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif-title text-2xl text-[#F0EDCC]">
                {selectedDish.name}
              </h3>
              <span className="font-manrope text-2xl font-bold text-[#F36E3F]">
                {selectedDish.price}
              </span>
            </div>

            <p className="font-serif-title text-sm text-[#F0EDCC]/70 italic mb-3">
              {selectedDish.subtitle}
            </p>

            <p className="font-manrope text-sm text-[#F0EDCC]/90 leading-relaxed mb-4">
              {selectedDish.description}
            </p>

            {selectedDish.pairing && (
              <div className="pt-3 border-t border-[#F0EDCC]/15 flex items-center justify-between text-xs font-mono-tag text-[#F0EDCC]/70">
                <span>Sommelier Pairing:</span>
                <span className="text-[#F0EDCC] font-medium">{selectedDish.pairing}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
