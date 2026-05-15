import { useStore } from '../data/StoreContext';

const ChurchInfo = () => {
  const { store } = useStore();
  const { text, history, photoUrl } = store.greeting;

  return (
    <div className="page">

      {/* 담임목사 프로필 — 대형 사진 */}
      <div style={{ position: 'relative', background: 'var(--surface)', marginBottom: '0' }}>
        {/* 사진 영역 */}
        <div style={{
          width: '100%',
          height: '300px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dk) 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {photoUrl && (
            <img
              src={photoUrl}
              alt="담임목사"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          )}
          {/* 하단 그라디언트 오버레이 */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(30,15,5,0.75) 100%)',
          }} />
          {/* 이름 오버레이 */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '20px',
          }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginBottom: '4px' }}>
              한국기독교장로회 사랑의교회
            </p>
            <p style={{ fontSize: '1.35rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.3px' }}>
              김윤범 목사
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', marginTop: '3px' }}>
              담임목사
            </p>
          </div>
        </div>
      </div>

      <div className="page-body" style={{ paddingTop: '20px' }}>

        {/* 목사 이력 */}
        {history ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="page-section-title" style={{ marginBottom: 0 }}>목사 이력</div>
            <div className="card">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>
                {history}
              </p>
            </div>
          </div>
        ) : null}

        {/* 인사말 */}
        {text ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="page-section-title" style={{ marginBottom: 0 }}>담임목사 인사말</div>
            <div className="card" style={{
              borderLeft: '3px solid var(--primary)',
              borderRadius: '0 var(--r) var(--r) 0',
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>
                {text}
              </p>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default ChurchInfo;
