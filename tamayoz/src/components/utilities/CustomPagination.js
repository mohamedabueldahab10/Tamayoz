import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../icons';
import styles from '../../assets/css/modules/layout/Dashboard.module.css';

export default function CustomPagination({
  page,
  pageCount,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const handlePrevPage = () => {
    if (hasPrevPage) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(page + 1);
    }
  };
  console.log(
    'page:' + page,
    'pageCount:' + pageCount,
    hasPrevPage,
    hasNextPage,
    onPageChange
  );
  useEffect(() => {
    console.log('Current Page:', page);
  }, [page]);
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
        onClick={handlePrevPage}
      >
        <ArrowIcon color="var(--secondary-color)" disabled={!hasPrevPage} />
      </div>
      <span>
        {language === 'ar'
          ? `${pageCount} - ${page}`
          : `${page} - ${pageCount}`}
      </span>
      <div
        style={{
          transform: language === 'en' ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
        className={styles.arrowContainer}
        onClick={handleNextPage}
      >
        <ArrowIcon color="var(--primary-color)" disabled={!hasNextPage} />
      </div>
    </div>
  );
}
