import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const CardsBlock = () => {
  const { repos, status } = useSelector((state: RootState) => state.repos);
  return (
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
          <p>📅 Обновлено: {new Date(r.updated_at).toLocaleDateString('ru')}</p>
        </div>
      ))}
    </div>
  );
};
