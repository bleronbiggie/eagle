export interface EstimateRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  description: string;
  contactMethod: 'Phone' | 'Text' | 'Email';
  photos: File[];
}

/** Demo-only submission. Connect this boundary to an email API, CRM, or form service. */
export async function submitEstimate(_request: EstimateRequest): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 700));
}
