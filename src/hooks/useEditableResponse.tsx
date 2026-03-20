import { useState } from "react";

interface UseEditableResponseReturn {
  isEditing: boolean;
  editedText: string;
  originalText: string;
  hasChanged: boolean;
  toggleEditing: () => void;
  confirmChanges: () => void;
  cancelEditing: () => void;
  handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const useEditableResponse = (initialText: string): UseEditableResponseReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(initialText);
  const [originalText, setOriginalText] = useState(initialText);
  
  const hasChanged = editedText !== originalText;
  
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
  
  return {
    isEditing,
    editedText,
    originalText,
    hasChanged,
    toggleEditing,
    confirmChanges,
    cancelEditing,
    handleTextChange,
  };
};