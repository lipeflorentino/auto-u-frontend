import { FileUploader } from "../FileUploader";
import Icon from "../Icon";

interface UploadBoxProps {
  text: string;
  setText: (value: string) => void;
  onClassify: () => void;
  loading: boolean;
}

export const UploadBox = ({ text, setText, onClassify, loading }: UploadBoxProps) => {
  return (
    <div className="border rounded-xl p-4 bg-white">
        <h2 className="font-medium mb-3">Enviar Email</h2>
        
        <FileUploader onFileAccepted={(content) => setText(content)} />
        
        <p className="text-sm py-2 font-medium text-gray-700">
            Ou cole o texto do email:
        </p>

        <textarea
            className="mt-4 w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            rows={6}
            placeholder="Cole o conteúdo ou arraste um arquivo acima..."
            value={text}
            onChange={(e) => setText(e.target.value)}
        />

        <button
            onClick={onClassify}
            disabled={loading || !text}
            className="mt-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
            {loading ? (
                <div className="w-6 h-6 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
                <>
                    <Icon name="ubot" size="md" />
                    <span>Classificar Email</span>
                </>
            )}
        </button>
    </div>
  );
};