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
  return <><section className="ready-banner"><img src={asset('checklist-ready-banner.svg')} alt="" /><strong>Kamu sudah siap melaksanakan Drill Soal offline</strong></section><button className="primary-cta" onClick={() => window.dispatchEvent(new CustomEvent('drill:next'))}>Kerjakan Drill</button></>;
}

function App() {
  const [state, setState] = useState<PreparationState>('download');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onNext = () => setState('ready');
    window.addEventListener('drill:next', onNext);
    return () => window.removeEventListener('drill:next', onNext);
  }, []);

  useEffect(() => {
    if (state !== 'downloading') return;
    const timer = window.setInterval(() => setProgress(value => {
      const next = Math.min(value + 18, 100);
      if (next === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setState('offline-guide'), 250);
      }
      return next;
    }), 220);
    return () => window.clearInterval(timer);
  }, [state]);

  const shownState = state === 'downloading' ? (progress || 26) : state;
  return <main className="app-shell"><Navbar /><div className="content"><HeaderArtwork /><PreparationCard state={state} onReady={() => setState('ready')} /></div>{state === 'ready' ? <ReadyState /> : <div className="sticky-actions"><button className="primary-cta" disabled={state === 'offline-guide'} onClick={() => state === 'download' ? (setProgress(26), setState('downloading')) : undefined}>{state === 'download' ? 'Download Soal' : state === 'downloading' ? `Mendownload… ${shownState}%` : 'Lanjutkan'}</button></div>}</main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
