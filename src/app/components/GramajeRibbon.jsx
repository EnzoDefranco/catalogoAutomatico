// src/components/GramajeRibbon.jsx
export default function GramajeRibbon({ gramaje }) {
    return (
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute rotate-45 bg-yellow-500 text-white text-[10px] font-bold w-20 top-3 right-[-10px] text-center">
          {gramaje} kg
        </div>
      </div>
    );
  }
  