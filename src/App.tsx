import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from './api/githubApi';
import { AppDispatch, RootState } from './store/store';
import { setUserName } from './features/gitSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, page, repos } = useSelector(
    (state: RootState) => state.repos
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserName(e.target.value));
  };

  useEffect(() => {
    if (userName) {
      dispatch(fetchRepos({ username: userName, page }));
    }
  }, [userName, page]);

  return (
    <>
      <h1>🔍 GitHub Репозитории</h1>
      <input
        type='text'
        value={userName}
        onChange={handleInputChange}
        placeholder='Введите имя пользователя'
      />
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
    </>
  );
}

export default App;
