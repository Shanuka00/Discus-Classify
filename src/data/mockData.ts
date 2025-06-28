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
    predicted_class: "Blue Diamond",
    confidence: "95.1%",
    description: "Blue Diamond Discus is characterized by its striking blue coloration and diamond-like reflective scales, making it a highly sought-after variety among aquarium enthusiasts."
  },
  {
    predicted_class: "Pigeon Blood",
    confidence: "89.7%",
    description: "Pigeon Blood Discus features a rich red base color with white spotting patterns. Known for its intense red coloration similar to pigeon blood."
  },
  {
    predicted_class: "Snake Skin",
    confidence: "87.2%",
    description: "Snake Skin Discus has a distinctive pattern resembling snake scales, typically with brown or gray markings on a lighter background."
  },
  {
    predicted_class: "Golden Leopard",
    confidence: "91.5%",
    description: "Golden Leopard Discus exhibits a stunning golden base with dark spots similar to a leopard's pattern, creating a visually striking appearance."
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