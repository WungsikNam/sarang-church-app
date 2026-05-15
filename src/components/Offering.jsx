import { useState } from 'react';
import { getData } from '../data/store';

const Offering = () => {
  const accounts = getData('accounts');
  const [copied, setCopied] = useState(null);

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => alert('복사에 실패했습니다. 직접 입력해 주세요.'));
  };

  return (
    <div className="page">
      <div className="page-body">
        {accounts.map((a, i) => (
          <div key={a.id ?? i} className="offering-hero">
            <div className="offering-label">헌금 계좌</div>
            <div className="offering-title">{a.label}</div>
            <div className="offering-account">
              <span className="account-num">{a.bank} {a.number}</span>
              <button className="copy-btn" onClick={() => copy(`${a.bank} ${a.number}`, i)}>
                {copied === i ? '복사됨 ✓' : '복사'}
              </button>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <div className="card" style={{ textAlign: 'center', color: 'var(--text-hint)', padding: '40px 20px' }}>
            등록된 계좌가 없습니다.
          </div>
        )}

        <div className="card" style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.8' }}>
          <p style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '6px' }}>
            <i className="fas fa-info-circle" style={{ color: 'var(--primary)', marginRight: '6px' }} />
            헌금 안내
          </p>
          <p>헌금 시 예금주명 뒤에 성함을 함께 기재해 주시면 감사하겠습니다.</p>
          <p style={{ marginTop: '6px' }}>문의: 032-651-1691</p>
        </div>
      </div>
    </div>
  );
};

export default Offering;
