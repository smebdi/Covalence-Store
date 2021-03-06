import * as sendgrid from 'sendgrid';
const helper = sendgrid.mail;
const sg = sendgrid(process.env.SENDGRID_API_KEY || '');

export function sendEmail(to: string, from: string, subject: string, content: string) {
    let fromEmail = new helper.Email(from);
    let toEmail = new helper.Email(to);
    let emailContent = new helper.Content('text/html', content);
    let mail = new helper.Mail(fromEmail, subject, toEmail, emailContent);
    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    return sg.API(request);
}