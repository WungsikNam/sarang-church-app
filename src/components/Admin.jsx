import { useState } from 'react';
import { useStore } from '../data/StoreContext';
import { uploadPhoto } from '../firebase';

const ADMIN_ID = 'admin';
const ADMIN_PW = 'admin';

// ── 공지사항 ───────────────────────────────────────────────
function AnnouncementsTab({ data, onChange }) {
  const empty = { date: '', title: '', content: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!form.title.trim()) return alert('제목을 입력해주세요.');
    if (editId !== null) {
      onChange(data.map(a => a.id === editId ? { ...a, ...form } : a));
      setEditId(null);
    } else {
      onChange([{ ...form, id: Date.now() }, ...data]);
    }
    setForm(empty);
  };

  const startEdit = (item) => {
    setForm({ date: item.date, title: item.title, content: item.content });
    setEditId(item.id);
  };

  const cancel = () => { setForm(empty); setEditId(null); };

  const remove = (id) => {
    if (!confirm('삭제할까요?')) return;
    onChange(data.filter(a => a.id !== id));
  };

  return (
    <div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>{editId ? '공지사항 수정' : '새 공지사항 등록'}</h3>
        <div style={s.row}>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
            style={{ ...s.input, width: '160px', flexShrink: 0 }} />
          <input placeholder="제목" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ ...s.input, flex: 1 }} />
        </div>
        <textarea placeholder="내용 (선택)" value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={s.textarea} rows={3} />
        <div style={s.row}>
          <button onClick={save} style={s.btnPrimary}>{editId ? '수정 저장' : '등록'}</button>
          {editId && <button onClick={cancel} style={s.btnGhost}>취소</button>}
        </div>
      </div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>목록 ({data.length}건)</h3>
        {data.length === 0 && <p style={s.empty}>등록된 공지사항이 없습니다.</p>}
        {data.map(item => (
          <div key={item.id} style={s.listItem}>
            <div style={s.row}>
              {item.date && <span style={s.badge}>{item.date.replace(/-/g, '.')}</span>}
              <strong style={{ flex: 1, fontSize: '0.92rem' }}>{item.title}</strong>
            </div>
            {item.content && <p style={s.listContent}>{item.content}</p>}
            <div style={{ ...s.row, marginTop: '8px' }}>
              <button onClick={() => startEdit(item)} style={s.btnSmall}>수정</button>
              <button onClick={() => remove(item.id)} style={s.btnDanger}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 주보 ──────────────────────────────────────────────────
function BulletinTab({ data, onChange }) {
  const [form, setForm] = useState(data);
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!form.url.trim()) return alert('주보 URL을 입력해주세요.');
    onChange(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={s.card}>
      <h3 style={s.cardTitle}>주보 설정</h3>
      <label style={s.label}>주보 제목</label>
      <input placeholder="예: 2026년 5월 15일 주보" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} style={s.input} />
      <label style={s.label}>주보 PDF URL</label>
      <input placeholder="/bulletin.pdf 또는 외부 링크" value={form.url}
        onChange={e => setForm({ ...form, url: e.target.value })} style={s.input} />
      <p style={s.hint}>PDF를 public/ 폴더에 넣으면 /파일명.pdf로 사용 가능합니다.</p>
      <button onClick={save} style={s.btnPrimary}>{saved ? '저장됨 ✓' : '저장'}</button>
    </div>
  );
}

// ── 예배안내 ──────────────────────────────────────────────
function ServicesTab({ data, onChange }) {
  const [rows, setRows] = useState(data);
  const [saved, setSaved] = useState(false);

  const update = (id, field, value) =>
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));

  const add = () =>
    setRows([...rows, { id: Date.now(), name: '', time: '00:00', place: '본당' }]);

  const remove = (id) => {
    if (!confirm('삭제할까요?')) return;
    setRows(rows.filter(r => r.id !== id));
  };

  const save = () => {
    onChange(rows);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={s.card}>
      <h3 style={s.cardTitle}>예배 시간표</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>예배명</th>
              <th style={s.th}>시간</th>
              <th style={s.th}>장소</th>
              <th style={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td style={s.td}><input value={row.name} onChange={e => update(row.id, 'name', e.target.value)} style={s.tableInput} placeholder="예배명" /></td>
                <td style={s.td}><input type="time" value={row.time} onChange={e => update(row.id, 'time', e.target.value)} style={s.tableInput} /></td>
                <td style={s.td}><input value={row.place} onChange={e => update(row.id, 'place', e.target.value)} style={s.tableInput} placeholder="장소" /></td>
                <td style={s.td}><button onClick={() => remove(row.id)} style={s.btnDanger}>삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ ...s.row, marginTop: '12px' }}>
        <button onClick={add} style={s.btnGhost}>+ 예배 추가</button>
        <button onClick={save} style={s.btnPrimary}>{saved ? '저장됨 ✓' : '저장'}</button>
      </div>
    </div>
  );
}

// ── 신도회 ────────────────────────────────────────────────
function CongregationTab({ data, onChange }) {
  const empty = { name: '', leader: '', description: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!form.name.trim()) return alert('신도회 이름을 입력해주세요.');
    if (editId !== null) {
      onChange(data.map(c => c.id === editId ? { ...c, ...form } : c));
      setEditId(null);
    } else {
      onChange([...data, { ...form, id: Date.now() }]);
    }
    setForm(empty);
  };

  const startEdit = (item) => {
    setForm({ name: item.name, leader: item.leader, description: item.description });
    setEditId(item.id);
  };

  const cancel = () => { setForm(empty); setEditId(null); };

  const remove = (id) => {
    if (!confirm('삭제할까요?')) return;
    onChange(data.filter(c => c.id !== id));
  };

  return (
    <div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>{editId ? '신도회 수정' : '신도회 추가'}</h3>
        <input placeholder="신도회명 (예: 청년부)" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} style={s.input} />
        <input placeholder="담당자 (예: 홍길동 권사)" value={form.leader}
          onChange={e => setForm({ ...form, leader: e.target.value })} style={s.input} />
        <textarea placeholder="소개글" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={s.textarea} rows={3} />
        <div style={s.row}>
          <button onClick={save} style={s.btnPrimary}>{editId ? '수정 저장' : '추가'}</button>
          {editId && <button onClick={cancel} style={s.btnGhost}>취소</button>}
        </div>
      </div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>목록 ({data.length}개)</h3>
        {data.length === 0 && <p style={s.empty}>등록된 신도회가 없습니다.</p>}
        {data.map(item => (
          <div key={item.id} style={s.listItem}>
            <div style={s.row}>
              <strong style={{ flex: 1, fontSize: '0.92rem' }}>{item.name}</strong>
              {item.leader && <span style={s.badge}>{item.leader}</span>}
            </div>
            {item.description && <p style={s.listContent}>{item.description}</p>}
            <div style={{ ...s.row, marginTop: '8px' }}>
              <button onClick={() => startEdit(item)} style={s.btnSmall}>수정</button>
              <button onClick={() => remove(item.id)} style={s.btnDanger}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 홈 설정 (히어로 문구) ──────────────────────────────────
function HeroTab({ data, onChange }) {
  const [form, setForm] = useState(data);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onChange(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={s.card}>
      <h3 style={s.cardTitle}>메인 화면 문구</h3>
      <label style={s.label}>메인 제목</label>
      <input placeholder="예: 함께 지어져 가는 교회" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} style={s.input} />
      <label style={s.label}>서브 문구</label>
      <input placeholder="예: 한국기독교장로회 사랑의교회에 오신 것을 환영합니다"
        value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} style={s.input} />
      <button onClick={save} style={s.btnPrimary}>{saved ? '저장됨 ✓' : '저장'}</button>
    </div>
  );
}

// ── 인사말 & 이력 ─────────────────────────────────────────
function GreetingTab({ data, onChange }) {
  const [form, setForm] = useState(data);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const save = () => {
    onChange(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadPhoto(file, 'pastor/profile.jpg');
      setForm(prev => ({ ...prev, photoUrl: url }));
    } catch (err) {
      alert('사진 업로드 실패: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>담임목사 사진</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '14px',
            background: '#f0f0f0', overflow: 'hidden', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {form.photoUrl
              ? <img src={form.photoUrl} alt="목사님" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <i className="fas fa-user" style={{ fontSize: '2rem', color: '#ccc' }} />
            }
          </div>
          <div>
            <label style={{
              display: 'inline-block', background: '#8B5A2B', color: '#fff',
              padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: '600',
            }}>
              {uploading ? '업로드 중...' : '사진 선택'}
              <input type="file" accept="image/*" onChange={handlePhoto}
                style={{ display: 'none' }} disabled={uploading} />
            </label>
            <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '6px' }}>
              JPG, PNG 권장
            </p>
          </div>
        </div>
      </div>

      <div style={s.card}>
        <h3 style={s.cardTitle}>목사 이력</h3>
        <textarea
          placeholder={'예:\n○○대학교 신학과 졸업\n○○신학대학원 졸업\n○○교회 부목사\n사랑의교회 담임목사 부임'}
          value={form.history ?? ''}
          onChange={e => setForm({ ...form, history: e.target.value })}
          style={s.textarea} rows={6} />
        <h3 style={{ ...s.cardTitle, marginTop: '8px' }}>담임목사 인사말</h3>
        <textarea
          placeholder="인사말을 입력해주세요."
          value={form.text}
          onChange={e => setForm({ ...form, text: e.target.value })}
          style={s.textarea} rows={6} />
        <button onClick={save} style={s.btnPrimary}>{saved ? '저장됨 ✓' : '저장'}</button>
      </div>
    </div>
  );
}

// ── 헌금 계좌 ─────────────────────────────────────────────
function AccountsTab({ data, onChange }) {
  const empty = { label: '', bank: '', number: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!form.label.trim() || !form.number.trim()) return alert('항목명과 계좌번호를 입력해주세요.');
    if (editId !== null) {
      onChange(data.map(a => a.id === editId ? { ...a, ...form } : a));
      setEditId(null);
    } else {
      onChange([...data, { ...form, id: Date.now() }]);
    }
    setForm(empty);
  };

  const startEdit = (item) => {
    setForm({ label: item.label, bank: item.bank, number: item.number });
    setEditId(item.id);
  };

  const cancel = () => { setForm(empty); setEditId(null); };

  const remove = (id) => {
    if (!confirm('삭제할까요?')) return;
    onChange(data.filter(a => a.id !== id));
  };

  return (
    <div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>{editId ? '계좌 수정' : '계좌 추가'}</h3>
        <input placeholder="항목명 (예: 십일조·감사헌금)" value={form.label}
          onChange={e => setForm({ ...form, label: e.target.value })} style={s.input} />
        <input placeholder="은행명 (예: 국민은행)" value={form.bank}
          onChange={e => setForm({ ...form, bank: e.target.value })} style={s.input} />
        <input placeholder="계좌번호 (예: 111-11-111111)" value={form.number}
          onChange={e => setForm({ ...form, number: e.target.value })} style={s.input} />
        <div style={s.row}>
          <button onClick={save} style={s.btnPrimary}>{editId ? '수정 저장' : '추가'}</button>
          {editId && <button onClick={cancel} style={s.btnGhost}>취소</button>}
        </div>
      </div>
      <div style={s.card}>
        <h3 style={s.cardTitle}>계좌 목록 ({data.length}개)</h3>
        {data.length === 0 && <p style={s.empty}>등록된 계좌가 없습니다.</p>}
        {data.map(item => (
          <div key={item.id} style={s.listItem}>
            <div style={s.row}>
              <strong style={{ flex: 1, fontSize: '0.92rem' }}>{item.label}</strong>
            </div>
            <p style={s.listContent}>{item.bank} {item.number}</p>
            <div style={{ ...s.row, marginTop: '8px' }}>
              <button onClick={() => startEdit(item)} style={s.btnSmall}>수정</button>
              <button onClick={() => remove(item.id)} style={s.btnDanger}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 메인 Admin ────────────────────────────────────────────
export default function Admin({ navigateTo }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState('announcements');

  const { store, update: storeUpdate } = useStore();
  const announcements = store.announcements;
  const bulletin      = store.bulletin;
  const services      = store.services;
  const congregation  = store.congregation;
  const hero          = store.hero;
  const greeting      = store.greeting;

  const login = () => {
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      sessionStorage.setItem('admin_auth', '1');
      setAuthed(true);
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
      setPw('');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
    setId(''); setPw('');
  };

  const update = (key) => (value) => storeUpdate(key, value);

  const tabs = [
    { key: 'announcements', label: '공지사항' },
    { key: 'bulletin',      label: '주보' },
    { key: 'services',      label: '예배안내' },
    { key: 'congregation',  label: '신도회' },
    { key: 'hero',          label: '메인문구' },
    { key: 'greeting',      label: '인사말' },
  ];

  if (!authed) {
    return (
      <div style={s.loginWrap}>
        <div style={s.loginBox}>
          <div style={s.loginLogoWrap}>
            <img src="/logo.svg" alt="로고" style={s.loginLogo}
              onError={e => { e.target.style.display = 'none'; }} />
          </div>
          <h2 style={s.loginTitle}>관리자 로그인</h2>
          <p style={s.loginSub}>사랑의교회 CMS</p>
          <input
            placeholder="아이디"
            value={id}
            onChange={e => setId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ ...s.input, marginBottom: '8px' }}
            autoFocus
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ ...s.input, marginBottom: '16px' }}
          />
          <button onClick={login} style={{ ...s.btnPrimary, width: '100%', padding: '13px' }}>
            로그인
          </button>
          <button onClick={() => navigateTo('home')}
            style={{ ...s.btnGhost, width: '100%', marginTop: '10px', padding: '11px' }}>
            ← 메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <button onClick={() => navigateTo('home')} style={s.backBtn}>← 메인</button>
        <span style={s.headerTitle}>CMS 관리자</span>
        <button onClick={logout} style={s.logoutBtn}>로그아웃</button>
      </div>

      <div style={s.tabBar}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={tab === t.key ? s.tabActive : s.tab}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.content}>
        {tab === 'announcements' && <AnnouncementsTab data={announcements} onChange={update('announcements')} />}
        {tab === 'bulletin'      && <BulletinTab      data={bulletin}      onChange={update('bulletin')} />}
        {tab === 'services'      && <ServicesTab      data={services}      onChange={update('services')} />}
        {tab === 'congregation'  && <CongregationTab  data={congregation}  onChange={update('congregation')} />}
        {tab === 'hero'          && <HeroTab          data={hero}          onChange={update('hero')} />}
        {tab === 'greeting'      && <GreetingTab      data={greeting}      onChange={update('greeting')} />}
      </div>
    </div>
  );
}

// ── 스타일 ────────────────────────────────────────────────
const s = {
  loginWrap: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#f5f0ea', padding: '20px',
  },
  loginBox: {
    background: '#fff', borderRadius: '16px', padding: '36px 28px',
    width: '100%', maxWidth: '380px',
    boxShadow: '0 8px 40px rgba(93,64,55,0.14)',
  },
  loginLogoWrap: { textAlign: 'center', marginBottom: '16px' },
  loginLogo: { width: '56px', height: '56px', objectFit: 'contain' },
  loginTitle: {
    fontSize: '1.25rem', fontWeight: '700', color: '#2C1A0E',
    textAlign: 'center', marginBottom: '4px',
  },
  loginSub: {
    fontSize: '0.82rem', color: '#aaa', textAlign: 'center', marginBottom: '28px',
  },
  wrap: { minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' },
  header: {
    background: '#3E2723', color: '#fff', padding: '12px 16px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100,
  },
  headerTitle: { fontWeight: '600', fontSize: '1rem' },
  backBtn: {
    background: 'transparent', border: 'none',
    color: '#D2B48C', cursor: 'pointer', fontSize: '0.85rem', padding: '4px 8px',
  },
  logoutBtn: {
    background: 'transparent', border: '1px solid rgba(255,255,255,0.35)',
    color: '#fff', borderRadius: '6px', padding: '4px 12px',
    cursor: 'pointer', fontSize: '0.8rem',
  },
  tabBar: {
    display: 'flex', background: '#fff',
    borderBottom: '1px solid #e0e0e0', overflowX: 'auto',
  },
  tab: {
    flex: '0 0 auto', padding: '12px 16px', background: 'none', border: 'none',
    borderBottom: '2px solid transparent', cursor: 'pointer',
    fontSize: '0.85rem', color: '#777', whiteSpace: 'nowrap',
  },
  tabActive: {
    flex: '0 0 auto', padding: '12px 16px', background: 'none', border: 'none',
    borderBottom: '2px solid #8B5A2B', cursor: 'pointer',
    fontSize: '0.85rem', color: '#8B5A2B', fontWeight: '700', whiteSpace: 'nowrap',
  },
  content: { flex: 1, padding: '16px', overflowY: 'auto' },
  card: {
    background: '#fff', borderRadius: '12px', padding: '18px',
    marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardTitle: { fontSize: '0.95rem', fontWeight: '700', color: '#3E2723', marginBottom: '14px' },
  label: { display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px', marginTop: '10px' },
  input: {
    width: '100%', padding: '11px 13px', border: '1px solid #e0e0e0',
    borderRadius: '8px', fontSize: '0.92rem', outline: 'none',
    marginBottom: '8px', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', padding: '11px 13px', border: '1px solid #e0e0e0',
    borderRadius: '8px', fontSize: '0.92rem', outline: 'none',
    marginBottom: '8px', resize: 'vertical', fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  row: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#8B5A2B', color: '#fff', border: 'none', borderRadius: '8px',
    padding: '10px 22px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: '700',
  },
  btnGhost: {
    background: 'transparent', color: '#8B5A2B', border: '1px solid #8B5A2B',
    borderRadius: '8px', padding: '10px 20px', fontSize: '0.9rem', cursor: 'pointer',
  },
  btnSmall: {
    background: '#f5f5f5', color: '#555', border: '1px solid #ddd',
    borderRadius: '6px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer',
  },
  btnDanger: {
    background: '#fff0f0', color: '#c0392b', border: '1px solid #f5c6c6',
    borderRadius: '6px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer',
  },
  hint: { fontSize: '0.78rem', color: '#aaa', marginBottom: '12px', lineHeight: '1.5' },
  empty: { color: '#bbb', fontSize: '0.85rem', textAlign: 'center', padding: '20px 0' },
  listItem: { padding: '12px 0', borderBottom: '1px solid #f0f0f0' },
  listContent: { fontSize: '0.83rem', color: '#666', marginTop: '4px', lineHeight: '1.5' },
  badge: {
    background: '#f5f0ea', color: '#8B5A2B', borderRadius: '4px',
    padding: '2px 8px', fontSize: '0.75rem', fontWeight: '600', whiteSpace: 'nowrap',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' },
  th: {
    background: '#f9f9f9', padding: '8px 6px', textAlign: 'left',
    fontWeight: '600', color: '#555', borderBottom: '1px solid #e0e0e0', whiteSpace: 'nowrap',
  },
  td: { padding: '6px 4px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' },
  tableInput: {
    width: '100%', padding: '6px 8px', border: '1px solid #e0e0e0',
    borderRadius: '6px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box',
  },
};
