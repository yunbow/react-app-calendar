import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent, CalendarDay } from './types';
import { formatDateKey, isSameDate } from '../../utils/dateUtils';
import { loadEvents, saveEvents } from '../../utils/storageUtils';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const saveEventsToStorage = useCallback((newEvents: Record<string, CalendarEvent[]>) => {
    saveEvents(newEvents);
    setEvents(newEvents);
  }, []);

  const generateCalendarDays = useCallback((year: number, month: number): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const today = new Date();
    
    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      const dateKey = formatDateKey(date);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isSameDate(date, today),
        dateKey,
        events: events[dateKey] || [],
      });
    }

    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateKey = formatDateKey(date);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: isSameDate(date, today),
        dateKey,
        events: events[dateKey] || [],
      });
    }

    // Next month days (fill to 42 total days)
    const totalDaysDisplayed = 42;
    const daysFromPrevMonth = firstDayOfWeek;
    const daysFromCurrentMonth = lastDay.getDate();
    const daysFromNextMonth = totalDaysDisplayed - daysFromPrevMonth - daysFromCurrentMonth;

    for (let day = 1; day <= daysFromNextMonth; day++) {
      const date = new Date(year, month + 1, day);
      const dateKey = formatDateKey(date);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isSameDate(date, today),
        dateKey,
        events: events[dateKey] || [],
      });
    }

    return days;
  }, [events]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const addEvent = useCallback((date: Date, event: CalendarEvent) => {
    const dateKey = formatDateKey(date);
    const newEvents = { ...events };
    if (!newEvents[dateKey]) {
      newEvents[dateKey] = [];
    }
    newEvents[dateKey].push(event);
    saveEventsToStorage(newEvents);
  }, [events, saveEventsToStorage]);

  const updateEvent = useCallback((date: Date, eventIndex: number, updatedEvent: CalendarEvent) => {
    const dateKey = formatDateKey(date);
    const newEvents = { ...events };
    if (newEvents[dateKey] && newEvents[dateKey][eventIndex]) {
      newEvents[dateKey][eventIndex] = updatedEvent;
      saveEventsToStorage(newEvents);
    }
  }, [events, saveEventsToStorage]);

  const deleteEvent = useCallback((date: Date, eventIndex: number) => {
    const dateKey = formatDateKey(date);
    const newEvents = { ...events };
    if (newEvents[dateKey]) {
      newEvents[dateKey].splice(eventIndex, 1);
      if (newEvents[dateKey].length === 0) {
        delete newEvents[dateKey];
      }
      saveEventsToStorage(newEvents);
    }
  }, [events, saveEventsToStorage]);

  const getUpcomingEvents = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayFormatted = formatDateKey(today);

    return Object.keys(events)
      .filter(dateKey => dateKey >= todayFormatted && events[dateKey].length > 0)
      .sort()
      .flatMap(dateKey =>
        events[dateKey].map((event, index) => ({
          ...event,
          dateKey,
          eventIndex: index
        }))
      );
  }, [events]);

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    events,
    generateCalendarDays,
    navigateMonth,
    goToToday,
    addEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
  };
};