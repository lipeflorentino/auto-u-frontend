export const UploadProgressBar = ({ progress }: { progress: number }) => (
  <div className="mt-4 w-full">
    <div className="flex justify-between mb-1 text-xs font-medium text-blue-700">
      <span>{progress < 100 ? "Enviando..." : "Processando..."}</span>
      <span>{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);