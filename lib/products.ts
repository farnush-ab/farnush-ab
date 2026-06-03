export type Product = {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  category: "faucet" | "smart" | "lighting" | "architectural";
  descriptor: string;
  origin: string;
  material: string;
  lot: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "axor-edge",
    name: "شیر برداشت اَکسور اِج",
    nameEn: "AXOR Edge",
    brand: "AXOR",
    category: "faucet",
    descriptor: "هندسهٔ خالص، تراش الماس‌گون.",
    origin: "آلمان",
    material: "برنج پرداخت پلاتین",
    lot: "DS·24·0117",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&auto=format&fit=crop",
  },
  {
    id: "lutron-palladiom",
    name: "پنل هوشمند لوترُن پالادیوم",
    nameEn: "Lutron Palladiom",
    brand: "Lutron",
    category: "smart",
    descriptor: "کنترل نور و سایه. سکوت کامل.",
    origin: "ایالات متحده",
    material: "آلومینیوم آنادایز برنزی",
    lot: "DS·24·0204",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1400&q=80&auto=format&fit=crop",
  },
  {
    id: "flos-arrangements",
    name: "آویز فلوس اَرنجمنتس",
    nameEn: "FLOS Arrangements",
    brand: "FLOS",
    category: "lighting",
    descriptor: "ماژول‌های مدولار، هندسه‌ای زنده.",
    origin: "ایتالیا",
    material: "اپال نوری، استیل برس‌شده",
    lot: "DS·24·0331",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1400&q=80&auto=format&fit=crop",
  },
  {
    id: "dornbracht-vaia",
    name: "ست حمام دورنبراخت وایا",
    nameEn: "Dornbracht Vaia",
    brand: "Dornbracht",
    category: "faucet",
    descriptor: "آرشیتکت بزرگ سُنت آلمانی.",
    origin: "آلمان",
    material: "برنج پرداخت مات",
    lot: "DS·24·0418",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1400&q=80&auto=format&fit=crop",
  },
];

export const lookbookScenes = [
  {
    id: "scene-01",
    title: "ویلای زعفرانیه",
    subtitle: "Saʿadat Residence · 480m²",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2200&q=85&auto=format&fit=crop",
    hotspots: [
      { x: 32, y: 58, productId: "axor-edge" },
      { x: 68, y: 41, productId: "flos-arrangements" },
    ],
  },
  {
    id: "scene-02",
    title: "پنت‌هاوس الهیه",
    subtitle: "Elahieh Penthouse · 720m²",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2200&q=85&auto=format&fit=crop",
    hotspots: [
      { x: 24, y: 47, productId: "lutron-palladiom" },
      { x: 72, y: 63, productId: "dornbracht-vaia" },
    ],
  },
];
