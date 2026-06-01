import { cn } from "@/lib/utils";

type SectionTitleProps = {
  tagline: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
};

export function SectionTitle({
  tagline,
  title,
  align = "center",
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className,
      )}
    >
      <span
        className={cn(
          "section-tagline",
          align === "center" && "justify-center",
          light && "text-white/90",
        )}
      >
        <span className="h-2 w-2 rounded-full bg-max-base" aria-hidden />
        {tagline}
      </span>
      <h2
        className={cn(
          "section-title mt-4",
          align === "center" && "mx-auto max-w-3xl",
          light && "text-white",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
