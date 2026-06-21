export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  /** Optional — link to LinkedIn recommendation */
  linkedinUrl?: string;
}

export namespace ITestimonial {
  export type Payload = Testimonial;
}
