import { useEffect, useState } from "react";
import { Sun, CloudRain, Clock, MessageSquareCode } from "lucide-react";
import { PROGRAMMING_QUOTES } from "../data";

export default function WeatherTimeWidget() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState(PROGRAMMING_QUOTES[0]);
  const [weather] = useState({
    temp: 29,
    condition: "Sunny Intervals",
    humidity: 78,
    wind: "14 km/h",
    location: "Colombo, LK",
  });

  useEffect(() => {
    // 1. Live Clock
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 2. Random Quotes Intervaller
    const quoteTimer = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * PROGRAMMING_QUOTES.length);
      setQuote(PROGRAMMING_QUOTES[randomIdx]);
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const changeQuote = () => {
    const currentIdx = PROGRAMMING_QUOTES.indexOf(quote);
    let nextIdx = Math.floor(Math.random() * PROGRAMMING_QUOTES.length);
    while (nextIdx === currentIdx) {
      nextIdx = Math.floor(Math.random() * PROGRAMMING_QUOTES.length);
    }
    setQuote(PROGRAMMING_QUOTES[nextIdx]);
  };

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4 px-6 rounded-2xl glass border border-white/5 shadow-xl w-full max-w-5xl mx-auto my-6 text-xs text-gray-400">
      {/* 1. Time widget */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
        <Clock className="w-4 h-4 text-cyan-400 animate-pulse-subtle" />
        <span className="font-mono text-gray-200 font-semibold">{formattedTime}</span>
        <span className="text-[10px] text-gray-500 font-mono">IST</span>
      </div>

      {/* 2. Date */}
      <div className="hidden sm:block text-gray-300 font-medium">
        {formattedDate}
      </div>

      {/* 3. Weather widget */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
        {weather.temp > 25 ? (
          <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
        ) : (
          <CloudRain className="w-4 h-4 text-blue-400" />
        )}
        <span className="text-gray-200 font-medium">{weather.location}: {weather.temp}°C</span>
        <span className="text-[10px] text-gray-500 hidden md:inline">({weather.condition})</span>
      </div>

      {/* 4. Quote trigger */}
      <button 
        onClick={changeQuote}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-300 transition-all duration-300 max-w-xs md:max-w-md lg:max-w-lg cursor-pointer text-left"
        title="Click to change programming quote"
      >
        <MessageSquareCode className="w-4 h-4 shrink-0 text-indigo-400" />
        <span className="truncate italic font-medium">{quote}</span>
      </button>
    </div>
  );
}
