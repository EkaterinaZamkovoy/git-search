import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from './api/githubApi';
import { AppDispatch, RootState } from './store/store';
import { SearchBar } from './components/SearchBar';
import { CardsBlock } from './components/Card';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, page } = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userName.trim().length > 2) {
        dispatch(fetchRepos({ username: userName, page }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [userName, page]);

  return (
    <div className='main-wrapper'>
      <div className='main-title'>
        <img
          src='/public/icons8-github.svg'
          alt='GitHub Icon'
          width='50'
          height='50'
        />
        <h1>GitHub Репозитории</h1>
      </div>
      <SearchBar />
      <CardsBlock />
    </div>
  );
}

export default App;
