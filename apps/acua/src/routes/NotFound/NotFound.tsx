import { useNavigate } from 'react-router-dom';
import styles from './notfound.module.scss';
import { Button } from '@mui/material';

/* eslint-disable-next-line */
export interface NotfoundProps {}

export function Notfound(props: NotfoundProps) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['container']}>
      <h1>Page not found!</h1>
      <Button variant="contained" color="primary" onClick={goBack}>
        Go Back
      </Button>
    </div>
  );
}

export default Notfound;
