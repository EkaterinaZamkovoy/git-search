import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from './api/githubApi';
import { AppDispatch, RootState } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, page, repos } = useSelector(
    (state: RootState) => state.repos
  );

  useEffect(() => {
    if (userName.length < 0) {
      dispatch(fetchRepos({ username: userName, page }));
    }
  }, [userName]);

  return (
    <>
      <h1>🔍 GitHub Репозитории</h1>
    </>
  );
}

export default App;
