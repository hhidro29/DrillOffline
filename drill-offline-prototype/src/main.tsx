import { StrictMode, useEffect, useState, type ReactNode } from 'react';
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

function ChecklistItem({ icon, children, status = 'pending' }: { icon: string; children: ReactNode; status?: 'pending' | 'complete' }) {
  return <div className={`checklist-item ${status === 'complete' ? 'checklist-item-complete' : ''}`}><img src={asset(icon)} alt="" /><span>{children}</span><img src={asset(status === 'complete' ? 'checklist-ready.svg' : 'checklist.svg')} alt="" /></div>;
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
      <ChecklistItem icon="test.svg" status={downloaded ? 'complete' : 'pending'}>Download Soal Drill Soal Offline</ChecklistItem>
      {state !== 'download' && <ChecklistItem icon="wifi.svg" status={offline ? 'complete' : 'pending'}>Matikan Koneksi Internet</ChecklistItem>}
    </div>
    {state !== 'ready' && <div className="divider" />}
    {state === 'download' && <DownloadPanel />}
    {state === 'downloading' && <DownloadPanel progress={progress} />}
    {state === 'offline-guide' && <OfflineGuide />}
  </section>;
}

function DownloadPanel({ progress }: { progress?: number }) {
  return <div className="download-panel">
    <div className="download-icon"><img src={asset('download.svg')} alt="" /></div>
    {progress === undefined ? <><strong>Download paket drill sebelum mulai</strong><p>Download paket drill untuk mengerjakan drill secara offline.</p></> : <><strong>Mempersiapkan konten untukmu</strong><p>Mendownload paket soal · {progress}%</p><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="download-warning"><img src={asset('warning.svg')} alt="" /><span>Jangan tutup atau reload halaman ini.<br />Tunggu proses download selesai.</span></div></>}
  </div>;
}

function OfflineGuide() {
  return <div className="offline-guide">
    <h2>Cara mematikan koneksi internet perangkat</h2>
    <div className="guide-tabs"><button className="selected">Android</button><button>iOS</button><button>Windows</button><button>MacOS</button></div>
    <img className="guide-image guide-gif" src={asset('offline-connection-guide.gif')} alt="Panduan mematikan koneksi internet di Android" />
    <h3>Cara utama: Aktifkan mode terbang (Airplane Mode)</h3>
    <ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon pesawat untuk mengaktifkan Mode pesawat / Airplane Mode.</li><li>Pastikan Wi-Fi dan data seluler mati agar internet benar-benar terputus.</li></ol>
    <h3>Alternatif: Matikan lewat Pengaturan</h3>
    <ol><li>Buka Pengaturan → Wi-Fi, lalu matikan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → matikan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya tidak aktif.</li></ol>
    <p>Nama menu dapat berbeda sesuai merek dan versi Android.</p>
  </div>;
}

function ReadyState({ network }: { network: NetworkMode }) {
  const blocked = network !== 'offline';
  return <section className="ready-state"><section className="ready-banner"><img src={asset('checklist-ready-banner.svg')} alt="" /><strong>{blocked ? 'Matikan koneksi internet untuk mulai Drill' : 'Kamu sudah siap melaksanakan Drill Soal offline'}</strong></section><p className="offline-reward-notice">Jawaban benar/salah, Starchamp, dan XP akan direview setelah sesi selesai dan Drill dikumpulkan saat online.</p><button className="primary-cta" disabled={blocked} onClick={() => window.dispatchEvent(new CustomEvent('drill:start'))}>{blocked ? 'Matikan Internet' : 'Kerjakan Drill'}</button></section>;
}

type DrillScreen = PreparationState | 'question' | 'confirm' | 'wrong' | 'timeout' | 'online-guide' | 'upload' | 'summary';
type NetworkMode = 'online' | 'offline';
type OfflineReward = { xp: number; starchamp: number };

const drillScreenLabels: Record<DrillScreen, string> = {
  download: '01 · Download package',
  downloading: '02 · Downloading package',
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

function QuestionHero({ timer, answered, result, onFinish, network }: { timer: number; answered: boolean; result?: 'wrong' | 'timeout'; onFinish?: () => void; network?: NetworkMode }) {
  return <>
    <div className="question-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Drill Soal</strong></div>
    <div className="question-hero"><div className="question-hero-title"><strong>Drill Soal</strong><span>{drillFixture.subject} - Kelas 12 Kurikulum Merdeka</span></div><button className="finish-button" onClick={onFinish}>Akhiri</button><div className={`timer-chip ${result ? 'timer-chip-result' : ''}`}><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><b><i>{result === 'timeout' ? '00' : '00'}</i><em>:</em><i>{result === 'timeout' ? '00' : formatTime(timer).split(':')[0]}</i><em>:</em><i>{result === 'timeout' ? '00' : formatTime(timer).split(':')[1]}</i></b></div></div>
    <div className="question-info"><strong>{result === 'timeout' ? '5' : '1'}/{drillFixture.questionCount}</strong>{network === 'offline' && <span className="question-offline-status"><span className="offline-mode-dot" />Mode Offline</span>}</div>
  </>;
}

function TimerBoxes({ timer, result = false }: { timer: number; result?: boolean }) {
  const [minutes, seconds] = formatTime(timer).split(':');
  return <b className="timer-boxes"><i>{result ? '00' : '00'}</i><em>:</em><i>{result ? '00' : minutes}</i><em>:</em><i>{result ? '00' : seconds}</i></b>;
}

function QuestionCard({ answer, disabled, onAnswer }: { answer: number | null; disabled?: boolean; onAnswer?: (index: number) => void }) {
  return <section className="question-card"><div className="question-stem"><div className="question-card-title"><strong>Soal :</strong><span>Hard</span></div><p className="question-prompt">{drillFixture.question.prompt}</p></div><div className="options">{drillFixture.question.options.map((option, index) => <button key={option} disabled={disabled} className={`option ${answer === index ? 'option-selected' : ''}`} onClick={() => onAnswer?.(index)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>)}</div><div className="question-report"><span>Soal ini bermasalah?</span><button>⚑ &nbsp; Laporkan</button></div></section>;
}

function QuestionScreen({ network, timer, answer, onAnswer, onFinish }: { network: NetworkMode; timer: number; answer: number | null; onAnswer: (index: number) => void; onFinish: () => void }) {
  const blocked = network !== 'offline';
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={answer !== null} onFinish={onFinish} network={network} /><div className="question-scroll"><QuestionCard answer={answer} disabled={blocked} onAnswer={blocked ? undefined : onAnswer} /></div><footer className="question-footer question-timer-only"><div className="footer-timer"><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><TimerBoxes timer={timer} /></div></footer></main>;
}

function ConfirmScreen({ network, timer, answer, onBack, onSubmit, finishRequested = false }: { network: NetworkMode; timer: number; answer: number | null; onBack: () => void; onSubmit: () => void; finishRequested?: boolean }) {
  const blocked = network !== 'offline';
  return <main className="drill-screen confirm-screen"><Navbar /><div className="confirm-scroll"><QuestionCard answer={answer} disabled /></div><div className="confirm-timer"><div className="footer-timer"><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><TimerBoxes timer={timer} /></div></div><footer className="confirm-footer"><div><strong>{finishRequested ? 'Yakin ingin mengakhiri sesi Drill?' : 'Yakin dengan jawabannya?'}</strong><span>{finishRequested ? 'Jawabanmu akan dikumpulkan untuk diproses.' : 'Klik submit untuk tahu hasilnya, ya'}</span></div><div className="confirm-footer-actions"><button className="secondary-cta" onClick={onBack}>Kembali</button><button className="primary-cta" disabled={blocked} onClick={onSubmit}>{finishRequested ? 'Yakin' : 'Submit'}</button></div></footer></main>;
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
  return <div className="network-interruption-layer" role="alertdialog" aria-modal="true" aria-labelledby="network-interruption-title"><section className="network-interruption-card"><div className="network-interruption-icon">!</div><h2 id="network-interruption-title">Koneksi internet terdeteksi</h2><div className="network-grace-timer" role="timer" aria-live="polite">00:{remaining.toString().padStart(2, '0')}</div><div className="network-interruption-copy"><p>Matikan koneksi internet untuk melanjutkan. <strong>Jika waktu habis, sesi akan otomatis dikumpulkan.</strong></p></div></section></div>;
}

function EndSessionModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return <div className="end-session-layer" role="dialog" aria-modal="true" aria-labelledby="end-session-title"><section className="end-session-card"><h2 id="end-session-title">Yakin ingin mengakhiri sesi Drill?</h2><p>Jawabanmu akan dikumpulkan untuk diproses.</p><div className="end-session-actions"><button className="secondary-cta" onClick={onCancel}>Kembali</button><button className="primary-cta" onClick={onConfirm}>Yakin</button></div></section></div>;
}

function ResultAnswerScreen({ kind, network, timer, onContinue }: { kind: 'wrong' | 'timeout'; network: NetworkMode; timer: number; onContinue: () => void }) {
  const timeout = kind === 'timeout';
  const blocked = network !== 'offline';
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={false} result={kind} /><div className="question-scroll"><QuestionCard answer={timeout ? null : 1} disabled /><section className={`result-note ${timeout ? 'result-note-timeout' : ''}`}><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Jawabanmu kurang tepat'}</strong><span>{timeout ? 'Jawabanmu akan dikumpulkan untuk diproses.' : 'Lebih teliti di soal selanjutnya, ya!'}</span></section></div><footer className="question-footer result-footer"><div><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Jawabanmu kurang tepat'}</strong><span>{timeout ? 'Jawabanmu akan dikumpulkan untuk diproses.' : 'Lebih teliti di soal selanjutnya, ya!'}</span></div><button className="primary-cta" disabled={blocked} onClick={onContinue}>Lanjut</button></footer></main>;
}

function OnlineGuide({ network }: { network: NetworkMode }) {
  const online = network === 'online';
  return <main className="drill-screen preparation-screen"><Navbar /><div className="content online-content"><HeaderArtwork /><section className="prep-card upload-guide-card"><div className="prep-heading"><h1>Persiapan Mengumpulkan<br />Drill Soal Offline</h1></div><div className="upload-alert"><img className="upload-alert-icon" src={asset('warning.svg')} alt="" /><div><strong>Drill belum dikumpulkan</strong><span>Upload hasil drill supaya jawabanmu tercatat</span></div></div><div className="checklist"><ChecklistItem icon="wifi.svg" status={online ? 'complete' : 'pending'}>Nyalakan Koneksi Internet</ChecklistItem><ChecklistItem icon="test.svg">Upload Hasil Drill Offline</ChecklistItem></div><div className="divider" /><div className="offline-guide"><h2>Cara menyalakan koneksi internet perangkat</h2><div className="guide-tabs"><button className="selected">Android</button><button>iOS</button><button>Windows</button><button>MacOS</button></div><img className="guide-image guide-gif" src={asset('offline-connection-guide-reversed.gif')} alt="Panduan menyalakan koneksi internet di Android" /><h3>Cara utama: Nonaktifkan mode terbang (Airplane Mode)</h3><ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon pesawat untuk menonaktifkan Mode pesawat / Airplane Mode.</li><li>Pastikan Wi-Fi dan data seluler aktif agar internet kembali tersambung.</li></ol><h3>Alternatif: Nyalakan lewat Pengaturan</h3><ol><li>Buka Pengaturan → Wi-Fi, lalu nyalakan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → nyalakan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya aktif.</li></ol><p>Nama menu dapat berbeda sesuai merek dan versi Android.</p></div></section></div></main>;
}

function UploadScreen({ status, network, onUpload }: { status: 'ready' | 'uploading' | 'failed'; network: NetworkMode; onUpload: () => void }) {
  const blocked = network !== 'online';
  return <main className="drill-screen preparation-screen collection-screen"><Navbar /><div className="content collection-content"><HeaderArtwork /><div className="collection-kicker">DRILL SOAL OFFLINE</div><section className="prep-card collection-card"><div className="prep-heading"><h1>Kumpulkan hasil Drill</h1></div><p className="collection-intro">Aktifkan internet untuk mengirim jawabanmu.</p><div className="upload-alert"><img className="upload-alert-icon" src={asset('upload-alert-icon.svg')} alt="" /><div><strong>Drill belum dikumpulkan</strong><span>Hasil jawabanmu akan diproses setelah dikirim.</span></div></div><div className="checklist"><ChecklistItem icon="wifi.svg" status={!blocked ? 'complete' : 'pending'}>Nyalakan Koneksi Internet</ChecklistItem><ChecklistItem icon="test.svg" status={status === 'uploading' ? 'complete' : 'pending'}>Upload Hasil Drill Offline</ChecklistItem></div><div className="divider" /><p className="offline-reward-notice collection-reward-notice">Jawaban benar/salah, Starchamp, dan XP akan direview setelah kamu mengumpulkan Drill saat online.</p><div className={`collection-status ${status === 'failed' ? 'collection-status-failed' : ''}`}><strong>{status === 'uploading' ? 'Mengunggah hasil drill…' : status === 'failed' ? 'Upload belum berhasil' : blocked ? 'Menunggu koneksi internet' : 'Siap dikumpulkan'}</strong><p>{status === 'uploading' ? 'Tunggu sampai proses upload selesai.' : status === 'failed' ? 'Periksa koneksi internet lalu coba lagi.' : blocked ? 'Nyalakan internet untuk mengaktifkan pengumpulan.' : 'Pengumpulan akan dimulai otomatis.'}</p>{status === 'uploading' && <div className="progress-track"><span style={{ width: '68%' }} /></div>}{status === 'failed' && <div className="upload-error" role="alert"><img src={asset('upload-alert-icon.svg')} alt="" />Upload gagal. Coba lagi untuk melanjutkan.</div>}</div></section></div><div className="sticky-actions collection-actions"><button className="primary-cta" disabled={blocked || status === 'uploading'} onClick={onUpload}>{status === 'uploading' ? 'Mengunggah…' : status === 'failed' ? 'Coba Lagi' : 'Kumpulkan'}</button></div></main>;
}

function SummaryScreen({ onRestart, reward }: { onRestart: () => void; reward: OfflineReward }) {
  return <main className="drill-screen summary-screen"><Navbar /><div className="summary-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Drill Soal</strong></div><div className="summary-hero"><strong>Hasil Pengerjaan</strong><span><b>{drillFixture.subject}</b> Kelas 10 - IPA</span></div><div className="summary-scroll"><section className="summary-card"><div className="summary-score-panel"><img className="summary-score-confetti" src={asset('result-score-asset.png')} alt="" /><h2>Kamu meraih nilai</h2><div className="summary-score"><img src={asset('result-ring.svg')} alt="" /><span>60</span></div><div className="summary-xp">Total XP yang kamu dapatkan <b>✪ {reward.xp}</b></div><div className="summary-starchamp"><span>Starchamp terkumpul setelah upload</span><b>+{reward.starchamp}</b></div></div><div className="summary-grid"><div><b>✓</b><span>Benar<strong>6 soal</strong></span></div><div><b>×</b><span>Salah<strong>4 soal</strong></span></div></div><div className="summary-time-grid"><div>Waktu yang diatur<strong>50 menit</strong></div><div>Rata-rata waktu per soal<strong>3 menit/soal</strong></div></div><div className="summary-total">🗎 &nbsp; Total waktu pengerjaan <strong>50 menit 12 detik</strong> <span>(Alokasi waktumu sudah baik!)</span></div><div className="topic-progress"><b>Struktur dan Fungsi Sistem Linear</b><span>80%</span><i><em /></i></div><div className="topic-progress"><b>Struktur dan Fungsi Sistem Komposisi</b><span>80%</span><i><em /></i></div><button className="all-questions">Lihat semua soal⌄</button></section><section className="summary-section"><h2>Pahami lagi materi ini, yuk!</h2><div className="recommendation"><img src={asset('result-icon.png')} alt="" />Subbab</div></section><section className="summary-section video-section"><h2>Rekomendasi video untukmu</h2><p>Biar makin paham Trigonometri Pecahan</p><div className="video-placeholder"><div className="video-card"><img src={asset('result-video-1.png')} alt="" /><span>Pertumbuhan dan Perkembangan</span></div><div className="video-card"><img src={asset('result-video-2.png')} alt="" /><span>Faktor Van’t Hoff</span></div><div className="video-card"><img src={asset('result-video-3.png')} alt="" /><span>Konsep Trigonometri</span></div></div></section></div><footer className="summary-footer"><button className="secondary-cta" onClick={onRestart}>Latihan Lagi</button><button className="primary-cta">Pembahasan</button></footer></main>;
}

function OfflineToast({ message }: { message: string }) {
  return <div className="offline-toast" role="status" aria-live="polite"><span>✓</span>{message}</div>;
}

function App() {
  const [screen, setScreen] = useState<DrillScreen>('download');
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [timer, setTimer] = useState(15 * 60);
  const [uploadStatus, setUploadStatus] = useState<'ready' | 'uploading' | 'failed'>('ready');
  const [network, setNetwork] = useState<NetworkMode>('online');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [finishRequested, setFinishRequested] = useState(false);
  const [networkPromptOpen, setNetworkPromptOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [offlineReward, setOfflineReward] = useState<OfflineReward>({ xp: 0, starchamp: 0 });

  useEffect(() => {
    const onStart = () => setScreen('question');
    const onMenu = () => setMenuOpen(true);
    window.addEventListener('drill:start', onStart);
    window.addEventListener('drill:menu', onMenu);
    return () => { window.removeEventListener('drill:start', onStart); window.removeEventListener('drill:menu', onMenu); };
  }, []);

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

  const submitAnswer = () => { if (network !== 'offline') return; setScreen(answer === drillFixture.question.answer ? 'online-guide' : 'wrong'); };
  const finalizeOfflineReward = () => {
    setOfflineReward({ xp: 180, starchamp: 180 });
  };
  const upload = () => {
    if (network !== 'online') return;
    setUploadStatus('uploading');
    finalizeOfflineReward();
    window.setTimeout(() => setScreen('summary'), 700);
  };
  useEffect(() => {
    if (screen !== 'upload' || network !== 'online' || uploadStatus !== 'ready') return;
    const autoUpload = window.setTimeout(upload, 260);
    return () => window.clearTimeout(autoUpload);
  }, [screen, network, uploadStatus]);
  const failUpload = () => setUploadStatus('failed');
  const resetSession = () => { setAnswer(null); setTimer(15 * 60); setProgress(0); setUploadStatus('ready'); setOfflineReward({ xp: 0, starchamp: 0 }); setNetwork('online'); setSessionEnded(false); setFinishRequested(false); setNetworkPromptOpen(false); setToastMessage(null); setScreen('download'); };
  const navigateFromMenu = (next: DrillScreen) => {
    if (next === 'question') { setAnswer(null); setTimer(15 * 60); setSessionEnded(false); setFinishRequested(false); }
    if (next === 'confirm') { setAnswer(0); setTimer(15 * 60); setSessionEnded(false); setFinishRequested(false); }
    setNetworkPromptOpen(false);
    if (next === 'downloading') setProgress(0);
    if (next === 'upload') setUploadStatus('ready');
    setScreen(next);
  };

  const beginFinish = () => { setFinishRequested(true); setSessionEnded(true); };
  const cancelFinish = () => { setFinishRequested(false); setSessionEnded(false); setScreen('question'); };
  const confirmFinish = () => { if (network !== 'offline') return; setFinishRequested(false); setScreen('online-guide'); };
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
    finalizeOfflineReward();
    setScreen('upload');
    window.setTimeout(() => setScreen('summary'), 700);
  };

  let content: ReactNode;
  if (screen === 'question') content = <QuestionScreen network={network} timer={timer} answer={answer} onAnswer={setAnswer} onFinish={beginFinish} />;
  else if (screen === 'confirm') content = <ConfirmScreen network={network} timer={timer} answer={answer} finishRequested={finishRequested} onBack={finishRequested ? cancelFinish : () => setScreen('question')} onSubmit={finishRequested ? confirmFinish : submitAnswer} />;
  else if (screen === 'wrong' || screen === 'timeout') content = <ResultAnswerScreen kind={screen} network={network} timer={timer} onContinue={() => { if (network === 'offline') setScreen('online-guide'); }} />;
  else if (screen === 'online-guide') content = <OnlineGuide network={network} />;
  else if (screen === 'upload') content = <UploadScreen status={uploadStatus} network={network} onUpload={upload} />;
  else if (screen === 'summary') content = <SummaryScreen onRestart={resetSession} reward={offlineReward} />;
  else {
    const stickyDisabled = screen === 'offline-guide' ? network !== 'offline' : screen === 'downloading' && network === 'online';
    const onStickyClick = () => {
      if (screen === 'offline-guide' && network === 'offline') setScreen('question');
    };
    const showGuideAction = screen === 'offline-guide';
    content = <main className="app-shell"><Navbar /><div className="content"><HeaderArtwork /><PreparationCard state={screen as PreparationState} network={network} progress={progress} /></div>{screen === 'ready' ? <ReadyState network={network} /> : showGuideAction ? <div className="sticky-actions"><button className="primary-cta" disabled={stickyDisabled} onClick={onStickyClick}>Mulai Kerjakan</button></div> : null}</main>;
  }
  return <div className="drill-review-root" data-network={network}>{content}{menuOpen && <DrillSidebar current={screen} network={network} networkPromptOpen={networkPromptOpen} onClose={() => setMenuOpen(false)} onNavigate={navigateFromMenu} onNetworkChange={setNetworkMode} onReset={resetSession} onFailUpload={failUpload} onSimulateOffline={simulateReturnOffline} />}{networkPromptOpen && <NetworkInterruptionModal onTimeout={handleNetworkTimeout} />}{finishRequested && screen === 'question' && <EndSessionModal onCancel={cancelFinish} onConfirm={confirmFinish} />}{toastMessage && <OfflineToast message={toastMessage} />}</div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
