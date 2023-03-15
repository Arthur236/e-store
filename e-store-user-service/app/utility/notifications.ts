import mailgun from 'mailgun-js';

export const generateAccessCode = () => {
  const code = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { code, expiry };
};

export const sendVerificationCode = async (code: number, toEmail: string) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN || '',
  });

  const emailToSend = {
    from: 'noreply@e-store.com',
    to: toEmail.trim(),
    subject: 'E-Store Verification',
    html: `<p>Your verification code is <b>${code}</b>. It will expire within 30 minutes.</p>`,
  };

  console.log(emailToSend);

  try {
    await mg.messages().send(emailToSend);
  } catch (err) {
    console.error('Mailgun Error:', err);
  }

  return emailToSend;
};
