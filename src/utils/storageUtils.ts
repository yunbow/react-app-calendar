import { CalendarEvent } from '../features/calendar/types';

const STORAGE_KEY = 'calendarEvents';

export const loadEvents = (): Record<string, CalendarEvent[]> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load events from localStorage:', error);
    return {};
  }
};

export const saveEvents = (events: Record<string, CalendarEvent[]>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events to localStorage:', error);
  }
};