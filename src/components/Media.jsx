const Media = () => (
  <div className="page">
    <div className="page-body">
      <a
        href="https://youtube.com/channel/UCdKQePmQrykA5tQhCpiiwAw?si=ZQ3QMzAvS-bvbDky"
        target="_blank"
        rel="noopener noreferrer"
        className="media-yt-btn"
      >
        <span className="yt-icon-wrap">
          <i className="fab fa-youtube" />
        </span>
        <span className="yt-text">
          <span className="yt-label">유튜브 채널 바로가기</span>
          <span className="yt-sub">설교 · 찬양 다시보기</span>
        </span>
        <i className="fas fa-external-link-alt yt-arrow" />
      </a>

      <div className="card" style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.7' }}>
        <i className="fas fa-info-circle" style={{ color: 'var(--primary)', marginRight: '6px' }} />
        유튜브 채널에서 주일 예배, 특별 집회, 찬양 영상을 시청하실 수 있습니다.
      </div>
    </div>
  </div>
);

export default Media;
