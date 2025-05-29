'use client'

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const CardHoverEffect = ({
  items,
  className,
  variant = "default",
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  variant?: "default" | "outline";
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card variant={variant}>
            {item.icon && <div className="flex justify-center mb-4">{item.icon}</div>}
            <CardTitle variant={variant}>{item.title}</CardTitle>
            <CardDescription variant={variant}>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden relative z-20",
        variant === "default"
          ? "bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700"
          : "bg-white dark:bg-zinc-900 border-2 border-slate-700 group-hover:border-slate-500",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
}) => {
  return (
    <h4 className={cn(
      "font-bold tracking-wide mt-4",
      variant === "default" ? "text-zinc-100" : "text-zinc-800 dark:text-zinc-200",
      className
    )}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
}) => {
  return (
    <p
      className={cn(
        "mt-8 tracking-wide leading-relaxed text-sm",
        variant === "default" ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </p>
  );
};
