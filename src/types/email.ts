export interface ClassificationResult {
  category: string;
  suggested_response: string;
  confidence?: string; // Opcional, já que você usou um valor fixo antes
}