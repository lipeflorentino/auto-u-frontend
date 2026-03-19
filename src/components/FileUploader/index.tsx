import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { extractPdfWithProgress } from "../../services/api"; 
import { LoadingSpinner } from "../LoadingSpinner";

interface FileUploaderProps {
  onFileAccepted: (content: string) => void;
}

export const FileUploader = ({ onFileAccepted }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const ALLOWED_TYPES = ["application/pdf", "text/plain"];

  const validateAndProcessFile = async (file: File) => {
    setError(null);
    setIsProcessing(false);
    setProgress(0);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato inválido. Use apenas PDF ou TXT.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Arquivo muito grande. O limite é 2MB.");
      return;
    }

    try {
      setIsProcessing(true);

      if (file.type === "text/plain") {
        setProgress(100);
        const text = await file.text();
        onFileAccepted(text);
      } 
      else if (file.type === "application/pdf") {
        const data = await extractPdfWithProgress(file, (percent) => {
            setProgress(percent);
        });
        
        if (data && data.text) {
            onFileAccepted(data.text);
        } else {
            setError("Não foi possível extrair texto deste PDF.");
        }
      }
    } catch (err) {
      setError("Falha ao processar arquivo no servidor. Verifique a conexão.");
      console.error("Erro no upload/extração:", err);
    } finally {
      setTimeout(() => setIsProcessing(false), 500);
    }
  };
  
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!isProcessing) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isProcessing) return;

    const file = e.dataTransfer.files[0];
    if (file) validateAndProcessFile(file);
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcessFile(file);
    if (e.target.value) e.target.value = ""; 
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()} 
        className={`
          relative border-2 border-dashed rounded-xl transition-all duration-200
          ${isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-300 hover:border-blue-400"}
          ${error ? "border-red-400 bg-red-50" : ""}
          ${isProcessing ? "border-gray-300 bg-gray-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.txt"
          className="hidden"
          disabled={isProcessing}
        />
        
        {isProcessing ? (
          <LoadingSpinner message="Extraindo texto do PDF..." />
        ) : (
          <div className="flex flex-col items-center p-8 text-center">
            <span className="text-4xl mb-3">📄</span>
            <p className="text-sm font-medium text-gray-700">
              {isDragging ? "Solte o arquivo aqui" : "Arraste o PDF/TXT ou clique para selecionar"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Arquivos de até 2MB (PDF/TXT)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-100 text-red-700 text-sm rounded-lg animate-fade-in flex items-center space-x-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 w-full">
            <div className="flex justify-between mb-1 text-xs font-medium text-blue-700">
            <span>{progress < 100 ? "Enviando..." : "Processando texto..."}</span>
            <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
            />
            </div>
        </div>
        )}
    </div>
  );
};