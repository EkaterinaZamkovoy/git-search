import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from './api/githubApi';
import { AppDispatch, RootState } from './store/store';
import { SearchBar } from './components/SearchBar';
import { CardsBlock } from './components/CardsBlock';
import { ErrorSnackbar } from './components/ErrorSnackbar';
import githubIcon from './assets/icons8-github.svg';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, page, hasMore, status } = useSelector(
    (state: RootState) => state.repos
  );

  useEffect(() => {
    if (userName.trim().length > 2 && hasMore && status !== 'loading') {
      const timer = setTimeout(() => {
        dispatch(fetchRepos({ username: userName, page }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [userName, page]);

  return (
    <div className='main-wrapper'>
      <div className='main-title'>
        <img src={githubIcon} alt='GitHub Icon' width='50' height='50' />
        <h1>GitHub Репозитории</h1>
      </div>
      <SearchBar />
      <CardsBlock />
      <ErrorSnackbar message='Error' duration={6000} />
    </div>
  );
}

export default App;
