import nodemailer, { Transporter } from "nodemailer"
import { EnvConfiguration } from "../config/env.config";
import fs from 'fs';
import Handlebars from "handlebars";
export enum MailType {
    REGISTRATION = "REGISTRATION",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}

interface MailOptions {
    to: string,
    subject: string,
    data: any
}

class SendMail {
    private transporter: null | Transporter = null;

    constructor() {
        this.transporter = nodemailer.createTransport({
            //@ts-ignore
            host: EnvConfiguration.SMTP_HOST,
            port: EnvConfiguration.SMTP_PORT,
            // secure: true, // true for 465, false for other ports
            auth: {
                user: EnvConfiguration.SMTP_USER,
                pass: EnvConfiguration.SMTP_PASSWORD,
            },
        })
    }

    public async sendMail(mailType: MailType, mailOptions: MailOptions) {
        const body = this.getMailTemplate(mailType, mailOptions);
        if (this.transporter) {
            await this.transporter.sendMail({
                from: EnvConfiguration.MAIL_FROM,
                to: mailOptions.to,
                subject: mailOptions.subject,
                html: body
            })
        }
    }

    private getMailTemplate(mailType: MailType, mailOption: MailOptions) {
        switch (mailType) {
            case MailType.REGISTRATION: {
                const source = fs.readFileSync(`${__dirname}/../templates/newRegistration.html`, "utf-8");
                const template = Handlebars.compile(source);
                const data = {
                    subject: mailOption.subject,
                    name: mailOption.data.name,
                    otp: mailOption.data.otp,
                }
                const body = template(data);
                return body;
            }

            case MailType.EMAIL_VERIFICATION: {
                const source = fs.readFileSync(`${__dirname}/../templates/otp.html`, "utf-8");
                const template = Handlebars.compile(source);
                const data = {
                    subject: mailOption.subject,
                    name: mailOption.data.name,
                    otp: mailOption.data.otp,
                }
                const body = template(data);
                return body;
            }

            case MailType.FORGOT_PASSWORD: {
                const source = fs.readFileSync(`${__dirname}/../templates/linkbasedverification.html`, "utf-8");
                const template = Handlebars.compile(source);
                const data = {
                    subject: mailOption.subject,
                    name: mailOption.data.name,
                    link: mailOption.data.link,
                }
                const body = template(data);
                return body;
            }
        }
    }
}

export default new SendMail();