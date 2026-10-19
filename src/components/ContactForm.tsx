import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, Check, ImagePlus, X } from 'lucide-react';
import { estimateServiceOptions } from '../data/services';
import { submitEstimate, type EstimateRequest } from '../services/contactService';

type FormValues = Omit<EstimateRequest, 'photos'>;
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
  const objectUrls = useRef<string[]>([]);

  useEffect(() => () => objectUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const addPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (selected.length === 0) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalid = selected.find((file) => !allowedTypes.includes(file.type) || file.size > 8 * 1024 * 1024);
    if (invalid) {
      setErrors((current) => ({
        ...current,
        photos: !allowedTypes.includes(invalid.type)
          ? 'Choose JPG, JPEG, PNG or WEBP images.'
          : 'Each image must be 8 MB or smaller.',
      }));
      return;
    }
    if (photos.length + selected.length > 6) {
      setErrors((current) => ({ ...current, photos: 'You can attach up to 6 images.' }));
      return;
    }
    const urls = selected.map((file) => URL.createObjectURL(file));
    objectUrls.current.push(...urls);
    setPhotos((current) => [...current, ...selected]);
    setPreviews((current) => [...current, ...urls]);
    setErrors((current) => ({ ...current, photos: undefined }));
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
    if (submitting || submitted || !validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await submitEstimate({ ...values, photos });
      setSubmitted(true);
    } catch {
      setSubmitError('We could not prepare your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-icon"><Check size={20} /></span>
        <span className="eyebrow">Demo request prepared</span>
        <h3>Thanks, {values.name.split(' ')[0]}.</h3>
        <p>Your request is ready in this demo, but it has not been sent or stored. Connect a form service to receive real estimate requests.</p>
        <button className="text-link" type="button" onClick={() => { setSubmitted(false); setValues(initialValues); setPhotos([]); setPreviews([]); }}>
          Submit another request <ArrowUpRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <form className="estimate-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="Full name" required error={errors.name}>
          <input autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Phone number" required error={errors.phone}>
          <input autoComplete="tel" type="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} placeholder="(403) 555-0123" aria-invalid={Boolean(errors.phone)} />
        </Field>
        <Field label="Email address" error={errors.email}>
          <input autoComplete="email" type="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Project address">
          <input autoComplete="street-address" value={values.address} onChange={(event) => update('address', event.target.value)} placeholder="Calgary or nearby area" />
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
          <textarea rows={5} value={values.description} onChange={(event) => update('description', event.target.value)} placeholder="What would you like to change, and when are you hoping to start?" aria-invalid={Boolean(errors.description)} />
        </Field>
      </div>

      <div className="upload-field">
        <div className="upload-heading"><div><label htmlFor="project-photos">Project photos <span>Optional</span></label><p>JPG, JPEG, PNG or WEBP · up to 6 images · 8 MB each</p></div><ImagePlus size={19} /></div>
        <label className="upload-dropzone" htmlFor="project-photos">
          <input id="project-photos" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" multiple onChange={addPhotos} />
          <span className="upload-icon"><ImagePlus size={18} /></span>
          <span><strong>Choose project photos</strong><small>Attach images to help describe the work</small></span>
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
        <button className="button button-accent form-submit" type="submit" disabled={submitting}>
          {submitting ? 'Preparing request…' : 'Request a free estimate'} <ArrowUpRight size={17} />
        </button>
        <p>We’ll use these details to discuss your project and prepare an estimate.</p>
      </div>
      {submitError && <p className="form-error-summary" role="alert">{submitError}</p>}
      <p className="form-demo-note">Demo form · Your information is not sent or stored.</p>
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
