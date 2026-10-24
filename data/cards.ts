export type EnergyType =
  | "fire"
  | "water"
  | "grass"
  | "lightning"
  | "psychic"
  | "fighting"
  | "colorless";

export interface CardAttack {
  name: string;
  cost: EnergyType[];
  damage?: string;
  text?: string;
}

export interface Card {
  slug: string;
  name: string;
  number: string;
  set: string;
  type: EnergyType;
  stage: "Básico" | "Fase 1" | "Fase 2";
  evolvesFrom?: string;
  hp: number;
  species: string;
  level: number;
  dex: number;
  rarity: "Común" | "Infrecuente" | "Rara Holo";
  illustrator: string;
  flavor: string;
  power?: { name: string; text: string };
  attacks: CardAttack[];
  weakness?: EnergyType;
  resistance?: { type: EnergyType; value: string };
  retreat: number;
  image: string;
}

export const energyMeta: Record<
  EnergyType,
  { label: string; icon: string; color: string }
> = {
  fire: { label: "Fuego", icon: "/frames/tipos/fire.png", color: "#FF7A45" },
  water: { label: "Agua", icon: "/frames/tipos/water.png", color: "#4DA8FF" },
  grass: { label: "Planta", icon: "/frames/tipos/grass.png", color: "#5FD77A" },
  lightning: { label: "Eléctrico", icon: "/frames/tipos/electric.png", color: "#FFD43B" },
  psychic: { label: "Psíquico", icon: "/frames/tipos/psy.png", color: "#C77DFF" },
  fighting: { label: "Lucha", icon: "/frames/tipos/figth.png", color: "#E0894A" },
  colorless: { label: "Incolora", icon: "/frames/tipos/incolor.png", color: "#D9D6E8" },
};

const NEO_GENESIS = "Neo Genesis";
const img = (file: string) => `/frames/cartas/${file}`;

export const cards: Card[] = [
  {
    slug: "typhlosion",
    name: "Typhlosion",
    number: "18/111",
    set: NEO_GENESIS,
    type: "fire",
    stage: "Fase 2",
    evolvesFrom: "Quilava",
    hp: 100,
    species: "Pokémon Volcán",
    level: 57,
    dex: 157,
    rarity: "Rara Holo",
    illustrator: "Ken Sugimori",
    flavor:
      "Tiene un movimiento secreto y devastador. Frota su pelaje ardiente para provocar enormes explosiones.",
    power: {
      name: "Aumento de Fuego",
      text: "Cuando juegas a Typhlosion de tu mano, puedes echar una moneda. Si sale cara, busca en tu mazo hasta 4 cartas de Energía Fuego y únelas a Typhlosion. Después mezcla tu mazo.",
    },
    attacks: [
      {
        name: "Rueda Fuego",
        cost: ["fire", "fire", "fire", "fire"],
        damage: "80",
        text: "Descarta 3 cartas de Energía Fuego unidas a Typhlosion para poder usar este ataque. Hace 20 puntos de daño a cada Pokémon en la Banca (tuyos y de tu oponente). No apliques Debilidad y Resistencia para los Pokémon en la Banca.",
      },
    ],
    weakness: "water",
    retreat: 2,
    image: img("typhlosion-neo-genesis-es-18.jpg"),
  },
  {
    slug: "feraligatr",
    name: "Feraligatr",
    number: "4/111",
    set: NEO_GENESIS,
    type: "water",
    stage: "Fase 2",
    evolvesFrom: "Croconaw",
    hp: 100,
    species: "Pokémon Fauces",
    level: 56,
    dex: 160,
    rarity: "Rara Holo",
    illustrator: "Ken Sugimori",
    flavor:
      "Cuando muerde con sus enormes y poderosas mandíbulas, sacude la cabeza y desgarra salvajemente a su presa.",
    power: {
      name: "Frenético",
      text: "Cuando juegas a Feraligatr de tu mano, echa una moneda. Si sale cara, descarta las primeras 5 cartas del mazo de tu oponente. Si sale cruz, descarta las primeras 5 cartas de tu mazo.",
    },
    attacks: [
      {
        name: "Masticar",
        cost: ["water", "water", "water", "water"],
        damage: "50+",
        text: "Echa un número de monedas igual al número de contadores de daño sobre Feraligatr. Este ataque hace 50 puntos de daño más 10 puntos de daño por cada cara.",
      },
    ],
    weakness: "grass",
    retreat: 3,
    image: img("feraligatr-neo-genesis-es-4.jpg"),
  },
  {
    slug: "ampharos",
    name: "Ampharos",
    number: "1/111",
    set: NEO_GENESIS,
    type: "lightning",
    stage: "Fase 2",
    evolvesFrom: "Flaaffy",
    hp: 80,
    species: "Pokémon Luz",
    level: 40,
    dex: 181,
    rarity: "Rara Holo",
    illustrator: "Ken Sugimori",
    flavor:
      "La punta de su cola brilla tanto que puede verse desde muy lejos. Sirve de faro para quienes se pierden.",
    attacks: [
      {
        name: "Gigachispa",
        cost: ["lightning", "lightning", "lightning"],
        damage: "40",
        text: "Echa una moneda. Si sale cara, el Pokémon Defensor queda Paralizado y este ataque hace 10 puntos de daño a cada Pokémon en la Banca de tu oponente. No apliques Debilidad y Resistencia para los Pokémon en la Banca.",
      },
    ],
    weakness: "fighting",
    retreat: 2,
    image: img("ampharos-neo-genesis-es-1.jpg"),
  },
  {
    slug: "bellossom",
    name: "Bellossom",
    number: "3/111",
    set: NEO_GENESIS,
    type: "grass",
    stage: "Fase 2",
    evolvesFrom: "Gloom",
    hp: 70,
    species: "Pokémon Flor",
    level: 36,
    dex: 182,
    rarity: "Rara Holo",
    illustrator: "Atsuko Nishida",
    flavor:
      "Abunda en los trópicos. Cuando baila, sus pétalos se frotan entre sí y producen un agradable tintineo.",
    attacks: [
      {
        name: "Néctar Dulce",
        cost: ["grass"],
        text: "Echa una moneda. Si sale cara, quita todos los contadores de daño de 1 de tus Pokémon.",
      },
      {
        name: "Danza Floral",
        cost: ["grass", "grass", "colorless"],
        damage: "30×",
        text: "Hace 30 puntos de daño por cada carta con Bellossom en su nombre que tengas en juego (incluida esta).",
      },
    ],
    weakness: "fire",
    retreat: 2,
    image: img("bellossom-neo-genesis-es-3.jpg"),
  },
  {
    slug: "azumarill",
    name: "Azumarill",
    number: "2/111",
    set: NEO_GENESIS,
    type: "water",
    stage: "Fase 1",
    evolvesFrom: "Marill",
    hp: 70,
    species: "Pokémon Aquaconejo",
    level: 29,
    dex: 184,
    rarity: "Rara Holo",
    illustrator: "Ken Sugimori",
    flavor:
      "Quieto y escuchando con atención, puede saber qué se mueve incluso en los ríos más salvajes y rápidos.",
    attacks: [
      { name: "Placaje", cost: ["colorless", "colorless"], damage: "20" },
      {
        name: "Lluvia de Burbujas",
        cost: ["water", "water", "water"],
        damage: "30",
        text: "Echa una moneda. Si sale cara, el Pokémon Defensor queda Paralizado y este ataque hace 10 puntos de daño a cada Pokémon en la Banca de tu oponente. No apliques Debilidad y Resistencia para los Pokémon en la Banca.",
      },
    ],
    weakness: "lightning",
    retreat: 1,
    image: img("azumarill-neo-genesis-es-2.jpg"),
  },
  {
    slug: "donphan",
    name: "Donphan",
    number: "21/111",
    set: NEO_GENESIS,
    type: "fighting",
    stage: "Fase 1",
    evolvesFrom: "Phanpy",
    hp: 70,
    species: "Pokémon Armadura",
    level: 34,
    dex: 232,
    rarity: "Rara Holo",
    illustrator: "Ken Sugimori",
    flavor:
      "Tiene colmillos afilados y una piel dura y rugosa. Su placaje es tan fuerte que puede derribar una casa.",
    attacks: [
      {
        name: "Azote",
        cost: ["fighting"],
        damage: "10×",
        text: "Hace 10 puntos de daño por cada contador de daño sobre Donphan.",
      },
      {
        name: "Giro Rápido",
        cost: ["fighting", "fighting", "fighting"],
        damage: "50",
        text: "Si tu oponente tiene Pokémon en la Banca, elige 1 y lo cambia por su Pokémon Activo; luego, si tienes Pokémon en la Banca, cambia 1 por tu Pokémon Activo. (Haz el daño antes de cambiar los Pokémon.)",
      },
    ],
    weakness: "grass",
    resistance: { type: "lightning", value: "-30" },
    retreat: 3,
    image: img("donphan-neo-genesis-es-21.jpg"),
  },
  {
    slug: "xatu",
    name: "Xatu",
    number: "52/111",
    set: NEO_GENESIS,
    type: "psychic",
    stage: "Fase 1",
    evolvesFrom: "Natu",
    hp: 80,
    species: "Pokémon Místico",
    level: 45,
    dex: 178,
    rarity: "Infrecuente",
    illustrator: "Ken Sugimori",
    flavor:
      "Dicen que permanece quieto y en silencio porque ve el pasado y el futuro al mismo tiempo.",
    attacks: [
      {
        name: "Profecía",
        cost: ["psychic"],
        text: "Mira las primeras 3 cartas del mazo de cualquier jugador y ordénalas como quieras.",
      },
      {
        name: "Rayo Confuso",
        cost: ["psychic", "psychic", "psychic"],
        damage: "30",
        text: "Echa una moneda. Si sale cara, el Pokémon Defensor queda Confundido.",
      },
    ],
    weakness: "psychic",
    resistance: { type: "fighting", value: "-30" },
    retreat: 1,
    image: img("xatu-neo-genesis-es-52.jpg"),
  },
  {
    slug: "electabuzz",
    name: "Electabuzz",
    number: "33/111",
    set: NEO_GENESIS,
    type: "lightning",
    stage: "Básico",
    hp: 70,
    species: "Pokémon Eléctrico",
    level: 38,
    dex: 125,
    rarity: "Infrecuente",
    illustrator: "Shin-ichi Yoshida",
    flavor:
      "La electricidad recorre la superficie de su cuerpo. En la oscuridad, todo él brilla con un tono blanco azulado.",
    attacks: [
      { name: "Puñetazo", cost: ["colorless", "colorless"], damage: "20" },
      {
        name: "Rapidez",
        cost: ["lightning", "lightning", "lightning"],
        damage: "30",
        text: "El daño de este ataque no se ve afectado por Debilidad, Resistencia, Poderes Pokémon ni ningún otro efecto sobre el Pokémon Defensor.",
      },
    ],
    weakness: "fighting",
    retreat: 1,
    image: img("electabuzz-neo-genesis-es-33.jpg"),
  },
  {
    slug: "gligar",
    name: "Gligar",
    number: "59/111",
    set: NEO_GENESIS,
    type: "fighting",
    stage: "Básico",
    hp: 60,
    species: "Pokémon Escorpivol",
    level: 31,
    dex: 207,
    rarity: "Común",
    illustrator: "Hironobu Yoshida",
    flavor:
      "Vuela directo a la cara de su objetivo y se aferra a él para inyectarle veneno.",
    attacks: [
      {
        name: "Picotazo Venenoso",
        cost: ["fighting"],
        damage: "10",
        text: "Echa una moneda. Si sale cara, el Pokémon Defensor queda Envenenado.",
      },
      { name: "Cuchillada", cost: ["colorless", "colorless"], damage: "20" },
    ],
    weakness: "grass",
    resistance: { type: "fighting", value: "-30" },
    retreat: 0,
    image: img("gligar-neo-genesis-es-59.jpg"),
  },
  {
    slug: "cyndaquil",
    name: "Cyndaquil",
    number: "56/111",
    set: NEO_GENESIS,
    type: "fire",
    stage: "Básico",
    hp: 40,
    species: "Pokémon Ratón Fuego",
    level: 14,
    dex: 155,
    rarity: "Común",
    illustrator: "Ken Sugimori",
    flavor:
      "Suele estar encorvado. Si se enfada o se asusta, lanza llamas por la espalda.",
    attacks: [
      {
        name: "Malicioso",
        cost: ["colorless"],
        text: "Echa una moneda. Si sale cara, el Pokémon Defensor no puede atacar a Cyndaquil durante el próximo turno de tu oponente. (Retirarlo a la Banca o evolucionarlo termina el efecto.)",
      },
      {
        name: "Rapidez",
        cost: ["fire", "colorless"],
        damage: "20",
        text: "El daño de este ataque no se ve afectado por Debilidad, Resistencia, Poderes Pokémon ni ningún otro efecto sobre el Pokémon Defensor.",
      },
    ],
    weakness: "water",
    retreat: 1,
    image: img("cyndaquil-neo-genesis-es-56.jpg"),
  },
];
