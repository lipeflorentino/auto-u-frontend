import { useState } from "react";
import Icon from "../Icon";
import { statusConfig } from "./style";

interface ResultCardProps {
  category: "PRODUTIVO" | "NÃO PRODUTIVO";
  confidence: string;
  suggestedResponse: string;
}

export const ResultCard = ({ category, confidence, suggestedResponse }: ResultCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(suggestedResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  const normalizeKey = (str: string) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
  };

  const style = statusConfig[normalizeKey(category)] || statusConfig["naoprodutivo"];

  return (
    <div className="space-y-4">
        {/*Painel de classificação */}
        <div className="border rounded-xl p-4">
            <h2 className="font-medium mb-3">Resultado da Classificação</h2>
            <div className="space-y-4 w-full">
                {/* Resultado e Score */}
                <div className="grid grid-cols-2 gap-4 w-full items-center">
                    <div className={`grid grid-cols-3 ${style.bgCard} ${style.textColor} rounded-xl overflow-hidden shadow-sm h-full`}>
                    <div className={`col-span-1 flex items-center justify-center py-4 ${style.bgIcon}`}>
                        <Icon name={style.iconName} size="xl" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center p-4">
                        <h2 className="font-bold text-base uppercase truncate">{category}</h2>
                        <p className="text-[10px] italic font-medium opacity-80">{style.label}</p>
                    </div>
                    </div>

                    <div className="flex flex-col items-end justify-center pr-2">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">IA Score</span>
                    <span className="text-xl font-bold text-gray-700">{confidence}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Painel de resposta */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium mb-3">Resposta Sugerida</h2>
                
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    copied 
                        ? "bg-green-500 text-white shadow-inner" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95"
                    }`}
                >
                    {copied ? (
                    <>
                        <Icon name="check" size="sm" />
                        Copiado!
                    </>
                    ) : (
                    <>
                        <span className="text-sm">📋</span>
                        Copiar
                    </>
                    )}
                </button>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg text-sm text-gray-600 leading-relaxed italic relative overflow-hidden">
                {suggestedResponse}
                {copied && (
                    <div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none" />
                )}
            </div>
        </div>
    </div>
  );
};