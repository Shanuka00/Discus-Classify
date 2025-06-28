export interface DiscusFish {
  predicted_class: string;
  confidence: string;
  description: string;
}

export interface DiscusClassifyResult {
  prediction: DiscusFish | null;
  isLoading: boolean;
  error: string | null;
}