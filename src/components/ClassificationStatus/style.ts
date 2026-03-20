type IconNames = "email" | "check" | "uncheck"; 

interface StatusStyle {
  bgCard: string;
  bgIcon: string;
  textColor: string;
  label: string;
  iconName: IconNames;
}

export const statusConfig: Record<string, StatusStyle> = {
  produtivo: {
    bgCard: "bg-green-100",
    bgIcon: "bg-green-200/50",
    textColor: "text-green-700",
    label: "Requer ação",
    iconName: "email",
  },
  improdutivo: {
    bgCard: "bg-amber-100",
    bgIcon: "bg-amber-200/50",
    textColor: "text-amber-700",
    label: "Não requer ação",
    iconName: "uncheck",
  },
};