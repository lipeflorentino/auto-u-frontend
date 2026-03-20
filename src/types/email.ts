export interface ClassificationResult {
  category: "PRODUTIVO" | "IMPRODUTIVO";
  confidence: number;
  suggestedResponse: string;
}