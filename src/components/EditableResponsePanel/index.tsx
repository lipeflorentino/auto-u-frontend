import Icon from "../Icon";
import { useEditableResponse } from "../../hooks/useEditableResponse";

interface EditableResponsePanelProps {
  suggestedResponse: string;
}

export const EditableResponsePanel = ({ suggestedResponse }: EditableResponsePanelProps) => {
  const {
    isEditing,
    editedText,
    hasChanged,
    copied,
    toggleEditing,
    confirmChanges,
    cancelEditing,
    handleTextChange,
    handleCopy
  } = useEditableResponse(suggestedResponse);

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-medium text-gray-700">Resposta Sugerida</h2>
        
        <div className="flex items-center gap-2">
          {/* Botão de Copiar - Desabilitado durante a edição */}
          <button
            onClick={handleCopy}
            disabled={isEditing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied 
                ? "bg-green-500 text-white shadow-inner" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95"
            } ${isEditing && "opacity-50 cursor-not-allowed"}`}
          >
            {copied ? (
              <><Icon name="check" size="sm" /> Copiado!</>
            ) : (
              <><span className="text-sm">📋</span> Copiar</>
            )}
          </button>

          {/* Botão de Alternância Editar/Confirmar */}
          <button
            onClick={isEditing ? confirmChanges : toggleEditing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isEditing 
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } active:scale-95`}
          >
            {isEditing ? (
              <><Icon name="check" size="sm" /> Confirmar</>
            ) : (
              <><span className="text-sm">✏️</span> Editar</>
            )}
          </button>

          {/* Botão de Cancelar - Visível apenas em modo de edição */}
          {isEditing && (
            <button
              onClick={cancelEditing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 active:scale-95"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Área de conteúdo dinâmica */}
      <div className={`
        bg-gray-50 border p-4 rounded-lg text-sm text-gray-600 leading-relaxed italic relative overflow-hidden transition-colors duration-300
        ${hasChanged ? "border-amber-100 bg-amber-50/20" : "border-gray-100"}
      `}>
        {isEditing ? (
          <textarea 
            value={editedText}
            onChange={handleTextChange}
            className="w-full h-32 bg-transparent text-sm text-gray-600 leading-relaxed focus:outline-none resize-none placeholder:text-gray-400"
            placeholder="Edite a resposta da IA..."
            autoFocus
          />
        ) : (
          <p>{editedText}</p>
        )}

        {/* Efeito visual ao copiar */}
        {copied && (
          <div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
};