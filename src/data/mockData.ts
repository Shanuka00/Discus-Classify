import { DiscusFish } from '../types';

// Sample prediction data to simulate a backend response
export const samplePrediction: DiscusFish = {
  predicted_class: "Red Checkerboard",
  confidence: "92.3%",
  description: "Red Checkerboard Discus has a vibrant red body with white mosaic-like patterns. Highly valued in the ornamental fish trade."
};

// Additional sample fish data for variety
export const discusFishVarieties: DiscusFish[] = [
  {
    predicted_class: "Heckel",
    confidence: "95.1%",
    description: "Heckel Discus is a wild species native to the Rio Negro and Amazon tributaries. Features nine vertical stripes with a particularly bold fifth stripe, and displays red, brown, blue, and turquoise coloration in a very rounded body shape."
  },
  {
    predicted_class: "Wild",
    confidence: "89.7%",
    description: "Wild Discus are unselectively bred fish from any of the three recognized species. While lacking the solid colors of newer breeds, they showcase natural beauty with round body shapes and authentic wild coloration patterns."
  },
  {
    predicted_class: "Blue Diamond",
    confidence: "87.2%",
    description: "Blue Diamond Discus is an attractive metallic blue breed developed in Asia in the early 1990s. Features a solid blue base without vertical bars, deep red eyes, and an oval shape that's often hardier than wild-caught specimens."
  },
  {
    predicted_class: "Red Turquoise",
    confidence: "91.5%",
    description: "Red Turquoise Discus combines striking turquoise and red colors, first developed in Asia in the 1980s. Features metallic turquoise background with deep red markings extending onto fins, available in blue base or red base variations."
  },
  {
    predicted_class: "Brilliant Turquoise",
    confidence: "88.3%",
    description: "Brilliant Turquoise Discus combines bright turquoise and green shades with dark red eyes. Features fine reddish markings and possible darker vertical stripes, making it one of the most colorful breeds perfect for dramatic display tanks."
  },
  {
    predicted_class: "Tangerine",
    confidence: "92.8%",
    description: "Tangerine Discus features solid pale orange coloration with deeper tangerine shades above and below the anal and dorsal fins. This bright, eye-catching breed is ideal for experienced hobbyists seeking a vibrant display fish."
  },
  {
    predicted_class: "Cobalt",
    confidence: "90.4%",
    description: "Cobalt Discus is a solid blue breed that may display dark vertical stripes, red-tinged fins, and red spotting on sides. This classic ornamental breed was first developed in the 1970s and remains popular today."
  },
  {
    predicted_class: "Ghost",
    confidence: "86.9%",
    description: "Ghost Discus is an unusual strain perfect for collectors wanting unique fish. Features pale gray or light blue solid coloration with transparent fins and possible yellow markings at the tail base, pectoral fins, and head area."
  },
  {
    predicted_class: "Snakeskin",
    confidence: "93.6%",
    description: "Snakeskin Discus was developed in the mid-1990s featuring 14 vertical stripes instead of the usual 9. This unique gene has been crossbred into several color forms, creating distinctive patterning that resembles snake scales."
  },
  {
    predicted_class: "Marlboro",
    confidence: "89.1%",
    description: "Marlboro Discus is truly eye-catching with bright red body color and light yellow or white head with red eyes. Features darker caudal, anal, and dorsal fins, sometimes nearly black, with possible pale patches at tail base."
  },
  {
    predicted_class: "Ring Leopard",
    confidence: "94.2%",
    description: "Ring Leopard Discus features unique ring-shaped markings resembling leopard or jaguar patterns. Available in several color combinations including red, blue, yellow, and white, with possible faint vertical stripes on body sides."
  },
  {
    predicted_class: "Checkerboard",
    confidence: "87.7%",
    description: "Checkerboard Discus displays white or pale blue background with complete red honeycomb patterns covering the entire body. Features red eyes and often yellowish markings on the face, creating a distinctive checkerboard appearance."
  },
  {
    predicted_class: "Panda",
    confidence: "91.3%",
    description: "Panda Discus features heavily patterned body with markings that fuse into large orange clusters surrounded by turquoise spots. The face tends to be yellowish, with similar coloring possibly occurring at the tail base."
  },
  {
    predicted_class: "Pigeon Blood",
    confidence: "88.8%",
    description: "Pigeon Blood Discus is a hardy man-made strain with cream yellow background and yellow-red patterning. Features fine black speckling, bright red eyes, and many specimens display distinctive black tails for unique contrast."
  },
  {
    predicted_class: "Albino Golden",
    confidence: "90.7%",
    description: "Albino Golden Discus is one of the brightest breeds with solid yellow coloration like golden sunrise light. The color may extend onto fins or be replaced with white or red markings, featuring contrasting red eyes."
  },
  {
    predicted_class: "Brown",
    confidence: "85.5%",
    description: "Brown Discus is a natural wild-type species also known as blue discus, found in the Amazon River basin. While lacking bright man-made colors, these fish display stunning natural brown coloration with dark bars and turquoise accents."
  },
  {
    predicted_class: "Tiger Turkish",
    confidence: "92.1%",
    description: "Tiger Turkish Discus is named for its colorful vertical stripes with brilliant turquoise background and red stripes on sides. Natural dark vertical bars add to the stripey appearance, creating a stunning tiger-like pattern."
  },
  {
    predicted_class: "Red Spotted Green",
    confidence: "89.4%",
    description: "Red Spotted Green Discus offers enhanced wild-type appearance with golden sunset body color and small red spots. Features clearly visible dark vertical bars with turquoise and red coloring around head, shoulders, and vent areas."
  },
  {
    predicted_class: "White Butterfly",
    confidence: "86.2%",
    description: "White Butterfly Discus stands out with gleaming solid white body color like an aquarium angel. Typically features red eyes and yellow facial markings, with some specimens displaying spots or stripes over their pure white bodies."
  },
  {
    predicted_class: "Millennium Golden",
    confidence: "93.9%",
    description: "Millennium Golden Discus is one of the purest solid-colored breeds in the hobby. Features stunning golden coloration that may extend to dorsal and anal fins, or contrast with white and transparent finnage for elegant appearance."
  },
  {
    predicted_class: "Red Melon",
    confidence: "88.6%",
    description: "Red Melon Discus is similar to Red Marlboro with bright red-orange body and paler yellow or white facial coloring. This breed showcases warm contrasting colors and represents significant genetic evolution from natural wild types."
  }
];

// Simulates a delay and returns a random prediction from our sample data
export const getPrediction = (): Promise<DiscusFish> => {
  const allPredictions = [samplePrediction, ...discusFishVarieties];
  const randomIndex = Math.floor(Math.random() * allPredictions.length);
  
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(allPredictions[randomIndex]);
    }, 1500);
  });
};