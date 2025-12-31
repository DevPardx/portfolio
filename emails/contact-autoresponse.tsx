import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components"

interface ContactAutoResponseEmailProps {
  name: string
  locale?: string
}

const translations = {
  en: {
    preview: (name: string) => `Thank you for contacting me, ${name}`,
    title: "Thank You for Reaching Out",
    greeting: (name: string) => `Hello ${name},`,
    intro: "I have received your message and I want to thank you for taking the time to contact me. I will get back to you as soon as possible, usually within 24-48 hours.",
    urgentTitle: "Need an urgent response?",
    urgentText: "If your project requires immediate attention, feel free to send me a direct message at",
    learnMoreIntro: "In the meantime, if you want to learn more about my work, I invite you to:",
    portfolioLink: "View my recent projects on",
    portfolioText: "my portfolio",
    linkedinLink: "Review my professional experience on",
    githubLink: "Explore my code on",
    signatureBest: "Best regards,",
    signatureTitle: "Fullstack Developer | Founder at Quick Stack",
    footerText: "This is an automated confirmation message. Please do not reply to this email. To contact me, write to",
    subject: "Thank you for contacting me - Diego Pardo"
  },
  es: {
    preview: (name: string) => `Gracias por contactarme, ${name}`,
    title: "Gracias por contactarme",
    greeting: (name: string) => `Hola ${name},`,
    intro: "He recibido tu mensaje y quiero agradecerte por tomarte el tiempo de contactarme. Me pondré en contacto contigo lo antes posible, generalmente en un plazo de 24-48 horas.",
    urgentTitle: "¿Necesitas una respuesta urgente?",
    urgentText: "Si tu proyecto requiere atención inmediata, no dudes en enviarme un mensaje directo a",
    learnMoreIntro: "Mientras tanto, si quieres conocer más sobre mi trabajo, te invito a:",
    portfolioLink: "Ver mis proyectos recientes en",
    portfolioText: "mi portafolio",
    linkedinLink: "Revisar mi experiencia profesional en",
    githubLink: "Explorar mi código en",
    signatureBest: "Saludos,",
    signatureTitle: "Fullstack Developer | Founder at Quick Stack",
    footerText: "Este es un mensaje automático de confirmación. Por favor no respondas a este correo. Para contactarme, escribe a",
    subject: "Gracias por contactarme - Diego Pardo"
  }
}

export const ContactAutoResponseEmail = ({
  name,
  locale = "en"
}: ContactAutoResponseEmailProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <Html>
      <Head />
      <Preview>{t.preview(name)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>{t.title}</Heading>
          </Section>

          <Text style={greeting}>{t.greeting(name)}</Text>

          <Text style={text}>
            {t.intro}
          </Text>

          <Section style={calloutBox}>
            <Text style={calloutText}>
              <strong>{t.urgentTitle}</strong>
            </Text>
            <Text style={calloutSubtext}>
              {t.urgentText}{" "}
              <Link href="mailto:diego.pardo@quickstack.agency" style={link}>
                diego.pardo@quickstack.agency
              </Link>
            </Text>
          </Section>

          <Text style={text}>
            {t.learnMoreIntro}
          </Text>

          <Section style={listSection}>
            <Text style={listItem}>
              • {t.portfolioLink}{" "}
              <Link href="https://diegopardo.dev#projects" style={link}>
                {t.portfolioText}
              </Link>
            </Text>
            <Text style={listItem}>
              • {t.linkedinLink}{" "}
              <Link href="https://www.linkedin.com/in/dev-pardx/" style={link}>
                LinkedIn
              </Link>
            </Text>
            <Text style={listItem}>
              • {t.githubLink}{" "}
              <Link href="https://github.com/DevPardx" style={link}>
                GitHub
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={signature}>
            {t.signatureBest}
            <br />
            <strong>Diego Pardo</strong>
            <br />
            <span style={signatureTitle}>
              {t.signatureTitle}
            </span>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            {t.footerText}{" "}
            <Link href="mailto:diego.pardo@quickstack.agency" style={footerLink}>
              diego.pardo@quickstack.agency
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactAutoResponseEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 20px 48px",
  maxWidth: "580px",
}

const header = {
  marginTop: "40px",
}

const h1 = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 32px",
  padding: "0",
  lineHeight: "1.2",
}

const greeting = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "600",
  margin: "24px 0 16px",
}

const text = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
}

const calloutBox = {
  backgroundColor: "#f0f9ff",
  borderRadius: "8px",
  padding: "24px",
  margin: "32px 0",
  border: "1px solid #bae6fd",
}

const calloutText = {
  color: "#0c4a6e",
  fontSize: "16px",
  margin: "0 0 8px",
  lineHeight: "1.5",
}

const calloutSubtext = {
  color: "#0369a1",
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.6",
}

const listSection = {
  margin: "24px 0",
}

const listItem = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "8px 0",
}

const link = {
  color: "#3b82f6",
  textDecoration: "none",
  fontWeight: "500",
}

const hr = {
  borderColor: "#e5e5e5",
  margin: "32px 0",
}

const signature = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "24px 0",
}

const signatureTitle = {
  color: "#737373",
  fontSize: "14px",
}

const footer = {
  color: "#a3a3a3",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "32px 0 0",
  textAlign: "center" as const,
}

const footerLink = {
  color: "#3b82f6",
  textDecoration: "none",
}
