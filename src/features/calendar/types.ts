export interface CalendarEvent {
  title: string;
  time?: string;
  description?: string;
}

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateKey: string;
  events: CalendarEvent[];
}

export interface CalendarData {
  year: number;
  month: number;
  days: CalendarDay[];
}

export type FilterType = 'all' | 'active' | 'completed';