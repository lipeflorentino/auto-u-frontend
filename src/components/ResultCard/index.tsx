interface ResultCardProps {
  category: string;
  confidence: string;
  suggestedResponse: string;
}

export const ResultCard = ({ category, confidence, suggestedResponse }: ResultCardProps) => (
  <div className="space-y-4">
    {/* Status da Classificação */}
    <div className="border rounded-xl p-4">
      <h2 className="font-medium mb-3">Resultado da Classificação</h2>
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          {category}
        </span>
        <span className="text-sm text-gray-500">Confiança: {confidence}</span>
      </div>
    </div>

    {/* Resposta Sugerida */}
    <div className="border rounded-xl p-4">
      <div className="flex justify-between mb-2">
        <h2 className="font-medium">Resposta Sugerida</h2>
        <button className="text-sm text-blue-500 hover:underline">Copiar</button>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg text-sm italic">
        {suggestedResponse}
      </div>
    </div>
  </div>
);