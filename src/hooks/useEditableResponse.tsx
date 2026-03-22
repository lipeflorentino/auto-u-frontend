import { useState, useEffect } from "react";

interface UseEditableResponseReturn {
  isEditing: boolean;
  editedText: string;
  originalText: string;
  hasChanged: boolean;
  toggleEditing: () => void;
  confirmChanges: () => void;
  cancelEditing: () => void;
  handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  copied: boolean;
  handleCopy: () => Promise<void>;
}

export const useEditableResponse = (initialText: string): UseEditableResponseReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(initialText);
  const [originalText, setOriginalText] = useState(initialText);
  const [copied, setCopied] = useState(false);
  
  const hasChanged = editedText !== originalText;

  useEffect(() => {
    setEditedText(initialText);
    setOriginalText(initialText);
    setIsEditing(false);
  }, [initialText]);
  
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  
  const confirmChanges = () => {
    setOriginalText(editedText); 
    setIsEditing(false); 
  };
  
  const cancelEditing = () => {
    setEditedText(originalText);
    setIsEditing(false);
  };
  
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(event.target.value);
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };
  
  return {
    isEditing,
    editedText,
    originalText,
    hasChanged,
    toggleEditing,
    confirmChanges,
    cancelEditing,
    handleTextChange,
    copied,
    handleCopy
  };
};