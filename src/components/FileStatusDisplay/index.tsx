// import Icon from "../Icon";

interface FileStatusDisplayProps {
  fileName: string | null;
  isDragging: boolean;
  onRemove: (e: React.MouseEvent) => void;
}

export const FileStatusDisplay = ({ fileName, isDragging, onRemove }: FileStatusDisplayProps) => {
  if (fileName) {
    return (
      <div className="flex flex-col items-center p-2 text-center animate-fade-in">
        <span className="text-2xl mb-2 text-green-500">✅</span>
        <p className="text-sm font-semibold text-gray-800">
            Arquivo carregado: <span className="text-xs text-gray-500 mt-2">{fileName}</span>
        </p>
        <button
          onClick={onRemove}
          className="flex items-center gap-1.5 px-3 py-1 my-1 rounded-md text-red-500 hover:bg-red-50 transition-colors text-xs font-bold uppercase tracking-tighter"
        >
          <span>🗑️</span>
          remover
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-2 text-center">
      <span className="text-4xl mb-2">📄</span>
      <p className="text-sm font-medium text-gray-700">
        {isDragging ? "Solte o arquivo aqui" : "Arraste o PDF/TXT ou clique para selecionar"}
      </p>
      <p className="text-xs text-gray-500 mt-2">Arquivos de até 2MB (PDF/TXT)</p>
    </div>
  );
};