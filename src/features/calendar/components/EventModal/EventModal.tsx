import React, { useState, useEffect } from 'react';
import { Button, Input } from '../../../../components';
import { CalendarEvent } from '../../types';
import { formatDateReadable } from '../../../../utils/dateUtils';
import styles from './EventModal.module.css';

interface EventModalProps {
  isOpen: boolean;
  date: Date | null;
  event?: CalendarEvent;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  date,
  event,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setTime(event.time || '');
      setDescription(event.description || '');
    } else {
      setTitle('');
      setTime('');
      setDescription('');
    }
  }, [event, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      time: time || undefined,
      description: description.trim() || undefined,
    });
  };

  const handleClose = () => {
    setTitle('');
    setTime('');
    setDescription('');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !date) return null;

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        <h2 className={styles.title}>予定を追加</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="日付:"
            value={formatDateReadable(date.toISOString().split('T')[0])}
            readOnly
          />
          <Input
            label="タイトル:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="予定のタイトルを入力"
          />
          <Input
            label="時間:"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className={styles.textareaGroup}>
            <label className={styles.textareaLabel}>詳細:</label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="詳細を入力"
              rows={4}
            />
          </div>
          <Button type="submit" variant="primary" className={styles.submitButton}>
            保存
          </Button>
        </form>
      </div>
    </div>
  );
};