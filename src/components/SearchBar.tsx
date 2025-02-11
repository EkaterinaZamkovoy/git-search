import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { resetState, setUserName } from '../features/gitSlice';

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userName } = useSelector((state: RootState) => state.repos);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserName(e.target.value));
  };

  const handleClear = () => {
    dispatch(resetState());
  };
  return (
    <div className='search-bar-wrapper'>
      <input
        type='text'
        value={userName}
        onChange={handleInputChange}
        placeholder='Введите имя пользователя GitHub...'
        className='search-bar'
      />
      <button onClick={handleClear} className='clear-btn'>
        ✖
      </button>
    </div>
  );
};
