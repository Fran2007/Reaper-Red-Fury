export const products = [
  {
    id: 1,
    name: "Carolina Reaper 50g",
    description: "Chile Carolina Reaper en polvo.",
    price: 12.99,
    image: "/images/CarolinaReaper.png",
  },
  {
    id: 2,
    name: "Carolina Reaper 100g",
    description: "Chile Carolina Reaper en polvo.",
    price: 19.99,
    image: "/images/Carolina100g.png",
  },
  {
    id: 3,
    name: "Carolina Reaper + Habanero Premium",
    description: "Mezcla de chile Carolina Reaper y Habanero.",
    price: 24.99,
    image: "/images/CarolinaPremiunm.png",
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}
