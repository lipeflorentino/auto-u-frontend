interface ErrorProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorProps) => (
    <div className="mt-3 p-3 bg-red-100 text-red-700 text-sm rounded-lg animate-fade-in flex items-center space-x-2">
        <span>⚠️</span>
        <span>{message}</span>
    </div>
);