import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { contactFormSchema } from "@/lib/validations/contact"
import { z } from "zod"
import { render } from "@react-email/render"
import ContactNotificationEmail from "@/emails/contact-notification"
import ContactAutoResponseEmail from "@/emails/contact-autoresponse"
import { checkRateLimit } from "@/lib/rate-limit"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedData = contactFormSchema.parse(body)

    const rateLimitResult = checkRateLimit(request, validatedData.email)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "You have recently submitted a message. Please wait before trying again.",
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimitResult.retryAfter / 1000).toString()
          }
        }
      )
    }

    const locale = validatedData.locale || "en"

    const notificationHtml = await render(
      ContactNotificationEmail({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        locale,
      })
    )

    const autoResponseHtml = await render(
      ContactAutoResponseEmail({
        name: validatedData.name,
        locale,
      })
    )

    const emailSubjects = {
      en: {
        notification: `New inquiry from ${validatedData.name}`,
        autoResponse: "Thank you for contacting me - Diego Pardo"
      },
      es: {
        notification: `Nueva consulta de ${validatedData.name}`,
        autoResponse: "Gracias por contactarme - Diego Pardo"
      }
    }
    const subjects = emailSubjects[locale as keyof typeof emailSubjects] || emailSubjects.en

    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "Diego Pardo Portfolio <hello@quickstack.agency>",
      to: [process.env.CONTACT_EMAIL!],
      replyTo: validatedData.email,
      subject: subjects.notification,
      html: notificationHtml,
    })

    if (notificationError) {
      console.error("Notification email error:", notificationError)
      return NextResponse.json(
        { error: "Failed to send notification email. Please try again." },
        { status: 500 }
      )
    }

    const { data: autoResponseData } = await resend.emails.send({
      from: "Diego Pardo <diego.pardo@quickstack.agency>",
      to: [validatedData.email],
      subject: subjects.autoResponse,
      html: autoResponseHtml,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully!",
        notificationId: notificationData?.id,
        autoResponseId: autoResponseData?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
