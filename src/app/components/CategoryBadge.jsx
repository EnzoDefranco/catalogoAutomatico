export default function CategoryBadge({ children, className = "" }) {
      return (
        <span
          className={
            `rounded bg-fuchsia-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white ` +
            className
          }
        >
          {children}
        </span>
      );
    }