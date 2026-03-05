import { motion } from "framer-motion";

function RecipesSection() {
  const recipes = [
    {
      title: "Pizza Artesanal Picante",
      desc: "Pizza de masa artesanal con salsa de tomate casera, mozzarella fresca y un toque sutil de Carolina Reaper en polvo.",
      img: "/images/pizza.png",
      link: "https://www.youtube.com/watch?v=nko4r3Ju-64",
    },
    {
      title: "Hamburguesa Gourmet con Reaper",
      desc: "Carne de res 100% sazonada con especias, queso cheddar, tocino crujiente y una pizca de Reaper en la salsa especial.",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      link: "https://www.youtube.com/watch?v=jPhC5A8HN1g",
    },
    {
      title: "Chili con Carne Extremo",
      desc: "Guiso tradicional de frijoles y carne molida cocinado lentamente con comino, paprika y una pequeña cantidad de Carolina Reaper.",
      img: "https://cdn.shopify.com/s/files/1/0017/2471/0989/files/DSCF8906_7a2d410f-b97c-496e-b967-446100ee4e13_1024x1024.jpg?v=1753108147",
      link: "https://www.youtube.com/watch?v=NsqY35Bti4c",
    },
    {
      title: "Guacamole Picante Supremo",
      desc: "Aguacate fresco machacado con limón, cebolla, cilantro y una pizca muy ligera de Reaper en polvo.",
      img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
      link: "https://www.youtube.com/shorts/K3xcGZLCitQ",
    },
    {
      title: "Pasta Arrabiata Extrema",
      desc: "Pasta italiana en salsa de tomate, ajo y aceite de oliva con un toque intenso de Carolina Reaper en polvo.",
      img: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
      link: "https://www.youtube.com/watch?v=jnv-SIaDtNM",
    },
    {
      title: "Pollo a la Parrilla Picante",
      desc: "Pechuga de pollo marinada en limón, ajo y especias, asada a la parrilla con un toque controlado de Reaper.",
      img: "https://assets.unileversolutions.com/v1/799195.jpg",
      link: "https://www.youtube.com/watch?v=se7rxVKgLhw",
    },
    {
      title: "Enchiladas Rojas Picantes",
      desc: "Tortillas rellenas de pollo bañadas en salsa roja casera con un toque muy ligero de Carolina Reaper.",
      img: "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
      link: "https://www.youtube.com/watch?v=UXaRG5VWbtU",
    },
    {
      title: "Hot Dog Infernal",
      desc: "Salchicha a la parrilla con mostaza, cebolla caramelizada y una salsa especial con Reaper en polvo.",
      img: "https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F3Pos9u9SXXu6STfvmhfENr%2Fd22ca82e2266ddb0e3e9112f01cb7024%2FFiery_20Hot_20Dog.jpg%3Ffm%3Dwebp&w=3840&q=75",
      link: "https://www.youtube.com/results?search_query=hot+dog+gourmet+con+cebolla+caramelizada",
    },
    {
      title: "Sopa de Lentejas Picante",
      desc: "Lentejas cocidas lentamente con verduras frescas y un toque muy medido de Carolina Reaper en polvo.",
      img: "https://www.divinacocina.es/wp-content/uploads/2022/11/sopa-de-lentejas-c2.jpg",
      link: "https://www.youtube.com/watch?v=sq7YZRK9B4I",
    },
    {
      title: "Arroz Frito Picante",
      desc: "Arroz salteado con verduras, huevo y pollo, condimentado con salsa de soya y una pizca estratégica de Reaper.",
      img: "https://www.orientalmarket.es/recetas/wp-content/uploads/2022/05/arroz-frito.jpeg",
      link: "https://www.youtube.com/results?search_query=arroz+frito+con+pollo+receta+china",
    },
  ];

  return (
    <section
      id="recetas"
      className="relative min-h-screen w-full overflow-hidden text-white bg-gradient-to-br from-black via-red-950 to-orange-950 py-20 px-4 sm:px-6"
    >
      {/* 🔥 Glow rojo igual que Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.18),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-16 text-center max-w-4xl mx-auto bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
          Uno de los chiles más intensos y sabrosos del mundo, perfecto para
          acompañar y potenciar tus recetas, solo para los más valientes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {recipes.map((recipe, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="group bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
            >
              <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden aspect-[4/3] bg-black/30">
                  <img
                    src={recipe.img}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </a>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  {recipe.title}
                </h3>

                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {recipe.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecipesSection;
