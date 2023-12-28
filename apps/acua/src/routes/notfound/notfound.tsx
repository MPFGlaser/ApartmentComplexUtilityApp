import styles from './notfound.module.scss';

/* eslint-disable-next-line */
export interface NotfoundProps {}

export function Notfound(props: NotfoundProps) {
  return (
    <div className={styles['container']}>
      <h1>Page not found!</h1>
    </div>
  );
}

export default Notfound;
