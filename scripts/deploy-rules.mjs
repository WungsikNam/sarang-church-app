import { GoogleAuth } from 'google-auth-library';
import { readFileSync } from 'fs';

const PROJECT_ID = 'sarangchurch';
const KEY_FILE = '/Users/paulnam7hanmail.net/Downloads/sarangchurch-firebase-adminsdk-fbsvc-be7717815f.json';

const RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cms/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}`;

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/firebase', 'https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

async function deployRules() {
  const token = await getAccessToken();
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // 1. 룰셋 생성
  const createRes = await fetch(
    `https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/rulesets`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source: {
          files: [{ name: 'firestore.rules', content: RULES }],
        },
      }),
    }
  );

  const created = await createRes.json();
  if (!createRes.ok) throw new Error(`룰셋 생성 실패: ${JSON.stringify(created)}`);
  const rulesetName = created.name;
  console.log('✓ 룰셋 생성:', rulesetName);

  // 2. 릴리스 적용 (없으면 생성, 있으면 업데이트)
  const releaseName = `projects/${PROJECT_ID}/releases/cloud.firestore`;

  // 먼저 기존 릴리스 확인
  const getRes = await fetch(
    `https://firebaserules.googleapis.com/v1/${releaseName}`,
    { headers }
  );

  let releaseRes;
  if (getRes.ok) {
    // 기존 릴리스 업데이트
    releaseRes = await fetch(
      `https://firebaserules.googleapis.com/v1/${releaseName}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ release: { name: releaseName, rulesetName } }),
      }
    );
  } else {
    // 새 릴리스 생성
    releaseRes = await fetch(
      `https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/releases`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: releaseName, rulesetName }),
      }
    );
  }

  const released = await releaseRes.json();
  if (!releaseRes.ok) throw new Error(`릴리스 실패: ${JSON.stringify(released)}`);
  console.log('✓ Firestore 보안 규칙 배포 완료!');
}

deployRules().catch(e => { console.error('오류:', e.message); process.exit(1); });
