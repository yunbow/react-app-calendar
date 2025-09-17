import React from 'react';
import { Button, Text } from '../../../../components';
import { CalendarEvent } from '../../types';
import { formatDateReadable } from '../../../../utils/dateUtils';
import styles from './EventsList.module.css';

interface EventsListProps {
  events: Array<CalendarEvent & { dateKey: string; eventIndex: number }>;
  onEdit: (dateKey: string, eventIndex: number, event: CalendarEvent) => void;
  onDelete: (dateKey: string, eventIndex: number) => void;
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  onEdit,
  onDelete
}) => {
  const handleDelete = (dateKey: string, eventIndex: number) => {
    if (confirm('この予定を削除してもよろしいですか？')) {
      onDelete(dateKey, eventIndex);
    }
  };

  if (events.length === 0) {
    return (
      <div className={styles.container}>
        <Text variant="h2" color="secondary" className={styles.title}>
          予定リスト
        </Text>
        <div className={styles.noEvents}>
          <Text variant="body" color="muted">予定はありません</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Text variant="h2" color="secondary" className={styles.title}>
        予定リスト
      </Text>
      <div className={styles.eventsList}>
        {events.map((event, index) => (
          <div key={`${event.dateKey}-${index}`} className={styles.eventItem}>
            <div className={styles.eventDetails}>
              <div className={styles.eventDate}>
                <Text variant="caption" color="secondary">
                  {formatDateReadable(event.dateKey)}
                </Text>
              </div>
              <div className={styles.eventTitle}>
                <Text variant="body">{event.title}</Text>
              </div>
              <div className={styles.eventTime}>
                <Text variant="caption" color="secondary">
                  {event.time || '時間未設定'}
                </Text>
              </div>
              {event.description && (
                <div className={styles.eventDescription}>
                  <Text variant="caption" color="muted">
                    {event.description}
                  </Text>
                </div>
              )}
            </div>
            <div className={styles.eventActions}>
              <Button
                variant="secondary"
                size="small"
                onClick={() => onEdit(event.dateKey, event.eventIndex, event)}
              >
                編集
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleDelete(event.dateKey, event.eventIndex)}
              >
                削除
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};