import { useStore } from '../data/StoreContext';

const Bulletin = () => {
  const { store } = useStore();
  const { title, url } = store.bulletin;

  return (
    <div className="page">
      <div className="page-body">
        <div className="bulletin-card">
          <div className="bulletin-icon"><i className="fas fa-file-pdf" /></div>
          <div className="bulletin-title">{title}</div>
          <div className="bulletin-sub">이번 주 주보를 확인하세요</div>
          <a href={url} target="_blank" rel="noreferrer" className="bulletin-btn">
            <i className="fas fa-download" />
            주보 보기 / 다운로드
          </a>
        </div>
        <div className="card" style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.7' }}>
          <i className="fas fa-info-circle" style={{ color: 'var(--primary)', marginRight: '6px' }} />
          PDF 파일이 열리지 않을 경우 브라우저의 PDF 뷰어 또는 외부 앱을 이용해 주세요.
        </div>
      </div>
    </div>
  );
};

export default Bulletin;
