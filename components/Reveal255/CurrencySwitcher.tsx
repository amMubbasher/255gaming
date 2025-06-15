import { FC } from "react";

type Currency = "SOL" | "USD";

interface Props {
  value: Currency;
  onToggle: () => void;
}

export const CurrencySwitcher: FC<Props> = ({ value, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className="flex items-center justify-between w-24 px-1 py-1 rounded-full cursor-pointer border border-white/10 text-[10px] shadow-inner transition-all bg-transparent"
    >
      <div
        className={`w-1/2 text-center font-semibold py-0.5 rounded-full transition-all duration-200 ${
          value === "SOL"
            ? "bg-purple-500 text-white shadow-md"
            : "text-white/50"
        }`}
      >
        SOL
      </div>
      <div
        className={`w-1/2 text-center font-semibold py-0.5 rounded-full transition-all duration-200 ${
          value === "USD"
            ? "bg-purple-500 text-white shadow-md"
            : "text-white/50"
        }`}
      >
        USD
      </div>
    </div>
  );
};
