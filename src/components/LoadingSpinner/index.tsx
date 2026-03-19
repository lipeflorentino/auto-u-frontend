interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = "Processando arquivo..." }: LoadingSpinnerProps) => (
  <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-sm font-medium text-gray-700 animate-pulse">
      {message}
    </p>
    <p className="text-xs text-gray-500">
      Pode levar alguns segundos para PDFs maiores.
    </p>
  </div>
);