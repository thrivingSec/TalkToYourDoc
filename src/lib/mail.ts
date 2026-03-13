import nodemailer from 'nodemailer'
import { Verification_Email_Template, Welcome_Email_Template } from './mailTemplate';
import { env } from '@/shared/env';


// transporter configuration
function configureTransporter(){
  const company_email = env.COMPANY_EMAIL
  const company_pass = env.COMAPNY_EMAIL_PASS
  
  if(!company_email || !company_pass) {
    throw new Error('Error in configureTransporter :: Sender main/pass not available')
  }

  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: company_email,
    pass: company_pass,
  },
  });

  return transporter
}

export async function sendOtpMail(email: string, otp: number, ) {
  try {
    const transporter = configureTransporter();
    const info = await transporter.sendMail({
      from: `"Next-Authentication-System" srijanspl2017@gmail.com`,
      to: `${email}`,
      subject: "Verify your email",
      text: "Verify your email", // plain‑text body
      html: Verification_Email_Template.replace("{verificationCode}", otp.toString()), // HTML body
  })
  } catch (error) {
    console.log('Error in sendOtpMail :: ', error);
    throw error
  }
}
export async function sendWelcomeMail(email: string, name:string) {
  try {
    const transporter = configureTransporter();
    const info = await transporter.sendMail({
      from: `"Next-Authentication-System" srijanspl2017@gmail.com`,
      to: `${email}`,
      subject: `Welcome ${email.trim().split('@')[0]}`,
      text: "Welcome to Next-Authentication-System", // plain‑text body
      html: Welcome_Email_Template.replace("{name}", name), // HTML body
  })
  } catch (error) {
    console.log('Error in sendWelcomeMail :: ', error);
    throw error
  }
}
