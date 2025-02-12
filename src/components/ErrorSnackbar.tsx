import { useEffect } from 'react';
import { setError } from '../features/gitSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

type SnackbarProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration: number;
};

export const ErrorSnackbar = ({
  type = 'error',
  duration = 300,
}: SnackbarProps) => {
  const { error } = useSelector((state: RootState) => state.repos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      dispatch(setError({ error: null }));
    }, duration);

    return () => clearTimeout(timer);
  }, [error, duration]);

  if (!error) return null;

  const handleClose = () => {
    dispatch(setError({ error: null }));
  };

  return (
    <div className={`snackbar ${type}`} role='alert'>
      {error}
      <button onClick={handleClose} className='error-close-btn'>
        ✖
      </button>
    </div>
  );
};
