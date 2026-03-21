import { ClassificationStatus } from "../ClassificationStatus";
import { ConfidenceBar } from "../ConfidenceBar";
import { EditableResponsePanel } from "../EditableResponsePanel";

interface ResultCardProps {
  category: "PRODUTIVO" | "IMPRODUTIVO";
  confidence: number;
  suggestedResponse: string;
}

export const ResultCard = ({ category, confidence, suggestedResponse }: ResultCardProps) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-xl p-4 bg-white shadow-sm border-gray-100">
        <h2 className="font-medium mb-3">Resultado da Classificação</h2>
        <div className="space-y-4 w-full">
          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Categoria:</span>
          <div className="grid grid-cols-2 gap-4 w-full items-center mt-3">
            <ClassificationStatus category={category} />
          </div>
          <div className="h-px bg-gray-200 w-full my-4" />
          <ConfidenceBar confidence={confidence} />
        </div>
      </div>

      <EditableResponsePanel suggestedResponse={suggestedResponse} />
    </div>
  );
};