import { StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertCircle, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Info, LayoutGrid, RotateCcw, Wifi, WifiOff } from 'lucide-react';
import { getToOfflineQuestion, TO_OFFLINE_TOTAL_QUESTIONS } from './fixtures/toOfflineQuestions';
import { getScrollOwner, INITIAL_ATTEMPT_SECONDS, isAttemptScreen, NETWORK_WARNING_SECONDS, SCREEN_NAMES, STEP_LABELS, type AttemptSnapshot, type AttemptStatus, type Choice, type NetworkMode, type ScreenId, type UploadStatus } from './state/contract';
import './styles.css';
import './tokens.css';

const A = '/assets/figma/';
const screenNames = SCREEN_NAMES;
const stepLabels = STEP_LABELS;

function Button({ children, disabled, variant = 'primary', onClick, icon }: { children: React.ReactNode; disabled?: boolean; variant?: 'primary' | 'secondary' | 'ghost'; onClick?: () => void; icon?: React.ReactNode }) { return <button className={`button button-${variant}`} disabled={disabled} onClick={onClick}>{icon}{children}</button>; }
function Navbar({ onMenu }: { onMenu: () => void }) { return <nav className="navbar"><button className="icon-button" onClick={onMenu} aria-label="Open menu"><img src={`${A}navbar-more.svg`} alt="" /></button><div className="navbar-brand"><img src={`${A}ruangguru-logo.svg`} className="logo" alt="Ruangguru" /></div><button className="account">Akun Saya <img src={`${A}dropdown.svg`} alt="" /></button></nav>; }
function Hero() { return <div className="hero" aria-hidden="true"><img src={`${A}header-left.svg`} alt="" /><img src={`${A}header-right.svg`} alt="" /></div>; }
function Stepper({ active }: { active: number }) { return <div className="stepper">{stepLabels.map((label, index) => <div className={`step ${index <= active ? 'step-active' : ''}`} key={label}><span>{index < active ? <Check size={12} /> : index + 1}</span><small>{label}</small></div>)}</div>; }
function StickyActions({ primary, secondary = 'Back', onPrimary, onSecondary, disabled = false }: { primary: string; secondary?: string; onPrimary: () => void; onSecondary?: () => void; disabled?: boolean }) { return <div className="sticky-actions"><Button variant="secondary" onClick={onSecondary}>{secondary}</Button><Button disabled={disabled} onClick={onPrimary}>{primary}</Button></div>; }
function ExamCard() { return <section className="card exam-card"><div className="exam-title"><div className="exam-art"><img src={`${A}book-pencil.svg`} alt="" /><img src={`${A}book.svg`} alt="" /><img src={`${A}pencil.svg`} alt="" /></div><div><p className="eyebrow">Tes Potensi Skolastik</p><h2>Kemampuan Memahami Bacaan dan Menulis</h2></div></div><div className="divider" /><div className="exam-stats"><div><img src={`${A}question-count.svg`} alt="" /><p>Jumlah Soal<strong>20 soal</strong></p></div><div><span className="clock-pill"><img src={`${A}clock.png`} alt="" /></span><p className="orange">Waktu Pengerjaan<strong>15 Menit</strong></p></div></div></section>; }
function NoticeIcon() { return <span className="notice-icon"><img src={`${A}alert-paper.svg`} alt="" /><img src={`${A}alert-paper-detail.svg`} alt="" /><img src={`${A}alert-badge.svg`} alt="" /></span>; }
function RulesCard({ checked, setChecked }: { checked: boolean; setChecked: (v: boolean) => void }) { return <section className="card rules-card"><div className="notice"><div className="notice-title"><NoticeIcon /><strong>Hal yang perlu diperhatikan</strong></div><ol><li>Waktu mulai dihitung setelah klik <b>“Mulai Tryout”</b> dan halaman Tryout tidak dapat ditinggalkan.</li><li>Jika waktu habis, <b>sistem otomatis mengumpulkan Tryout.</b></li><li>Sistem mengawasi Tryout. Dilarang <b>membuka atau berpindah</b> tab browser lain.</li><li>Tryout hanya dapat <b>dikerjakan 1 kali.</b></li></ol></div><label className="check-row"><input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} /><span>Saya sudah membaca dan menyetujui aturan Tryout di atas</span></label>{!checked && <p className="error-copy">Klik kotak di atas dulu yuk, biar bisa mulai!</p>}</section>; }
function PreparationCard({ progress, downloading = false }: { progress?: number; downloading?: boolean }) { const visualProgress = progress ?? 0; return <section className="card preparation-card"><div className="preparation-header"><h2>Persiapan Mengerjakan<br />Tryout Offline</h2></div><div className="preparation-item"><img src={`${A}test.svg`} alt="" /><span>Download Soal Tryout Offline</span><img src={`${A}checklist.svg`} alt="" /></div><div className="divider" /><div className="download-panel"><div className="download-icon"><img src={`${A}download.svg`} alt="" /></div><div className="download-copy"><p className={downloading ? 'download-progress-label' : ''}>{downloading ? `Mempersiapkan konten untukmu · ${progress ?? 0}%` : 'Download paket tryout sebelum mulai'}</p>{!downloading && <p className="download-help">Download paket tryout untuk mengerjakan tryout secara offline.</p>}</div>{downloading && <div className="progress"><span style={{ width: `${visualProgress}%` }} /></div>}</div>{downloading && <div className="warning-banner"><img src={`${A}warning.svg`} alt="" /><span>Jangan tutup atau reload halaman ini.<br />Tunggu proses download selesai.</span></div>}</section>; }
function OfflinePreparationCard({ connectionReady = false }: { connectionReady?: boolean }) { return <section className="card offline-preparation-card"><div className="preparation-header"><h2>Persiapan Mengerjakan<br />Tryout Offline</h2></div><div className="preparation-item success"><img src={`${A}test.svg`} alt="" /><span>Download Soal Tryout Offline</span><img src={`${A}checklist-offline-complete.svg`} alt="" /></div><div className={`preparation-item ${connectionReady ? 'success' : ''}`}><img src={`${A}android-guide.svg`} alt="" /><span>Matikan Koneksi Internet</span><img src={`${A}${connectionReady ? 'checklist-ready.svg' : 'checklist-success.svg'}`} alt="" /></div><div className="divider" /><div className="guide-copy"><h3>Cara mematikan koneksi internet perangkat</h3><p>Pastikan kamu terlepas dari koneksi internet selama mengerjakan tryout offline.</p><div className="guide-tabs"><span className="selected">Android</span><span>iOS</span><span>Windows</span><span>MacOS</span></div><img className="guide-image" src={`${A}internet-connection-guide.gif`} alt="Animasi cara mematikan koneksi internet pada Android" /><h4>Cara utama: Aktifkan mode terbang</h4><ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon pesawat untuk mengaktifkan Mode pesawat / Mode terbang.</li><li>Pastikan Wi-Fi juga mati agar internet benar-benar terputus.</li></ol><h4>Alternatif: Atur Melalui Pengaturan</h4><ol><li>Buka Pengaturan → Wi-Fi, lalu matikan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → matikan Data seluler. Jika memakai dua SIM, pastikan data pada keduanya tidak aktif.</li></ol><p>Nama menu dapat berbeda sesuai merek dan versi Android.</p></div></section>; }
function ReadyPreparationCard() { return <><section className="card ready-preparation-card"><div className="preparation-header"><h2>Persiapan Mengerjakan<br />Tryout Offline</h2></div><div className="preparation-item success"><img src={`${A}test.svg`} alt="" /><span>Download Soal Tryout Offline</span><img src={`${A}checklist-ready.svg`} alt="" /></div><div className="preparation-item success"><img src={`${A}android-guide.svg`} alt="" /><span>Matikan Koneksi Internet</span><img src={`${A}checklist-ready.svg`} alt="" /></div></section><div className="ready-banner"><img src={`${A}checklist-ready-banner.svg`} alt="" /><strong>Kamu sudah siap melaksanakan tryout offline</strong></div></>; }
function StartTryoutModal({ onClose, onStart }: { onClose: () => void; onStart: () => void }) { return <div className="start-modal-layer"><div className="start-modal-backdrop" aria-hidden="true" /><section className="start-modal-sheet" role="dialog" aria-modal="true" aria-labelledby="start-modal-title"><button className="start-modal-close" aria-label="Close confirmation" onClick={onClose}>×</button><img className="start-modal-warning" src={`${A}start-tryout-warning.png`} alt="" /><h2 id="start-modal-title">Mulai Tryoutnya Sekarang?</h2><p>Pastikan kamu sudah siap untuk<br />mengerjakan Tryoutnya sampai selesai, ya!</p><strong>Tryout akan segera dimulai dan waktu<br />pengerjaanmu akan mulai dihitung</strong><div className="start-modal-actions"><Button variant="secondary" onClick={onClose}>Kembali</Button><Button onClick={onStart}>Kerjakan Sekarang</Button></div></section></div>; }
function formatTimer(totalSeconds: number) { const hours = Math.floor(totalSeconds / 3600); const minutes = Math.floor((totalSeconds % 3600) / 60); const seconds = totalSeconds % 60; return [hours, minutes, seconds].map(value => String(value).padStart(2, '0')); }
function QuestionOneFigma({ question = 1, choice, doubtful, answers, doubtfulQuestions, onChoiceChange, onDoubtfulChange, onBack, onNext, onOpenMenu, onOpenNavigator, timeRemaining, disabled = false }: { question?: 1 | 2; choice: Choice; doubtful: boolean; answers: Record<number, Choice>; doubtfulQuestions: Set<number>; onChoiceChange: (choice: Choice) => void; onDoubtfulChange: (value: boolean) => void; onBack: () => void; onNext: () => void; onOpenMenu: () => void; onOpenNavigator: () => void; timeRemaining: number; disabled?: boolean }) { const [hours, minutes, seconds] = formatTimer(timeRemaining); const fixture = getToOfflineQuestion(question); const questionState = (number: number) => `${answers[number] ? 'answered' : ''} ${doubtfulQuestions.has(number) ? 'doubtful' : ''}`; return <div className={`question-one ${disabled ? 'question-disabled' : ''}`} data-question-id={fixture.id}><header className="question-header"><button className="question-back" aria-label="Kembali" disabled={disabled} onClick={onBack}>←</button><button className="question-menu" aria-label="Open network simulator" onClick={onOpenMenu}><img src={`${A}navbar-more.svg`} alt="" /></button><strong>KSR 2025 National Round Geografi SMA</strong><div className="timer-boxes"><span>{hours}</span><i>:</i><span>{minutes}</span><i>:</i><span>{seconds}</span></div><div className="offline-pill"><WifiOff size={14} /> {question === 1 ? 'Mode Offline Aktif' : 'Mengerjakan Offline'}</div></header><section className="question-pagination"><strong>Soal {question}/{TO_OFFLINE_TOTAL_QUESTIONS}</strong><div className="page-numbers"><span className={`${question === 1 ? 'current' : ''} ${questionState(1)}`}>1</span><span className={`${question === 2 ? 'current' : ''} ${questionState(2)}`}>2</span><span className={questionState(3)}>3</span><span className={questionState(4)}>4</span><button className="grid-icon" type="button" aria-label="Open question navigator" disabled={disabled} onClick={onOpenNavigator}><LayoutGrid size={22} strokeWidth={1.8} /></button></div></section><section className="instruction-sheet"><strong>Instruksi</strong><ol><li>Kamu perlu menjawab soal di lembar jawaban. Pastikan selalu menuliskan nomor soal.</li><li>Ketika selesai, kamu perlu mengunggah jawabanmu melalui laptop ataupun handphone</li><li>Kamu bisa mengunggah jawaban di soal nomor 4 pada subtes ini</li><li>Untuk jawaban yang tidak diisi, kamu juga wajib untuk mengunggah lembar jawaban yang kosong</li></ol></section><section className="passage-sheet"><strong>{fixture.passageTitle}</strong><div className="passage-scroll"><div className="passage-text">{fixture.passage}</div><section className="question-answer-panel" aria-label={`Jawaban soal ${question}`}><h3>{fixture.stem}</h3><div className="figma-options">{fixture.options.map(option => <button type="button" className={`figma-option ${choice === option.key ? 'selected' : ''}`} disabled={disabled} key={option.key} onClick={() => onChoiceChange(option.key)}><span className="option-key">{option.key}</span><span>{option.text}</span></button>)}</div></section></div></section><footer className="question-sticky"><button onClick={onBack} disabled={disabled} aria-label="Previous question">←</button><button className={`doubtful-button ${doubtful ? 'active' : ''}`} disabled={disabled} onClick={() => onDoubtfulChange(!doubtful)}>{doubtful ? '✓' : '□'} &nbsp; Ragu-ragu</button><button className="next-round" disabled={disabled} onClick={onNext} aria-label="Next question">→</button></footer></div>; }
function NetworkGuideAccordion() { return <details className="network-guide-accordion"><summary><span><WifiOff size={16} />Cara mematikan koneksi internet</span><ChevronDown className="network-guide-chevron" size={18} /></summary><div className="network-guide-content"><ol><li>Aktifkan mode pesawat pada perangkat.</li><li>Pastikan Wi-Fi dan data seluler sudah mati.</li><li>Kembali ke tryout setelah indikator offline aktif.</li></ol></div></details>; }
function NetworkOverlay({ secondsRemaining, terminated, onBackOffline, onContinue }: { secondsRemaining: number | null; terminated: boolean; onBackOffline: () => void; onContinue: () => void }) { return <div className="network-overlay" role="alertdialog" aria-modal="true"><div className="network-overlay-card"><div className={`network-overlay-icon ${terminated ? 'terminated' : ''}`}>{terminated ? <AlertCircle size={28} /> : <Wifi size={28} />}</div><h2>{terminated ? 'Tryout dihentikan' : 'Koneksi internet terdeteksi'}</h2><p>{terminated ? 'Waktu toleransi habis. Jawabanmu dikunci dan siap menunggu proses unggah.' : `Matikan koneksi internet dalam ${secondsRemaining ?? NETWORK_WARNING_SECONDS} detik agar pengerjaan dapat dilanjutkan.`}</p>{!terminated && <NetworkGuideAccordion />}{!terminated && <div className="network-countdown">{String(secondsRemaining ?? NETWORK_WARNING_SECONDS).padStart(2, '0')}<span>detik</span></div>}<div className="network-overlay-actions">{terminated ? <Button onClick={onContinue}>Lanjutkan pengumpulan</Button> : <Button onClick={onBackOffline} icon={<WifiOff size={16} />}>Simulasikan kembali offline</Button>}</div></div></div>; }
function ReviewFigma({ answers, doubtful, timeRemaining, onBack, onSave, disabled = false }: { answers: Record<number, Choice>; doubtful: Set<number>; timeRemaining: number; onBack: () => void; onSave: () => void; disabled?: boolean }) {
  const questionNumbers = Array.from({ length: TO_OFFLINE_TOTAL_QUESTIONS }, (_, index) => index + 1);
  const answeredNumbers = questionNumbers.filter(number => Boolean(answers[number]));
  const skippedNumbers = questionNumbers.filter(number => !answers[number]);
  const doubtfulNumbers = questionNumbers.filter(number => doubtful.has(number));
  const [hours, minutes, seconds] = formatTimer(timeRemaining);
  return <>
    <div className={`review-screen ${disabled ? 'attempt-locked' : ''}`}>
      <Hero />
      <div className="review-title">Simpan Pengerjaan Tryout Sekarang?</div>
      <section className="review-progress-card">
        <div className="review-alert"><img src={`${A}review-alert.svg`} alt="" /><div><div className="review-alert-heading"><img src={`${A}review-info.svg`} alt="" /><strong>Tryout akan dikumpulkan diakhir sesi</strong></div><span>Klik ‘Simpan Pengerjaan’ supaya jawaban tercatat</span></div></div>
        <div className="review-card-body">
          <div className="review-exam-head"><div className="exam-art"><img src={`${A}book-pencil.svg`} alt="" /><img src={`${A}book.svg`} alt="" /><img src={`${A}pencil.svg`} alt="" /></div><div><p className="eyebrow">Tes Potensi Skolastik</p><strong>Kemampuan Memahami Bacaan dan Menulis</strong></div></div>
          <div className="review-progress"><span style={{ width: `${Math.round((answeredNumbers.length / TO_OFFLINE_TOTAL_QUESTIONS) * 100)}%` }} /></div>
          <div className="review-metrics"><div><span>Soal Dijawab</span><b>{answeredNumbers.length}</b></div><div><span>Soal Dilewati</span><b className="red">{skippedNumbers.length}</b></div><div><span>Total Soal</span><b>{TO_OFFLINE_TOTAL_QUESTIONS}</b></div></div>
          <div className="review-divider" />
          <div className="review-time"><span><img src={`${A}review-clock.png`} alt="" /> Sisa Waktu Pengerjaan</span><b><i>{hours}</i><em>:</em><i>{minutes}</i><em>:</em><i>{seconds}</i></b></div>
          <div className="review-info"><img src={`${A}review-info-blue.svg`} alt="" /><span>Masih ada waktu tersisa, nih. Yuk, cek kembali soal dan jawabanmu!</span></div>
        </div>
      </section>
      <h2 className="review-subtitle">Masih ada soal yang dilewati dan ragu-ragu, nih!</h2>
      <section className="review-groups">
        <div className="skipped-group"><strong>{skippedNumbers.length} soal dilewati</strong><p>Lengkapi jawaban kamu untuk dapatkan nilai maksimal, ya!</p><div>{skippedNumbers.map(number => <span key={number}>{number}</span>)}</div></div>
        <div className="review-divider" />
        <div className="doubtful-group"><strong>{doubtfulNumbers.length} soal ragu-ragu</strong><p>Yuk, cek lagi dan pastikan jawaban kamu sudah benar</p><div>{doubtfulNumbers.map(number => <span key={number}><img src={`${A}${answers[number] ? 'review-pagination-blue.svg' : 'review-pagination.svg'}`} alt="" />{number}<i /></span>)}</div></div>
      </section>
    </div>
    <div className="review-actions"><Button variant="secondary" disabled={disabled} onClick={onBack}>Kembali ke Soal</Button><Button disabled={disabled} onClick={onSave}>Simpan Pengerjaan</Button></div>
  </>;
}
function SaveResultModal({ answers, doubtful, timeRemaining, onBack, onSave, disabled = false }: { answers: Record<number, Choice>; doubtful: Set<number>; timeRemaining: number; onBack: () => void; onSave: () => void; disabled?: boolean }) {
  const questionNumbers = Array.from({ length: TO_OFFLINE_TOTAL_QUESTIONS }, (_, index) => index + 1);
  const skippedCount = questionNumbers.filter(number => !answers[number]).length;
  const doubtfulCount = questionNumbers.filter(number => doubtful.has(number)).length;
  const [hours, minutes, seconds] = formatTimer(timeRemaining);
  return <div className="save-modal-layer"><div className="save-modal-underlay"><ReviewFigma answers={answers} doubtful={doubtful} timeRemaining={timeRemaining} disabled={disabled} onBack={() => undefined} onSave={() => undefined} /></div><div className="save-modal-overlay" /><section className={`save-modal ${disabled ? 'attempt-locked' : ''}`}><img className="save-warning-image" src={`${A}save-warning.png`} alt="" /><div className="save-modal-copy"><h2>Cek lagi jawabanmu sebelum pindah ke subtes berikutnya, ya!</h2><div className="save-scores"><div><span>Soal Dilewati</span><b>{skippedCount}</b></div><div><span>Soal Ragu-Ragu</span><b>{doubtfulCount}</b></div></div><div className="save-time"><img src={`${A}review-clock.png`} alt="" /><span>Sisa Waktu Pengerjaan</span><b><i>{hours}</i><em>:</em><i>{minutes}</i><em>:</em><i>{seconds}</i></b></div><p>Periksa lagi soal-soal dan jawabanmu dulu, ya!<br />Kamu tidak bisa kembali lagi ke soal tryout<br />jika Tryoutnya sudah dikumpulkan</p></div><div className="save-modal-actions"><Button disabled={disabled} onClick={onBack}>Kembali ke Soal</Button><Button disabled={disabled} variant="secondary" onClick={onSave}>Simpan Pengerjaan</Button></div></section></div>;
}
function NextSubtestFigma({ onBack, onNext, disabled = false }: { onBack: () => void; onNext: () => void; disabled?: boolean }) { return <div className={`next-subtest-screen ${disabled ? 'attempt-locked' : ''}`}><div className="next-subtest-hero"><button aria-label="Kembali" disabled={disabled} onClick={onBack}>←</button><strong>Simulasi KSR 2025 Regional Round Geografi SMA</strong></div><section className="next-summary"><b>3/8</b><span>Subtes selesai dikerjakan</span></section><section className="next-card"><h2>Tes selanjutnya</h2><div className="next-rule" /><div className="next-test"><div className="exam-art"><img src={`${A}book-pencil.svg`} alt="" /><img src={`${A}book.svg`} alt="" /><img src={`${A}pencil.svg`} alt="" /></div><div><p>Kompetisi Sains Ruangguru</p><strong>Essai</strong></div></div><div className="next-rule" /><div className="next-stats"><div><img src={`${A}question-count.svg`} alt="" /><span>Jumlah soal<strong>20 soal</strong></span></div><div><img src={`${A}clock.png`} alt="" /><span>Waktu pengerjaan<strong>210 menit</strong></span></div></div></section><div className="next-countdown">Otomatis selanjutnya dalam 45 detik</div><div className="next-progress"><span /></div><div className="next-action"><Button disabled={disabled} onClick={onNext}>Kerjakan Subtes Selanjutnya</Button></div></div>; }
function UploadPreparationFigma({ half = false, disabled = false, connectionReady = half, onUpload, syncStatus = 'saved', uploadStatus = 'idle' }: { half?: boolean; disabled?: boolean; connectionReady?: boolean; onUpload: () => void; syncStatus?: 'saved' | 'pending_sync'; uploadStatus?: UploadStatus }) {
  const firstStepComplete = half || connectionReady;
  return <div className="upload-prep-screen"><Hero /><section className="upload-prep-card"><div className="preparation-header"><h2>Persiapan Mengumpulkan<br />Tryout Offline</h2></div><div className="upload-alert"><img src={`${A}review-alert.svg`} alt="" /><div><strong>Tryout belum dikumpulkan</strong><span>Upload hasil tryout supaya jawabanmu tercatat</span></div></div><div className="upload-items"><div className={firstStepComplete ? 'success' : ''}><img src={`${A}wifi.svg`} alt="" /><span>Nyalakan Koneksi Internet</span><img src={`${A}${firstStepComplete ? 'checklist-ready.svg' : 'checklist.svg'}`} alt="" /></div><div><img src={`${A}test.svg`} alt="" /><span>Upload Hasil Tryout Offline</span><img src={`${A}checklist.svg`} alt="" /></div></div><div className="divider" />{half ? <><div className="download-panel upload-download"><div className="download-icon"><img src={`${A}download.svg`} alt="" /></div><div className="download-copy"><p>Hasil tryout tersimpan di perangkat</p><p className="download-help">Nyalakan koneksi internet untuk mengunggah jawaban.</p></div></div>{syncStatus === 'pending_sync' && <div className="sync-status"><RotateCcw size={16} /> Menunggu sinkronisasi hasil tryout</div>}{uploadStatus === 'failed' && <div className="upload-error" role="alert"><AlertCircle size={16} /> Upload gagal. Periksa koneksi lalu coba lagi.</div>}{uploadStatus === 'uploading' && <div className="sync-status upload-progress-status"><RotateCcw size={16} /> Mengunggah hasil tryout...</div>}</> : <div className="upload-guide"><h3>Cara menyalakan koneksi internet perangkat</h3><div className="guide-tabs"><span className="selected">Android</span><span>iOS</span><span>Windows</span><span>MacOS</span></div><img className="upload-guide-image" src={`${A}internet-connection-guide-reversed.gif`} alt="Animasi cara menyalakan koneksi internet pada Android" /><h4>Cara utama: Aktifkan Wi-Fi dan data seluler</h4><ol><li>Geser layar dari atas ke bawah untuk membuka panel pengaturan cepat. Geser lagi jika diperlukan.</li><li>Ketuk ikon Wi-Fi dan Data seluler untuk menyalakan keduanya.</li><li>Pastikan indikator koneksi internet sudah aktif sebelum melanjutkan.</li></ol><h4>Alternatif: Atur Melalui Pengaturan</h4><ol><li>Buka Pengaturan → Wi-Fi, lalu nyalakan Wi-Fi.</li><li>Buka Jaringan seluler / Kartu SIM → nyalakan Data seluler.</li></ol></div>}</section><div className="upload-prep-action"><Button disabled={disabled || uploadStatus === 'uploading'} onClick={onUpload}>{half ? (uploadStatus === 'failed' ? 'Coba Lagi' : uploadStatus === 'uploading' ? 'Mengunggah…' : 'Upload & Kumpulkan Tryout') : 'Lanjutkan'}</Button></div></div>;
}
function ResultFigma() { return <div className="result-figma-screen"><div className="result-hero"><strong>Hasil Tryout</strong><span>Tryout UTBK Episode 8</span></div><section className="result-profile"><img src={`${A}result-account.png`} alt="" /><div><span>Putri Anjani</span><strong>PutriAnjani@gmail.com</strong></div></section><section className="result-waiting"><img src={`${A}result-waiting.png`} alt="" /><h2>Hasil tryout-mu sedang disiapkan</h2><p>Hasil rasionalisasi akan diumumkan pada tanggal<br /><b>29 Januari 2022</b></p></section><section className="result-summary"><div className="result-summary-head"><strong>Rangkuman penilaian</strong><span>Lihat Detail</span></div><div className="result-score"><div><b>120</b><span>Benar</span></div><div><b>40</b><span>Salah</span></div><div><b>20</b><span>Dilewati</span></div></div><div className="result-time"><img src={`${A}review-clock.png`} alt="" /><span>Waktu pengerjaan</span><b>03:32:21</b></div></section><div className="result-action"><Button onClick={() => undefined}>Lihat Pembahasan</Button></div></div>; }
function OfflineGuide({ turnOn = false }: { turnOn?: boolean }) { const title = turnOn ? 'Turn on your internet connection' : 'Turn off your internet connection'; return <section className="card guide-card"><div className={`network-illustration ${turnOn ? 'online' : ''}`}><WifiOff size={36} /></div><h2>{title}</h2><p>{turnOn ? 'Your answers are saved. Turn on Wi-Fi or mobile data to upload your result.' : 'To prevent interruptions, turn off Wi-Fi and mobile data before starting.'}</p><div className="platform-tabs"><span className="selected">Android</span><span>iOS</span><span>Windows</span><span>macOS</span></div><div className="guide-list"><div><b>1</b><span>Open your device settings.</span></div><div><b>2</b><span>Turn {turnOn ? 'on' : 'off'} Wi-Fi and mobile data.</span></div><div><b>3</b><span>Return here when the connection status changes.</span></div></div><div className={`connection-pill ${turnOn ? 'online' : ''}`}>{turnOn ? <Wifi size={16} /> : <WifiOff size={16} />} {turnOn ? 'Internet connection detected' : 'Waiting for offline mode'}</div></section>; }
function QuestionCard({ question, choice, setChoice, doubtful, setDoubtful }: { question: number; choice: Choice; setChoice: (c: Choice) => void; doubtful: boolean; setDoubtful: (v: boolean) => void }) { const options = [['A', 'A sentence that states a main idea'], ['B', 'A detail that supports the argument'], ['C', 'A question with no clear answer'], ['D', 'A title without any context']] as const; return <section className="card question-card"><div className="question-meta"><span>Question {question} of 20</span><span className="timer"><Clock3 size={15} /> 14:32</span></div><h2>What is the function of the second paragraph in the passage?</h2><p className="passage">Reading well means connecting information, weighing evidence, and understanding how each idea supports the writer’s purpose.</p><div className="options">{options.map(([key, text]) => <label className={`option ${choice === key ? 'selected' : ''}`} key={key}><input type="radio" name={`question-${question}`} checked={choice === key} onChange={() => setChoice(key)} /><span className="option-key">{key}</span><span>{text}</span></label>)}</div><label className="doubtful"><input type="checkbox" checked={doubtful} onChange={e => setDoubtful(e.target.checked)} /><span>Mark as doubtful</span></label></section>; }
function ReviewCard({ answers, doubtful }: { answers: Record<number, Choice>; doubtful: Set<number> }) { return <section className="card review-card"><h2>Review your answers</h2><p>Check the questions you want to revisit before saving this subtest.</p><div className="review-summary"><div><strong>{Object.values(answers).filter(Boolean).length}</strong><span>Answered</span></div><div><strong>{20 - Object.values(answers).filter(Boolean).length}</strong><span>Skipped</span></div><div><strong>{doubtful.size}</strong><span>Doubtful</span></div></div><div className="question-grid">{Array.from({ length: 20 }, (_, i) => <span className={`${answers[i + 1] ? 'answered' : ''} ${doubtful.has(i + 1) ? 'doubtful-dot' : ''}`} key={i}>{i + 1}</span>)}</div></section>; }
function ResultCard() { return <section className="card result-card"><div className="result-icon"><Check size={25} /></div><p className="eyebrow">Tryout submitted</p><h2>Your result is being prepared</h2><p>We are processing your answers. You can check back here shortly.</p><div className="result-status"><span className="pulse" /> Processing result</div><Button variant="secondary" onClick={() => undefined}>View discussion when ready <ChevronRight size={16} /></Button></section>; }

function App() {
  const [screen, setScreen] = useState<ScreenId>(1); const [reviewOrigin, setReviewOrigin] = useState<7 | 8>(7); const [consent, setConsent] = useState(false); const [downloadProgress, setDownloadProgress] = useState(0); const [answers, setAnswers] = useState<Record<number, Choice>>({}); const [doubtful, setDoubtful] = useState<Set<number>>(new Set()); const [network, setNetwork] = useState<NetworkMode>('online'); const networkRef = useRef<NetworkMode>(network); const [attemptStatus, setAttemptStatus] = useState<AttemptStatus>('not_started'); const [timeRemaining, setTimeRemaining] = useState(INITIAL_ATTEMPT_SECONDS); const [networkWarningSeconds, setNetworkWarningSeconds] = useState<number | null>(null); const [syncStatus, setSyncStatus] = useState<'saved' | 'pending_sync'>('saved'); const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle'); const uploadRunRef = useRef(0); const [menuOpen, setMenuOpen] = useState(false); const [restored, setRestored] = useState(false);
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem('ruanguji-to-offline-attempt');
      if (raw) {
        const snapshot = JSON.parse(raw) as Partial<AttemptSnapshot>;
        if (typeof snapshot.screen === 'number' && snapshot.screen >= 1 && snapshot.screen <= 14) setScreen(snapshot.screen as ScreenId);
        if (snapshot.reviewOrigin === 7 || snapshot.reviewOrigin === 8) setReviewOrigin(snapshot.reviewOrigin);
        if (typeof snapshot.consent === 'boolean') setConsent(snapshot.consent);
        if (typeof snapshot.downloadProgress === 'number') setDownloadProgress(snapshot.downloadProgress);
        if (snapshot.answers && typeof snapshot.answers === 'object') setAnswers(snapshot.answers);
        if (Array.isArray(snapshot.doubtful)) setDoubtful(new Set(snapshot.doubtful));
        if (snapshot.network === 'online' || snapshot.network === 'offline') setNetwork(snapshot.network);
        if (snapshot.attemptStatus) setAttemptStatus(snapshot.attemptStatus);
        if (typeof snapshot.timeRemaining === 'number') setTimeRemaining(snapshot.timeRemaining);
        if (snapshot.networkWarningSeconds === null || typeof snapshot.networkWarningSeconds === 'number') setNetworkWarningSeconds(snapshot.networkWarningSeconds);
        if (snapshot.syncStatus === 'saved' || snapshot.syncStatus === 'pending_sync') setSyncStatus(snapshot.syncStatus);
        if (snapshot.uploadStatus === 'failed' || snapshot.uploadStatus === 'idle') setUploadStatus(snapshot.uploadStatus);
        if (snapshot.uploadStatus === 'uploading') {
          setUploadStatus('failed');
          setSyncStatus('pending_sync');
        }
      }
    } catch {
      window.sessionStorage.removeItem('ruanguji-to-offline-attempt');
    } finally {
      setRestored(true);
    }
  }, []);
  useEffect(() => {
    if (!restored) return;
    const snapshot: AttemptSnapshot = { screen, reviewOrigin, consent, downloadProgress, answers, doubtful: Array.from(doubtful), network, attemptStatus, timeRemaining, networkWarningSeconds, syncStatus, uploadStatus };
    window.sessionStorage.setItem('ruanguji-to-offline-attempt', JSON.stringify(snapshot));
  }, [restored, screen, reviewOrigin, consent, downloadProgress, answers, doubtful, network, attemptStatus, timeRemaining, networkWarningSeconds, syncStatus, uploadStatus]);
  useEffect(() => { networkRef.current = network; }, [network]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    document.querySelectorAll<HTMLElement>('.question-one, .passage-scroll, .review-content, .upload-prep-screen').forEach(container => {
      container.scrollTop = 0;
    });
  }, [screen]);
  useEffect(() => { if ((screen !== 2 && screen !== 3) || downloadProgress >= 100) return; const timer = window.setInterval(() => setDownloadProgress(value => Math.min(100, value + 20)), 350); return () => window.clearInterval(timer); }, [screen, downloadProgress]);
  useEffect(() => { if (downloadProgress === 100 && (screen === 2 || screen === 3)) { const timer = window.setTimeout(() => setScreen(4), 400); return () => window.clearTimeout(timer); } }, [downloadProgress, screen]);
  useEffect(() => { if (screen === 5 && network === 'online') setScreen(4); }, [network, screen]);
  // The attempt boundary covers answering, review, save confirmation, and the
  // next-subtest transition. Upload preparation starts after this boundary.
  const attemptScreen = isAttemptScreen(screen);
  const attemptLocked = attemptScreen && network === 'online' && attemptStatus !== 'terminated';
  useEffect(() => {
    if (!attemptScreen || attemptStatus === 'terminated' || network === 'offline') {
      setNetworkWarningSeconds(null);
      return;
    }
    setNetworkWarningSeconds(value => value ?? NETWORK_WARNING_SECONDS);
  }, [attemptStatus, attemptScreen, network]);
  useEffect(() => {
    if (!attemptScreen || attemptStatus === 'terminated' || network !== 'online' || networkWarningSeconds === null) return;
    const timer = window.setInterval(() => setNetworkWarningSeconds(value => {
      if (value === null) return value;
      if (value <= 1) {
        setAttemptStatus('terminated');
        setSyncStatus('pending_sync');
        return null;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [attemptScreen, attemptStatus, network, networkWarningSeconds]);
  useEffect(() => {
    if (!attemptScreen || attemptStatus === 'terminated' || network !== 'offline') return;
    const timer = window.setInterval(() => setTimeRemaining(value => {
      if (value <= 1) {
        setAttemptStatus('terminated');
        setSyncStatus('pending_sync');
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [attemptScreen, attemptStatus, network]);
  const activeStep = useMemo(() => screen <= 1 ? 0 : screen <= 3 ? 1 : screen <= 6 ? 2 : 3, [screen]); const nextQuestion = (question: number) => { setAttemptStatus(question === 1 ? 'active' : 'reviewing'); if (question === 2) setReviewOrigin(8); setScreen(question === 1 ? 8 : 9); }; const openReview = (question: 1 | 2) => { if (attemptLocked) return; setReviewOrigin(question === 1 ? 7 : 8); setAttemptStatus('reviewing'); setScreen(9); }; const setAnswer = (question: number, choice: Choice) => setAnswers(current => ({ ...current, [question]: choice })); const toggleDoubtful = (question: number, value: boolean) => setDoubtful(current => { const next = new Set(current); value ? next.add(question) : next.delete(question); return next; });
  const startAttempt = () => { setAttemptStatus('active'); setTimeRemaining(INITIAL_ATTEMPT_SECONDS); setSyncStatus('saved'); setUploadStatus('idle'); setScreen(7); };
  const startUpload = () => {
    if (network !== 'online' || uploadStatus === 'uploading') return;
    const uploadRun = ++uploadRunRef.current;
    setUploadStatus('uploading');
    window.setTimeout(() => {
      if (uploadRun !== uploadRunRef.current) return;
      if (networkRef.current === 'online') {
        setUploadStatus('idle');
        setSyncStatus('saved');
        setScreen(14);
      } else {
        setUploadStatus('failed');
        setSyncStatus('pending_sync');
      }
    }, 900);
  };
  const setNetworkMode = (mode: NetworkMode) => { setNetwork(mode); setMenuOpen(false); };
  const resetSimulation = () => {
    uploadRunRef.current += 1;
    window.sessionStorage.removeItem('ruanguji-to-offline-attempt');
    setScreen(1);
    setReviewOrigin(7);
    setConsent(false);
    setDownloadProgress(0);
    setAnswers({});
    setDoubtful(new Set());
    setNetwork('online');
    setAttemptStatus('not_started');
    setTimeRemaining(INITIAL_ATTEMPT_SECONDS);
    setNetworkWarningSeconds(null);
    setSyncStatus('saved');
    setUploadStatus('idle');
    setMenuOpen(false);
  };
  const renderScreen = () => { switch (screen) {
    case 1: return <><Hero /><ExamCard /><RulesCard checked={consent} setChecked={setConsent} /><StickyActions primary="Lanjutkan" secondary="Kembali" disabled={!consent} onPrimary={() => setScreen(2)} onSecondary={() => setMenuOpen(true)} /></>;
    case 2: return <><Hero /><PreparationCard progress={downloadProgress} downloading /><div className="preparation-spacer" /><div className="single-action"><Button disabled>Lanjutkan</Button></div></>;
    case 3: return <><Hero /><PreparationCard progress={downloadProgress} downloading /><div className="preparation-spacer" /><div className="single-action"><Button disabled>Lanjutkan</Button></div></>;
    case 4: return <><Hero /><OfflinePreparationCard connectionReady={network === 'offline'} /><div className="after-guide-action"><Button disabled={network !== 'offline'} onClick={() => setScreen(6)}>Kerjakan Tryout</Button></div></>;
    case 5: return <><Hero /><ReadyPreparationCard /><div className="single-action"><Button onClick={() => setScreen(6)}>Kerjakan Tryout</Button></div></>;
    case 6: return <StartTryoutModal onClose={() => setScreen(5)} onStart={startAttempt} />;
    case 7: return <QuestionOneFigma answers={answers} doubtfulQuestions={doubtful} choice={answers[1] ?? null} doubtful={doubtful.has(1)} onChoiceChange={choice => setAnswer(1, choice)} onDoubtfulChange={value => toggleDoubtful(1, value)} timeRemaining={timeRemaining} disabled={attemptLocked || attemptStatus === 'terminated'} onOpenMenu={() => setMenuOpen(true)} onOpenNavigator={() => openReview(1)} onBack={() => setScreen(6)} onNext={() => setScreen(8)} />;
    case 8: return <QuestionOneFigma question={2} answers={answers} doubtfulQuestions={doubtful} choice={answers[2] ?? null} doubtful={doubtful.has(2)} onChoiceChange={choice => setAnswer(2, choice)} onDoubtfulChange={value => toggleDoubtful(2, value)} timeRemaining={timeRemaining} disabled={attemptLocked || attemptStatus === 'terminated'} onOpenMenu={() => setMenuOpen(true)} onOpenNavigator={() => openReview(2)} onBack={() => setScreen(7)} onNext={() => nextQuestion(2)} />;
    case 9: return <ReviewFigma answers={answers} doubtful={doubtful} timeRemaining={timeRemaining} disabled={attemptLocked} onBack={() => { if (attemptLocked) return; setAttemptStatus('active'); setScreen(reviewOrigin); }} onSave={() => { if (attemptLocked) return; setAttemptStatus('locked'); setScreen(10); }} />;
    case 10: return <SaveResultModal answers={answers} doubtful={doubtful} timeRemaining={timeRemaining} disabled={attemptLocked} onBack={() => { if (attemptLocked) return; setAttemptStatus('reviewing'); setScreen(9); }} onSave={() => { if (attemptLocked) return; setAttemptStatus('locked'); setScreen(12); }} />;
    case 11: return <NextSubtestFigma disabled={attemptLocked} onBack={() => setScreen(10)} onNext={startAttempt} />;
    case 12: return <UploadPreparationFigma connectionReady={network === 'online'} disabled={network !== 'online'} onUpload={() => { setUploadStatus('idle'); setScreen(13); }} />;
    case 13: return <UploadPreparationFigma half disabled={network !== 'online'} syncStatus={syncStatus} uploadStatus={uploadStatus} onUpload={startUpload} />;
    case 14: return <ResultFigma />;
  } };
  const scrollOwner = getScrollOwner(screen);
  return <main className={`app-shell ${screen === 6 ? 'modal-shell' : ''} ${screen >= 7 && screen <= 8 ? 'question-shell' : ''} ${screen === 11 ? 'next-subtest-shell' : ''}`}><Navbar onMenu={() => setMenuOpen(true)} /><div data-screen-id={screen} data-scroll-owner={scrollOwner} className={`screen-content ${screen === 9 ? 'review-content' : ''} ${screen === 14 ? 'result-content' : ''} ${screen === 12 || screen === 13 ? 'upload-content' : ''}`}>{renderScreen()}</div>{attemptScreen && (networkWarningSeconds !== null || attemptStatus === 'terminated') && <NetworkOverlay secondsRemaining={networkWarningSeconds} terminated={attemptStatus === 'terminated'} onBackOffline={() => setNetworkMode('offline')} onContinue={() => { setAttemptStatus('locked'); setScreen(12); }} />}{menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}><aside className="side-menu" onClick={event => event.stopPropagation()}><button className="menu-close" onClick={() => setMenuOpen(false)}>×</button><h2>TO Offline demo</h2><p>Jump to a screen for review.</p><div className="menu-network"><span>Connection simulation</span><div><button onClick={() => setNetworkMode('offline')} className={network === 'offline' ? 'active' : ''}><WifiOff size={14} /> Offline</button><button onClick={() => setNetworkMode('online')} className={network === 'online' ? 'active' : ''}><Wifi size={14} /> Online</button></div></div><button className="menu-item reset-simulation" onClick={resetSimulation}>↻ Reset Simulasi</button>{Object.keys(screenNames).map(key => { const id = Number(key) as ScreenId; return <button className={`menu-item ${id === screen ? 'current' : ''}`} key={id} onClick={() => { setScreen(id); setMenuOpen(false); }}>{String(id).padStart(2, '0')} {screenNames[id]}</button>; })}</aside></div>}</main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
