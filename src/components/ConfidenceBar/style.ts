export interface ConfidenceStyle {
  barColor: string;
  textColor: string;
  label: string;
}

export const confidenceLevels: Record<string, ConfidenceStyle> = {
  low: {
    barColor: "bg-red-500",    // Vermelho
    textColor: "text-red-600",
    label: "Baixo",
  },
  medium: {
    barColor: "bg-orange-500", // Laranja
    textColor: "text-orange-600",
    label: "Medio",
  },
  high: {
    barColor: "bg-green-500",  // Verde
    textColor: "text-green-600",
    label: "Alto",
  },
};

export const getConfidenceLevelKey = (percentage: number): "low" | "medium" | "high" => {
  if (percentage < 51) return "low";
  if (percentage < 80) return "medium";
  return "high";
};