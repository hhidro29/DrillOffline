import { StrictMode, useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { drillFixture, type PreparationState } from './fixtures/drill';
import './styles.css';

const asset = (name: string) => `/assets/figma/${name}`;

function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <button className="icon-button" aria-label="Open Drill test menu" onClick={() => window.dispatchEvent(new Event('drill:menu'))}><img src={asset('navbar-more.svg')} alt="" /></button>
      <img className="brand" src={asset('ruangguru-logo.svg')} alt="ruang guru" />
      <button className="account-button">Akun Saya <img src={asset('dropdown.svg')} alt="" /></button>
    </nav>
  );
}

function HeaderArtwork() {
  return <div className="header-art" aria-hidden="true"><img className="header-left" src={asset('header-left.svg')} alt="" /><img className="header-right" src={asset('header-right.svg')} alt="" /></div>;
}

function ActivityLoading({ title }: { title: string }) {
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
    <div className="activity-loading-dots" role="status" aria-label="Memuat"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
  </main>;
}

function ChecklistItem({ icon, children, status = 'pending' }: { icon: string; children: ReactNode; status?: 'pending' | 'complete' }) {
  return <div className={`checklist-item ${status === 'complete' ? 'checklist-item-complete' : ''}`}><img src={asset(icon)} alt="" /><span>{children}</span><img src={asset(status === 'complete' ? 'checklist-ready.svg' : 'checklist-success.svg')} alt="" /></div>;
}

function OfflineRewardNotice({ className = '' }: { className?: string }) {
  return <div className={`offline-reward-notice ${className}`} role="note"><span className="offline-reward-icon" aria-hidden="true">★</span><div><strong>Poinmu tidak hilang</strong><p>Jawaban benar/salah dan Starchamp diproses setelah Drill berhasil dikumpulkan.</p></div></div>;
}

function NetworkSwitch({ network, onChange }: { network: NetworkMode; onChange: (mode: NetworkMode) => void }) {
  const online = network === 'online';
  return <button type="button" role="switch" aria-checked={online} aria-label={`Network mode: ${network}`} className={`network-switch ${online ? 'network-switch-online' : 'network-switch-offline'}`} onClick={() => onChange(online ? 'offline' : 'online')}><span className="network-switch-track"><span className="network-switch-thumb" /></span><span className="network-switch-label">Network</span><strong>{online ? 'Online' : 'Offline'}</strong></button>;
}

function PreparationCard({ state, network, progress }: { state: PreparationState; network: NetworkMode; progress: number }) {
  const downloaded = state === 'offline-guide' || state === 'ready';
  const offline = network === 'offline';
  return <section className={`prep-card prep-card-${state}`}>
    <div className="prep-heading"><h1>{drillFixture.title}</h1></div>
    <div className="checklist">
      <ChecklistItem icon="test.svg" status={downloaded ? 'complete' : 'pending'}>{downloaded ? 'Soal Drill Offline siap' : 'Menyiapkan Soal Drill Offline'}</ChecklistItem>
      {state !== 'download' && <ChecklistItem icon="wifi.svg" status={offline ? 'complete' : 'pending'}>Matikan Koneksi Internet</ChecklistItem>}
    </div>
    {state === 'offline-guide' && <OfflineRewardNotice className="offline-guide-reward-notice" />}
    {state !== 'ready' && <div className="divider" />}
    {state === 'download' && <DownloadPanel />}
    {state === 'downloading' && <DownloadPanel progress={progress} />}
    {state === 'offline-guide' && <OfflineGuide />}
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

function OfflineGuide() {
  const [platform, setPlatform] = useState<GuidePlatform>('Android');
  const guide = GUIDE_STEPS[platform];
  return <div className="offline-guide">
    <h2>Cara mematikan koneksi internet perangkat</h2>
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

type DrillScreen = PreparationState | 'question' | 'confirm' | 'wrong' | 'timeout' | 'online-guide' | 'upload' | 'summary';
type NetworkMode = 'online' | 'offline';
type OfflineReward = { starchamp: number };
type DrillQuestion = typeof drillFixture.questions[number];

const drillScreenRoutes: Record<DrillScreen, string> = {
  download: 'download',
  downloading: 'preparing-progress',
  'offline-guide': 'offline-guide',
  ready: 'ready',
  question: 'question',
  confirm: 'confirm',
  wrong: 'wrong-answer',
  timeout: 'timeout',
  'online-guide': 'internet-guide',
  upload: 'upload',
  summary: 'result',
};
const drillRouteToScreen = new Map(Object.entries(drillScreenRoutes).map(([screen, route]) => [route, screen as DrillScreen]));
function drillScreenFromHash(hash: string): DrillScreen | null {
  const route = hash.replace(/^#\/?/, '').split(/[/?#]/)[0];
  return drillRouteToScreen.get(route) ?? null;
}

const drillScreenLabels: Record<DrillScreen, string> = {
  download: '01 · Menyiapkan paket soal',
  downloading: '02 · Persiapan paket soal berjalan',
  'offline-guide': '03 · Turn off internet guide',
  ready: '04 · Ready to start',
  question: '05 · Work on questions',
  confirm: '06 · Confirm answers',
  wrong: '07 · Wrong answer result',
  timeout: '08 · Time expired',
  'online-guide': '09 · Turn on internet guide',
  upload: '10 · Upload and collect',
  summary: '11 · Result summary',
};

function DrillSidebar({ current, network, networkPromptOpen, onClose, onNavigate, onNetworkChange, onReset, onFailUpload, onSimulateOffline }: { current: DrillScreen; network: NetworkMode; networkPromptOpen: boolean; onClose: () => void; onNavigate: (screen: DrillScreen) => void; onNetworkChange: (mode: NetworkMode) => void; onReset: () => void; onFailUpload: () => void; onSimulateOffline: () => void }) {
  return <div className={`drill-menu-overlay ${networkPromptOpen ? 'drill-menu-overlay-prompt' : ''}`} role="presentation" onClick={onClose}><aside className="drill-side-menu" role="dialog" aria-modal="true" aria-label="Drill test navigation" onClick={event => event.stopPropagation()}><button className="drill-menu-close" aria-label="Close test menu" onClick={onClose}>×</button><img className="drill-menu-mark" src={asset('navbar-more.svg')} alt="" /><h2>Drill Offline demo</h2><p>Jump to a state for review.</p><div className="drill-menu-tools"><span>Test controls</span><NetworkSwitch network={network} onChange={onNetworkChange} />{networkPromptOpen && <button onClick={onSimulateOffline}>Simulate return Offline</button>}<button onClick={onReset}>Reset session</button>{current === 'upload' && <button onClick={onFailUpload}>Force upload failure</button>}</div><div className="drill-menu-items">{(Object.keys(drillScreenLabels) as DrillScreen[]).map(screen => <button className={`drill-menu-item ${current === screen ? 'current' : ''}`} key={screen} onClick={() => { onNavigate(screen); onClose(); }}>{drillScreenLabels[screen]}</button>)}</div></aside></div>;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function QuestionHero({ timer, questionNumber, result, onFinish }: { timer: number; questionNumber: number; result?: 'wrong' | 'timeout'; onFinish?: () => void }) {
  return <>
    <div className="question-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Drill Soal</strong></div>
    <div className="question-hero"><div className="question-hero-title"><strong>Drill Soal</strong><span>{drillFixture.subject} - Kelas 12 Kurikulum Merdeka</span></div><button className="finish-button" onClick={onFinish}>Akhiri</button><div className={`timer-chip ${result ? 'timer-chip-result' : ''}`}><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><b><i>{result === 'timeout' ? '00' : '00'}</i><em>:</em><i>{result === 'timeout' ? '00' : formatTime(timer).split(':')[0]}</i><em>:</em><i>{result === 'timeout' ? '00' : formatTime(timer).split(':')[1]}</i></b></div></div>
    <div className="question-info"><strong className="question-counter">Soal {questionNumber}/{drillFixture.questionCount}</strong><span className="question-offline-status"><span className="offline-mode-dot" />Mode Offline</span></div>
  </>;
}

function TimerBoxes({ timer, result = false }: { timer: number; result?: boolean }) {
  const [minutes, seconds] = formatTime(timer).split(':');
  return <b className="timer-boxes"><i>{result ? '00' : '00'}</i><em>:</em><i>{result ? '00' : minutes}</i><em>:</em><i>{result ? '00' : seconds}</i></b>;
}

function QuestionCard({ question, answer, disabled, onAnswer }: { question: DrillQuestion; answer: number | null; disabled?: boolean; onAnswer?: (index: number) => void }) {
  return <section className="question-card"><div className="question-card-title"><strong>Soal</strong><span className={`question-difficulty ${question.difficulty.toLowerCase()}`}>♟ {question.difficulty}</span><button className="question-info-button" aria-label="Info tingkat kesulitan">i</button></div><div className="question-stem"><p className="question-prompt">{question.prompt}</p></div><div className="options">{question.options.map((option, index) => <button key={option} disabled={disabled} className={`option ${answer === index ? 'option-selected' : ''}`} onClick={() => onAnswer?.(index)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>)}</div><div className="question-report"><span>Soal ini bermasalah?</span><button>⚑ &nbsp; Laporkan</button></div></section>;
}

function QuestionScreen({ network, timer, answer, question, questionNumber, onAnswer, onContinue, onFinish }: { network: NetworkMode; timer: number; answer: number | null; question: DrillQuestion; questionNumber: number; onAnswer: (index: number) => void; onContinue: () => void; onFinish: () => void }) {
  const blocked = network !== 'offline';
  return <main className="drill-screen question-screen"><div className="question-scroll"><Navbar /><QuestionHero timer={timer} questionNumber={questionNumber} onFinish={onFinish} /><QuestionCard question={question} answer={answer} disabled={blocked} onAnswer={blocked ? undefined : onAnswer} /></div>{answer !== null && <footer className="question-footer answer-review-footer"><div><strong>Yakin dengan jawabannya?</strong><span>Hasil drill akan diberitahu setelah dikumpulkan.</span></div><button className="primary-cta" disabled={blocked} onClick={onContinue}>{questionNumber === drillFixture.questionCount ? 'Akhiri' : 'Lanjut'}</button></footer>}</main>;
}

function ConfirmScreen({ network, timer, answer, question, onBack, onSubmit, finishRequested = false }: { network: NetworkMode; timer: number; answer: number | null; question: DrillQuestion; onBack: () => void; onSubmit: () => void; finishRequested?: boolean }) {
  const blocked = network !== 'offline';
  return <main className="drill-screen confirm-screen"><Navbar /><div className="confirm-scroll"><QuestionCard question={question} answer={answer} disabled /></div><div className="confirm-timer"><div className="footer-timer"><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><TimerBoxes timer={timer} /></div></div><footer className="confirm-footer"><div><strong>{finishRequested ? 'Yakin ingin mengakhiri sesi Drill?' : 'Akhiri Drill?'}</strong><span>Jawaban disimpan dulu dan hasilnya diproses setelah Drill dikumpulkan.</span></div><div className="confirm-footer-actions"><button className="secondary-cta" onClick={onBack}>Kembali</button><button className="primary-cta" disabled={blocked} onClick={onSubmit}>{finishRequested ? 'Yakin' : 'Akhiri Drill'}</button></div></footer></main>;
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

function EndSessionModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return <div className="end-session-layer" role="dialog" aria-modal="true" aria-labelledby="end-session-title"><section className="end-session-card"><h2 id="end-session-title">Yakin ingin mengakhiri sesi Drill?</h2><p>Jawabanmu akan dikumpulkan untuk diproses.</p><div className="end-session-actions"><button className="secondary-cta" onClick={onCancel}>Kembali</button><button className="primary-cta" onClick={onConfirm}>Yakin</button></div></section></div>;
}

function ResultAnswerScreen({ kind, network, timer, question, questionNumber, onContinue }: { kind: 'wrong' | 'timeout'; network: NetworkMode; timer: number; question: DrillQuestion; questionNumber: number; onContinue: () => void }) {
  const timeout = kind === 'timeout';
  const blocked = network !== 'offline';
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} questionNumber={questionNumber} result={kind} /><div className="question-scroll"><QuestionCard question={question} answer={null} disabled /><section className={`result-note ${timeout ? 'result-note-timeout' : ''}`}><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Sesi Drill akan dikumpulkan'}</strong><span>Hasil pengerjaan akan diproses setelah Drill berhasil dikumpulkan.</span></section></div><footer className="question-footer result-footer"><div><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Sesi Drill akan dikumpulkan'}</strong><span>Hasil pengerjaan akan diproses setelah Drill berhasil dikumpulkan.</span></div><button className="primary-cta" disabled={blocked} onClick={onContinue}>Lanjut</button></footer></main>;
}

function OnlineGuide({ network, status, answeredCount }: { network: NetworkMode; status: 'ready' | 'uploading' | 'failed'; answeredCount: number }) {
  const failed = status === 'failed';
  const showWarning = network !== 'online' || failed;
  return <main className="drill-screen preparation-screen collection-screen"><Navbar /><div className="content collection-content"><HeaderArtwork /><div className="collection-kicker">DRILL SOAL OFFLINE</div><section className="prep-card collection-card online-guide-collection-card"><div className="prep-heading"><h1>Kumpulkan hasil Drill</h1></div><p className="collection-intro">Jawaban tersimpan di perangkat.</p>{showWarning && <div className={`upload-alert collection-warning ${failed ? 'collection-warning-failed' : ''}`} role="status"><img className="upload-alert-icon" src={asset('upload-alert-icon.svg')} alt="" /><div><strong>{failed ? 'Pengumpulan belum berhasil' : 'Drill belum dikumpulkan'}</strong><span>{failed ? 'Periksa koneksi lalu coba lagi.' : 'Nyalakan internet agar jawabanmu tercatat.'}</span></div></div>}<CollectionProgress status={status} network={network} /><QuestionAnswerProgress answeredCount={answeredCount} /><OfflineRewardNotice className="collection-reward-notice" /><div className="divider" hidden /><div className="offline-guide" hidden><h2>Cara menyalakan koneksi internet perangkat</h2><div className="guide-tabs"><button className="selected">Android</button><button>iOS</button><button>Windows</button><button>MacOS</button></div><img className="guide-image guide-gif" src={asset('offline-connection-guide-reversed.gif')} alt="Panduan menyalakan koneksi internet di Android" /><h3>Cara utama: Nonaktifkan mode terbang (Airplane Mode)</h3><ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon pesawat untuk menonaktifkan Mode pesawat / Airplane Mode.</li><li>Pastikan Wi-Fi dan data seluler aktif agar internet kembali tersambung.</li></ol><h3>Alternatif: Nyalakan lewat Pengaturan</h3><ol><li>Buka Pengaturan → Wi-Fi, lalu nyalakan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → nyalakan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya aktif.</li></ol><p>Nama menu dapat berbeda sesuai merek dan versi Android.</p></div></section></div></main>;
}

function CollectionProgress({ status, network }: { status: 'ready' | 'uploading' | 'failed'; network: NetworkMode }) {
  const failed = status === 'failed';
  const uploading = status === 'uploading' || (status === 'ready' && network === 'online');
  const online = network === 'online';
  const badge = failed ? 'Upload gagal' : uploading ? 'Mengirim' : 'Menunggu internet';
  return <section className={`collection-status ${!online && !failed ? 'is-waiting' : ''} ${uploading ? 'is-uploading' : ''} ${failed ? 'is-failed' : ''}`} aria-live="polite">
    <div className="collection-status-heading"><strong>Status pengumpulan</strong><span className="collection-status-badge">{badge}</span></div>
    <div className="collection-status-steps" role="group" aria-label="Tahapan pengumpulan Drill">
      <div className="collection-status-step is-done"><span className="collection-status-icon">✓</span><span>Jawaban<br />tersimpan</span></div>
      <div className={`collection-status-step ${online ? 'is-done' : failed ? '' : 'is-current'}`}><span className="collection-status-icon">{online ? '✓' : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 7.2a11.5 11.5 0 0 1 14.8-.5M5.5 10.2a7 7 0 0 1 8.7-.4M8.7 13.2a2.5 2.5 0 0 1 2.8-.1M2 2l16 16" /></svg>}</span><span>{online ? <>Internet<br />aktif</> : <>Nyalakan<br />internet</>}</span></div>
      <div className={`collection-status-step ${uploading ? 'is-current' : failed ? 'is-failed' : ''}`}><span className="collection-status-icon">{uploading ? <span className="collection-status-spinner">↻</span> : failed ? '!' : <span className="collection-status-dot" />}</span><span>{uploading ? <>Mengirim<br />jawaban…</> : failed ? <>Upload<br />gagal</> : <>Menunggu<br />pengiriman</>}</span></div>
    </div>
  </section>;
}

function QuestionAnswerProgress({ answeredCount }: { answeredCount: number }) {
  const total = drillFixture.questionCount;
  const answered = Math.min(total, Math.max(0, answeredCount));
  return <section className="collection-question-progress" aria-label="Ringkasan pengerjaan soal"><div><strong>Soal dijawab</strong><span>{answered} dari {total} soal</span></div><div className="collection-question-track" role="progressbar" aria-label="Soal dijawab" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}><span style={{ width: `${(answered / total) * 100}%` }} /></div></section>;
}

function UploadScreen({ status, network, onUpload, answeredCount }: { status: 'ready' | 'uploading' | 'failed'; network: NetworkMode; onUpload: () => void; answeredCount: number }) {
  const failed = status === 'failed';
  const uploading = status === 'uploading' || (status === 'ready' && network === 'online');
  const showWarning = !uploading;
  const warningTitle = failed ? 'Pengumpulan belum berhasil' : 'Drill belum dikumpulkan';
  const warningCopy = failed ? 'Periksa koneksi lalu coba lagi.' : 'Nyalakan internet agar jawabanmu tercatat.';
  return <main className="drill-screen preparation-screen collection-screen"><Navbar /><div className="content collection-content"><HeaderArtwork /><div className="collection-kicker">DRILL SOAL OFFLINE</div><section className="prep-card collection-card"><div className="prep-heading"><h1>Kumpulkan hasil Drill</h1></div><p className="collection-intro">Jawaban tersimpan di perangkat.</p>{showWarning && <div className={`upload-alert collection-warning ${failed ? 'collection-warning-failed' : ''}`} role="status"><img className="upload-alert-icon" src={asset('upload-alert-icon.svg')} alt="" /><div><strong>{warningTitle}</strong><span>{warningCopy}</span></div></div>}<CollectionProgress status={status} network={network} /><QuestionAnswerProgress answeredCount={answeredCount} /><OfflineRewardNotice className="collection-reward-notice" /></section></div>{failed && <div className="sticky-actions collection-actions"><button className="primary-cta" disabled={network !== 'online'} onClick={onUpload}>Coba Lagi</button></div>}</main>;
}

function SummaryScreen({ onRestart, reward, answers, timer }: { onRestart: () => void; reward: OfflineReward; answers: Array<number | null>; timer: number }) {
  const correct = answers.filter((answer, index) => answer === drillFixture.questions[index].answer).length;
  const answered = answers.filter(answer => answer !== null).length;
  const wrong = answered - correct;
  const score = Math.round((correct / drillFixture.questionCount) * 100);
  const elapsedSeconds = Math.max(0, drillFixture.durationMinutes * 60 - timer);
  const elapsedTime = `${Math.floor(elapsedSeconds / 60)} menit ${String(elapsedSeconds % 60).padStart(2, '0')} detik`;
  return <main className="drill-screen summary-screen">
    <Navbar />
    <div className="summary-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Hasil Pengerjaan</strong></div>
    <header className="summary-heading"><span className="summary-back-icon" aria-hidden="true">‹</span><div><h1>Hasil Pengerjaan</h1><p>{drillFixture.subject} - Kelas 12</p></div></header>
    <div className="summary-scroll">
      <section className="summary-result-card">
        <img className="summary-score-confetti" src={asset('result-score-asset.png')} alt="" />
        <img className="summary-result-mascot" src={asset('result-mascot.png')} alt="" aria-hidden="true" />
        <div className="summary-result-brand"><img src={asset('ruangguru-logo.svg')} alt="" /><span>DRILL SOAL</span></div>
        <div className="summary-result-copy"><h2>Kamu meraih nilai</h2><strong>{score}</strong><p>Saat kita belajar, kita tumbuh.</p></div>
        <div className="summary-starchamp"><span>Starchamps yang berhasil dikumpulkan</span><b>+{reward.starchamp}</b></div>
        <div className="summary-grid"><div><b>✓</b><span>Benar<strong>{correct} soal</strong></span></div><div><b>×</b><span>Salah<strong>{wrong} soal</strong></span></div></div>
        <div className="summary-total-time"><span className="summary-time-icon">◷</span><span>Total waktu pengerjaan<strong>{elapsedTime}</strong></span></div>
      </section>
      <button className="learning-report-banner"><span className="learning-report-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v8" /><path d="M19 3v7h7M8 3v26h10" /><path d="M11 14h9M11 18h7" /><circle cx="22" cy="22" r="6" /><path d="m26.5 26.5 3 3" /></svg></span><span><strong>Hasil ini tercatat di Laporan Belajarmu!</strong><small>Lihat perkembangan hasil belajarmu sekarang</small></span><b>›</b></button>
      <section className="summary-understanding">
        <h2><img src={asset('SyllabusIllustK12Report.png')} alt="" /><span>Detail Pemahaman</span></h2>
        <p>Ketahui materi yang perlu dipelajari lebih dalam</p>
        <div className="summary-filter"><button className="selected">Semua</button><button>Belum Paham</button><button>Sudah Paham</button></div>
        <article className="summary-topic-card">
          <div className="summary-topic-heading"><span className="summary-topic-icon">∑</span><div><strong>{drillFixture.topic}</strong><small><i className="correct-mark">✓</i> {correct} &nbsp; <i className="wrong-mark">×</i> {wrong}</small></div><b className="summary-topic-score">Nilai<strong>{score}</strong></b></div>
          <div className="summary-topic-questions">{drillFixture.questions.map((question, index) => <div className="summary-topic-question" key={question.prompt}><span>Soal {index + 1}</span><b className={answers[index] === question.answer ? 'is-correct' : 'is-wrong'}>{answers[index] === question.answer ? 'Benar' : 'Salah'}</b></div>)}</div>
          <button className="summary-explanation">Lihat Pembahasan <span>→</span></button>
        </article>
      </section>
    </div>
    <footer className="summary-footer"><button className="secondary-cta" onClick={onRestart}>Latihan Lagi</button><button className="primary-cta">Pembahasan</button></footer>
  </main>;
}

function OfflineToast({ message }: { message: string }) {
  return <div className="offline-toast" role="status" aria-live="polite"><span>✓</span>{message}</div>;
}

function App() {
  const initialHashScreen = drillScreenFromHash(window.location.hash);
  const [screen, setScreen] = useState<DrillScreen>(initialHashScreen ?? 'download');
  const [progress, setProgress] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() => Array(drillFixture.questionCount).fill(null));
  const answer = answers[questionIndex] ?? null;
  const setAnswer = (value: number | null) => setAnswers(current => current.map((item, index) => index === questionIndex ? value : item));
  const [timer, setTimer] = useState(15 * 60);
  const [uploadStatus, setUploadStatus] = useState<'ready' | 'uploading' | 'failed'>('ready');
  const [network, setNetwork] = useState<NetworkMode>('online');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [finishRequested, setFinishRequested] = useState(false);
  const [networkPromptOpen, setNetworkPromptOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [offlineReward, setOfflineReward] = useState<OfflineReward>({ starchamp: 0 });
  const uploadTimerRef = useRef<number | null>(null);

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
        setScreen(nextScreen);
        setMenuOpen(false);
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
    if (screen !== 'online-guide' || network !== 'online') return;
    const transition = window.setTimeout(() => setScreen('upload'), 180);
    return () => window.clearTimeout(transition);
  }, [screen, network]);

  useEffect(() => {
    if (sessionEnded || (screen !== 'question' && screen !== 'confirm')) return;
    const tick = window.setInterval(() => setTimer(value => {
      if (value <= 1) {
        window.clearInterval(tick);
        setScreen('timeout');
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(tick);
  }, [screen, sessionEnded]);

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
      finalizeOfflineReward();
      setScreen('summary');
    }, 1000);
  };
  useEffect(() => {
    if (screen !== 'upload' || network !== 'online' || uploadStatus !== 'ready') return;
    const autoUpload = window.setTimeout(upload, 260);
    return () => window.clearTimeout(autoUpload);
  }, [screen, network, uploadStatus]);
  const failUpload = () => {
    if (uploadTimerRef.current !== null) {
      window.clearTimeout(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }
    setUploadStatus('failed');
  };
  const resetSession = () => { if (uploadTimerRef.current !== null) { window.clearTimeout(uploadTimerRef.current); uploadTimerRef.current = null; } setAnswers(Array(drillFixture.questionCount).fill(null)); setQuestionIndex(0); setTimer(15 * 60); setProgress(0); setUploadStatus('ready'); setOfflineReward({ starchamp: 0 }); setNetwork('online'); setSessionEnded(false); setFinishRequested(false); setNetworkPromptOpen(false); setToastMessage(null); setScreen('download'); };
  const navigateFromMenu = (next: DrillScreen) => {
    if (next === 'question') { setAnswers(Array(drillFixture.questionCount).fill(null)); setQuestionIndex(0); setTimer(15 * 60); setSessionEnded(false); setFinishRequested(false); }
    if (next === 'confirm') { setAnswers([0, ...Array(Math.max(0, drillFixture.questionCount - 1)).fill(null)]); setQuestionIndex(0); setTimer(15 * 60); setSessionEnded(false); setFinishRequested(false); }
    if (next === 'summary') { const previewAnswers = drillFixture.questions.map(question => question.answer); setAnswers(previewAnswers); setOfflineReward({ starchamp: previewAnswers.length * 2 }); }
    setNetworkPromptOpen(false);
    if (next === 'downloading') setProgress(0);
    if (next === 'upload') setUploadStatus('ready');
    setScreen(next);
  };

  const beginFinish = () => { setFinishRequested(true); setSessionEnded(true); };
  const finishDrill = () => { if (network !== 'offline') return; setFinishRequested(false); setSessionEnded(true); setScreen('online-guide'); };
  const advanceQuestion = () => {
    if (network !== 'offline') return;
    if (questionIndex < drillFixture.questionCount - 1) {
      setQuestionIndex(index => index + 1);
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
    setUploadStatus('uploading');
    setScreen('upload');
    window.setTimeout(() => { finalizeOfflineReward(); setScreen('summary'); }, 1000);
  };

  let content: ReactNode;
  if (screen === 'question') content = <QuestionScreen network={network} timer={timer} answer={answer} question={drillFixture.questions[questionIndex]} questionNumber={questionIndex + 1} onAnswer={setAnswer} onContinue={advanceQuestion} onFinish={beginFinish} />;
  else if (screen === 'confirm') content = <ConfirmScreen network={network} timer={timer} answer={answer} question={drillFixture.questions[questionIndex]} finishRequested={finishRequested} onBack={finishRequested ? cancelFinish : () => setScreen('question')} onSubmit={finishRequested ? confirmFinish : submitAnswer} />;
  else if (screen === 'wrong' || screen === 'timeout') content = <ResultAnswerScreen kind={screen} network={network} timer={timer} question={drillFixture.questions[questionIndex]} questionNumber={questionIndex + 1} onContinue={() => { if (network === 'offline') { if (screen === 'timeout') setScreen('online-guide'); else advanceQuestion(); } }} />;
  else if (screen === 'online-guide') content = <OnlineGuide network={network} status={uploadStatus} answeredCount={answers.filter(item => item !== null).length} />;
  else if (screen === 'upload') content = <UploadScreen status={uploadStatus} network={network} onUpload={upload} answeredCount={answers.filter(item => item !== null).length} />;
  else if (screen === 'summary') content = <SummaryScreen onRestart={resetSession} reward={offlineReward} answers={answers} timer={timer} />;
  else {
    const stickyDisabled = screen === 'offline-guide' ? network !== 'offline' : screen === 'downloading' && network === 'online';
    const onStickyClick = () => {
      if (screen === 'offline-guide' && network === 'offline') setScreen('question');
    };
    const showGuideAction = screen === 'offline-guide';
    const isLoading = screen === 'download' || screen === 'downloading';
    content = <main className={`app-shell ${isLoading ? 'loading-shell' : ''}`}>{!isLoading && <Navbar />}<div className="content">{isLoading ? <ActivityLoading title="Drill Soal segera dimulai" /> : <><HeaderArtwork /><PreparationCard state={screen as PreparationState} network={network} progress={progress} /></>}</div>{screen === 'ready' ? <ReadyState network={network} /> : showGuideAction ? <div className="sticky-actions"><button className="primary-cta" disabled={stickyDisabled} onClick={onStickyClick}>Mulai Kerjakan</button></div> : null}</main>;
  }
  return <div className="drill-review-root" data-network={network}>{content}{menuOpen && <DrillSidebar current={screen} network={network} networkPromptOpen={networkPromptOpen} onClose={() => setMenuOpen(false)} onNavigate={navigateFromMenu} onNetworkChange={setNetworkMode} onReset={resetSession} onFailUpload={failUpload} onSimulateOffline={simulateReturnOffline} />}{networkPromptOpen && <NetworkInterruptionModal onTimeout={handleNetworkTimeout} />}{finishRequested && screen === 'question' && <EndSessionModal onCancel={cancelFinish} onConfirm={confirmFinish} />}{toastMessage && <OfflineToast message={toastMessage} />}</div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
