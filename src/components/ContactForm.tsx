import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, Check, ImagePlus, X } from 'lucide-react';
import { estimateServiceOptions } from '../data/services';
import { submitEstimate, type EstimateRequest } from '../services/contactService';
import { compressProjectPhoto } from '../utils/compressImage';

type FormValues = Omit<EstimateRequest, 'photos' | 'website'>;
type FormErrors = Partial<Record<keyof FormValues | 'photos', string>>;

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  service: '',
  description: '',
  contactMethod: 'Phone',
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [processingPhotos, setProcessingPhotos] = useState(false);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => () => objectUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const addPhotos = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (selected.length === 0) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const invalid = selected.find((file) => !allowedTypes.includes(file.type) || file.size > 12 * 1024 * 1024);
    if (invalid) {
      setErrors((current) => ({
        ...current,
        photos: !allowedTypes.includes(invalid.type)
          ? 'Choose JPG, PNG or WEBP. HEIC works when your phone browser can open it.'
          : 'Each image must be 12 MB or smaller before compression.',
      }));
      return;
    }
    if (photos.length + selected.length > 6) {
      setErrors((current) => ({ ...current, photos: 'You can attach up to 6 images.' }));
      return;
    }
    setProcessingPhotos(true);
    try {
      const compressed: File[] = [];
      for (const [index, file] of selected.entries()) {
        compressed.push(await compressProjectPhoto(file, photos.length + index));
      }
      const urls = compressed.map((file) => URL.createObjectURL(file));
      objectUrls.current.push(...urls);
      setPhotos((current) => [...current, ...compressed]);
      setPreviews((current) => [...current, ...urls]);
      setErrors((current) => ({ ...current, photos: undefined }));
    } catch (error) {
      setErrors((current) => ({
        ...current,
        photos: error instanceof Error ? error.message : 'A photo could not be compressed. Try another image.',
      }));
    } finally {
      setProcessingPhotos(false);
    }
  };

  const removePhoto = (index: number) => {
    const url = previews[index];
    if (url) {
      URL.revokeObjectURL(url);
      objectUrls.current = objectUrls.current.filter((candidate) => candidate !== url);
    }
    setPhotos((current) => current.filter((_, currentIndex) => currentIndex !== index));
    setPreviews((current) => current.filter((_, currentIndex) => currentIndex !== index));
  };

  const resetForm = () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.current = [];
    setSubmitted(false);
    setValues(initialValues);
    setPhotos([]);
    setPreviews([]);
    setErrors({});
    setSubmitError('');
  };

  const validate = () => {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = 'Enter your name.';
    if (values.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number.';
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.service) next.service = 'Choose the service you need.';
    if (values.description.trim().length < 20) next.description = 'Tell us a little more about the project (at least 20 characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || processingPhotos || submitted || !validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const website = new FormData(event.currentTarget).get('website')?.toString() ?? '';
      await submitEstimate({ ...values, photos, website });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error && error.message === 'email_not_configured'
        ? 'The email inbox is not connected yet. Please contact us directly or try again later.'
        : 'We could not send your request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-icon"><Check size={20} /></span>
        <span className="eyebrow">Request sent</span>
        <h3>Thanks, {values.name.split(' ')[0]}.</h3>
        <p>Your estimate request was emailed to bleronbiggie@gmail.com with the project details and photos attached. We’ll reply using your preferred contact method.</p>
        <button className="text-link" type="button" onClick={resetForm}>
          Submit another request <ArrowUpRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <form className="estimate-form" id="estimate-form" onSubmit={handleSubmit} noValidate>
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <Field label="Full name" required error={errors.name}>
          <input autoComplete="name" maxLength={120} value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Phone number" required error={errors.phone}>
          <input autoComplete="tel" maxLength={50} type="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} placeholder="(403) 555-0123" aria-invalid={Boolean(errors.phone)} />
        </Field>
        <Field label="Email address" error={errors.email}>
          <input autoComplete="email" maxLength={254} type="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Project address">
          <input autoComplete="street-address" maxLength={200} value={values.address} onChange={(event) => update('address', event.target.value)} placeholder="Calgary or nearby area" />
        </Field>
        <Field label="Service needed" required error={errors.service}>
          <select value={values.service} onChange={(event) => update('service', event.target.value)} aria-invalid={Boolean(errors.service)}>
            <option value="">Select a service</option>
            {estimateServiceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
        <Field label="Preferred contact method">
          <select value={values.contactMethod} onChange={(event) => update('contactMethod', event.target.value as FormValues['contactMethod'])}>
            <option>Phone</option><option>Text</option><option>Email</option>
          </select>
        </Field>
        <Field label="Tell us about the project" required error={errors.description} className="field-full">
          <textarea rows={5} maxLength={3000} value={values.description} onChange={(event) => update('description', event.target.value)} placeholder="What would you like to change, and when are you hoping to start?" aria-invalid={Boolean(errors.description)} />
        </Field>
      </div>

      <div className="upload-field">
        <div className="upload-heading"><div><label htmlFor="project-photos">Project photos <span>Optional</span></label><p>JPG, JPEG, PNG or WEBP · up to 6 · compressed before sending</p></div><ImagePlus size={19} /></div>
        <label className="upload-dropzone" htmlFor="project-photos">
          <input id="project-photos" type="file" accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif" multiple disabled={processingPhotos || photos.length >= 6} onChange={addPhotos} />
          <span className="upload-icon"><ImagePlus size={18} /></span>
          <span><strong>{processingPhotos ? 'Preparing photos…' : 'Choose project photos'}</strong><small>Images are compressed on this device before upload</small></span>
          <span className="upload-arrow">↗</span>
        </label>
        {errors.photos && <span className="field-error" role="alert">{errors.photos}</span>}
        {previews.length > 0 && (
          <div className="upload-previews" aria-label="Selected image previews">
            {previews.map((preview, index) => (
              <div className="upload-preview" key={`${preview}-${index}`}>
                <img src={preview} alt={`Selected project image ${index + 1}`} />
                <button type="button" onClick={() => removePhoto(index)} aria-label={`Remove image ${index + 1}`}><X size={15} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-submit-row">
        <button className="button button-accent form-submit" type="submit" disabled={submitting || processingPhotos}>
          {processingPhotos ? 'Preparing photos…' : submitting ? 'Sending request…' : 'Request a free estimate'} <ArrowUpRight size={17} />
        </button>
        <p>We’ll use these details to discuss your project and prepare an estimate.</p>
      </div>
      {submitError && <p className="form-error-summary" role="alert">{submitError}</p>}
      <p className="form-privacy-note">Your contact and project details will be emailed to our team so we can respond. Please don’t include payment details or government ID numbers.</p>
    </form>
  );
}

function Field({
  label,
  children,
  required = false,
  error,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const child = children as React.ReactElement<{ id?: string; 'aria-describedby'?: string }>;
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id}>{label}{required && <span className="required-mark"> *</span>}</label>
      {React.cloneElement(child, { id, 'aria-describedby': error ? `${id}-error` : undefined })}
      {error && <span id={`${id}-error`} className="field-error" role="alert">{error}</span>}
    </div>
  );
}
