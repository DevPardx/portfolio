"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "./language-toggle"
import Link from "next/link"

export function Navbar() {
    const t = useTranslations("nav")
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: t("about"), href: "#about" },
        { name: t("experience"), href: "#experience" },
        { name: t("projects"), href: "#projects" },
        { name: t("skills"), href: "#skills" },
        { name: t("contact"), href: "#contact" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isScrolled ? "bg-background/80 py-4 backdrop-blur-md border-b border-border/50" : "bg-transparent py-6",
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter text-foreground"
                >
                    Diego Pardo<span className="text-primary">.</span>
                </motion.a>

                <div className="hidden items-center gap-4 md:flex">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <LanguageToggle />
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                    >
                        {t("hireMe")}
                    </motion.a>
                </div>

                <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-border bg-background/95 md:hidden"
                    >
                        <div className="flex flex-col space-y-4 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-muted-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-border/50">
                                <LanguageToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
