interface UploadBoxProps {
  text: string;
  setText: (value: string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export const UploadBox = ({ text, setText, handleSubmit, loading }: UploadBoxProps) => (
  <div className="border rounded-xl p-4">
    <h2 className="font-medium mb-3">Enviar Email</h2>
    
    <div className="border-2 border-dashed rounded-xl p-6 text-center text-gray-500">
      Arraste o PDF aqui ou clique
    </div>

    {/* Progress Bar - Poderia ser um componente <ProgressBar /> se crescer */}
    <div className="mt-4">
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-blue-500 rounded-full w-[70%]" />
      </div>
    </div>

    <textarea
      className="mt-4 w-full border rounded-lg p-3"
      rows={5}
      placeholder="Cole o conteúdo do email..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl disabled:opacity-50"
    >
      {loading ? "Processando..." : "Classificar Email"}
    </button>
  </div>
);