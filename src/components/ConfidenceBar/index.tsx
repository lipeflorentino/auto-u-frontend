import { confidenceLevels, getConfidenceLevelKey } from "./style";

interface ConfidenceBarProps {
  confidence: number;
}

export const ConfidenceBar = ({ confidence }: ConfidenceBarProps) => {
  const percentage = Math.round(confidence * 100);
  const confLevelKey = getConfidenceLevelKey(percentage);
  const confStyle = confidenceLevels[confLevelKey];

  return (
    <div className="flex flex-col gap-2 pr-2 relative">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">IA Score</span>
        <span className={`text-[11px] font-bold uppercase tracking-wider ${confStyle.textColor}`}>
          {confStyle.label}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-4 relative border border-gray-200 shadow-inner overflow-hidden group">
        <div 
          className={`h-full rounded-full ${confStyle.barColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        <div 
          className="absolute top-1/2 flex items-center justify-center w-9 h-9 flex-col"
          style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className={`flex items-center justify-center w-full h-full rounded-full border-4 shadow-xl ${confStyle.barColor} border-white bg-white transition-all duration-300`}>
            <span className={`text-[11px] font-black ${confStyle.textColor}`}>{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};