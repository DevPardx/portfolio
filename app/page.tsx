"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Download, Mail, MapPin, ArrowUpRight, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroBackground } from "@/components/hero-background"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

const skills = {
  frontend: ["TypeScript", "React", "Next.js", "TailwindCSS", "Astro", "Framer Motion"],
  backend: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"],
  devops: ["Docker", "Digital Ocean", "Vercel", "CI/CD", "WebAssembly", "Rust"],
  tools: ["Git", "Figma", "Sequelize", "TypeORM", "Postman", "Stripe"],
}

const projects = [
  {
    title: "Mossbros",
    description:
      "Full-stack motorcycle repair shop management system. Built with React 19 + TypeScript frontend and Node.js/Express + PostgreSQL backend. Features customer management, motorcycle inventory, service catalog, 6-state repair workflow with automatic cost calculation, and analytics dashboard. Modern architecture with TanStack Query, TypeORM, Redis, and JWT authentication.",
    tags: ["React", "Node", "PostgreSQL"],
    image: "/mossbros.png",
    link: "https://mossbrossv.com",
  },
  {
    title: "AuthentiDoc",
    description: "Decentralized document signing and management platform built on the Nostr protocol. PWA application with Rust/WebAssembly offering end-to-end encryption (NIP-44), multi-party signing, self-sovereign identity, and offline support via IndexedDB. Integrates Bitcoin Lightning Network and fiat payment gateways. No central servers - users maintain complete control over their data and cryptographic keys.",
    tags: ["Rust", "Nostr", "Axum"],
    image: "/authenticdoc.jpg",
    link: "https://authenticdoc.online",
  },
  {
    title: "Raising Together Project",
    description: "Raising Together Project (RTP) is a professional support platform founded by Becky Pineda, a certified Postpartum Doula. The project is dedicated to supporting families and new parents as they navigate the early stages of parenthood.",
    tags: ["TypeScript", "Next.js", "TailwindCSS"],
    image: "/rtp.png",
    link: "https://raisingtogetherproject.com/",
  }
]

export default function PortfolioPage() {
  const tHero = useTranslations("hero")
  const tAbout = useTranslations("about")
  const tExperience = useTranslations("experience")
  const tProjects = useTranslations("projects")
  const tSkills = useTranslations("skills")
  const tContact = useTranslations("contact")

  useEffect(() => {
    console.log("%c👋 Hey there! Looking for an MVP?", "color: #3b82f6; font-size: 20px; font-weight: bold;")
    console.log("I build production-ready products in 4 weeks. Let's talk: diego.pardo@quickstack.agency")
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const locale = localStorage.getItem("NEXT_LOCALE") || "en"

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, locale }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          const waitMinutes = Math.ceil((result.retryAfter || 1800000) / 60000)
          toast.error(tContact("rateLimitError", { minutes: waitMinutes }))
        } else {
          throw new Error(result.error || "Failed to send message")
        }
        return
      }

      toast.success(tContact("success"))

      reset()
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error(tContact("error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen selection:bg-primary/30 bg-background text-foreground">
      <Navbar />

      <section className="relative flex lg:min-h-screen items-center px-6 lg:px-24 overflow-hidden border-b border-white/5">
        <HeroBackground />
        <div className="container mx-auto pt-40 lg:pt-0">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 pb-10 lg:pb-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="font-heading text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
                  {tHero("name").split(" ")[0]} <span className="text-primary">{tHero("name").split(" ")[1]}</span>
                </h1>
                <p className="mt-4 text-xl font-medium text-muted-foreground md:text-2xl leading-tight">
                  {tHero("title")}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl text-lg leading-relaxed text-muted-foreground"
              >
                {tHero("description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20" asChild>
                  <a href="#projects">{tHero("viewProjects")}</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 backdrop-blur-sm bg-transparent"
                  asChild
                >
                  <a href="#contact">{tHero("contactMe")}</a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block mt-10 max-w-157.5"
            >
              <div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-primary/10 to-transparent p-1 shadow-2xl">
                <Image
                  src="/linkedin-pfp.jpeg"
                  alt="Diego Pardo"
                  className="size-full object-contain rounded-[22px] grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl animate-pulse" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-700" />
            </motion.div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-14 lg:pt-32 lg:pb-20 lg:px-24">
        <div className="grid grid-cols-1 lg:gap-24 lg:grid-cols-[300px_1fr]">
          <aside className="lg:sticky lg:top-32 h-fit space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                <span>{tHero("location")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>{tHero("availability")}</span>
              </div>
            </div>
          </aside>

          <div className="space-y-48 mt-10 lg:mt-0">
            <section id="about" className="scroll-mt-32 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/20" />
                <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">{tAbout("title")}</h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-3xl">
                <p>{tAbout("paragraph1")}</p>
                <p>{tAbout("paragraph2")}</p>
                <p>{tAbout("paragraph3")}</p>
                <p>{tAbout("paragraph4")}</p>
                <Button
                  variant="outline"
                  className="group rounded-full border-primary/20 hover:bg-primary/10 bg-transparent transition-all"
                  asChild
                >
                  <a href="/cv.pdf" target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {tAbout("downloadResume")}
                    <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
              </div>
            </section>

            <section id="experience" className="scroll-mt-32 space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/20" />
                <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">{tExperience("title")}</h2>
              </div>
              <ExperienceTimeline />
            </section>

            <section id="projects" className="scroll-mt-32 space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/20" />
                <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">{tProjects("title")}</h2>
              </div>
              <div className="grid gap-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative grid grid-cols-1 gap-6 rounded-2xl p-4 transition-all hover:bg-white/3 lg:grid-cols-[200px_1fr]"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 lg:aspect-square">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={tProjects(`list.${i}.title`)}
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {tProjects(`list.${i}.title`)}
                          </h3>
                          <Link
                            href={project.link}
                            target="_blank"
                          >
                            <ExternalLink
                              size={18}
                              className="text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                          </Link>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tProjects(`list.${i}.description`)}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-primary/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="skills" className="scroll-mt-32 space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/20" />
                <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">{tSkills("title")}</h2>
              </div>
              <div className="grid gap-12 md:grid-cols-2">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">{tSkills(`categories.${category}`)}</h4>
                    <div className="flex flex-wrap gap-3">
                      {items.map((skill) => (
                        <div
                          key={skill}
                          className="glass-card rounded-xl px-4 py-2 text-sm font-medium transition-all hover:border-primary/30 hover:bg-primary/5"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-primary/20" />
                  <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    {tContact("title")}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {tContact("subtitle")}
                </p>
              </div>

              <Card className="glass-card border-0 shadow-2xl">
                <CardContent className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{tContact("form.name")}</label>
                        <Input
                          {...register("name")}
                          placeholder={tContact("form.namePlaceholder")}
                          className="bg-white/2 border-white/10"
                          disabled={isSubmitting}
                          aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {tContact("form.email")}
                        </label>
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder={tContact("form.emailPlaceholder")}
                          className="bg-white/2 border-white/10"
                          disabled={isSubmitting}
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {tContact("form.message")}
                      </label>
                      <Textarea
                        {...register("message")}
                        placeholder={tContact("form.messagePlaceholder")}
                        className="min-h-30 bg-white/2 border-white/10"
                        disabled={isSubmitting}
                        aria-invalid={errors.message ? "true" : "false"}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500">{errors.message.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-xl py-6 text-lg font-bold transition-all hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? tContact("form.submitting") : tContact("form.submit")}
                      <Mail className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 border-t border-border pt-12">
                <a
                  href="mailto:diego.pardo@quickstack.agency"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail size={16} />
                  diego.pardo@quickstack.agency
                </a>
                <span className="hidden md:block text-muted-foreground/30">|</span>
                <div className="flex gap-6">
                  <a href="https://github.com/DevPardx" className="text-muted-foreground transition-colors hover:text-primary">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/dev-pardx/" className="text-muted-foreground transition-colors hover:text-primary">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
