import { useState, useRef } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { useFileProcessor } from "../../hooks/useFIleProcessor";
import { DropZone } from "../DropZone";
import { ErrorMessage } from "../ErrorMessage";
import { UploadProgressBar } from "../UploadProgressBar";
import { FileStatusDisplay } from "../FileStatusDisplay";

interface FileUploaderProps {
  onFileAccepted: (content: string) => void;
}

export const FileUploader = ({ onFileAccepted }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { processFile, isProcessing, progress, error, fileName, clearFile } = useFileProcessor(onFileAccepted);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && !isProcessing) processFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearFile();
  };

  return (
    <div className="w-full">
      <DropZone 
        isDragging={isDragging} 
        isProcessing={isProcessing}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isProcessing && !fileName && fileInputRef.current?.click()}
      >
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} 
        />
        
        {isProcessing ? (
          <LoadingSpinner message="Extraindo texto..." />
        ) : (
          <FileStatusDisplay 
            fileName={fileName} 
            isDragging={isDragging} 
            onRemove={handleRemove} 
          />
        )}
      </DropZone>

      {error && <ErrorMessage message={error} />}
      {isProcessing && <UploadProgressBar progress={progress} />}
    </div>
  );
};