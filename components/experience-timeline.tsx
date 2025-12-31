"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function ExperienceTimeline() {
    const t = useTranslations("experience")

    const experiences = [
        {
            period: t("jobs.0.period"),
            role: t("jobs.0.role"),
            company: t("jobs.0.company"),
            description: t("jobs.0.description"),
            tags: ["React", "Express", "Sequelize", "PostgreSQL"],
        },
        {
            period: t("jobs.1.period"),
            role: t("jobs.1.role"),
            company: t("jobs.1.company"),
            description: t("jobs.1.description"),
            tags: ["TypeScript", "Next.js", "Node.js", "NestJS"],
        },
        {
            period: t("jobs.2.period"),
            role: t("jobs.2.role"),
            company: t("jobs.2.company"),
            description: t("jobs.2.description"),
            tags: ["MVPs", "Business Validation", "Product Strategy"],
        }
    ]

    return (
        <div className="space-y-12">
            {experiences.map((exp, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group grid grid-cols-1 gap-4 md:grid-cols-[160px_1fr]"
                >
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground/60 pt-1">{exp.period}</span>
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.role} · {exp.company}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {exp.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
