import { motion } from "framer-motion";
import "./Projects.css";

type Props = {
  filters: string[];
  active: string;
  onChange: (f: string) => void;
};

export default function Filters({ filters, active, onChange }: Props) {
  return (
    <div className="filters-container">
      <div className="filters-scroll">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`filter-btn ${active === item ? "active" : ""}`}
          >
            {active === item && (
              <motion.div
                layoutId="activeFilter"
                className="active-bg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="filter-text">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}