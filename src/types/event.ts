
export type EventType = 'hackathon' | 'workshop' | 'tech-talk' | 'career-fair';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO date string
  endDate?: string; // ISO date string (optional for multi-day events)
  location: string;
  college: string;
  type: EventType;
  link: string;
  image?: string; // URL to event image (optional)
}

export interface EventFilters {
  search: string;
  type: EventType | 'all';
  college: string;
  date: 'upcoming' | 'today' | 'this-week' | 'this-month' | 'all';
}
