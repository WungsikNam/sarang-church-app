import { useStore } from '../data/StoreContext';

const menuItems = [
  { id: 'announcements', icon: 'fas fa-bullhorn',       label: '공지사항' },
  { id: 'service',       icon: 'fas fa-calendar-alt',   label: '예배안내' },
  { id: 'bulletin',      icon: 'fas fa-book-open',      label: '주보' },
  { id: 'media',         icon: 'fas fa-play-circle',    label: '미디어' },
  { id: 'info',          icon: 'fas fa-church',         label: '교회안내' },
  { id: 'congregation',  icon: 'fas fa-users',          label: '신도회' },
  { id: 'location',      icon: 'fas fa-map-marker-alt', label: '오시는 길' },
];

const Home = ({ navigateTo }) => {
  const { store } = useStore();
  const recent = (store.announcements ?? []).slice(0, 3);
  const hero = store.hero;
  const formatDate = (raw) => raw ? raw.replace(/-/g, '.') : '';

  return (
    <div id="home" className="page">
      <div className="hero">
        <img src="/hero.png" alt="사랑의 교회" />
        <div className="hero-overlay">
          <h2>{hero.title}</h2>
          <p>{hero.subtitle}</p>
        </div>
      </div>

      <a
        href="https://youtube.com/channel/UCdKQePmQrykA5tQhCpiiwAw?si=ZQ3QMzAvS-bvbDky"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: '#FF0000', margin: '16px 16px 16px',
          borderRadius: 'var(--r)', padding: '13px 16px',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(255,0,0,0.3)',
        }}
      >
        <i className="fab fa-youtube" style={{ fontSize: '1.5rem', color: '#fff', flexShrink: 0 }} />
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>
            사랑의교회 유튜브 바로가기
          </span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.82)' }}>
            설교 · 찬양 영상 보러가기
          </span>
        </span>
        <i className="fas fa-chevron-right" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }} />
      </a>

      <div className="quick-grid">
        {menuItems.map(item => (
          <a key={item.id} className="quick-card" href={`#${item.id}`}
            onClick={e => { e.preventDefault(); navigateTo(item.id); }}>
            <span className="quick-icon"><i className={item.icon} /></span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <div className="home-section">
        <div className="section-header">
          <h3>최근 공지사항</h3>
          <a className="section-more" href="#announcements"
            onClick={e => { e.preventDefault(); navigateTo('announcements'); }}>
            전체보기 <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }} />
          </a>
        </div>
        <div className="notice-preview">
          {recent.length === 0 ? (
            <p className="notice-empty">등록된 공지사항이 없습니다.</p>
          ) : (
            recent.map(item => (
              <div key={item.id} className="notice-preview-item"
                onClick={() => navigateTo('announcements')}>
                <span className="notice-dot" />
                <span className="notice-preview-title">{item.title}</span>
                <span className="notice-preview-date">{formatDate(item.date)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
