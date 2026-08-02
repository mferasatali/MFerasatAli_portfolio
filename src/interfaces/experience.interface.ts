export interface ExperiencePayload {
  companyName: string;
  role: string;
  duration: string;
  location?: string;
  /** Clarifies primary vs concurrent / contract engagement */
  engagement?: string;
  content: string[];
}
