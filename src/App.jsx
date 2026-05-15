import { useState, useEffect, Suspense, lazy } from 'react';
import { StoreProvider, useStore } from './data/StoreContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

const Home         = lazy(() => import('./components/Home'));
const Announcements= lazy(() => import('./components/Announcements'));
const Bulletin     = lazy(() => import('./components/Bulletin'));
const ChurchInfo   = lazy(() => import('./components/ChurchInfo'));
const ServiceInfo  = lazy(() => import('./components/ServiceInfo'));
const Media        = lazy(() => import('./components/Media'));
const Location     = lazy(() => import('./components/Location'));
const Offering     = lazy(() => import('./components/Offering'));
const Congregation = lazy(() => import('./components/Congregation'));
const Admin        = lazy(() => import('./components/Admin'));
const MenuPage     = lazy(() => import('./components/MenuPage'));

const Spinner = () => (
  <div style={{
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '40vh', color: 'var(--text-hint)', fontSize: '0.85rem',
  }}>
    <i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px' }} />
    불러오는 중...
  </div>
);

function AppInner() {
  const { loading } = useStore();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId) => {
    window.location.hash = pageId;
    setCurrentPage(pageId);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '14px',
        background: '#FAF7F4',
      }}>
        <img src="/logo.svg" alt="로고"
          style={{ width: '52px', height: '52px', opacity: 0.75 }}
          onError={e => { e.target.style.display = 'none'; }} />
        <p style={{ fontSize: '0.82rem', color: '#B09880' }}>잠시만 기다려 주세요...</p>
      </div>
    );
  }

  const isAdmin = currentPage === 'admin';

  const renderPage = () => {
    switch (currentPage) {
      case 'home':          return <Home navigateTo={navigateTo} />;
      case 'announcements': return <Announcements />;
      case 'bulletin':      return <Bulletin />;
      case 'info':          return <ChurchInfo />;
      case 'service':       return <ServiceInfo />;
      case 'media':         return <Media />;
      case 'location':      return <Location />;
      case 'offering':      return <Offering />;
      case 'congregation':  return <Congregation />;
      case 'menu':          return <MenuPage navigateTo={navigateTo} />;
      case 'admin':         return <Admin navigateTo={navigateTo} />;
      default:              return <Home navigateTo={navigateTo} />;
    }
  };

  if (isAdmin) {
    return (
      <main style={{ flex: 1 }}>
        <Suspense fallback={<Spinner />}>{renderPage()}</Suspense>
      </main>
    );
  }

  return (
    <>
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main>
        <Suspense fallback={<Spinner />}>{renderPage()}</Suspense>
      </main>
      <footer style={{
        padding: '20px 20px 8px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        background: 'var(--white)',
        marginBottom: 'var(--nav-h)',
      }}>
        <img src="/logo.svg" alt="로고"
          style={{ width: '32px', height: '32px', objectFit: 'contain', marginBottom: '8px', opacity: 0.6 }}
          onError={e => { e.target.style.display = 'none'; }} />
        <p style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text)', marginBottom: '4px' }}>
          한국기독교장로회 사랑의교회
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '2px' }}>담임목사 김윤범</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-hint)', marginBottom: '2px' }}>경기 부천시 원미구 장말로187번길 30</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-hint)', marginBottom: '12px' }}>032-651-1691</p>
        <p style={{ fontSize: '0.68rem', color: 'var(--text-hint)', opacity: 0.5 }}>© 2026 사랑의교회. All rights reserved.</p>
      </footer>
      <BottomNav current={currentPage} navigateTo={navigateTo} />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
