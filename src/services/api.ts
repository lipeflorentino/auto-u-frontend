import type { ClassificationResult } from "../types/email";

export async function classifyEmail(content: string): Promise<ClassificationResult> {
  const response = await fetch("http://localhost:8000/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  return response.json();
};

export async function extractPdfText(file: File) {
  const formData = new FormData();
  
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/extract-pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao extrair texto do PDF");
  }

  return response.json();
};

export function extractPdfWithProgress(
  file: File, 
  onProgress: (percent: number) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error("Erro no servidor"));
      }
    };

    xhr.onerror = () => reject(new Error("Erro na requisição"));

    xhr.open("POST", "http://localhost:8000/extract-pdf");
    xhr.send(formData);
  });
}