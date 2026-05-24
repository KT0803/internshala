import styles from './SkeletonCard.module.css';

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleBlock}>
          <div className={`${styles.skeleton} ${styles.titleBar}`} />
          <div className={`${styles.skeleton} ${styles.companyBar}`} />
        </div>
      </div>

      <div className={styles.tagsRow}>
        <div className={`${styles.skeleton} ${styles.tagBar}`} />
        <div className={`${styles.skeleton} ${styles.tagBarShort}`} />
      </div>

      <div className={styles.infoRow}>
        <div className={`${styles.skeleton} ${styles.infoBar}`} />
        <div className={`${styles.skeleton} ${styles.infoBar}`} />
        <div className={`${styles.skeleton} ${styles.infoBar}`} />
      </div>

      <div className={styles.bottomRow}>
        <div className={`${styles.skeleton} ${styles.postedBar}`} />
        <div className={`${styles.skeleton} ${styles.applyBar}`} />
      </div>
    </div>
  );
}

export default SkeletonCard;
