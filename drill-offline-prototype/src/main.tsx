import { StrictMode, useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import materialCheckCircleIcon from '@material-design-icons/svg/outlined/check_circle.svg';
import materialWifiIcon from '@material-design-icons/svg/outlined/wifi.svg';
import materialWifiOffIcon from '@material-design-icons/svg/outlined/wifi_off.svg';
import { drillFixture, type PreparationState } from './fixtures/drill';
import './styles.css';

const asset = (name: string) => `/assets/figma/${name}`;
const DRILL_CHAPTERS = [drillFixture.topic, 'Bilangan Kompleks', 'Fungsi Kuadrat', 'Statistika Dasar'];

function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <button className="icon-button" aria-label="Open Drill test menu" onClick={() => window.dispatchEvent(new Event('drill:menu'))}><img src={asset('navbar-more.svg')} alt="" /></button>
      <img className="brand" src={asset('ruangguru-logo.svg')} alt="ruang guru" />
      <button className="account-button">Akun Saya <img src={asset('dropdown.svg')} alt="" /></button>
    </nav>
  );
}

function EntryPointNavbar() {
  return <nav className="entrypoint-navbar" aria-label="Primary navigation">
    <div className="entrypoint-brand-wrap"><button className="entrypoint-menu-toggle" type="button" aria-label="Buka navigasi"><img src={asset('navbar-more.svg')} alt="" /></button><img className="entrypoint-brand" src={asset('ruangguru-logo.svg')} alt="ruang guru" /></div>
    <button className="entrypoint-account" type="button" aria-label="Buka menu akun"><span className="entrypoint-avatar">PT</span><span>Putri Testing</span><span className="entrypoint-account-chevron" aria-hidden="true">⌄</span></button>
  </nav>;
}

function EntryPointScreen() {
  return <main className="drill-screen entrypoint-screen">
    <EntryPointNavbar />
    <div className="entrypoint-scroll">
      <section className="entrypoint-hero"><div className="entrypoint-hero-actions"><button type="button" aria-label="Kembali">‹</button><span>Selesai</span><button type="button" aria-label="Ke atas">⌃</button></div><h1>Putri Test AY 26/27 - Bahasa Indonesia</h1><div className="entrypoint-meta"><span>▣ Rabu, 02 Sep 2026</span><span>◷ 15.00 - 16.30 WIB</span><span>♧ Room 101</span></div></section>
      <div className="entrypoint-main">
        <div className="entrypoint-star-pill">Kamu bisa dapat hingga <strong>+61 ⭐</strong> di kelas ini</div>
        <div className="entrypoint-top-cards"><article className="entrypoint-mini-card entrypoint-teacher-card"><img className="entrypoint-teacher-avatar" src="/assets/entrypoint/teacher.png" alt="" /><div><small>Star Master Teacher</small><strong>fte dummy</strong></div></article><article className="entrypoint-mini-card entrypoint-today-card"><strong><span aria-hidden="true">🎯</span> Belajar Apa Hari Ini</strong><span><i>1</i> Ragam berita</span><span><i>2</i> Unsur-unsur berita</span></article></div>
        <div className="entrypoint-info-banner"><span className="entrypoint-info-icon" aria-hidden="true">i</span><span>Stars hanya diberikan jika kamu terdaftar <strong>hadir di kelas</strong></span></div>
        <section className="entrypoint-lower-panel">
          <article className="entrypoint-report"><span className="entrypoint-info-icon" aria-hidden="true">i</span><span>Nilai Akhir Rapor ditentukan <strong>Kuis dan Post-Test</strong></span></article>
          <section className="entrypoint-voting-card" aria-labelledby="voting-title"><div className="entrypoint-section-heading"><h2 id="voting-title">Hasil Voting Materi Kelas</h2><span className="entrypoint-caret" aria-hidden="true">⌃</span></div><span className="entrypoint-status-pill"><span aria-hidden="true">◷</span>Voting selesai</span><div className="entrypoint-empty-state"><span className="entrypoint-empty-icon" aria-hidden="true"><span /></span><strong>Kamu tidak ikut voting di sesi ini</strong></div><button className="entrypoint-detail-button" type="button">Lihat Detail</button></section>
          <section className="entrypoint-lesson" aria-labelledby="subtopic-title"><button className="entrypoint-subtopic-pill" type="button"><span>Subtopik</span> 1</button><div className="entrypoint-subtopic-heading"><div><h2 id="subtopic-title">Aksi Nyata Para Pelindung Bumi</h2><p>1 - Mengenali Karakteristik Berbagai Media Informasi dan Mengidentifikasi Unsur-Unsur Berita</p></div><span className="entrypoint-caret" aria-hidden="true">⌃</span></div><h3>Aktivitas dalam kelas</h3><button className="entrypoint-activity entrypoint-pdf-activity" type="button"><img className="entrypoint-activity-icon" src="/assets/entrypoint/activity-pdf.png" alt="" /><span><strong>Bank Aktivitas Aksi Nyata Para Pelindung Bumi</strong><small>Instruksi atau materi belajar dari Master Teacher</small><em>Dapatkan hingga +2</em></span><b aria-hidden="true">›</b></button><button className="entrypoint-activity entrypoint-drill-activity" type="button" onClick={() => { window.location.hash = '#summary-preview'; }}><span className="entrypoint-drill-icon" aria-hidden="true">Drill</span><span><strong>Drill Soal Matematika</strong><small>Latihan soal untuk menguji pemahamanmu</small><em>Dapatkan hingga +15</em></span><b aria-hidden="true">›</b></button><button className="entrypoint-activity" type="button"><img className="entrypoint-activity-icon" src="/assets/entrypoint/activity-quiz.png" alt="" /><span><strong>Cek Konsep 1 Aksi Nyata Para Pelindung Bumi</strong><small>Cari tahu penguasaan materimu pada kelas ini</small><em>Dapatkan hingga +15</em></span><b aria-hidden="true">›</b></button><button className="entrypoint-activity" type="button"><img className="entrypoint-activity-icon" src="/assets/entrypoint/activity-quiz.png" alt="" /><span><strong>Kuis 1 Aksi Nyata Para Pelindung Bumi</strong><small>Cari tahu penguasaan materimu pada kelas ini</small><em>Dapatkan hingga +15</em></span><b aria-hidden="true">›</b></button><button className="entrypoint-activity" type="button"><img className="entrypoint-activity-icon" src="/assets/entrypoint/activity-quiz.png" alt="" /><span><strong>Cek Konsep 2 Aksi Nyata Para Pelindung Bumi</strong><small>Cari tahu penguasaan materimu pada kelas ini</small><em>Dapatkan hingga +9</em></span><b aria-hidden="true">›</b></button><button className="entrypoint-activity" type="button"><img className="entrypoint-activity-icon" src="/assets/entrypoint/activity-quiz.png" alt="" /><span><strong>Kuis 2 Aksi Nyata Para Pelindung Bumi</strong><small>Cari tahu penguasaan materimu pada kelas ini</small><em>Dapatkan hingga +20</em></span><b aria-hidden="true">›</b></button><div className="entrypoint-referral-wrap"><h3>Rekomendasikan ke teman</h3><article className="entrypoint-referral"><p>Ajak teman jadi pintar bisa cuan jutaan rupiah</p><button type="button">Pelajari</button></article></div></section>
          <section className="entrypoint-bonus" aria-labelledby="bonus-title"><div className="entrypoint-bonus-heading"><h2 id="bonus-title">Bonus Stars yang bisa kamu dapatkan</h2><button type="button" aria-label="Tutup bonus">⌃</button></div><article><img src="/assets/entrypoint/bonus-on-time.png" alt="" /><div><strong>Datang tepat waktu</strong><p>Ikuti pembelajaran secara maksimal dengan datang tepat waktu</p><em>Dapatkan hingga <b>+5 ⭐</b></em></div></article><article><img src="/assets/entrypoint/bonus-attend.png" alt="" /><div><strong>Berpartisipasi di kelas</strong><p>Kamu bisa dapat Stars dari guru jika aktif berpartisipasi di kelas seperti menjawab pertanyaan, menyampaikan pendapat, dsb.</p></div></article><article><img src="/assets/entrypoint/bonus-rating.png" alt="" /><div><strong>Mengisi rating</strong><p>Isi rating untuk membantu Ruangguru meningkatkan kualitas belajar</p><em>Dapatkan hingga <b>+3 ⭐</b></em></div></article></section>
        </section>
      </div>
    </div>
    <aside className="entrypoint-rating-prompt" aria-label="Beri rating untuk sesi ini"><span className="entrypoint-rating-thumb" aria-hidden="true">✦</span><div><strong>Beri rating untuk sesi ini</strong><span>Putri Test AY 26/27 - Bahasa Indonesia</span><small>Dapatkan ekstra +3 ⭐</small></div><button type="button" aria-label="Tutup">×</button></aside>
  </main>;
}

function HeaderArtwork() {
  return <div className="header-art" aria-hidden="true"><img className="header-left" src={asset('header-left.svg')} alt="" /><img className="header-right" src={asset('header-right.svg')} alt="" /></div>;
}

function ExamArtwork() {
  return <span className="exam-art" aria-hidden="true"><img className="exam-art-bg" src={asset('book-pencil.svg')} alt="" /><img className="exam-art-book" src={asset('book.svg')} alt="" /><img className="exam-art-pencil" src={asset('pencil.svg')} alt="" /></span>;
}

function ActivityLoading({ title, progress = 0 }: { title: string; progress?: number }) {
  return <main className="activity-loading" aria-label={`${title}. Memuat`}>
    <div className="activity-loading-illustration" aria-hidden="true">
      <div className="activity-loading-art">
        <div className="activity-sheet activity-sheet-back" />
        <div className="activity-sheet activity-sheet-front" />
        <div className="activity-folder" />
        <i className="activity-spark activity-spark-one" /><i className="activity-spark activity-spark-two" /><i className="activity-spark activity-spark-three" />
      </div>
    </div>
    <h1>{title}</h1>
    <p className="activity-loading-copy">Soal sedang disiapkan untuk mode Offline.</p>
    <div className="activity-loading-progress" role="progressbar" aria-label="Progres persiapan soal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
    <strong className="activity-loading-percent">{progress}%</strong>
  </main>;
}

function ChecklistItem({ icon, children, status = 'pending' }: { icon: string; children: ReactNode; status?: 'pending' | 'complete' }) {
  return <div className={`checklist-item ${status === 'complete' ? 'checklist-item-complete' : ''}`}><img src={asset(icon)} alt="" /><span>{children}</span><img src={asset(status === 'complete' ? 'checklist-ready.svg' : 'checklist-success.svg')} alt="" /></div>;
}

function NetworkSwitch({ network, onChange }: { network: NetworkMode; onChange: (mode: NetworkMode) => void }) {
  return <div className="simulation-network-toggle" role="group" aria-label="Connection mode"><button type="button" className={network === 'offline' ? 'active' : ''} aria-pressed={network === 'offline'} onClick={() => onChange('offline')}><img src={materialWifiOffIcon} alt="" /> Offline</button><button type="button" className={network === 'online' ? 'active' : ''} aria-pressed={network === 'online'} onClick={() => onChange('online')}><img src={materialWifiIcon} alt="" /> Online</button></div>;
}

function PreparationCard({ state, network, progress }: { state: PreparationState; network: NetworkMode; progress: number }) {
  const downloaded = state === 'offline-guide' || state === 'ready';
  const offline = network === 'offline';
  return <section className={`prep-card prep-card-${state}`}>
    {state !== 'offline-guide' && <div className="prep-heading"><h1>{drillFixture.title}</h1></div>}
    {state !== 'offline-guide' && <div className="checklist">
      <ChecklistItem icon="test.svg" status={downloaded ? 'complete' : 'pending'}>{downloaded ? 'Soal Drill Offline siap' : 'Menyiapkan Soal Drill Offline'}</ChecklistItem>
      {state !== 'download' && <ChecklistItem icon="wifi.svg" status={offline ? 'complete' : 'pending'}>Matikan Koneksi Internet</ChecklistItem>}
    </div>}
    {state !== 'ready' && state !== 'offline-guide' && <div className="divider" />}
    {state === 'download' && <DownloadPanel />}
    {state === 'downloading' && <DownloadPanel progress={progress} />}
    {state === 'offline-guide' && <OfflineGuide network={network} />}
  </section>;
}

function DownloadPanel({ progress }: { progress?: number }) {
  return <div className="download-panel">
    <div className="download-icon"><img src={asset('download.svg')} alt="" /></div>
    {progress === undefined ? <><strong>Menyiapkan soal Drill sebelum mulai</strong><p>Soal Drill disiapkan agar kamu bisa mengerjakannya secara offline.</p></> : <><strong>Mempersiapkan konten untukmu</strong><p>Menyiapkan soal · {progress}%</p><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="download-warning"><img src={asset('warning.svg')} alt="" /><span>Jangan tutup atau reload halaman ini.<br />Tunggu persiapan selesai.</span></div></>}
  </div>;
}

type GuidePlatform = 'Android' | 'iOS' | 'Windows' | 'MacOS';
const GUIDE_STEPS: Record<GuidePlatform, { mainTitle: string; main: string[]; alternativeTitle: string; alternative: string[]; note: string }> = {
  Android: { mainTitle: 'Cara utama: Aktifkan mode terbang (Airplane Mode)', main: ['Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.', 'Ketuk ikon pesawat untuk mengaktifkan Mode pesawat / Airplane Mode.', 'Pastikan Wi-Fi dan data seluler mati agar internet benar-benar terputus.'], alternativeTitle: 'Alternatif: Matikan lewat Pengaturan', alternative: ['Buka Pengaturan → Wi-Fi, lalu matikan Wi-Fi.', 'Buka Jaringan seluler / Kartu SIM → matikan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya mati.'], note: 'Nama menu dapat berbeda sesuai merek dan versi Android.' },
  iOS: { mainTitle: 'Cara utama: Aktifkan Mode pesawat', main: ['Geser dari sudut kanan atas ke bawah untuk membuka Pusat Kontrol. Pada iPhone dengan tombol Utama, geser dari bawah ke atas.', 'Ketuk Mode pesawat. Pastikan Wi-Fi ikut mati; jika masih aktif, ketuk ikon Wi-Fi untuk mematikannya.'], alternativeTitle: 'Alternatif: Matikan lewat Pengaturan', alternative: ['Buka Pengaturan → Wi-Fi, lalu matikan Wi-Fi.', 'Buka Pengaturan → Seluler (atau Layanan Seluler), lalu matikan Data Seluler.'], note: 'Nama menu dapat berbeda menurut versi iOS.' },
  Windows: { mainTitle: 'Cara utama: Matikan Wi-Fi lewat Pengaturan', main: ['Buka Pengaturan → Jaringan & internet → Wi-Fi.', 'Matikan sakelar Wi-Fi dan pastikan statusnya menunjukkan Wi-Fi nonaktif.'], alternativeTitle: 'Alternatif: Gunakan Pengaturan cepat', alternative: ['Pilih ikon jaringan di taskbar untuk membuka Pengaturan cepat, lalu matikan Wi-Fi.', 'Jika memakai kabel jaringan, cabut kabel Ethernet agar perangkat benar-benar offline.'], note: 'Letak menu dapat berbeda menurut versi Windows.' },
  MacOS: { mainTitle: 'Cara utama: Matikan Wi-Fi dari bar menu', main: ['Pilih Pusat Kontrol atau ikon Wi-Fi di bar menu.', 'Pilih Wi-Fi, lalu matikan koneksinya.', 'Jika memakai kabel jaringan, cabut kabel Ethernet agar perangkat benar-benar offline.'], alternativeTitle: 'Alternatif: Matikan lewat Pengaturan Sistem', alternative: ['Buka menu Apple → Pengaturan Sistem → Wi-Fi.', 'Matikan Wi-Fi. Pastikan perangkat tidak terhubung melalui Ethernet atau hotspot.'], note: 'Nama dan letak menu dapat berbeda menurut versi macOS.' },
};
const GUIDE_IMAGES: Record<GuidePlatform, string> = {
  Android: 'offline-guide-android.jpg',
  iOS: 'offline-guide-ios.jpg',
  Windows: 'offline-guide-windows.jpg',
  MacOS: 'offline-guide-macos.jpg',
};

type ConnectionStatusKind = 'offline-ready' | 'offline-needed' | 'online-waiting' | 'online-ready';

function ConnectionStatusCard({ kind, title, detail }: { kind: ConnectionStatusKind; title: string; detail: string }) {
  const ready = kind === 'offline-ready' || kind === 'online-ready';
  const waiting = kind === 'offline-needed' || kind === 'online-waiting';
  return <div className={`connection-status-card is-${kind} ${waiting ? 'is-waiting' : ''} ${ready ? 'is-success' : ''}`} role="status" aria-live="polite">
    <span className="connection-status-icon"><img src={ready ? materialCheckCircleIcon : kind === 'offline-needed' ? materialWifiOffIcon : materialWifiIcon} alt="" /></span>
    <div><strong>{title}</strong><span>{detail}</span></div>
  </div>;
}

function OfflineConnectionStatus({ network }: { network: NetworkMode }) {
  const offline = network === 'offline';
  return <ConnectionStatusCard kind={offline ? 'offline-ready' : 'offline-needed'} title={offline ? 'Mode Offline aktif' : 'Matikan koneksi internet dulu'} detail={offline ? 'Jawaban akan disimpan di perangkat selama kamu mengerjakan.' : 'Matikan Wi-Fi dan data seluler untuk mulai.'} />;
}

function OfflineGuide({ network }: { network: NetworkMode }) {
  const [platform, setPlatform] = useState<GuidePlatform>('Android');
  const guide = GUIDE_STEPS[platform];
  return <div className="offline-guide">
    <div className="offline-guide-title"><h1>Mengerjakan Drill Soal Offline</h1></div>
    <OfflineConnectionStatus network={network} />
    <div className="offline-guide-heading"><h2>Cara mematikan koneksi internet</h2></div>
    <div className="guide-tabs" role="group" aria-label="Pilih jenis perangkat">{(Object.keys(GUIDE_STEPS) as GuidePlatform[]).map(item => <button key={item} type="button" className={platform === item ? 'selected' : ''} aria-pressed={platform === item} onClick={() => setPlatform(item)}>{item}</button>)}</div>
    <img className="guide-image device-guide-image" src={asset(GUIDE_IMAGES[platform])} alt={`Panduan mematikan koneksi internet pada ${platform}`} />
    <h3>{guide.mainTitle}</h3>
    <ol>{guide.main.map(step => <li key={step}>{step}</li>)}</ol>
    <h3>{guide.alternativeTitle}</h3>
    <ol>{guide.alternative.map(step => <li key={step}>{step}</li>)}</ol>
    <p>{guide.note}</p>
  </div>;
}

function ReadyState({ network }: { network: NetworkMode }) {
  const blocked = network !== 'offline';
  return <section className="ready-state"><section className="ready-banner"><img src={asset('checklist-ready-banner.svg')} alt="" /><strong>{blocked ? 'Matikan koneksi internet untuk mulai Drill' : 'Kamu sudah siap melaksanakan Drill Soal offline'}</strong></section><button className="primary-cta" disabled={blocked} onClick={() => window.dispatchEvent(new CustomEvent('drill:start'))}>{blocked ? 'Matikan Internet' : 'Kerjakan Drill'}</button></section>;
}

type DrillScreen = PreparationState | 'entrypoint' | 'summary-preview' | 'question' | 'confirm' | 'wrong' | 'timeout' | 'online-guide' | 'auto-submit' | 'upload' | 'summary';
type NetworkMode = 'online' | 'offline';
type OfflineReward = { starchamp: number };
type DrillQuestion = typeof drillFixture.questions[number];

const drillScreenRoutes: Record<DrillScreen, string> = {
  entrypoint: 'entrypoint',
  download: 'download',
  downloading: 'preparing-progress',
  'summary-preview': 'summary-preview',
  'offline-guide': 'offline-guide',
  ready: 'ready',
  question: 'question',
  confirm: 'confirm',
  wrong: 'wrong-answer',
  timeout: 'timeout',
  'online-guide': 'internet-guide',
  'auto-submit': 'auto-submit',
  upload: 'upload',
  summary: 'result',
};
const drillRouteToScreen = new Map(Object.entries(drillScreenRoutes).map(([screen, route]) => [route, screen as DrillScreen]));
// Keep the entrypoint easy to open from review links.
drillRouteToScreen.set('drill-entrypoint', 'entrypoint');
// Keep the reviewer-facing state name usable as a direct deep link too. The
// canonical URL remains #internet-guide, but older links and menu labels use
// #online-guide.
drillRouteToScreen.set('online-guide', 'online-guide');
function drillScreenFromHash(hash: string): DrillScreen | null {
  const route = hash.replace(/^#\/?/, '').split(/[/?#]/)[0];
  return drillRouteToScreen.get(route) ?? null;
}

const drillScreenLabels: Record<DrillScreen, string> = {
  entrypoint: 'Class entrypoint',
  'summary-preview': 'Summary Drill',
  download: 'Menyiapkan paket soal',
  downloading: 'Persiapan paket soal berjalan',
  'offline-guide': 'Turn off internet guide',
  ready: 'Ready to start',
  question: 'Work on questions',
  confirm: 'Confirm answers',
  wrong: 'Wrong answer result',
  timeout: 'Time expired',
  'online-guide': 'Turn on internet guide',
  'auto-submit': 'Auto-submit preview',
  upload: 'Upload and collect',
  summary: 'Result summary',
};
const drillFlowScreens: DrillScreen[] = ['entrypoint', 'summary-preview', 'download', 'downloading', 'offline-guide', 'question', 'confirm', 'online-guide', 'upload', 'summary'];
const drillPreviewScreens: DrillScreen[] = ['ready', 'wrong', 'timeout', 'auto-submit'];

function DrillSidebar({ current, network, networkPromptOpen, onClose, onNavigate, onNetworkChange, onReset, onFailUpload, onSimulateOffline }: { current: DrillScreen; network: NetworkMode; networkPromptOpen: boolean; onClose: () => void; onNavigate: (screen: DrillScreen) => void; onNetworkChange: (mode: NetworkMode) => void; onReset: () => void; onFailUpload: () => void; onSimulateOffline: () => void }) {
  const item = (screen: DrillScreen, index: number, preview = false) => <button className={`drill-menu-item ${current === screen ? 'current' : ''}`} key={screen} onClick={() => { onNavigate(screen); onClose(); }}>{preview ? `P${index + 1} · ` : `${String(index + 1).padStart(2, '0')} · `}{drillScreenLabels[screen]}</button>;
  return <div className={`drill-menu-overlay ${networkPromptOpen ? 'drill-menu-overlay-prompt' : ''}`} role="presentation" onClick={onClose}><aside className="drill-side-menu" role="dialog" aria-modal="true" aria-label="Drill test navigation" onClick={event => event.stopPropagation()}><button className="drill-menu-close" aria-label="Close test menu" onClick={onClose}>×</button><img className="drill-menu-mark" src={asset('navbar-more.svg')} alt="" /><h2>Drill Offline demo</h2><p>Pilih state flow atau preview.</p><div className="drill-menu-tools"><strong>Simulation controls</strong><span>Connection mode</span><NetworkSwitch network={network} onChange={onNetworkChange} />{networkPromptOpen && <button onClick={onSimulateOffline}>Simulate return Offline</button>}<button className="simulation-reset" onClick={onReset}>↻ Reset Simulasi</button>{current === 'upload' && <button onClick={onFailUpload}>Force upload failure</button>}</div><section className="drill-menu-group"><h3>Flow utama</h3>{drillFlowScreens.map((screen, index) => item(screen, index))}</section><section className="drill-menu-group drill-menu-group-preview"><h3>Preview / state tambahan</h3>{drillPreviewScreens.map((screen, index) => item(screen, index, true))}</section></aside></div>;
}

function QuestionHero({ onFinish }: { onFinish?: () => void }) {
  return <>
    <div className="question-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Drill Soal</strong></div>
    <div className="question-hero"><div className="question-hero-title"><div className="question-hero-heading"><strong>Drill Soal</strong><span className="offline-mode-indicator"><span className="offline-mode-dot" />Mode Offline</span></div><span>{drillFixture.subject} - Kelas 12 Kurikulum Merdeka</span></div><button className="finish-button" onClick={onFinish}>Akhiri</button></div>
  </>;
}

function QuestionCard({ question, answer, disabled, onAnswer }: { question: DrillQuestion; answer: number | null; disabled?: boolean; onAnswer?: (index: number) => void }) {
  return <section className="question-card"><div className="question-card-title"><strong>Soal</strong><span className={`question-difficulty ${question.difficulty.toLowerCase()}`}>♟ {question.difficulty}</span><button className="question-info-button" aria-label="Info tingkat kesulitan">i</button></div><div className="question-stem"><p className="question-prompt">{question.prompt}</p></div><div className="options">{question.options.map((option, index) => <button key={option} disabled={disabled} className={`option ${answer === index ? 'option-selected' : ''}`} onClick={() => onAnswer?.(index)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>)}</div><div className="question-report"><span>Soal ini bermasalah?</span><button>⚑ &nbsp; Laporkan</button></div></section>;
}

function QuestionArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left' ? 'M19 12H5m7-7-7 7 7 7' : 'M5 12h14m-7-7 7 7-7 7';
  return <svg className="question-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

function QuestionNavigator({ questionNumber, total, answers, onNavigate }: { questionNumber: number; total: number; answers: Array<number | null>; onNavigate: (index: number) => void }) {
  return <nav className="question-navigator" aria-label={`Navigasi soal, ${questionNumber} dari ${total}`}><div className="question-navigator-buttons">{Array.from({ length: total }, (_, index) => <button key={index} type="button" className={`${index + 1 === questionNumber ? 'current' : ''} ${answers[index] !== null ? 'answered' : ''}`} aria-current={index + 1 === questionNumber ? 'step' : undefined} aria-label={`Buka soal ${index + 1}${answers[index] !== null ? ', sudah dijawab' : ', belum dijawab'}`} onClick={() => onNavigate(index)}>{index + 1}</button>)}</div></nav>;
}

function QuestionScreen({ network, answer, question, questionNumber, answers, onAnswer, onNavigate, onFinish }: { network: NetworkMode; answer: number | null; question: DrillQuestion; questionNumber: number; answers: Array<number | null>; onAnswer: (index: number) => void; onNavigate: (index: number) => void; onFinish: () => void }) {
  const blocked = network !== 'offline';
  const isFirstQuestion = questionNumber === 1;
  const isLastQuestion = questionNumber === drillFixture.questionCount;
  return <main className="drill-screen question-screen"><div className="question-scroll"><Navbar /><QuestionHero onFinish={onFinish} /><QuestionNavigator questionNumber={questionNumber} total={drillFixture.questionCount} answers={answers} onNavigate={onNavigate} /><QuestionCard question={question} answer={answer} disabled={blocked} onAnswer={blocked ? undefined : onAnswer} /></div><footer className="question-footer answer-review-footer"><button className="question-arrow-button" type="button" aria-label="Soal sebelumnya" disabled={blocked || isFirstQuestion} onClick={() => onNavigate(questionNumber - 2)}><QuestionArrowIcon direction="left" /></button><button className="question-arrow-button question-arrow-next" type="button" aria-label={isLastQuestion ? 'Kumpulkan Drill' : 'Soal berikutnya'} disabled={blocked} onClick={() => isLastQuestion ? onFinish() : onNavigate(questionNumber)}><QuestionArrowIcon direction="right" /></button></footer></main>;
}

function ConfirmScreen({ network, answer, question, onBack, onSubmit, finishRequested = false }: { network: NetworkMode; answer: number | null; question: DrillQuestion; onBack: () => void; onSubmit: () => void; finishRequested?: boolean }) {
  const blocked = network !== 'offline';
  return <main className="drill-screen confirm-screen"><Navbar /><div className="confirm-scroll"><QuestionCard question={question} answer={answer} disabled /></div><footer className="confirm-footer"><div><strong>{finishRequested ? 'Yakin ingin mengakhiri sesi Drill?' : 'Akhiri Drill?'}</strong><span>Jawaban disimpan dulu dan hasilnya diproses setelah Drill dikumpulkan.</span></div><div className="confirm-footer-actions"><button className="secondary-cta" onClick={onBack}>Kembali</button><button className="primary-cta" disabled={blocked} onClick={onSubmit}>{finishRequested ? 'Yakin' : 'Akhiri Drill'}</button></div></footer></main>;
}

function NetworkInterruptionModal({ onTimeout }: { onTimeout: () => void }) {
  const [remaining, setRemaining] = useState(25);
  useEffect(() => {
    const countdown = window.setInterval(() => setRemaining(value => {
      if (value <= 1) {
        window.clearInterval(countdown);
        onTimeout();
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(countdown);
  }, []);
  return <div className="network-overlay" role="alertdialog" aria-modal="true" aria-labelledby="network-interruption-title"><section className="network-overlay-card"><div className="network-overlay-icon">!</div><h2 id="network-interruption-title">Koneksi internet terdeteksi</h2><div className="network-grace-timer" role="timer" aria-live="polite">00:{remaining.toString().padStart(2, '0')}</div><div className="network-interruption-copy"><p>Matikan koneksi internet untuk melanjutkan. <strong>Drill otomatis dikumpulkan dalam {remaining} detik.</strong></p></div></section></div>;
}

function EndSessionModal({ onCancel, onConfirm, answers }: { onCancel: () => void; onConfirm: () => void; answers: Array<number | null> }) {
  const answered = answers.filter(answer => answer !== null).length;
  const total = answers.length;
  const unanswered = Math.max(0, total - answered);
  return <div className="end-session-layer" role="dialog" aria-modal="true" aria-labelledby="end-session-title"><section className="end-session-card"><h2 id="end-session-title">Akhiri sesi Drill?</h2><div className="end-session-overview" aria-label="Ringkasan pengerjaan"><div><strong>{answered}</strong><span>Terjawab</span></div><div><strong>{unanswered}</strong><span>Kosong</span></div><div><strong>{total}</strong><span>Total soal</span></div></div><div className="end-session-actions"><button className="secondary-cta" onClick={onCancel}>Kembali</button><button className="primary-cta" onClick={onConfirm}>Kumpulkan</button></div></section></div>;
}

function ResultAnswerScreen({ kind, network, question, questionNumber, answer, onContinue }: { kind: 'wrong' | 'timeout'; network: NetworkMode; question: DrillQuestion; questionNumber: number; answer: number | null; onContinue: () => void }) {
  const timeout = kind === 'timeout';
  const blocked = network !== 'offline';
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero /><div className="question-scroll"><QuestionCard question={question} answer={answer} disabled /><section className={`result-note ${timeout ? 'result-note-timeout' : ''}`}><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Sesi Drill akan dikumpulkan'}</strong><span>Hasil pengerjaan akan diproses setelah Drill berhasil dikumpulkan.</span></section></div><footer className="question-footer result-footer"><div><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Sesi Drill akan dikumpulkan'}</strong><span>Jawaban tersimpan. Hasil pengerjaan akan diproses setelah Drill berhasil dikumpulkan.</span></div><button className="primary-cta" disabled={blocked} onClick={onContinue}>Lanjut</button></footer></main>;
}

function OnlineGuide({ network, status, answeredCount, onBackToQuestions, onUpload }: { network: NetworkMode; status: 'ready' | 'uploading' | 'failed'; answeredCount: number; onBackToQuestions: () => void; onUpload: () => void }) {
  const failed = status === 'failed';
  const waitingForNetwork = network !== 'online' && !failed;
  const showWarning = network !== 'online' || failed;
  const totalQuestions = drillFixture.questionCount;
  const answered = Math.min(totalQuestions, Math.max(0, answeredCount));
  const unanswered = totalQuestions - answered;
  const connectionStatus = failed
    ? <div className="upload-alert collection-warning collection-warning-failed" role="status"><img className="upload-alert-icon" src={asset('upload-alert-icon.svg')} alt="" /><div><strong>Pengumpulan belum berhasil</strong><span>Periksa koneksi lalu coba lagi.</span></div></div>
    : waitingForNetwork
      ? <ConnectionStatusCard kind="online-waiting" title="Nyalakan koneksi internet" detail="Menunggu koneksi…" />
      : <ConnectionStatusCard kind="online-ready" title="Internet sudah aktif" detail="Jawaban siap dikumpulkan." />;
  return <main className="drill-screen preparation-screen collection-screen"><Navbar /><div className="content collection-content"><HeaderArtwork /><section className="prep-card collection-card online-guide-collection-card"><div className="prep-heading"><h1>Mengumpulkan Drill Soal Offline</h1></div>{connectionStatus}<section className="collection-overview" aria-label="Progress pengerjaan"><div className="collection-progress-content"><div className="collection-progress-subject"><ExamArtwork /><div><span>Pelajaran</span><strong>{drillFixture.subject}</strong></div></div><ul className="collection-chapter-list">{DRILL_CHAPTERS.map(chapter => <li key={chapter}>{chapter}</li>)}</ul><div className="collection-answer-summary"><div><span>Terjawab</span><strong>{answered}</strong></div><div><span>Kosong</span><strong>{unanswered}</strong></div><div><span>Total soal</span><strong>{totalQuestions}</strong></div></div></div></section></section></div><footer className="collection-actions collection-guide-actions"><div className="collection-action-buttons"><button className="secondary-cta" disabled={network === 'online' || status === 'uploading'} onClick={onBackToQuestions}>Kembali ke Soal</button><button className="primary-cta" disabled={network !== 'online'} onClick={onUpload}>Kumpulkan</button></div></footer></main>;
}

function AutoSubmitPreview({ answeredCount, onContinue }: { answeredCount: number; onContinue: () => void }) {
  const totalQuestions = drillFixture.questionCount;
  const answered = Math.min(totalQuestions, Math.max(0, answeredCount));
  const unanswered = totalQuestions - answered;
  return <main className="drill-screen preparation-screen collection-screen"><Navbar /><div className="content collection-content"><HeaderArtwork /><section className="prep-card collection-card auto-submit-preview-card"><div className="prep-heading"><h1>Drill Soal Otomatis Dikumpulkan</h1></div><p className="collection-intro">Kamu terdeteksi menggunakan internet selama mengerjakan Drill Soal.</p><section className="collection-overview" aria-label="Preview pengerjaan sesi"><div className="collection-progress-content"><div className="collection-progress-subject"><ExamArtwork /><div><span>Pelajaran</span><strong>{drillFixture.subject}</strong></div></div><div className="auto-submit-section-label">Preview Pengerjaan Sesi</div><ul className="collection-chapter-list">{DRILL_CHAPTERS.map(chapter => <li key={chapter}>{chapter}</li>)}</ul><div className="collection-answer-summary"><div><span>Terjawab</span><strong>{answered}</strong></div><div><span>Kosong</span><strong>{unanswered}</strong></div><div><span>Total soal</span><strong>{totalQuestions}</strong></div></div></div></section></section></div><footer className="collection-actions auto-submit-actions"><button className="primary-cta" onClick={onContinue}>Lihat Hasil Pengerjaan</button></footer></main>;
}

function CollectionProgress({ status, network }: { status: 'ready' | 'uploading' | 'failed'; network: NetworkMode }) {
  const failed = status === 'failed';
  const uploading = status === 'uploading';
  const online = network === 'online';
  const badge = failed ? 'Pengumpulan gagal' : uploading ? 'Mengirim jawaban' : online ? 'Siap dikumpulkan' : 'Menunggu internet';
  return <section className={`collection-status ${!online && !failed ? 'is-waiting' : ''} ${uploading ? 'is-uploading' : ''} ${failed ? 'is-failed' : ''}`} aria-live="polite">
    <div className="collection-status-heading"><strong>Status pengumpulan</strong><span className="collection-status-badge">{badge}</span></div>
    <div className="collection-status-steps" role="group" aria-label="Tahapan pengumpulan Drill">
      <div className="collection-status-step is-done"><span className="collection-status-icon">✓</span><span>Jawaban<br />tersimpan</span></div>
      <div className={`collection-status-step ${online ? 'is-done' : failed ? '' : 'is-current'}`}><span className="collection-status-icon">{online ? '✓' : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 7.2a11.5 11.5 0 0 1 14.8-.5M5.5 10.2a7 7 0 0 1 8.7-.4M8.7 13.2a2.5 2.5 0 0 1 2.8-.1M2 2l16 16" /></svg>}</span><span>{online ? <>Internet<br />aktif</> : <>Nyalakan<br />internet</>}</span></div>
      <div className={`collection-status-step ${uploading ? 'is-current' : failed ? 'is-failed' : ''}`}><span className="collection-status-icon">{uploading ? <span className="collection-status-spinner">↻</span> : failed ? '!' : <span className="collection-status-dot" />}</span><span>{uploading ? <>Mengirim<br />jawaban…</> : failed ? <>Pengumpulan<br />gagal</> : <>Menunggu<br />pengiriman</>}</span></div>
    </div>
  </section>;
}

function QuestionAnswerProgress({ answeredCount }: { answeredCount: number }) {
  const total = drillFixture.questionCount;
  const answered = Math.min(total, Math.max(0, answeredCount));
  return <section className="collection-question-progress" aria-label="Ringkasan pengerjaan soal"><div><strong>Soal dijawab</strong><span>{answered} dari {total} soal</span></div><div className="collection-question-track" role="progressbar" aria-label="Soal dijawab" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}><span style={{ width: `${(answered / total) * 100}%` }} /></div></section>;
}

function UploadScreen({ status, network, onUpload, onBackToCollection, answeredCount, autoSubmit = false, onAutoSubmitContinue }: { status: 'ready' | 'uploading' | 'failed'; network: NetworkMode; onUpload: () => void; onBackToCollection: () => void; answeredCount: number; autoSubmit?: boolean; onAutoSubmitContinue: () => void }) {
  if (autoSubmit) return <AutoSubmitPreview answeredCount={answeredCount} onContinue={onAutoSubmitContinue} />;
  const failed = status === 'failed';
  const uploading = status === 'uploading';
  const showWarning = !uploading;
  const warningTitle = failed ? 'Pengumpulan belum berhasil' : autoSubmit ? 'Drill otomatis dikumpulkan' : 'Siap mengirim jawaban';
  const warningCopy = failed ? 'Periksa koneksi lalu coba lagi.' : autoSubmit ? 'Koneksi internet terdeteksi saat mengerjakan. Jawabanmu sedang dikumpulkan.' : 'Pilih Kumpulkan dari halaman sebelumnya untuk mengirim jawaban.';
  return <main className="drill-screen preparation-screen collection-screen"><Navbar /><div className="content collection-content"><HeaderArtwork /><section className="prep-card collection-card"><div className="prep-heading"><h1>{autoSubmit ? 'Drill otomatis dikumpulkan' : 'Mengirim jawaban Drill'}</h1></div><p className="collection-intro">{autoSubmit ? 'Koneksi internet terdeteksi saat sesi berlangsung.' : 'Jawaban sedang dikirim setelah kamu memilih Kumpulkan.'}</p>{autoSubmit && uploading && <div className="auto-submit-notice" role="status"><img src={asset('wifi.svg')} alt="" /><div><strong>Drill sedang dikumpulkan otomatis</strong><span>Jawabanmu disimpan setelah koneksi internet menyala.</span></div></div>}{showWarning && <div className={`upload-alert collection-warning ${failed ? 'collection-warning-failed' : ''}`} role="status"><img className="upload-alert-icon" src={asset('upload-alert-icon.svg')} alt="" /><div><strong>{warningTitle}</strong><span>{warningCopy}</span></div></div>}<CollectionProgress status={status} network={network} /><QuestionAnswerProgress answeredCount={answeredCount} /></section></div>{failed ? <footer className="collection-actions"><button className="secondary-cta" disabled={network !== 'online'} onClick={onUpload}>Coba Lagi</button></footer> : status === 'ready' && !autoSubmit ? <footer className="collection-actions"><button className="secondary-cta" onClick={onBackToCollection}>Kembali</button><button className="primary-cta" disabled={network !== 'online'} onClick={onUpload}>Kumpulkan</button></footer> : null}</main>;
}

function SummaryScreen({ onRestart, reward, answers }: { onRestart: () => void; reward: OfflineReward; answers: Array<number | null> }) {
  const correct = answers.filter((answer, index) => answer !== null && answer === drillFixture.questions[index].answer).length;
  const answered = answers.filter(answer => answer !== null).length;
  const wrong = answers.filter((answer, index) => answer !== null && answer !== drillFixture.questions[index].answer).length;
  const score = Math.round((correct / drillFixture.questionCount) * 100);
  return <main className="drill-screen summary-screen">
    <Navbar />
    <div className="summary-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Hasil Pengerjaan</strong></div>
    <header className="summary-heading"><span className="summary-back-icon" aria-hidden="true">‹</span><div><h1>Hasil Pengerjaan</h1><p>{drillFixture.subject} - Kelas 12</p></div></header>
    <div className="summary-scroll">
      <section className="summary-result-card">
        <img className="summary-score-confetti" src={asset('result-score-asset.png')} alt="" />
        <img className="summary-result-mascot" src={asset('result-mascot.png')} alt="" aria-hidden="true" />
        <div className="summary-result-copy"><h2>Kamu meraih nilai</h2><strong>{score}</strong><p>Saat kita belajar, kita tumbuh.</p></div>
        <div className="summary-starchamp"><span>Starchamps yang berhasil dikumpulkan</span><b>+{reward.starchamp}</b></div>
        <div className="summary-grid"><div><b>✓</b><span>Benar<strong>{correct} soal</strong></span></div><div><b>×</b><span>Salah<strong>{wrong} soal</strong></span></div></div>
      </section>
      <button className="learning-report-banner"><span className="learning-report-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v8" /><path d="M19 3v7h7M8 3v26h10" /><path d="M11 14h9M11 18h7" /><circle cx="22" cy="22" r="6" /><path d="m26.5 26.5 3 3" /></svg></span><span><strong>Hasil ini tercatat di Laporan Belajarmu!</strong><small>Lihat perkembangan hasil belajarmu sekarang</small></span><b>›</b></button>
      <section className="summary-understanding">
        <h2><img src={asset('SyllabusIllustK12Report.png')} alt="" /><span>Detail Pemahaman</span></h2>
        <p>Ketahui materi yang perlu dipelajari lebih dalam</p>
        <div className="summary-filter"><button className="selected">Semua</button><button>Belum Paham</button><button>Sudah Paham</button></div>
        <article className="summary-topic-card">
          <div className="summary-topic-heading"><span className="summary-topic-icon">∑</span><div><strong>{drillFixture.topic}</strong><small><i className="correct-mark">✓</i> {correct} &nbsp; <i className="wrong-mark">×</i> {wrong}</small></div><b className="summary-topic-score">Nilai<strong>{score}</strong></b></div>
          <div className="summary-topic-questions">{drillFixture.questions.map((question, index) => { const unanswered = answers[index] === null; const correctAnswer = answers[index] === question.answer; return <div className="summary-topic-question" key={question.prompt}><span>Soal {index + 1}</span><b className={unanswered ? 'is-unanswered' : correctAnswer ? 'is-correct' : 'is-wrong'}>{unanswered ? 'Belum dijawab' : correctAnswer ? 'Benar' : 'Salah'}</b></div>; })}</div>
          <button className="summary-explanation">Lihat Pembahasan <span>→</span></button>
        </article>
      </section>
    </div>
    <footer className="summary-footer"><button className="secondary-cta" onClick={onRestart}>Latihan Lagi</button><button className="primary-cta">Pembahasan</button></footer>
  </main>;
}

function DrillSummaryPreview({ onStart }: { onStart: () => void }) {
  const topics = DRILL_CHAPTERS;
  const [showAllTopics, setShowAllTopics] = useState(true);
  const shouldCollapse = topics.length > 3;
  const visibleTopics = shouldCollapse && !showAllTopics ? topics.slice(0, 3) : topics;
  return <main className="drill-screen drill-summary-preview">
    <Navbar />
    <div className="preview-content">
      <HeaderArtwork />
      <section className="preview-summary-card" aria-label="Ringkasan Drill">
        <p className="preview-feature-label">Drill Soal</p>
        <div className="preview-summary-heading">
          <ExamArtwork />
          <div className="preview-title-copy"><span className="preview-field-label">Pelajaran</span><p className="eyebrow">{drillFixture.subject}</p></div>
        </div>
        <div className="divider" />
        <div className="preview-topic-block"><span>Bab yang dicakup</span><div className="preview-topic-list">{visibleTopics.map(topic => <span key={topic}>{topic}</span>)}</div>{shouldCollapse && <button className="preview-topic-toggle" type="button" onClick={() => setShowAllTopics(value => !value)}>{showAllTopics ? 'Sembunyikan bab' : 'Lihat semua bab'}</button>}</div>
        <div className="divider" />
        <div className="preview-stats"><div><img src={asset('question-count.svg')} alt="" /><span>Jumlah soal<strong>{drillFixture.questionCount} soal</strong></span></div></div>
      </section>
    </div>
    <footer className="preview-footer"><button className="primary-cta" type="button" onClick={onStart}>Mulai Drill</button></footer>
  </main>;
}

function OfflineToast({ message }: { message: string }) {
  return <div className="offline-toast" role="status" aria-live="polite"><span>✓</span>{message}</div>;
}

function App() {
  const initialHashScreen = drillScreenFromHash(window.location.hash);
  const [screen, setScreen] = useState<DrillScreen>(initialHashScreen ?? 'summary-preview');
  const [progress, setProgress] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() => Array(drillFixture.questionCount).fill(null));
  const answer = answers[questionIndex] ?? null;
  const setAnswer = (value: number | null) => setAnswers(current => current.map((item, index) => index === questionIndex ? value : item));
  const [uploadStatus, setUploadStatus] = useState<'ready' | 'uploading' | 'failed'>(initialHashScreen === 'auto-submit' ? 'uploading' : 'ready');
  const [network, setNetwork] = useState<NetworkMode>('online');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [finishRequested, setFinishRequested] = useState(false);
  const [networkPromptOpen, setNetworkPromptOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [offlineReward, setOfflineReward] = useState<OfflineReward>({ starchamp: 0 });
  const [autoSubmit, setAutoSubmit] = useState(initialHashScreen === 'auto-submit');
  const uploadTimerRef = useRef<number | null>(null);
  const autoCollectTimerRef = useRef<number | null>(null);
  const networkRef = useRef<NetworkMode>(network);

  useEffect(() => {
    networkRef.current = network;
  }, [network]);

  useEffect(() => {
    const onStart = () => setScreen('question');
    const onMenu = () => setMenuOpen(true);
    window.addEventListener('drill:start', onStart);
    window.addEventListener('drill:menu', onMenu);
    return () => { window.removeEventListener('drill:start', onStart); window.removeEventListener('drill:menu', onMenu); };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const nextScreen = drillScreenFromHash(window.location.hash);
      if (nextScreen !== null) {
        // Keep the interruption auto-submit timer alive while its upload state
        // is reflected in the hash. Any other deep-link/navigation cancels it.
        if (nextScreen !== 'upload' && autoCollectTimerRef.current !== null) { window.clearTimeout(autoCollectTimerRef.current); autoCollectTimerRef.current = null; }
        if (nextScreen !== 'upload' && uploadTimerRef.current !== null) { window.clearTimeout(uploadTimerRef.current); uploadTimerRef.current = null; }
        setScreen(nextScreen);
        setMenuOpen(false);
        setNetworkPromptOpen(false);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const nextHash = `#${drillScreenRoutes[screen]}`;
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  }, [screen]);

  useEffect(() => {
    if (screen !== 'download') return;
    const autoDownload = window.setTimeout(() => {
      setProgress(0);
      setScreen('downloading');
    }, 180);
    return () => window.clearTimeout(autoDownload);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'downloading') return;
    const timer = window.setInterval(() => setProgress(value => {
      const next = Math.min(value + 10, 100);
      if (next === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setScreen('offline-guide'), 250);
        }
      return next;
    }), 120);
    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    if ((screen === 'question' || screen === 'confirm') && network === 'online') setNetworkPromptOpen(true);
  }, [screen, network]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll<HTMLElement>('.question-scroll, .summary-scroll, .content').forEach(element => { element.scrollTop = 0; });
  }, [screen]);

  const submitAnswer = () => { if (network !== 'offline') return; setScreen('online-guide'); };
  const finalizeOfflineReward = () => {
    const correct = answers.filter((answer, index) => answer === drillFixture.questions[index].answer).length;
    setOfflineReward({ starchamp: correct * 2 });
  };
  const upload = () => {
    if (network !== 'online') return;
    if (uploadTimerRef.current !== null) window.clearTimeout(uploadTimerRef.current);
    setUploadStatus('uploading');
    uploadTimerRef.current = window.setTimeout(() => {
      uploadTimerRef.current = null;
      if (networkRef.current !== 'online') {
        setUploadStatus('failed');
        return;
      }
      finalizeOfflineReward();
      setScreen('summary');
    }, 1000);
  };
  const failUpload = () => {
    if (uploadTimerRef.current !== null) {
      window.clearTimeout(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }
    if (autoCollectTimerRef.current !== null) {
      window.clearTimeout(autoCollectTimerRef.current);
      autoCollectTimerRef.current = null;
    }
    setUploadStatus('failed');
  };
  const resetSession = () => { if (uploadTimerRef.current !== null) { window.clearTimeout(uploadTimerRef.current); uploadTimerRef.current = null; } if (autoCollectTimerRef.current !== null) { window.clearTimeout(autoCollectTimerRef.current); autoCollectTimerRef.current = null; } setAnswers(Array(drillFixture.questionCount).fill(null)); setQuestionIndex(0); setProgress(0); setUploadStatus('ready'); setOfflineReward({ starchamp: 0 }); setAutoSubmit(false); setNetwork('online'); setSessionEnded(false); setFinishRequested(false); setNetworkPromptOpen(false); setToastMessage(null); setScreen('summary-preview'); };
  const startDrillFromPreview = () => { setProgress(0); setScreen('download'); };
  const navigateFromMenu = (next: DrillScreen) => {
    if (autoCollectTimerRef.current !== null) { window.clearTimeout(autoCollectTimerRef.current); autoCollectTimerRef.current = null; }
    if (next === 'question') { setAnswers(Array(drillFixture.questionCount).fill(null)); setQuestionIndex(0); setSessionEnded(false); setFinishRequested(false); }
    if (next === 'confirm') { setAnswers([0, ...Array(Math.max(0, drillFixture.questionCount - 1)).fill(null)]); setQuestionIndex(0); setSessionEnded(false); setFinishRequested(false); }
    if (next === 'summary') { const previewAnswers = drillFixture.questions.map(question => question.answer); setAnswers(previewAnswers); setOfflineReward({ starchamp: previewAnswers.length * 2 }); }
    setNetworkPromptOpen(false);
    if (next === 'downloading') setProgress(0);
    if (next === 'upload') { setUploadStatus('ready'); setAutoSubmit(false); }
    if (next === 'auto-submit') { setUploadStatus('uploading'); setAutoSubmit(true); }
    setScreen(next);
  };

  const beginFinish = () => { setFinishRequested(true); setSessionEnded(true); };
  const finishDrill = () => { if (network !== 'offline') return; setFinishRequested(false); setSessionEnded(true); setAutoSubmit(false); setScreen('online-guide'); };
  const continueAfterWrong = () => {
    if (network !== 'offline') return;
    if (questionIndex < drillFixture.questionCount - 1) {
      setQuestionIndex(index => index + 1);
      setScreen('question');
      return;
    }
    finishDrill();
  };
  const cancelFinish = () => { setFinishRequested(false); setSessionEnded(false); setScreen('question'); };
  const confirmFinish = finishDrill;
  const setNetworkMode = (mode: NetworkMode) => {
    if (mode === 'online' && network === 'offline' && (screen === 'question' || screen === 'confirm')) {
      setNetwork('online');
      setNetworkPromptOpen(true);
      return;
    }
    if (mode === 'offline' && screen === 'offline-guide') {
      setNetwork('offline');
      setNetworkPromptOpen(false);
      setMenuOpen(false);
      return;
    }
    if (mode === 'online' && screen === 'online-guide') {
      setNetwork('online');
      setNetworkPromptOpen(false);
      setMenuOpen(false);
      return;
    }
    if (mode === 'offline' && networkPromptOpen) {
      setNetwork('offline');
      setNetworkPromptOpen(false);
      setMenuOpen(false);
      setToastMessage('Koneksi internet mati. Kamu kembali ke mode Offline.');
      return;
    }
    setNetwork(mode);
    setNetworkPromptOpen(false);
  };
  const simulateReturnOffline = () => {
    setNetwork('offline');
    setNetworkPromptOpen(false);
    setMenuOpen(false);
    setToastMessage('Koneksi internet mati. Kamu kembali ke mode Offline.');
  };
  const handleNetworkTimeout = () => {
    setSessionEnded(true);
    setFinishRequested(false);
    setNetworkPromptOpen(false);
    setAutoSubmit(true);
    setUploadStatus('uploading');
    setScreen('upload');
  };
  const continueAfterAutoSubmit = () => { finalizeOfflineReward(); setAutoSubmit(false); setScreen('summary'); };

  let content: ReactNode;
  if (screen === 'entrypoint') content = <EntryPointScreen />;
  else if (screen === 'question') content = <QuestionScreen network={network} answer={answer} question={drillFixture.questions[questionIndex]} questionNumber={questionIndex + 1} answers={answers} onAnswer={setAnswer} onNavigate={index => setQuestionIndex(Math.max(0, Math.min(drillFixture.questionCount - 1, index)))} onFinish={beginFinish} />;
  else if (screen === 'confirm') content = <ConfirmScreen network={network} answer={answer} question={drillFixture.questions[questionIndex]} finishRequested={finishRequested} onBack={finishRequested ? cancelFinish : () => setScreen('question')} onSubmit={finishRequested ? confirmFinish : submitAnswer} />;
  else if (screen === 'wrong' || screen === 'timeout') content = <ResultAnswerScreen kind={screen} network={network} question={drillFixture.questions[questionIndex]} questionNumber={questionIndex + 1} answer={answers[questionIndex] ?? null} onContinue={() => { if (network === 'offline') { if (screen === 'timeout') setScreen('online-guide'); else continueAfterWrong(); } }} />;
  else if (screen === 'online-guide') content = <OnlineGuide network={network} status={uploadStatus} answeredCount={answers.filter(item => item !== null).length} onBackToQuestions={() => { setSessionEnded(false); setScreen('question'); }} onUpload={upload} />;
  else if (screen === 'auto-submit') content = <AutoSubmitPreview answeredCount={answers.filter(item => item !== null).length} onContinue={continueAfterAutoSubmit} />;
  else if (screen === 'upload') content = <UploadScreen status={uploadStatus} network={network} onUpload={upload} onBackToCollection={() => setScreen('online-guide')} answeredCount={answers.filter(item => item !== null).length} autoSubmit={autoSubmit} onAutoSubmitContinue={continueAfterAutoSubmit} />;
  else if (screen === 'summary-preview') content = <DrillSummaryPreview onStart={startDrillFromPreview} />;
  else if (screen === 'summary') content = <SummaryScreen onRestart={resetSession} reward={offlineReward} answers={answers} />;
  else {
    const stickyDisabled = screen === 'offline-guide' ? network !== 'offline' : screen === 'downloading' && network === 'online';
    const onStickyClick = () => {
      if (screen === 'offline-guide' && network === 'offline') setScreen('question');
    };
    const showGuideAction = screen === 'offline-guide';
    const isLoading = screen === 'download' || screen === 'downloading';
    content = <main className={`app-shell ${isLoading ? 'loading-shell' : ''}`}><Navbar /><div className="content">{isLoading ? <ActivityLoading title="Menyiapkan Drill Soal" progress={screen === 'download' ? 0 : progress} /> : <><HeaderArtwork /><PreparationCard state={screen as PreparationState} network={network} progress={progress} /></>}</div>{screen === 'ready' ? <ReadyState network={network} /> : showGuideAction ? <div className="sticky-actions"><button className="primary-cta" disabled={stickyDisabled} onClick={onStickyClick}>Mulai Kerjakan</button></div> : null}</main>;
  }
  return <div className="drill-review-root" data-network={network}>{content}{menuOpen && <DrillSidebar current={screen} network={network} networkPromptOpen={networkPromptOpen} onClose={() => setMenuOpen(false)} onNavigate={navigateFromMenu} onNetworkChange={setNetworkMode} onReset={resetSession} onFailUpload={failUpload} onSimulateOffline={simulateReturnOffline} />}{networkPromptOpen && <NetworkInterruptionModal onTimeout={handleNetworkTimeout} />}{finishRequested && screen === 'question' && <EndSessionModal onCancel={cancelFinish} onConfirm={confirmFinish} answers={answers} />}{toastMessage && <OfflineToast message={toastMessage} />}</div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
