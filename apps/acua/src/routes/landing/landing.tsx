import styles from './landing.module.scss';

/* eslint-disable-next-line */
export interface LandingProps {}

export function Landing(props: LandingProps) {
  return (
    <div className={styles['container']}>
      <h1>Landing page</h1>
    </div>
  );
}

export default Landing;
