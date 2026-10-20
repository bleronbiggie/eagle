const recipient = 'bleronbiggie@gmail.com';
const sender = 'Calgary Craft <onboarding@resend.dev>';
const maxPhotoBytes = 450 * 1024;
const maxTotalPhotoBytes = 6 * maxPhotoBytes;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isJpeg(bytes) {
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

    const origin = request.headers.get('origin');
    if (origin) {
      try {
        if (new URL(origin).host !== new URL(request.url).host) {
          return json({ error: 'origin_not_allowed' }, 403);
        }
      } catch {
        return json({ error: 'origin_not_allowed' }, 403);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return json({ error: 'email_not_configured' }, 503);

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ error: 'invalid_request' }, 400);
    }

    // Silently accept bot submissions that fill the hidden honeypot.
    if (String(form.get('website') ?? '').trim()) return json({ ok: true });

    const fields = {
      name: String(form.get('name') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      address: String(form.get('address') ?? '').trim(),
      service: String(form.get('service') ?? '').trim(),
      contactMethod: String(form.get('contactMethod') ?? '').trim(),
      description: String(form.get('description') ?? '').trim(),
    };

    if (
      fields.name.length < 2 || fields.name.length > 120 ||
      fields.phone.replace(/\D/g, '').length < 7 || fields.phone.length > 50 ||
      (fields.email && (fields.email.length > 254 || !isValidEmail(fields.email))) ||
      fields.address.length > 200 || fields.service.length < 2 || fields.service.length > 100 ||
      !['Phone', 'Text', 'Email'].includes(fields.contactMethod) ||
      fields.description.length < 20 || fields.description.length > 3000
    ) {
      return json({ error: 'invalid_request' }, 400);
    }

    const photos = form.getAll('photos').filter((entry) => typeof entry !== 'string');
    if (photos.length > 6) return json({ error: 'too_many_photos' }, 400);

    const attachments = [];
    let totalPhotoBytes = 0;
    for (const [index, photo] of photos.entries()) {
      if (photo.type !== 'image/jpeg' || photo.size > maxPhotoBytes) {
        return json({ error: 'invalid_photo' }, 400);
      }
      totalPhotoBytes += photo.size;
      if (totalPhotoBytes > maxTotalPhotoBytes) return json({ error: 'photos_too_large' }, 413);

      const bytes = Buffer.from(await photo.arrayBuffer());
      if (!isJpeg(bytes)) return json({ error: 'invalid_photo' }, 400);
      attachments.push({
        filename: `project-photo-${index + 1}.jpg`,
        content: bytes.toString('base64'),
      });
    }

    const receivedAt = new Date().toISOString();
    const document = [
      'WEBSITE ESTIMATE REQUEST',
      `Received (UTC): ${receivedAt}`,
      '',
      `Full name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      `Email: ${fields.email || 'Not provided'}`,
      `Project address: ${fields.address || 'Not provided'}`,
      `Service needed: ${fields.service}`,
      `Preferred contact method: ${fields.contactMethod}`,
      '',
      'PROJECT DETAILS',
      fields.description,
      '',
      `Project photos attached: ${photos.length}`,
    ].join('\n');

    const safeName = fields.name.replace(/[\r\n]+/g, ' ').slice(0, 80);
    const emailPayload = {
      from: sender,
      to: [recipient],
      subject: `New estimate request — ${safeName}`,
      text: `A new estimate request was submitted from the website. The request document and project photos are attached.\n\n${document}`,
      html: `<p>A new estimate request was submitted from the website.</p><p>The request document and project photos are attached.</p><hr><pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(document)}</pre>`,
      attachments: [
        {
          filename: `estimate-request-${receivedAt.slice(0, 10)}.txt`,
          content: Buffer.from(document, 'utf8').toString('base64'),
        },
        ...attachments,
      ],
    };
    if (fields.email) emailPayload.reply_to = fields.email;

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) return json({ error: 'email_delivery_failed' }, 502);
      return json({ ok: true });
    } catch {
      return json({ error: 'email_delivery_failed' }, 502);
    }
  },
};
