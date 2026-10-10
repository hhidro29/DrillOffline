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

function StepRing({ value, ready = false }: { value: string; ready?: boolean }) {
  return <div className={`step-ring ${ready ? 'step-ring-ready' : ''}`}><span>{value}</span></div>;
}

function ChecklistItem({ icon, children, status = 'pending' }: { icon: string; children: ReactNode; status?: 'pending' | 'complete' }) {
  return <div className={`checklist-item ${status === 'complete' ? 'checklist-item-complete' : ''}`}><img src={asset(icon)} alt="" /><span>{children}</span><img src={asset(status === 'complete' ? 'checklist-ready.svg' : 'checklist.svg')} alt="" /></div>;
}

function PreparationCard({ state, onReady }: { state: PreparationState; onReady: () => void }) {
  const downloaded = state === 'offline-guide' || state === 'ready';
  const offline = state === 'ready';
  return <section className={`prep-card prep-card-${state}`}>
    <div className="prep-heading"><h1>{drillFixture.title}</h1><StepRing value={offline ? '2/2' : downloaded ? '1/2' : '0/2'} ready={offline} /></div>
    <div className="checklist">
      <ChecklistItem icon="test.svg" status={downloaded ? 'complete' : 'pending'}>Download Soal Drill Soal Offline</ChecklistItem>
      {state !== 'download' && <ChecklistItem icon="wifi.svg" status={offline ? 'complete' : 'pending'}>Matikan Koneksi Internet</ChecklistItem>}
    </div>
    {state !== 'ready' && <div className="divider" />}
    {state === 'download' && <DownloadPanel />}
    {state === 'downloading' && <DownloadPanel progress={26} />}
    {state === 'offline-guide' && <OfflineGuide onReady={onReady} />}
  </section>;
}

function DownloadPanel({ progress }: { progress?: number }) {
  return <div className="download-panel">
    <div className="download-icon"><img src={asset('download.svg')} alt="" /></div>
    {progress === undefined ? <><strong>Download paket drill sebelum mulai</strong><p>Download paket drill untuk mengerjakan drill secara offline.</p></> : <><p>Sedang Mendownload Paket Drill · {progress}%</p><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="download-warning"><img src={asset('warning.svg')} alt="" /><span>Jangan tutup atau reload halaman ini.<br />Tunggu proses download selesai.</span></div></>}
  </div>;
}

function OfflineGuide({ onReady }: { onReady: () => void }) {
  return <div className="offline-guide">
    <h2>Cara mematikan koneksi internet perangkat</h2>
    <p>Pastikan kamu terlepas dari koneksi internet selama mengerjakan drill offline.</p>
    <div className="guide-tabs"><button className="selected">Android</button><button>iOS</button><button>Windows</button><button>MacOS</button></div>
    <div className="guide-image" role="img" aria-label="Android airplane mode guide" />
    <h3>Cara utama: Aktifkan mode terbang</h3>
    <ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon pesawat untuk mengaktifkan Mode pesawat / Mode terbang.</li><li>Pastikan Wi-Fi juga mati agar internet benar-benar terputus.</li></ol>
    <h3>Alternatif: Atur Melalui Pengaturan</h3>
    <ol><li>Buka Pengaturan → Wi-Fi, lalu matikan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → matikan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya tidak aktif.</li></ol>
    <p>Nama menu dapat berbeda sesuai merek dan versi Android.</p>
    <button className="guide-continue" onClick={onReady}>Saya sudah mematikan internet</button>
  </div>;
}

function ReadyState() {
  return <section className="ready-state"><section className="ready-banner"><img src={asset('checklist-ready-banner.svg')} alt="" /><strong>Kamu sudah siap melaksanakan Drill Soal offline</strong></section><button className="primary-cta" onClick={() => window.dispatchEvent(new CustomEvent('drill:start'))}>Kerjakan Drill</button></section>;
}

type DrillScreen = PreparationState | 'question' | 'confirm' | 'wrong' | 'timeout' | 'online-guide' | 'upload' | 'summary';

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

function DrillSidebar({ current, onClose, onNavigate, onReset }: { current: DrillScreen; onClose: () => void; onNavigate: (screen: DrillScreen) => void; onReset: () => void }) {
  return <div className="drill-menu-overlay" role="presentation" onClick={onClose}><aside className="drill-side-menu" role="dialog" aria-modal="true" aria-label="Drill test navigation" onClick={event => event.stopPropagation()}><button className="drill-menu-close" aria-label="Close test menu" onClick={onClose}>×</button><img className="drill-menu-mark" src={asset('navbar-more.svg')} alt="" /><h2>Drill Offline demo</h2><p>Jump to a state for review.</p><div className="drill-menu-tools"><span>Test controls</span><button onClick={onReset}>Reset session</button></div><div className="drill-menu-items">{(Object.keys(drillScreenLabels) as DrillScreen[]).map(screen => <button className={`drill-menu-item ${current === screen ? 'current' : ''}`} key={screen} onClick={() => { onNavigate(screen); onClose(); }}>{drillScreenLabels[screen]}</button>)}</div></aside></div>;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function QuestionHero({ timer, answered, result }: { timer: number; answered: boolean; result?: 'wrong' | 'timeout' }) {
  return <>
    <div className="question-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Drill Soal</strong></div>
    <div className="question-hero"><div className="question-hero-title"><strong>Drill Soal</strong><span>{drillFixture.subject} - Kelas 12 Kurikulum Merdeka</span></div><button className="finish-button">Akhiri</button><div className={`timer-chip ${result ? 'timer-chip-result' : ''}`}><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><b><i>{result === 'timeout' ? '00' : '00'}</i><em>:</em><i>{result === 'timeout' ? '00' : formatTime(timer).split(':')[0]}</i><em>:</em><i>{result === 'timeout' ? '00' : formatTime(timer).split(':')[1]}</i></b></div></div>
    <div className="question-info"><strong>{result === 'timeout' ? '5' : '1'}/{drillFixture.questionCount}</strong><span className="xp"><span className="xp-mark">XP</span><b>{answered ? 10 : 0}</b></span><span className="score"><i>✓</i> {result === 'timeout' ? 2 : 0} <i className="bad">×</i> {result === 'timeout' ? 3 : 0}</span></div>
  </>;
}

function QuestionCard({ answer, disabled, onAnswer }: { answer: number | null; disabled?: boolean; onAnswer?: (index: number) => void }) {
  return <section className="question-card"><div className="question-card-title"><strong>Soal :</strong><span>Hard</span></div><p className="question-prompt">{drillFixture.question.prompt}</p><div className="options">{drillFixture.question.options.map((option, index) => <button key={option} disabled={disabled} className={`option ${answer === index ? 'option-selected' : ''}`} onClick={() => onAnswer?.(index)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>)}</div><div className="question-report"><span>Soal ini bermasalah?</span><button>⚑ &nbsp; Laporkan</button></div></section>;
}

function QuestionScreen({ timer, answer, onAnswer, onNext, onTimeout }: { timer: number; answer: number | null; onAnswer: (index: number) => void; onNext: () => void; onTimeout: () => void }) {
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={answer !== null} /><div className="question-scroll"><QuestionCard answer={answer} onAnswer={onAnswer} /><button className="prototype-link" onClick={onTimeout}>Uji state waktu habis</button></div><footer className="question-footer"><div className="footer-timer"><span><span className="timer-glyph">◴</span>Waktu kamu tersisa</span><b>{formatTime(timer)}</b></div><button className="secondary-cta" disabled={answer === null} onClick={onNext}>Lanjutkan</button></footer></main>;
}

function ConfirmScreen({ timer, answer, onBack, onSubmit, onTimeout }: { timer: number; answer: number | null; onBack: () => void; onSubmit: () => void; onTimeout: () => void }) {
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={answer !== null} /><div className="question-scroll"><QuestionCard answer={answer} disabled /><button className="prototype-link" onClick={onTimeout}>Uji state waktu habis</button></div><footer className="question-footer confirm-footer"><div><strong>Yakin dengan jawabannya?</strong><span>Klik submit untuk tahu hasilnya, ya</span></div><button className="primary-cta" onClick={onSubmit}>Submit</button></footer></main>;
}

function ResultAnswerScreen({ kind, timer, onContinue }: { kind: 'wrong' | 'timeout'; timer: number; onContinue: () => void }) {
  const timeout = kind === 'timeout';
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={false} result={kind} /><div className="question-scroll"><QuestionCard answer={timeout ? null : 1} disabled /><section className={`result-note ${timeout ? 'result-note-timeout' : ''}`}><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Jawabanmu kurang tepat'}</strong><span>{timeout ? 'Jawabanmu akan dikumpulkan untuk diproses.' : 'Lebih teliti di soal selanjutnya, ya!'}</span></section></div><footer className="question-footer result-footer"><div><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Jawabanmu kurang tepat'}</strong><span>{timeout ? 'Jawabanmu akan dikumpulkan untuk diproses.' : 'Lebih teliti di soal selanjutnya, ya!'}</span></div><button className="primary-cta" onClick={onContinue}>Lanjut</button></footer></main>;
}

function OnlineGuide({ onContinue }: { onContinue: () => void }) {
  return <main className="drill-screen preparation-screen"><Navbar /><div className="content online-content"><HeaderArtwork /><section className="prep-card upload-guide-card"><div className="prep-heading"><h1>Persiapan Mengumpulkan<br />Drill Soal Offline</h1><StepRing value="0/2" /></div><div className="upload-alert"><img className="upload-alert-icon" src={asset('warning.svg')} alt="" /><div><strong>Drill belum dikumpulkan</strong><span>Upload hasil drill supaya jawabanmu tercatat</span></div></div><div className="checklist"><ChecklistItem icon="wifi.svg">Nyalakan Koneksi Internet</ChecklistItem><ChecklistItem icon="test.svg">Upload Hasil Drill Offline</ChecklistItem></div><div className="divider" /><div className="offline-guide"><h2>Cara menyalakan koneksi internet perangkat</h2><div className="guide-tabs"><button className="selected">Android</button><button>iOS</button><button>Windows</button><button>MacOS</button></div><div className="guide-image" role="img" aria-label="Android internet guide" /><h3>Cara utama: Nonaktifkan mode terbang</h3><ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon pesawat untuk menonaktifkan Mode pesawat / Mode terbang.</li><li>Pastikan Wi-Fi juga mati agar internet benar-benar terputus.</li></ol><h3>Alternatif: Atur Melalui Pengaturan</h3><ol><li>Buka Pengaturan → Wi-Fi, lalu matikan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → matikan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya tidak aktif.</li></ol><p>Nama menu dapat berbeda sesuai merek dan versi Android.</p></div></section></div><div className="sticky-actions"><button className="primary-cta" onClick={onContinue}>Lanjutkan</button></div></main>;
}

function UploadScreen({ status, onUpload, onFail }: { status: 'ready' | 'uploading' | 'failed'; onUpload: () => void; onFail: () => void }) {
  return <main className="drill-screen preparation-screen"><Navbar /><div className="content online-content"><HeaderArtwork /><section className="prep-card upload-card"><div className="prep-heading"><h1>Persiapan Mengumpulkan<br />Drill Soal Offline</h1><StepRing value="1/2" /></div><div className="upload-alert"><img className="upload-alert-icon" src={asset('warning.svg')} alt="" /><div><strong>Drill belum dikumpulkan</strong><span>Upload hasil drill supaya jawabanmu tercatat</span></div></div><div className="checklist"><ChecklistItem icon="wifi.svg" status="complete">Nyalakan Koneksi Internet</ChecklistItem><ChecklistItem icon="test.svg">Upload Hasil Drill Offline</ChecklistItem></div><div className="divider" /><div className={`upload-status ${status === 'failed' ? 'upload-status-failed' : ''}`}><div className="download-icon"><img src={asset('download.svg')} alt="" /></div><strong>{status === 'uploading' ? 'Mengunggah hasil drill…' : status === 'failed' ? 'Upload belum berhasil' : 'Download paket tryout sebelum mulai'}</strong><p>{status === 'uploading' ? 'Tunggu sampai proses upload selesai.' : status === 'failed' ? 'Periksa koneksi internet lalu coba lagi.' : 'Download paket tryout untuk mengerjakan tryout secara offline.'}</p>{status === 'uploading' && <div className="progress-track"><span style={{ width: '68%' }} /></div>}{status === 'failed' && <div className="upload-error" role="alert"><img src={asset('warning.svg')} alt="" />Upload gagal. Coba lagi untuk melanjutkan.</div>}</div><button className="prototype-link" onClick={onFail}>Uji upload gagal</button></section></div><div className="sticky-actions"><button className="primary-cta" disabled={status === 'uploading'} onClick={onUpload}>{status === 'uploading' ? 'Mengunggah…' : status === 'failed' ? 'Coba Lagi' : 'Upload & Kumpulkan Hasil'}</button></div></main>;
}

function SummaryScreen({ onRestart }: { onRestart: () => void }) {
  return <main className="drill-screen summary-screen"><Navbar /><div className="summary-breadcrumb"><span>Home</span><b>›</b><span>•••</span><b>›</b><strong>Drill Soal</strong></div><div className="summary-hero"><strong>Hasil Pengerjaan</strong><span><b>{drillFixture.subject}</b> Kelas 10 - IPA</span></div><div className="summary-scroll"><section className="summary-card"><div className="summary-score-panel"><h2>Kamu meraih nilai</h2><div className="summary-score">60</div><div className="summary-xp">Total XP yang kamu dapatkan <b>✪ 180</b></div></div><div className="summary-grid"><div><b>✓</b><span>Benar<strong>6 soal</strong></span></div><div><b>×</b><span>Salah<strong>4 soal</strong></span></div></div><div className="summary-time-grid"><div>Waktu yang diatur<strong>50 menit</strong></div><div>Rata-rata waktu per soal<strong>3 menit/soal</strong></div></div><div className="summary-total">🗎 &nbsp; Total waktu pengerjaan <strong>50 menit 12 detik</strong> <span>(Alokasi waktumu sudah baik!)</span></div><div className="topic-progress"><b>Struktur dan Fungsi Sistem Linear</b><span>80%</span><i><em /></i></div><div className="topic-progress"><b>Struktur dan Fungsi Sistem Komposisi</b><span>80%</span><i><em /></i></div><button className="all-questions">Lihat semua soal⌄</button></section><section className="summary-section"><h2>Pahami lagi materi ini, yuk!</h2><div className="recommendation">⌁ &nbsp; Subbab</div></section><section className="summary-section video-section"><h2>Rekomendasi video untukmu</h2><p>Biar makin paham Trigonometri Pecahan</p><div className="video-placeholder"><div /><div /></div></section></div><footer className="summary-footer"><button className="secondary-cta" onClick={onRestart}>Latihan Lagi</button><button className="primary-cta">Pembahasan</button></footer></main>;
}

function App() {
  const [screen, setScreen] = useState<DrillScreen>('download');
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [timer, setTimer] = useState(15 * 60);
  const [uploadStatus, setUploadStatus] = useState<'ready' | 'uploading' | 'failed'>('ready');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onStart = () => setScreen('question');
    const onMenu = () => setMenuOpen(true);
    window.addEventListener('drill:start', onStart);
    window.addEventListener('drill:menu', onMenu);
    return () => { window.removeEventListener('drill:start', onStart); window.removeEventListener('drill:menu', onMenu); };
  }, []);

  useEffect(() => {
    if (screen !== 'downloading') return;
    const timer = window.setInterval(() => setProgress(value => {
      const next = Math.min(value + 18, 100);
      if (next === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setScreen('offline-guide'), 250);
      }
      return next;
    }), 220);
    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'question' && screen !== 'confirm') return;
    const tick = window.setInterval(() => setTimer(value => {
      if (value <= 1) {
        window.clearInterval(tick);
        setScreen('timeout');
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(tick);
  }, [screen]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll<HTMLElement>('.question-scroll, .summary-scroll, .content').forEach(element => { element.scrollTop = 0; });
  }, [screen]);

  const submitAnswer = () => setScreen(answer === drillFixture.question.answer ? 'online-guide' : 'wrong');
  const upload = () => {
    setUploadStatus('uploading');
    window.setTimeout(() => setScreen('summary'), 700);
  };
  const failUpload = () => setUploadStatus('failed');
  const resetSession = () => { setAnswer(null); setTimer(15 * 60); setProgress(0); setUploadStatus('ready'); setScreen('download'); };
  const navigateFromMenu = (next: DrillScreen) => {
    if (next === 'question') { setAnswer(null); setTimer(15 * 60); }
    if (next === 'confirm') { setAnswer(0); setTimer(15 * 60); }
    if (next === 'downloading') setProgress(26);
    if (next === 'upload') setUploadStatus('ready');
    setScreen(next);
  };

  let content: ReactNode;
  if (screen === 'question') content = <QuestionScreen timer={timer} answer={answer} onAnswer={setAnswer} onNext={() => setScreen('confirm')} onTimeout={() => setScreen('timeout')} />;
  else if (screen === 'confirm') content = <ConfirmScreen timer={timer} answer={answer} onBack={() => setScreen('question')} onSubmit={submitAnswer} onTimeout={() => setScreen('timeout')} />;
  else if (screen === 'wrong' || screen === 'timeout') content = <ResultAnswerScreen kind={screen} timer={timer} onContinue={() => setScreen('online-guide')} />;
  else if (screen === 'online-guide') content = <OnlineGuide onContinue={() => setScreen('upload')} />;
  else if (screen === 'upload') content = <UploadScreen status={uploadStatus} onUpload={upload} onFail={failUpload} />;
  else if (screen === 'summary') content = <SummaryScreen onRestart={resetSession} />;
  else {
    const shownState = screen === 'downloading' ? (progress || 26) : screen;
    content = <main className="app-shell"><Navbar /><div className="content"><HeaderArtwork /><PreparationCard state={screen as PreparationState} onReady={() => setScreen('ready')} /></div>{screen === 'ready' ? <ReadyState /> : <div className="sticky-actions"><button className="primary-cta" disabled={screen === 'offline-guide'} onClick={() => screen === 'download' ? (setProgress(26), setScreen('downloading')) : undefined}>{screen === 'download' ? 'Download Soal' : screen === 'downloading' ? `Mendownload… ${shownState}%` : 'Lanjutkan'}</button></div>}</main>;
  }
  return <div className="drill-review-root">{content}{menuOpen && <DrillSidebar current={screen} onClose={() => setMenuOpen(false)} onNavigate={navigateFromMenu} onReset={resetSession} />}</div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
