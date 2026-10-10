import { StrictMode, useEffect, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { drillFixture, type PreparationState } from './fixtures/drill';
import './styles.css';

const asset = (name: string) => `/assets/figma/${name}`;

function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <button className="icon-button" aria-label="Open product menu"><img src={asset('navbar-more.svg')} alt="" /></button>
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

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function QuestionHero({ timer, answered, result }: { timer: number; answered: boolean; result?: 'wrong' | 'timeout' }) {
  return <>
    <div className="question-hero"><div className="question-hero-title"><strong>Drill Soal</strong><span>{drillFixture.subject} · {drillFixture.topic}</span></div><div className={`timer-chip ${result ? 'timer-chip-result' : ''}`}><span>Waktu kamu tersisa</span><b>{result === 'timeout' ? '00:00' : formatTime(timer)}</b></div></div>
    <div className="question-info"><strong>1/{drillFixture.questionCount}</strong><span className="xp">✦ <b>{answered ? 10 : 0}</b> XP</span><span className="score"><i>✓</i> 0 <i className="bad">×</i> 0</span></div>
  </>;
}

function QuestionCard({ answer, disabled, onAnswer }: { answer: number | null; disabled?: boolean; onAnswer?: (index: number) => void }) {
  return <section className="question-card"><div className="question-card-title"><strong>Soal :</strong><span>Bab 1</span></div><p className="question-prompt">{drillFixture.question.prompt}</p><div className="options">{drillFixture.question.options.map((option, index) => <button key={option} disabled={disabled} className={`option ${answer === index ? 'option-selected' : ''}`} onClick={() => onAnswer?.(index)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>)}</div><div className="question-report"><span>Soal ini bermasalah?</span><button>Laporkan</button></div></section>;
}

function QuestionScreen({ timer, answer, onAnswer, onNext, onTimeout }: { timer: number; answer: number | null; onAnswer: (index: number) => void; onNext: () => void; onTimeout: () => void }) {
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={answer !== null} /><div className="question-scroll"><QuestionCard answer={answer} onAnswer={onAnswer} /><button className="prototype-link" onClick={onTimeout}>Uji state waktu habis</button></div><footer className="question-footer"><button className="secondary-cta" disabled={answer === null} onClick={onNext}>Lanjutkan</button></footer></main>;
}

function ConfirmScreen({ timer, answer, onBack, onSubmit, onTimeout }: { timer: number; answer: number | null; onBack: () => void; onSubmit: () => void; onTimeout: () => void }) {
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={answer !== null} /><div className="question-scroll"><section className="confirm-card"><span className="confirm-icon">?</span><h1>Konfirmasi jawaban</h1><p>Pastikan jawabanmu sudah sesuai sebelum dikirim.</p><div className="confirm-answer"><span>Jawaban kamu</span><strong>{answer === null ? 'Belum dijawab' : `${String.fromCharCode(65 + answer)} · ${drillFixture.question.options[answer]}`}</strong></div><button className="prototype-link" onClick={onTimeout}>Uji state waktu habis</button></section></div><footer className="question-footer confirm-footer"><button className="secondary-cta" onClick={onBack}>Kembali</button><button className="primary-cta" onClick={onSubmit}>Kirim Jawaban</button></footer></main>;
}

function ResultAnswerScreen({ kind, timer, onContinue }: { kind: 'wrong' | 'timeout'; timer: number; onContinue: () => void }) {
  const timeout = kind === 'timeout';
  return <main className="drill-screen question-screen"><Navbar /><QuestionHero timer={timer} answered={false} result={kind} /><div className="question-scroll"><QuestionCard answer={timeout ? null : 0} disabled /><section className={`result-note ${timeout ? 'result-note-timeout' : ''}`}><strong>{timeout ? 'Waktu pengerjaanmu sudah habis' : 'Jawabanmu kurang tepat'}</strong><span>{timeout ? 'Jawabanmu akan dikumpulkan untuk diproses.' : 'Lebih teliti di soal selanjutnya, ya!'}</span></section></div><footer className="question-footer"><button className="primary-cta" onClick={onContinue}>{timeout ? 'Lanjutkan' : 'Lanjutkan'}</button></footer></main>;
}

function OnlineGuide({ onContinue }: { onContinue: () => void }) {
  return <main className="drill-screen preparation-screen"><Navbar /><div className="content online-content"><HeaderArtwork /><section className="prep-card upload-guide-card"><div className="prep-heading"><h1>Persiapan Mengumpulkan<br />Drill Soal Offline</h1><StepRing value="0/2" /></div><div className="checklist"><ChecklistItem icon="wifi.svg">Nyalakan Koneksi Internet</ChecklistItem><ChecklistItem icon="test.svg">Upload Hasil Drill Offline</ChecklistItem></div><div className="divider" /><div className="offline-guide"><h2>Cara menyalakan koneksi internet perangkat</h2><p>Nyalakan koneksi internet untuk mengunggah hasil drill.</p><div className="guide-tabs"><button className="selected">Android</button><button>iOS</button><button>Windows</button><button>MacOS</button></div><div className="guide-image" role="img" aria-label="Android internet guide" /><h3>Cara utama: Nonaktifkan mode terbang</h3><ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat.</li><li>Ketuk ikon pesawat untuk menonaktifkan Mode pesawat.</li><li>Pastikan Wi-Fi atau data seluler sudah menyala.</li></ol></div></section></div><div className="sticky-actions"><button className="primary-cta" onClick={onContinue}>Lanjutkan</button></div></main>;
}

function UploadScreen({ status, onUpload }: { status: 'ready' | 'uploading'; onUpload: () => void }) {
  return <main className="drill-screen preparation-screen"><Navbar /><div className="content online-content"><HeaderArtwork /><section className="prep-card upload-card"><div className="prep-heading"><h1>Persiapan Mengumpulkan<br />Drill Soal Offline</h1><StepRing value="1/2" /></div><div className="checklist"><ChecklistItem icon="wifi.svg" status="complete">Nyalakan Koneksi Internet</ChecklistItem><ChecklistItem icon="test.svg">Upload Hasil Drill Offline</ChecklistItem></div><div className="divider" /><div className="upload-status"><div className="download-icon"><img src={asset(status === 'uploading' ? 'download.svg' : 'test.svg')} alt="" /></div><strong>{status === 'uploading' ? 'Mengunggah hasil drill…' : 'Hasil drill tersimpan di perangkat'}</strong><p>{status === 'uploading' ? 'Tunggu sampai proses upload selesai.' : 'Upload hasil drill supaya jawabanmu tercatat.'}</p>{status === 'uploading' && <div className="progress-track"><span style={{ width: '68%' }} /></div>}</div></section></div><div className="sticky-actions"><button className="primary-cta" disabled={status === 'uploading'} onClick={onUpload}>{status === 'uploading' ? 'Mengunggah…' : 'Upload & Kumpulkan Hasil'}</button></div></main>;
}

function SummaryScreen({ onRestart }: { onRestart: () => void }) {
  return <main className="drill-screen summary-screen"><Navbar /><div className="summary-hero"><strong>Hasil Pengerjaan</strong><span>{drillFixture.subject} · {drillFixture.topic}</span></div><div className="summary-scroll"><section className="summary-card"><h2>Ringkasan hasil drill</h2><div className="summary-score"><strong>8/10</strong><span>Jawaban benar</span></div><div className="summary-grid"><div><b>8</b><span>Benar</span></div><div><b>2</b><span>Salah</span></div><div><b>15:00</b><span>Waktu</span></div></div></section><section className="summary-section"><h2>Rekomendasi belajar</h2><div className="recommendation">Pelajari kembali materi {drillFixture.topic} untuk meningkatkan hasilmu.</div></section></div><footer className="summary-footer"><button className="secondary-cta" onClick={onRestart}>Kembali ke Awal</button><button className="primary-cta" disabled>Lihat Pembahasan</button></footer></main>;
}

function App() {
  const [screen, setScreen] = useState<DrillScreen>('download');
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [timer, setTimer] = useState(15 * 60);
  const [uploadStatus, setUploadStatus] = useState<'ready' | 'uploading'>('ready');

  useEffect(() => {
    const onStart = () => setScreen('question');
    window.addEventListener('drill:start', onStart);
    return () => window.removeEventListener('drill:start', onStart);
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

  const submitAnswer = () => setScreen(answer === drillFixture.question.answer ? 'online-guide' : 'wrong');
  const upload = () => {
    setUploadStatus('uploading');
    window.setTimeout(() => setScreen('summary'), 700);
  };
  if (screen === 'question') return <QuestionScreen timer={timer} answer={answer} onAnswer={setAnswer} onNext={() => setScreen('confirm')} onTimeout={() => setScreen('timeout')} />;
  if (screen === 'confirm') return <ConfirmScreen timer={timer} answer={answer} onBack={() => setScreen('question')} onSubmit={submitAnswer} onTimeout={() => setScreen('timeout')} />;
  if (screen === 'wrong' || screen === 'timeout') return <ResultAnswerScreen kind={screen} timer={timer} onContinue={() => setScreen('online-guide')} />;
  if (screen === 'online-guide') return <OnlineGuide onContinue={() => setScreen('upload')} />;
  if (screen === 'upload') return <UploadScreen status={uploadStatus} onUpload={upload} />;
  if (screen === 'summary') return <SummaryScreen onRestart={() => { setAnswer(null); setTimer(15 * 60); setProgress(0); setUploadStatus('ready'); setScreen('download'); }} />;

  const shownState = screen === 'downloading' ? (progress || 26) : screen;
  return <main className="app-shell"><Navbar /><div className="content"><HeaderArtwork /><PreparationCard state={screen as PreparationState} onReady={() => setScreen('ready')} /></div>{screen === 'ready' ? <ReadyState /> : <div className="sticky-actions"><button className="primary-cta" disabled={screen === 'offline-guide'} onClick={() => screen === 'download' ? (setProgress(26), setScreen('downloading')) : undefined}>{screen === 'download' ? 'Download Soal' : screen === 'downloading' ? `Mendownload… ${shownState}%` : 'Lanjutkan'}</button></div>}</main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
