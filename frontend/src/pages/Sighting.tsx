import React from "react";
import { SightingReturned } from "../types/sighting";

const Sighting: React.FC<{ sighting: SightingReturned; onDelete: (id: number) => Promise<void> }> = ({ sighting, onDelete }) => {
    
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Invalid date';
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };
    
    return (
    <article className="bg-white rounded-2xl shadow-sm border border-white/50 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{sighting.title}</h3>
          </div>
          <div className="text-xs text-slate-400">{formatDate(sighting.sighting_date)}</div>
        </div>

        <p className="mt-3 text-slate-700 text-sm leading-relaxed">{sighting.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">By {sighting.author}</div>
          <div className="flex items-center gap-3">
            {onDelete && (
              <button onClick={() => onDelete(sighting.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Sighting;