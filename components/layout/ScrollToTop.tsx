// "use client";

// import { useEffect, useState } from "react";
// import { ArrowUp } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function ScrollToTop() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setVisible(window.scrollY > 400);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <button
//       type="button"
//       onClick={scrollUp}
//       className={cn(
//         "fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1 transition-all",
//         visible
//           ? "translate-y-0 opacity-100"
//           : "pointer-events-none translate-y-4 opacity-0",
//       )}
//       aria-label="Scroll to top"
//     >
//       <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-max-base bg-white text-max-base shadow-md transition hover:bg-max-base hover:text-max-black">
//         <ArrowUp className="h-5 w-5" />
//       </span>
//       <span className="text-[10px] font-medium uppercase tracking-wider text-max-gray">
//         Top
//       </span>
//     </button>
//   );
// }
