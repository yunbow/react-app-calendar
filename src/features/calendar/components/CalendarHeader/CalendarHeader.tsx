import React from 'react';
import { Button, Text } from '../../../../components';
import { getMonthNames } from '../../../../utils/dateUtils';
import styles from './CalendarHeader.module.css';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday
}) => {
  const monthNames = getMonthNames();

  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <Button 
          variant="secondary" 
          size="small" 
          onClick={onPrevMonth}
          className={styles.navButton}
        >
          &lt;
        </Button>
        <Text variant="h1" color="secondary" className={styles.title}>
          {year}年 {monthNames[month]}
        </Text>
        <Button 
          variant="secondary" 
          size="small" 
          onClick={onNextMonth}
          className={styles.navButton}
        >
          &gt;
        </Button>
      </div>
      <Button variant="primary" size="small" onClick={onToday}>
        今日
      </Button>
    </div>
  );
};