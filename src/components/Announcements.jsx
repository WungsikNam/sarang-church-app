import { useStore } from '../data/StoreContext';

const Announcements = () => {
  const { store } = useStore();
  const list = store.announcements ?? [];
  const formatDate = (raw) => raw ? raw.replace(/-/g, '.') : '';

  return (
    <div className="page">
      <div className="page-body">
        <a
          href="https://youtube.com/channel/UCdKQePmQrykA5tQhCpiiwAw?si=ZQ3QMzAvS-bvbDky"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: '#FF0000', borderRadius: 'var(--r)',
            padding: '14px 16px', textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(255,0,0,0.25)',
          }}
        >
          <i className="fab fa-youtube" style={{ fontSize: '1.6rem', color: '#fff', flexShrink: 0 }} />
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: '0.92rem', fontWeight: '700', color: '#fff' }}>
              사랑의교회 유튜브 바로가기
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
              설교 · 찬양 영상 보러가기
            </span>
          </span>
          <i className="fas fa-external-link-alt" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }} />
        </a>

        {list.length === 0 ? (
          <div className="announce-empty">
            <i className="fas fa-bell-slash" />
            등록된 공지사항이 없습니다.
          </div>
        ) : (
          <div className="announce-list">
            {list.map(item => (
              <div key={item.id} className="announce-card">
                {item.date && <span className="announce-date">{formatDate(item.date)}</span>}
                <div className="announce-title">{item.title}</div>
                {item.content && <div className="announce-body">{item.content}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
