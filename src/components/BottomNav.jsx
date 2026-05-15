const tabs = [
  { id: 'home',  icon: 'fas fa-home',       label: '홈' },
  { id: 'media', icon: 'fas fa-play-circle', label: '미디어' },
  { id: 'menu',  icon: 'fas fa-th',          label: '더보기' },
];

const BottomNav = ({ current, navigateTo }) => (
  <nav className="bottom-nav">
    {tabs.map(t => (
      <button
        key={t.id}
        className={`nav-item${current === t.id ? ' active' : ''}`}
        onClick={() => navigateTo(t.id)}
      >
        <i className={`nav-icon ${t.icon}`} />
        <span className="nav-label">{t.label}</span>
        <span className="nav-dot" />
      </button>
    ))}
  </nav>
);

export default BottomNav;
