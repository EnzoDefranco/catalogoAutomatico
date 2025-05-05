// src/components/Badge.jsx
export default function Badge({ children }) {
    return (
      <span className="ml-1 rounded bg-fuchsia-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
        {children}
      </span>
    );
  }
  