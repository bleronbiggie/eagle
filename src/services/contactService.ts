export interface EstimateRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  description: string;
  contactMethod: 'Phone' | 'Text' | 'Email';
  photos: File[];
  website?: string;
}

export async function submitEstimate(request: EstimateRequest): Promise<void> {
  const formData = new FormData();
  formData.set('name', request.name);
  formData.set('phone', request.phone);
  formData.set('email', request.email);
  formData.set('address', request.address);
  formData.set('service', request.service);
  formData.set('contactMethod', request.contactMethod);
  formData.set('description', request.description);
  formData.set('website', request.website ?? '');
  request.photos.forEach((photo) => formData.append('photos', photo, photo.name));

  const response = await fetch('/api/estimate', { method: 'POST', body: formData });
  const contentType = response.headers.get('content-type') ?? '';
  const result = contentType.includes('application/json')
    ? await response.json().catch(() => null) as { error?: string } | null
    : null;

  if (!response.ok || !result) {
    throw new Error(result?.error ?? 'email_delivery_failed');
  }
}
