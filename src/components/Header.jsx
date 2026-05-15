const PAGE_TITLES = {
  home:          '사랑의 교회',
  announcements: '공지사항',
  bulletin:      '온라인 주보',
  info:          '교회안내',
  service:       '예배안내',
  media:         '미디어',
  location:      '오시는 길',
  offering:      '온라인 헌금',
  congregation:  '신도회',
  menu:          '더보기',
};

const NAV_PAGES = new Set(['home', 'announcements', 'bulletin', 'media', 'menu']);

const Header = ({ currentPage, navigateTo }) => {
  const isHome = currentPage === 'home';
  const isTopLevel = NAV_PAGES.has(currentPage);

  return (
    <header className="app-header">
      <div style={{ width: '40px' }}>
        {!isHome && (
          <div
            className="header-back"
            onClick={() => navigateTo(isTopLevel ? 'home' : 'menu')}
          >
            <i className="fas fa-chevron-left" />
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {isHome ? (
          <div className="header-logo-wrap" onClick={() => navigateTo('home')}>
            <img src="/logo.svg" alt="한기장 로고" onError={e => { e.target.style.display = 'none'; }} />
            <span className="header-brand">
              사랑의교회
              <span className="header-brand-sub">한국기독교장로회</span>
            </span>
          </div>
        ) : (
          <span className="header-title">{PAGE_TITLES[currentPage] || ''}</span>
        )}
      </div>

      <div style={{ width: '40px' }} />
    </header>
  );
};

export default Header;
