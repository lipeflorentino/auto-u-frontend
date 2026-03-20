import Icon from "../Icon";
import { statusConfig } from "./style";

interface ClassificationStatusProps {
  category: string;
}

export const ClassificationStatus = ({ category }: ClassificationStatusProps) => {
  const normalizeKey = (str: string) => 
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
  
  const style = statusConfig[normalizeKey(category)] || statusConfig["improdutivo"];

  return (
    <div className={`grid grid-cols-3 ${style.bgCard} ${style.textColor} rounded-xl overflow-hidden shadow-sm h-full`}>
      <div className={`col-span-1 flex items-center justify-center py-4 ${style.bgIcon}`}>
        <Icon name={style.iconName} size="xl" />
      </div>
      <div className="col-span-2 flex flex-col justify-center p-4">
        <h2 className="font-bold text-base uppercase truncate">{category}</h2>
        <p className="text-[10px] italic font-medium opacity-80">{style.label}</p>
      </div>
    </div>
  );
};