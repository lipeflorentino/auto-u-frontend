import { useState } from "react";
import { extractPdfWithProgress } from "../services/api";

export const useFileProcessor = (onFileAccepted: (content: string) => void) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = async (file: File) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const ALLOWED_TYPES = ["application/pdf", "text/plain"];

    if (!ALLOWED_TYPES.includes(file.type)) return setError("Formato inválido.");
    if (file.size > MAX_FILE_SIZE) return setError("Arquivo muito grande (máx 2MB).");

    setError(null);
    setIsProcessing(true);
    setProgress(0);
    setFileName(file.name);

    try {
      if (file.type === "text/plain") {
        const text = await file.text();
        onFileAccepted(text);
        setProgress(100);
      } else {
        const data = await extractPdfWithProgress(file, setProgress);
        if (data?.text) onFileAccepted(data.text);
        else setError("Não foi possível extrair texto.");
      }
    } catch (err) {
      setError("Falha no processamento.");
      setFileName(null);
    } finally {
      setTimeout(() => setIsProcessing(false), 500);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setProgress(0);
    onFileAccepted("");
  };

  return { processFile, isProcessing, progress, error, setError, fileName, clearFile };
};