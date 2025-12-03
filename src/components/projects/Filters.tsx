import React from "react";

type Props = {
  filters: string[];
  active: string;
  onChange: (f: string) => void;
};

export default function Filters({ filters, active, onChange }: Props) {
  return (
    <div className="filters-container">
      <h2 className="filters-title">Filtros</h2>
      <div className="filters-list">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? "active" : ""}`}
            onClick={() => onChange(f)}
            type="button"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
