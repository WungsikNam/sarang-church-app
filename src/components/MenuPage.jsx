const items = [
  { id: 'service',      icon: 'fas fa-calendar-alt',   label: '예배안내',   desc: '예배 시간표' },
  { id: 'info',         icon: 'fas fa-church',          label: '교회안내',   desc: '인사말 · 조직도' },
  { id: 'congregation', icon: 'fas fa-users',           label: '신도회',     desc: '신도회 소개' },
  { id: 'location',     icon: 'fas fa-map-marker-alt',  label: '오시는 길',  desc: '찾아오는 방법' },
];

const MenuPage = ({ navigateTo }) => (
  <div className="page">
    <div className="page-body">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'left',
              width: '100%',
              transition: 'transform 0.15s',
            }}
            onPointerDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onPointerUp={e => e.currentTarget.style.transform = ''}
            onPointerLeave={e => e.currentTarget.style.transform = ''}
          >
            <span style={{
              width: '44px', height: '44px',
              borderRadius: '12px',
              background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', color: 'var(--primary)',
              flexShrink: 0,
            }}>
              <i className={item.icon} />
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)', marginBottom: '2px' }}>
                {item.label}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-hint)' }}>
                {item.desc}
              </span>
            </span>
            <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem', color: 'var(--text-hint)' }} />
          </button>
        ))}
      </div>

      <button
        onClick={() => navigateTo('admin')}
        style={{
          marginTop: '8px',
          background: 'transparent',
          border: '1px dashed var(--border)',
          borderRadius: 'var(--r)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          width: '100%',
          color: 'var(--text-hint)',
        }}
      >
        <i className="fas fa-cog" style={{ fontSize: '0.9rem' }} />
        <span style={{ fontSize: '0.82rem' }}>관리자 페이지</span>
      </button>
    </div>
  </div>
);

export default MenuPage;
