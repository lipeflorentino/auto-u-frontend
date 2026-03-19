import { useState } from "react";
import { classifyEmail } from "./services/api";
import Header from "./components/Header";
import { UploadBox } from "./components/UploadBox";
import { ResultCard } from "./components/ResultCard";
import { ChatBox } from "./components/ChatBox";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!text) return;
    setLoading(true);
    try {
      const res = await classifyEmail(text);
      setResult(res);
    } catch (error) {
      console.error("Erro ao classificar:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* PAINEL ESQUERDO */}
          <div className="space-y-4">
            <UploadBox 
              text={text} 
              setText={setText} 
              onClassify={handleSubmit} 
              loading={loading} 
            />
          </div>

          {/* PAINEL DIREITO */}
          <div className="space-y-4">
            {result ? (
              <ResultCard 
                category={result.category} 
                confidence="92%" 
                suggestedResponse={result.suggested_response} 
              />
            ) : (
              <div className="h-32 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
                Aguardando classificação...
              </div>
            )}
            
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
}