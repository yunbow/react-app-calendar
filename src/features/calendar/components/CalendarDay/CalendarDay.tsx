import React from 'react';
import { CalendarDay as CalendarDayType } from '../../types';
import styles from './CalendarDay.module.css';

interface CalendarDayProps {
  day: CalendarDayType;
  isSelected: boolean;
  onClick: (date: Date) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isSelected,
  onClick
}) => {
  const dayClass = [
    styles.day,
    day.isCurrentMonth ? styles.currentMonth : '',
    day.isToday ? styles.today : '',
    isSelected ? styles.selected : ''
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    onClick(day.date);
  };

  return (
    <div className={dayClass} onClick={handleClick}>
      <div className={styles.dayNumber}>{day.day}</div>
      {day.events.length > 0 && (
        <>
          <div className={styles.eventIndicator}></div>
          <div className={styles.eventList}>
            {day.events.slice(0, 3).map((event, index) => (
              <div key={index} className={styles.eventItem}>
                {event.time ? `${event.time} ${event.title}` : event.title}
              </div>
            ))}
            {day.events.length > 3 && (
              <div className={styles.eventItem}>
                他 {day.events.length - 3} 件
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};