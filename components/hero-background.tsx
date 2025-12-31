"use client"

import { motion } from "framer-motion"

export function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
            <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-primary/25 blur-[120px]" />
            <div className="absolute -right-[10%] bottom-[10%] h-[50%] w-[50%] rounded-full bg-blue-600/15 blur-[120px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] rounded-full bg-indigo-500/5 blur-[150px]" />

            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                }}
            />
        </div>
    )
}
