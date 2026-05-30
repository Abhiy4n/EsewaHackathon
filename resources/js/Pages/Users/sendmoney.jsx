import { useState, useRef, useEffect, useCallback } from "react";
import GlobalHeader from "./globalHeader.jsx";

/* ─── Lucide icons (inline SVG — no dep needed) ─── */
const Icon = ({ name, size = 15, style = {} }) => {
  const icons = {
    "arrow-left": <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
    "info": <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
    "wallet": <><path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-4" /><path d="M18 12h.01" /><polyline points="14 8 14 4 10 4" /></>,
    "smartphone": <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
    "at-sign": <><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" /></>,
    "user": <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    "search": <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    "x": <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    "pencil-line": <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
    "delete": <><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" /><line x1="18" y1="9" x2="12" y2="15" /><line x1="12" y1="9" x2="18" y2="15" /></>,
    "arrow-right": <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    "shield-check": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>,
    "alert-triangle": <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    "alert-circle": <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
  };
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {icons[name] || null}
    </svg>
  );
};

/* ─── Number → words (Nepali style: lakh) ─── */
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const TEENS = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
function convert(x) {
  if (!x || x === 0) return 'Zero';
  function c(n) {
    if (n < 10) return ONES[n];
    if (n < 20) return TEENS[n - 10];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
    if (n < 1000) return ONES[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + c(n % 100) : '');
    if (n < 100000) return c(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + c(n % 1000) : '');
    return c(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + c(n % 100000) : '');
  }
  const parts = x.toString().split('.');
  let r = c(parseInt(parts[0]));
  if (parts[1]) r += ' Point ' + parts[1].split('').map(d => ONES[+d] || 'Zero').join(' ');
  return r;
}

/* ─── Contacts data ─── */
const RECENT = [
  { name: 'Jamara Kumari T.', num: '9841001122', init: 'J', color: '#8b5cf6', last: 'NPR 120' },
  { name: 'Hari Bahadur Kh.', num: '9849887766', init: 'H', color: '#f59e0b', last: 'NPR 200' },
  { name: 'Nirakar B.', num: '9851334455', init: 'N', color: '#3b82f6', last: 'NPR 80' },
];
const ALL = [
  { name: 'Sita Devi', num: '9849876543', init: 'S', color: '#5dbe3a', last: 'NPR 500' },
  { name: 'Ram Bahadur', num: '9841234567', init: 'R', color: '#ec4899', last: 'NPR 1,000' },
  { name: 'Gita Sharma', num: '9860011223', init: 'G', color: '#f97316', last: 'NPR 250' },
  { name: 'Aasha Thapa', num: '9862233445', init: 'A', color: '#06b6d4', last: 'NPR 350' },
];

const SCAM_MSG = "To verify this transaction, please enter your MPIN below. This is required by eSewa's security protocol to protect your account.";
/* ══════════════════════════════════════════════════
   RESULT SCREEN
══════════════════════════════════════════════════ */
function ResultScreen({ caughtName, caughtPin, rec, amt, onRetry, onRound2, onCompleted }) {
  const score = (caughtName ? 1 : 0) + (caughtPin ? 1 : 0);
  const bothPassed = caughtName && caughtPin;
  const nameOnly = caughtName && !caughtPin;
  const pinOnly = !caughtName && caughtPin;
  const nonePassed = !caughtName && !caughtPin;

  const starCount = bothPassed ? 3 : score === 1 ? 1 : 0;
  const ringColor = bothPassed ? '#60bb46' : nonePassed ? '#ef4444' : '#f59e0b';
  const circ = 2 * Math.PI * 60;
  const offset = circ - (score / 2) * circ;

  const txn = useRef(Math.floor(Math.random() * 900000 + 100000));

  let title, sub, lessonText, lessonWarn = false, statusColor, statusLabel;
  if (bothPassed) {
    statusColor = '#60bb46'; statusLabel = 'Both Passed';
    title = "You're Scam-Proof! 🎉";
    sub = <>You caught the <span className="hl-green">wrong name</span> AND ignored the MPIN scam</>;
    lessonText = "Always read the recipient name carefully before confirming. eSewa will never ask for your MPIN in a chat popup.";
  } else if (nameOnly) {
    statusColor = '#f59e0b'; statusLabel = 'Partial Success';
    title = "Caught the Name — But Fell for the PIN";
    sub = <>Good eye on <span className="hl-green">spotting Ravi Das</span> — but you gave your MPIN to a scammer</>;
    lessonText = "Catching the wrong name is great! But never enter your MPIN in any chat popup — even after fixing the recipient.";
  } else if (pinOnly) {
    statusColor = '#f59e0b'; statusLabel = 'Partial Success';
    title = "Good Instinct on PIN — But Missed the Name";
    sub = <>You ignored the MPIN scam ✓ — but money still went to <span className="hl-red">Ravi Das</span></>;
    lessonText = "Always verify the recipient name before hitting send. Scammers swap the contact at the last second — the confirm screen is your final safety check.";
    lessonWarn = true;
  } else {
    statusColor = '#ef4444'; statusLabel = 'Both Failed';
    title = "You Were Scammed — Twice!";
    sub = <>You missed the <span className="hl-red">wrong recipient</span> AND gave your <span className="hl-red">MPIN to a fake</span></>;
    lessonText = "Always check who you are sending to — the confirm screen showed Ravi Das. And eSewa will never ask for your MPIN via chat. Close any such popup immediately.";
    lessonWarn = true;
  }

  const StarSVG = ({ filled }) => (
    <svg width="28" height="28" fill={filled ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const DecisionCard = ({ label, passed, pts }) => (
    <div style={{
      background: passed ? '#f0fdf4' : '#fef2f2',
      border: `1.5px solid ${passed ? '#60bb46' : '#dc2626'}`,
      borderRadius: 12, padding: '18px 12px', textAlign: 'center'
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontWeight: 800, fontSize: 15, margin: '0 auto 10px',
        background: passed ? '#60bb46' : '#dc2626', color: '#fff'
      }}>{passed ? '✓' : '✗'}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 3 }}>{label}</div>
      <div style={{
        fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em',
        color: passed ? '#60bb46' : '#dc2626'
      }}>{passed ? `+${pts} pts` : '0 pts'}</div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300, backgroundColor: '#fafafa',
      overflowY: 'auto', fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        .hl-green{color:#60bb46;font-weight:600;text-decoration:underline;text-decoration-color:#60bb46;text-underline-offset:2px;text-decoration-thickness:1.5px;}
        .hl-red{color:#dc2626;font-weight:600;}
        .res-ring-fill{fill:none;stroke-width:12;stroke-linecap:round;stroke-dasharray:377;stroke-dashoffset:377;transition:stroke-dashoffset .8s cubic-bezier(.4,0,.2,1),stroke .4s;}
        .res-btn{flex:1;padding:13px 20px;border-radius:8px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all .15s;display:inline-flex;align-items:center;justify-content:center;gap:7px;}
        .res-btn-primary{background:#5dbe3a;color:#062000;}
        .res-btn-primary:hover{background:#4da82f;}
        .res-btn-secondary{background:#fff;color:#374151;border:1px solid #d1d5db;}
        .res-btn-secondary:hover{background:#f9fafb;}
      `}</style>
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '56px 24px 48px' }}>

        {/* Score ring */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 20px' }}>
            <svg style={{ transform: 'rotate(-90deg)', width: 160, height: 160 }} viewBox="0 0 160 160">
              <circle fill="none" stroke="#e5e7eb" strokeWidth="12" cx="80" cy="80" r="60" />
              <circle
                className="res-ring-fill"
                id="res-ring-fill"
                cx="80" cy="80" r="60"
                style={{ stroke: ringColor, strokeDashoffset: offset }}
              />
            </svg>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-.03em', fontVariantNumeric: 'tabular-nums' }}>
                {score}/2
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 500, marginTop: 3 }}>correct</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <StarSVG filled={starCount >= 1} />
            <StarSVG filled={starCount >= 2} />
            <StarSVG filled={starCount >= 3} />
          </div>
        </div>

        {/* Status + title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em',
            color: statusColor, marginBottom: 14
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
            {statusLabel}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-.02em' }}>
            {title}
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.55, maxWidth: 360, margin: '0 auto' }}>
            {sub}
          </p>
        </div>

        {/* Decision cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <DecisionCard label="Wrong Name" passed={caughtName} pts={50} />
          <DecisionCard label="MPIN Scam" passed={caughtPin} pts={50} />
        </div>

        {/* Transaction details */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
          marginBottom: 20, overflow: 'hidden'
        }}>
          {[
            { lbl: 'Transaction ID', val: `TXN-${txn.current}` },
            { lbl: 'Sent to', val: rec ? rec.name : '—' },
            { lbl: 'Amount', val: `NPR ${Number(amt).toLocaleString('en-NP')}`, green: true },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 18px',
              borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none'
            }}>
              <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{row.lbl}</span>
              <span style={{
                fontSize: row.green ? 14 : 13,
                color: row.green ? '#60bb46' : '#111827',
                fontWeight: row.green ? 700 : 600,
                fontVariantNumeric: 'tabular-nums'
              }}>{row.val}</span>
            </div>
          ))}
        </div>

        {/* Lesson */}
        <div style={{
          borderLeft: `4px solid ${lessonWarn ? '#f59e0b' : '#60bb46'}`,
          padding: '14px 18px', marginBottom: 28,
          background: lessonWarn ? '#fffbeb' : '#f0fdf4',
          borderRadius: '0 8px 8px 0'
        }}>
          <div style={{
            fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '.1em', marginBottom: 6,
            color: lessonWarn ? '#d97706' : '#60bb46'
          }}>Lesson</div>
          <p style={{
            fontSize: 13, lineHeight: 1.65, fontWeight: 500,
            color: lessonWarn ? '#92400e' : '#166534'
          }}>{lessonText}</p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="res-btn res-btn-primary"
            onClick={() => {
              onRound2?.();
              onCompleted?.();
            }}
          >
            Round 2
            <Icon name="arrow-right" size={15} />
          </button>
          <button className="res-btn res-btn-secondary" onClick={onRetry}>
            Try Again
          </button>
        </div>

      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   SCAM POPUP
══════════════════════════════════════════════════ */
function NextRoundLoading() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 400,
      background: 'rgba(5,8,12,.88)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif", color: '#eef2f7'
    }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .next-round-spinner{
          width:34px;height:34px;border-radius:50%;
          border:3px solid rgba(93,190,58,.22);
          border-top-color:#5dbe3a;
          animation:spin .75s linear infinite;
        }
      `}</style>
      <div style={{
        minWidth: 220, background: '#111620', border: '1px solid #1f2a3c',
        borderRadius: 12, padding: '22px 24px', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 14,
        boxShadow: '0 20px 50px rgba(0,0,0,.35)'
      }}>
        <div className="next-round-spinner" />
        <div style={{ fontSize: 13, fontWeight: 700 }}>Loading QR round...</div>
      </div>
    </div>
  );
}

function ScamPopup({ onIgnore, onSubmit }) {
  const [typed, setTyped] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showFoot, setShowFoot] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const pinRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(SCAM_MSG.slice(0, i + 1));
      i++;
      if (i >= SCAM_MSG.length) {
        clearInterval(timer);
        setShowPin(true);
        setShowFoot(true);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handlePinInput = (e, idx) => {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v;
    if (v && idx < 3) pinRefs[idx + 1].current?.focus();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 250,
      background: 'rgba(5,8,12,.75)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
      padding: 16
    }}>
      <style>{`
        @keyframes slideUp{from{transform:translateY(18px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .cursor-blink{display:inline-block;width:2px;height:12px;background:#5dbe3a;margin-left:1px;vertical-align:middle;animation:blink .65s step-end infinite;}
        .pin-d{flex:1;height:36px;background:#111620;border:1.5px solid #1f2a3c;border-radius:8px;font-size:18px;font-weight:700;color:#eef2f7;text-align:center;font-family:inherit;outline:none;transition:border-color .2s;-webkit-text-security:disc;min-width:0;}
        .pin-d:focus{border-color:#5dbe3a;}
      `}</style>
      <div style={{
        width: 280, borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(93,190,58,.3)',
        boxShadow: '0 0 0 1px rgba(93,190,58,.08),0 24px 60px rgba(0,0,0,.5)',
        animation: 'slideUp .28s cubic-bezier(.34,1.2,.64,1)'
      }}>
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg,#163a0e,#1a4a10)',
            padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 9,
            borderBottom: '1px solid rgba(93,190,58,.2)', cursor: 'default', position: 'relative'
          }}
          onMouseEnter={() => setShowUrl(true)}
          onMouseLeave={() => setShowUrl(false)}
        >
          <div style={{
            width: 34, height: 34, borderRadius: '50%', background: '#5dbe3a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#051500', fontWeight: 800, fontSize: 15, flexShrink: 0
          }}>e</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2, color: '#eef2f7' }}>eSawa Official Support</div>
            <div style={{ fontSize: 10, color: 'rgba(93,190,58,.8)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="shield-check" size={9} />
              Verified · esewa.com.np
            </div>
          </div>
          <button
            onClick={onIgnore}
            style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,.08)', border: 'none',
              borderRadius: '50%', width: 22, height: 22, cursor: 'pointer',
              color: 'rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}
          >
            <Icon name="x" size={11} />
          </button>
          {showUrl && (
            <div style={{
              position: 'absolute', bottom: -22, left: 10,
              background: '#f05151', color: 'white', fontSize: 9, fontWeight: 700,
              padding: '2px 7px', borderRadius: 4, whiteSpace: 'nowrap',
              zIndex: 10, letterSpacing: '.02em'
            }}>⚠ Actual sender: esawa-help.net</div>
          )}
        </div>

        {/* Body */}
        <div style={{ background: '#101a0e', padding: '11px 12px' }}>
          <p style={{ fontSize: 12, color: '#b8d4b0', lineHeight: 1.65 }}>
            {typed}
            {!showPin && <span className="cursor-blink" />}
          </p>
        </div>

        {/* PIN section */}
        {showPin && (
          <div style={{ background: '#0d1510', borderTop: '1px solid rgba(93,190,58,.15)', padding: '10px 12px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: 'rgba(93,190,58,.6)', textTransform: 'uppercase', marginBottom: 7 }}>
              Enter MPIN to verify this transaction
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {[0, 1, 2, 3].map(idx => (
                <input
                  key={idx}
                  ref={pinRefs[idx]}
                  className="pin-d"
                  type="password"
                  maxLength={1}
                  inputMode="numeric"
                  onChange={e => handlePinInput(e, idx)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        {showFoot && (
          <div style={{
            background: '#0d1510', borderTop: '1px solid rgba(93,190,58,.1)',
            padding: '8px 12px', display: 'flex', gap: 6, position: 'relative'
          }}>
            <button
              onClick={onIgnore}
              style={{
                flex: 1, padding: 8, background: 'rgba(93,190,58,.14)',
                border: '1px solid rgba(93,190,58,.55)', borderRadius: 7, color: '#9bea7c',
                fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                position: 'relative'
              }}
            >Ignore</button>
            <button
              onClick={onSubmit}
              style={{
                flex: 1, padding: 8, background: '#5dbe3a', border: 'none',
                borderRadius: 7, color: '#051500', fontFamily: 'inherit',
                fontSize: 12, fontWeight: 700, cursor: 'pointer'
              }}
            >Submit MPIN</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CONFIRM OVERLAY
══════════════════════════════════════════════════ */
function ConfirmOverlay({ rec, amt, onCancel, onConfirm }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <style>{`@keyframes slideUp{from{transform:translateY(18px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
      <div style={{
        background: '#111620', border: '1px solid #263248', borderRadius: 14,
        width: 310, overflow: 'hidden', animation: 'slideUp .22s ease-out'
      }}>
        <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid #1f2a3c' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2, color: '#eef2f7' }}>Are you sure?</h3>
          <p style={{ fontSize: 11, color: '#6b7a8f' }}>Please review your payment details before sending</p>
        </div>
        <div style={{ padding: '4px 18px' }}>
          {[
            { l: 'From', v: 'eSewa Wallet', big: false },
            { l: 'To', v: rec?.name || '—', big: false },
            { l: 'Mobile', v: rec?.num || '—', big: false },
            { l: 'Amount', v: `NPR ${Number(amt).toLocaleString('en-NP')}`, big: true },
            { l: 'Service Charge', v: 'Free', free: true },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '9px 0', borderBottom: i < 4 ? '1px solid #1f2a3c' : 'none'
            }}>
              <span style={{ fontSize: 11, color: '#6b7a8f' }}>{row.l}</span>
              <span style={{
                fontSize: row.big ? 20 : 13,
                fontWeight: 600,
                color: row.big ? '#5dbe3a' : row.free ? '#5dbe3a' : '#eef2f7',
                letterSpacing: row.big ? '-.02em' : 'normal'
              }}>{row.v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '12px 18px 16px' }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: 10, background: '#1c2435', border: '1px solid #1f2a3c',
            borderRadius: 8, color: '#6b7a8f', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer'
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: 10, background: '#5dbe3a', border: 'none',
            borderRadius: 8, color: '#051500', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer'
          }}>Confirm & Send</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
export default function EsewaSendMoney({ onRound2, onBack, onCompleted }) {

  const [rec, setRec] = useState(null);
  const [amt, setAmtState] = useState('0');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('mobile');
  const [manualIn, setManualIn] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  // overlay states
  const [showConf, setShowConf] = useState(false);
  const [showScam, setShowScam] = useState(false);
  const [showWipe, setShowWipe] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showQrLoading, setShowQrLoading] = useState(false);

  // scoring
  const [caughtName, setCaughtName] = useState(false);
  const [caughtPin, setCaughtPin] = useState(false);
  const [intended, setIntended] = useState('');

  const resultShown = useRef(false);
  const transitionTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  /* ── Amount helpers ── */
  const updateAmt = useCallback((val) => { setAmtState(val); }, []);
  const np = (d) => {
    setAmtState(prev => {
      if (d === '.' && prev.includes('.')) return prev;
      if (prev === '0' && d !== '.') return d;
      if (prev.replace('.', '').length >= 7) return prev;
      return prev + d;
    });
  };
  const del = () => setAmtState(prev => prev.length > 1 ? prev.slice(0, -1) : '0');

  /* ── Recipient logic ── */
  const pick = (contact) => {
    setIntended(contact.name);
    if (rec && rec.name === 'Ravi Das') {
      setCaughtName(true);
      setRec(contact);
    } else {
      setRec({ name: 'Ravi Das', num: '9800000000', init: 'R', color: '#f05151' });
    }
  };

  const clearRec = () => {
    if (rec && rec.name === 'Ravi Das') setCaughtName(true);
    setRec(null);
  };

  const manualPick = (v) => {
    if (v.length >= 10) setRec({ name: 'eSewa User', num: v, init: '#', color: '#5dbe3a' });
    else if (rec?.name === 'eSewa User') setRec(null);
  };

  /* ── Flow ── */
  const openConf = () => {
    if (!rec || parseFloat(amt) <= 0) return;
    setShowConf(true);
  };

  const doTransfer = () => {
    setShowConf(false);
    setTimeout(() => setShowScam(true), 900);
  };

  const drainWipe = () => {
    setShowScam(false);
    setShowWipe(true);
    setTimeout(() => {
      setShowWipe(false);
      if (!resultShown.current) { resultShown.current = true; setShowResult(true); }
    }, 2000);
  };

  const goToQrRound = () => {
    setShowScam(false);
    setShowWipe(false);
    setShowResult(false);
    setShowQrLoading(true);
    transitionTimer.current = setTimeout(() => {
      onCompleted?.();
    }, 900);
  };

  const handleIgnore = () => {
    setCaughtPin(true);
    goToQrRound();
  };

  const handleSubmit = () => {
    goToQrRound();
  };

  const handleRetry = () => {
    setRec(null); setAmtState('0'); setSearch(''); setManualIn('');
    setShowConf(false); setShowScam(false); setShowWipe(false); setShowResult(false); setShowQrLoading(false);
    setCaughtName(false); setCaughtPin(false); setIntended('');
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    resultShown.current = false;
  };

  const procDisabled = !rec || parseFloat(amt) <= 0;

  /* ── Contact filter ── */
  const filt = (list) => search
    ? list.filter(c => (c.name + c.num).toLowerCase().includes(search.toLowerCase()))
    : list;

  const n = parseFloat(amt);

  return (
    <>
      <GlobalHeader />
      <div style={{
        fontFamily: "'Inter', sans-serif",
        background: '#0a0d11', color: '#eef2f7',
        fontSize: 13, letterSpacing: '-.01em',
        height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column'
      }}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-thumb{background:#cbd5e0}
        .crow-row{display:flex;align-items:center;gap:9px;padding:7px 12px;cursor:pointer;transition:all .13s;border-left:2px solid transparent;position:relative;color:#1a202c;}
        .crow-row::after{content:'';position:absolute;bottom:0;left:12px;right:12px;height:1px;background:#e2e8f0;opacity:.8;}
        .crow-row:hover{background:#f7fafc;}
        .crow-row.sel{background:rgba(96,187,70,.08);border-left-color:#60bb46;}
        .qchip{padding:5px 13px;background:#ffffff;border:1px solid #cbd5e0;border-radius:6px;font-size:11px;font-weight:600;color:#4a5568;cursor:pointer;font-family:inherit;transition:all .15s;}
        .qchip:hover{border-color:#60bb46;color:#60bb46;background:rgba(96,187,70,.05);}
        .ptag{padding:3px 10px;background:#ffffff;border:1px solid #cbd5e0;border-radius:99px;font-size:10px;font-weight:500;color:#4a5568;cursor:pointer;font-family:inherit;transition:all .15s;}
        .ptag.on{border-color:#60bb46;color:#60bb46;background:rgba(96,187,70,.08);}
        .nb{height:48px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;font-size:18px;font-weight:600;color:#2d3748;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:inherit;transition:all .12s;position:relative;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,0.05);}
        .nb:hover{background:#edf2f7;border-color:#cbd5e0;}
        .nb:active{background:#e2e8f0;}
        .ico-btn{width:32px;height:32px;border-radius:8px;background:#ffffff;border:1px solid #e2e8f0;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#4a5568;transition:all .15s;box-shadow:0 1px 2px rgba(0,0,0,0.05);}
        .ico-btn:hover{background:#f7fafc;color:#1a202c;}
        .tab{flex:1;padding:10px 6px;font-size:11px;font-weight:600;color:#718096;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;border-bottom:2px solid transparent;transition:all .15s;letter-spacing:.02em;}
        .tab.on{color:#60bb46;border-color:#60bb46;}
        .tab:hover{color:#1a202c;}
        .proc-btn{width:100%;height:46px;background:#60bb46;border:none;border-radius:10px;font-family:inherit;font-size:14px;font-weight:700;color:#ffffff;cursor:pointer;letter-spacing:.01em;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .15s;box-shadow:0 2px 4px rgba(96,187,70,0.15);}
        .proc-btn:disabled{opacity:.3;cursor:not-allowed;}
        .proc-btn:not(:disabled):hover{opacity:.92;}
        .sec-hd{padding:8px 12px 3px;font-size:9px;font-weight:700;letter-spacing:.1em;color:#718096;text-transform:uppercase;display:flex;align-items:center;gap:5px;}
        .sec-hd::after{content:'';flex:1;height:1px;background:#e2e8f0;}
      `}</style>


        {/* ── Balance Strip ── */}
        <div style={{
          height: 50, background: '#28323c', borderBottom: '1px solid #1c252e',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, flexShrink: 0
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7, background: 'rgba(96,187,70,0.15)',
            border: '1px solid rgba(96,187,70,0.35)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#60bb46'
          }}><Icon name="wallet" size={13} /></div>
          <div>
            <div style={{ fontSize: 10, color: '#a0aec0', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase' }}>Available Balance</div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-.02em', color: '#ffffff' }}>
              NPR <em style={{ color: '#60bb46', fontStyle: 'normal' }}>5,000.00</em>
            </div>
          </div>
          <span style={{
            marginLeft: 'auto', fontSize: 9, fontWeight: 700, letterSpacing: '.08em',
            color: '#60bb46', background: 'rgba(96,187,70,0.15)',
            border: '1px solid rgba(96,187,70,0.35)', padding: '3px 8px',
            borderRadius: 99, textTransform: 'uppercase'
          }}>eSewa Wallet</span>
        </div>

        {/* ── Main Layout ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '300px 1fr',
          flex: 1, overflow: 'hidden'
        }}>

          {/* LEFT PANEL */}
          <div style={{
            background: '#ffffff', borderRight: '1px solid #e2e8f0',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              <div className={`tab${activeTab === 'mobile' ? ' on' : ''}`} onClick={() => setActiveTab('mobile')}>
                <Icon name="smartphone" size={12} /> Mobile
              </div>
              <div className={`tab${activeTab === 'email' ? ' on' : ''}`} onClick={() => {}} style={{ pointerEvents: 'none', opacity: .35, cursor: 'not-allowed' }}>
                <Icon name="at-sign" size={12} /> Email / ID
              </div>
            </div>

            {/* Input */}
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #edf2f7' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: '#718096', textTransform: 'uppercase', marginBottom: 6 }}>eSewa ID / Mobile</div>
              <div style={{
                background: '#f7fafc', border: '1px solid #cbd5e0', borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', height: 38
              }}>
                <Icon name="user" size={14} style={{ color: '#718096', flexShrink: 0 }} />
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={manualIn}
                  onChange={e => { setManualIn(e.target.value); manualPick(e.target.value); }}
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#1a202c', fontFamily: 'inherit', fontSize: 12, width: '100%'
                  }}
                />
              </div>
            </div>

            {/* Search */}
            <div style={{
              margin: '8px 12px', background: '#f7fafc', border: '1px solid #cbd5e0',
              borderRadius: 8, display: 'flex', alignItems: 'center', gap: 7, padding: '0 10px', height: 34
            }}>
              <Icon name="search" size={12} style={{ color: '#718096' }} />
              <input
                type="text"
                placeholder="Search contacts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#1a202c', fontFamily: 'inherit', fontSize: 12, width: '100%' }}
              />
            </div>

            {/* Contact list */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div className="sec-hd">Recent</div>
              {filt(RECENT).map(c => (
                <div
                  key={c.num}
                  className={`crow-row${rec?.num === c.num && rec?.name !== 'Ravi Das' ? ' sel' : ''}`}
                  onClick={() => pick(c)}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0,
                    background: c.color + '22', color: c.color
                  }}>{c.init}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#2d3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: '#718096' }}>{c.num}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: '#718096', flexShrink: 0, whiteSpace: 'nowrap' }}>{c.last}</div>
                </div>
              ))}
              <div className="sec-hd">All Contacts</div>
              {filt(ALL).map(c => (
                <div
                  key={c.num}
                  className={`crow-row${rec?.num === c.num && rec?.name !== 'Ravi Das' ? ' sel' : ''}`}
                  onClick={() => pick(c)}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0,
                    background: c.color + '22', color: c.color
                  }}>{c.init}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#2d3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: '#718096' }}>{c.num}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: '#718096', flexShrink: 0, whiteSpace: 'nowrap' }}>{c.last}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f5f7fd' }}>
            {/* Recipient strip */}
            <div style={{
              color: 'white',
              height: 50, background: '#60bb46', borderBottom: '1px solid #52a83b',
              display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0,
              width: '100%'
            }}>
              {!rec ? (
                <div style={{ color: '#ffffff', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="arrow-left" size={14} style={{ color: '#ffffff' }} /> Select a recipient to continue
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0,
                    background: '#ffffff', color: '#60bb46'
                  }}>{rec.init}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{rec.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>{rec.num}</div>
                  </div>
                  <button
                    onClick={clearRec}
                    style={{
                      marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none',
                      borderRadius: 6, width: 26, height: 26, cursor: 'pointer', color: '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    <Icon name="x" size={11} />
                  </button>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              height: 'fit-content',
              width: 'fit-content',
              background: '#ffffff',
              borderRadius: 16,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)',
              padding: '12px 6px'
            }}>

              {/* Amount section */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '16px 20px', gap: 0, position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', width: 320, height: 320, borderRadius: '50%',
                  background: 'radial-gradient(circle,rgba(96,187,70,0.04) 0%,transparent 70%)',
                  top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none'
                }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: '#718096', letterSpacing: '.04em', marginTop: 6 }}>NPR</span>
                  <span style={{
                    fontSize: 62, fontWeight: 800, letterSpacing: -4,
                    fontVariantNumeric: 'tabular-nums', lineHeight: 1, minWidth: 80, textAlign: 'center',
                    transition: 'color .2s', color: n > 0 ? '#60bb46' : '#cbd5e0'
                  }}>
                    {n > 0 ? Number(amt).toLocaleString('en-NP') : '0'}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#718096', marginBottom: 14, fontStyle: 'italic', height: 16 }}>
                  {convert(Math.floor(n))} rupees only
                </div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['100', '500', '1,000', '5,000'].map(v => (
                    <button
                      key={v}
                      className="qchip"
                      onClick={() => updateAmt(v.replace(',', ''))}
                    >
                      + {v}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 }}>
                  {['Personal', 'Business', 'Family', 'Gift', 'Loan Return'].map(tag => (
                    <button
                      key={tag}
                      className={`ptag${activeTag === tag ? ' on' : ''}`}
                      onClick={() => setActiveTag(tag)}
                    >{tag}</button>
                  ))}
                </div>
                <div style={{ width: 260, position: 'relative' }}>
                  <input
                    className="note-inp"
                    placeholder="Add a note (optional)…"
                    style={{
                      width: '100%', background: '#ffffff', border: '1px solid #cbd5e0',
                      borderRadius: 8, padding: '8px 32px 8px 12px', color: '#1a202c',
                      fontFamily: 'inherit', fontSize: 12, outline: 'none'
                    }}
                  />
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#718096' }}>
                    <Icon name="pencil-line" size={13} />
                  </span>
                </div>
              </div>

              {/* Keypad and Action Container */}
              <div style={{
                maxWidth: 320,
                width: '100%',
                margin: '0 auto 12px',
                padding: '0 20px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}>
                {/* Numpad */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 4,
                  width: '100%'
                }}>
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map(k => (
                    <button
                      key={k}
                      className="nb"
                      onClick={() => k === '<' ? del() : np(k)}
                    >
                      {k === '<' ? <Icon name="delete" size={16} /> : k}
                    </button>
                  ))}
                </div>

                {/* Proceed button */}
                <div style={{ padding: '6px 0 0', width: '100%' }}>
                  <button className="proc-btn" disabled={procDisabled} onClick={openConf}>
                    Proceed to Send <Icon name="arrow-right" size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Overlays ── */}
        {showConf && (
          <ConfirmOverlay
            rec={rec} amt={amt}
            onCancel={() => setShowConf(false)}
            onConfirm={doTransfer}
          />
        )}
        {showScam && (
          <ScamPopup onIgnore={handleIgnore} onSubmit={handleSubmit} />
        )}
        {showWipe && (
          <WipeScreen intendedName={intended} onRetry={handleRetry} onBack={onBack} />
        )}
        {showQrLoading && (
          <NextRoundLoading />
        )}
        {showResult && (
          <ResultScreen
            caughtName={caughtName} caughtPin={caughtPin}
            rec={rec} amt={amt}
            onRetry={handleRetry}
            onRound2={onRound2}
            onCompleted={onCompleted}
          />
        )}
      </div>
    </>
  );
}