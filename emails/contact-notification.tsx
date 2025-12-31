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
} from "@react-email/components"
import * as React from "react"

interface ContactNotificationEmailProps {
  name: string
  email: string
  message: string
  locale?: string
}

const translations = {
  en: {
    preview: (name: string) => `New inquiry from ${name} on your portfolio`,
    title: "New Contact Inquiry",
    intro: "You have received a new message from your portfolio:",
    nameLabel: "Name:",
    emailLabel: "Email:",
    messageLabel: "Message:",
    footer: "This message was sent from your portfolio contact form (diegopardo.dev)"
  },
  es: {
    preview: (name: string) => `Nueva consulta de ${name} en tu portafolio`,
    title: "Nueva Consulta de Contacto",
    intro: "Has recibido un nuevo mensaje desde tu portafolio:",
    nameLabel: "Nombre:",
    emailLabel: "Email:",
    messageLabel: "Mensaje:",
    footer: "Este mensaje fue enviado desde el formulario de contacto de tu portafolio (diegopardo.dev)"
  }
}

export const ContactNotificationEmail = ({
  name,
  email,
  message,
  locale = "en"
}: ContactNotificationEmailProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <Html>
      <Head />
      <Preview>{t.preview(name)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.title}</Heading>
          <Text style={text}>
            {t.intro}
          </Text>

          <Section style={informationSection}>
            <Hr style={hr} />
            <Section style={informationRow}>
              <Text style={informationLabel}>{t.nameLabel}</Text>
              <Text style={informationValue}>{name}</Text>
            </Section>
            <Hr style={hr} />
            <Section style={informationRow}>
              <Text style={informationLabel}>{t.emailLabel}</Text>
              <Text style={informationValue}>
                <a href={`mailto:${email}`} style={link}>
                  {email}
                </a>
              </Text>
            </Section>
            <Hr style={hr} />
          </Section>

          <Section style={messageSection}>
            <Text style={messageLabel}>{t.messageLabel}</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            {t.footer}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactNotificationEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
}

const h1 = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "700",
  margin: "40px 0",
  padding: "0",
  lineHeight: "1.2",
}

const text = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
}

const informationSection = {
  margin: "32px 0",
}

const informationRow = {
  margin: "8px 0",
}

const informationLabel = {
  color: "#737373",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
}

const informationValue = {
  color: "#1a1a1a",
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.5",
}

const link = {
  color: "#3b82f6",
  textDecoration: "none",
}

const hr = {
  borderColor: "#e5e5e5",
  margin: "16px 0",
}

const messageSection = {
  margin: "32px 0",
}

const messageLabel = {
  color: "#737373",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
}

const messageBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "24px",
  border: "1px solid #e5e5e5",
}

const messageText = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
}

const footer = {
  color: "#a3a3a3",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "32px 0 0",
  textAlign: "center" as const,
}
