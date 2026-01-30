import { motion } from "framer-motion";

type Props = {
  filters: string[];
  active: string;
  onChange: (f: string) => void;
};

export default function Filters({ filters, active, onChange }: Props) {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex flex-wrap md:flex-nowrap gap-3 overflow-x-auto no-scrollbar pb-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`group relative px-6 py-2 transition-all duration-300 skew-x-[-12deg] border-l-2 border-transparent ${
              active === item 
                ? "border-[#FF001D] text-white" 
                : "bg-white text-gray-400 hover:text-[#111] border-gray-100"
            }`}
          >
            {active === item && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-[#111111] -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            <div className="flex items-center gap-2 skew-x-[12deg]">
              {active === item && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 bg-[#FF001D] rounded-full"
                />
              )}
              <span className={`font-['Orbitron'] text-[10px] font-black uppercase tracking-widest whitespace-nowrap`}>
                {item}
              </span>
            </div>

            <div className={`absolute bottom-0 left-0 h-[2px] bg-[#FF001D] transition-all duration-300 ${active === item ? "w-full" : "w-0 group-hover:w-1/2"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}