import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from './api/githubApi';
import { AppDispatch, RootState } from './store/store';
import { SearchBar } from './components/SearchBar';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, page, repos } = useSelector(
    (state: RootState) => state.repos
  );

  useEffect(() => {
    if (userName) {
      dispatch(fetchRepos({ username: userName, page }));
    }
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
      {repos.map(r => (
        <div key={r.id}>
          <h3>
            <a href={r.html_url} target='_blank' rel='noopener noreferrer'>
              {r.name}
            </a>
          </h3>
          <p>{r.description || 'Нет описания'}</p>
          <p>⭐ {r.stargazers_count} звезд</p>
          <p>📅 Обновлено: {new Date(r.updated_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
