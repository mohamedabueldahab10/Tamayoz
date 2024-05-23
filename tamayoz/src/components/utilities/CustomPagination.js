import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../icons';
import styles from '../../assets/css/modules/layout/Dashboard.module.css';

export default function CustomPagination({ pagination, onPageChange }) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  if (!pagination) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div
        style={{
          transform: language === 'en' ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        className={styles.arrowContainer}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        <ArrowIcon
          color="var(--secondary-color)"
          disabled={!pagination.hasPrevPage}
        />
      </div>
      {language === 'ar' ? (
        <span>
          {pagination.pageCount} - {pagination.page + 1}
        </span>
      ) : (
        <span>
          {pagination.page + 1} - {pagination.pageCount}
        </span>
      )}
      <div
        style={{
          transform: language === 'en' ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
        className={styles.arrowContainer}
        onClick={() => {
          console.log('clicked');
          onPageChange(pagination.page + 1);
        }}
      >
        <ArrowIcon
          color="var(--primary-color)"
          disabled={!pagination.hasNextPage}
        />
      </div>
    </div>
  );
}
