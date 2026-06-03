export type Brand = {
  name: string;
  origin: string;
  since: string;
  field: string;
};

export const brands: Brand[] = [
  { name: "AXOR", origin: "Germany", since: "1993", field: "Faucetry" },
  { name: "Dornbracht", origin: "Germany", since: "1950", field: "Faucetry" },
  { name: "Lutron", origin: "USA", since: "1961", field: "Smart Home" },
  { name: "FLOS", origin: "Italy", since: "1962", field: "Lighting" },
  { name: "Gessi", origin: "Italy", since: "1992", field: "Faucetry" },
  { name: "Bang & Olufsen", origin: "Denmark", since: "1925", field: "Acoustics" },
  { name: "Vola", origin: "Denmark", since: "1968", field: "Faucetry" },
  { name: "Artemide", origin: "Italy", since: "1960", field: "Lighting" },
];
