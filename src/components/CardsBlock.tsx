import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { LoadingPage } from './LoadingPage';
import { useEffect } from 'react';
import { fetchRepos } from '../api/githubApi';
import { setPage } from '../features/gitSlice';

export const CardsBlock = () => {
  const { repos, status, hasMore, userName, page } = useSelector(
    (state: RootState) => state.repos
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || status === 'loading') return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        const nextPage = page + 1;
        dispatch(setPage(nextPage));
        dispatch(fetchRepos({ username: userName, page: page + 1 }));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, status, page, userName]);

  return (
    <>
      {status === 'loading' && repos.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className='cards-wrapper'>
          {repos.map(r => (
            <div key={r.id} className='card-wrapper'>
              <h3>
                <a href={r.html_url} target='_blank' rel='noopener noreferrer'>
                  {r.name}
                </a>
              </h3>
              <p>{r.description || 'Описание отсутствует'}</p>
              <p>{r.stargazers_count} ⭐</p>
              <p>
                📅 Обновлено: {new Date(r.updated_at).toLocaleDateString('ru')}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
