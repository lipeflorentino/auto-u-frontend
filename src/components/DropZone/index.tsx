interface DropZoneProps {
  isDragging: boolean;
  isProcessing: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onClick: () => void;
  children: React.ReactNode;
}

export const DropZone = ({ children, isDragging, isProcessing, ...props }: DropZoneProps) => (
  <div
    {...props}
    className={`
      relative border-2 border-dashed rounded-xl transition-all duration-200 p-8 text-center
      ${isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-300 hover:border-blue-400"}
      ${isProcessing ? "bg-gray-50 cursor-not-allowed" : "cursor-pointer"}
    `}
  >
    {children}
  </div>
);