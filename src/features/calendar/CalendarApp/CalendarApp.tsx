import React, { useState } from 'react';
import { CalendarHeader, CalendarDay, EventModal, EventsList } from '../components';
import { useCalendar } from '../useCalendar';
import { getWeekdayNames, formatDateKey } from '../../../utils/dateUtils';
import { CalendarEvent } from '../types';
import styles from './CalendarApp.module.css';

export const CalendarApp: React.FC = () => {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    generateCalendarDays,
    navigateMonth,
    goToToday,
    addEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
  } = useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<{
    event: CalendarEvent;
    dateKey: string;
    eventIndex: number;
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(year, month);
  const upcomingEvents = getUpcomingEvents();
  const weekdayNames = getWeekdayNames();

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleEventSave = (event: CalendarEvent) => {
    if (!selectedDate) return;

    if (editingEvent) {
      const eventDate = new Date(editingEvent.dateKey);
      updateEvent(eventDate, editingEvent.eventIndex, event);
    } else {
      addEvent(selectedDate, event);
    }

    handleModalClose();
  };

  const handleEventEdit = (dateKey: string, eventIndex: number, event: CalendarEvent) => {
    const eventDate = new Date(dateKey);
    setSelectedDate(eventDate);
    setEditingEvent({ event, dateKey, eventIndex });
    setIsModalOpen(true);
  };

  const handleEventDelete = (dateKey: string, eventIndex: number) => {
    const eventDate = new Date(dateKey);
    deleteEvent(eventDate, eventIndex);
  };

  const handlePrevMonth = () => navigateMonth('prev');
  const handleNextMonth = () => navigateMonth('next');

  return (
    <div className={styles.app}>
      <div className={styles.calendarContainer}>
        <CalendarHeader
          year={year}
          month={month}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={goToToday}
        />
        <div className={styles.weekdays}>
          {weekdayNames.map((weekday) => (
            <div key={weekday} className={styles.weekday}>
              {weekday}
            </div>
          ))}
        </div>
        <div className={styles.calendarGrid}>
          {calendarDays.map((day, index) => (
            <CalendarDay
              key={`${day.dateKey}-${index}`}
              day={day}
              isSelected={selectedDate ? formatDateKey(selectedDate) === day.dateKey : false}
              onClick={handleDayClick}
            />
          ))}
        </div>
      </div>

      <EventsList
        events={upcomingEvents}
        onEdit={handleEventEdit}
        onDelete={handleEventDelete}
      />

      <EventModal
        isOpen={isModalOpen}
        date={selectedDate}
        event={editingEvent?.event}
        onClose={handleModalClose}
        onSave={handleEventSave}
      />
    </div>
  );
};