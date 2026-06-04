import { useState } from "react";
import GlobalHeader from "./globalHeader.jsx";

/* ─── Inline SVG icon helper ─── */
const Icon = ({ name, size = 15, style = {} }) => {
    const paths = {
        "arrow-left":   <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
        "info":         <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
        "alert-triangle": <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
        "shield-alert": <><path d="M12   22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
        "shield-check": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>,
        "arrow-right":  <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
        "external-link":<><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
        "award":        <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>,
        "x":            <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
        "trophy":       <><polyline points="8 21 12 17 16 21" /><path d="M5 3H19" /><path d="M5 3a7 7 0 007 7 7 7 0 007-7" /><line x1="12" y1="17" x2="12" y2="10" /></>,
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={style}>
            {paths[name] || null}
        </svg>
    );
};

/* ─── QR SVG data ─── */
const QR1 = (
    <svg viewBox="0 0 80 80" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="28" height="28" fill="#111" /><rect x="10" y="10" width="18" height="18" fill="white" /><rect x="13" y="13" width="12" height="12" fill="#111" />
        <rect x="47" y="5" width="28" height="28" fill="#111" /><rect x="52" y="10" width="18" height="18" fill="white" /><rect x="55" y="13" width="12" height="12" fill="#111" />
        <rect x="5" y="47" width="28" height="28" fill="#111" /><rect x="10" y="52" width="18" height="18" fill="white" /><rect x="13" y="55" width="12" height="12" fill="#111" />
        <rect x="38" y="5" width="5" height="5" fill="#111" /><rect x="38" y="14" width="5" height="5" fill="#111" /><rect x="44" y="9" width="4" height="4" fill="#111" />
        <rect x="5" y="38" width="5" height="5" fill="#111" /><rect x="14" y="38" width="5" height="5" fill="#111" />
        <rect x="38" y="38" width="5" height="5" fill="#111" /><rect x="44" y="44" width="5" height="5" fill="#111" /><rect x="50" y="38" width="5" height="5" fill="#111" />
        <rect x="38" y="50" width="5" height="5" fill="#111" /><rect x="47" y="56" width="5" height="5" fill="#111" /><rect x="56" y="62" width="5" height="5" fill="#111" />
        <rect x="62" y="47" width="5" height="5" fill="#111" /><rect x="68" y="53" width="5" height="5" fill="#111" />
        <rect x="44" y="62" width="5" height="5" fill="#111" /><rect x="53" y="68" width="5" height="5" fill="#111" />
    </svg>
);
const QR2 = (
    <svg viewBox="0 0 80 80" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="28" height="28" fill="#111" /><rect x="10" y="10" width="18" height="18" fill="white" /><rect x="13" y="13" width="12" height="12" fill="#111" />
        <rect x="47" y="5" width="28" height="28" fill="#111" /><rect x="52" y="10" width="18" height="18" fill="white" /><rect x="55" y="13" width="12" height="12" fill="#111" />
        <rect x="5" y="47" width="28" height="28" fill="#111" /><rect x="10" y="52" width="18" height="18" fill="white" /><rect x="13" y="55" width="12" height="12" fill="#111" />
        <rect x="38" y="5" width="4" height="4" fill="#111" /><rect x="43" y="9" width="4" height="4" fill="#111" /><rect x="38" y="14" width="4" height="4" fill="#111" />
        <rect x="5" y="38" width="4" height="4" fill="#111" /><rect x="12" y="38" width="4" height="4" fill="#111" /><rect x="19" y="38" width="4" height="4" fill="#111" />
        <rect x="38" y="38" width="6" height="6" fill="#111" /><rect x="46" y="42" width="4" height="4" fill="#111" /><rect x="52" y="38" width="4" height="4" fill="#111" />
        <rect x="60" y="38" width="4" height="4" fill="#111" /><rect x="67" y="44" width="4" height="4" fill="#111" />
        <rect x="38" y="52" width="4" height="4" fill="#111" /><rect x="44" y="58" width="4" height="4" fill="#111" /><rect x="52" y="52" width="4" height="4" fill="#111" />
        <rect x="60" y="58" width="4" height="4" fill="#111" /><rect x="67" y="64" width="4" height="4" fill="#111" />
        <rect x="38" y="66" width="4" height="4" fill="#111" /><rect x="46" y="70" width="4" height="4" fill="#111" />
    </svg>
);
const QR3 = (
    <svg viewBox="0 0 80 80" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="28" height="28" fill="#111" /><rect x="10" y="10" width="18" height="18" fill="white" /><rect x="13" y="13" width="12" height="12" fill="#111" />
        <rect x="47" y="5" width="28" height="28" fill="#111" /><rect x="52" y="10" width="18" height="18" fill="white" /><rect x="55" y="13" width="12" height="12" fill="#111" />
        <rect x="5" y="47" width="28" height="28" fill="#111" /><rect x="10" y="52" width="18" height="18" fill="white" /><rect x="13" y="55" width="12" height="12" fill="#111" />
        <rect x="38" y="5" width="6" height="6" fill="#111" /><rect x="47" y="5" width="6" height="6" fill="#111" /><rect x="42" y="11" width="4" height="4" fill="#111" />
        <rect x="5" y="38" width="6" height="6" fill="#111" /><rect x="15" y="42" width="4" height="4" fill="#111" />
        <rect x="38" y="38" width="4" height="4" fill="#111" /><rect x="44" y="38" width="8" height="4" fill="#111" /><rect x="55" y="38" width="5" height="5" fill="#111" />
        <rect x="63" y="44" width="5" height="5" fill="#111" /><rect x="70" y="38" width="5" height="5" fill="#111" />
        <rect x="38" y="46" width="5" height="5" fill="#111" /><rect x="46" y="52" width="5" height="5" fill="#111" /><rect x="54" y="46" width="5" height="5" fill="#111" />
        <rect x="62" y="52" width="5" height="5" fill="#111" /><rect x="38" y="60" width="5" height="5" fill="#111" /><rect x="46" y="66" width="5" height="5" fill="#111" />
        <rect x="54" y="60" width="5" height="5" fill="#111" /><rect x="70" y="60" width="5" height="5" fill="#111" />
    </svg>
);
const QR_SVGS = { 1: QR1, 2: QR2, 3: QR3 };

/* ─── QR data ─── */
const QR_DATA = {
    1: { url: 'esawa.com.np/pay/sharma',  fake: true,  reason: '"esawa" instead of "esewa" — one letter swapped' },
    2: { url: 'esewa.com.np/pay/sharma',  fake: false, reason: 'Correct official domain' },
    3: { url: 'esewa-pay.com/sharma',     fake: true,  reason: '"esewa-pay.com" — unofficial domain with hyphen' },
};

/* ══════════════════════════════════════════════════
   DELAY OVERLAY
══════════════════════════════════════════════════ */
function DelayOverlay({ chosen, onProceed }) {
    const CIRCUM = 125.6;
    const TOTAL  = 3000;
    const [pct, setPct]       = useState(0);
    const [offset, setOffset] = useState(CIRCUM);
    const [rem, setRem]       = useState(3);
    const [done, setDone]     = useState(false);
    const data = QR_DATA[chosen];

    // requestAnimationFrame progress timer
    const startRef = useState(() => {
        let raf;
        const tick = (now) => {
            const start   = startRef[0];
            const elapsed = now - start;
            const t       = Math.min(elapsed / TOTAL, 1);
            setPct(t * 100);
            setOffset(CIRCUM * (1 - t));
            setRem(elapsed < TOTAL ? Math.ceil((TOTAL - elapsed) / 1000) : 0);
            if (elapsed < TOTAL) { raf = requestAnimationFrame(tick); }
            else { setDone(true); }
        };
        const handle = performance.now();
        raf = requestAnimationFrame(tick);
        return handle;
    });

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(5,8,12,.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <style>{`
                @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
                .delay-btn-en{background:#60bb44!important;font-size:19px;color:#ffffff!important;cursor:pointer!important;}
                .delay-btn-en:hover{opacity:.9;}
            `}</style>
            <div style={{
                width: 380, background: '#111620', border: '1.5px solid #60bb44',
                borderRadius: 16, overflow: 'hidden',
                animation: 'slideUp .3s cubic-bezier(.34,1.2,.64,1)',
                boxShadow: '0 0 60px #74f04e23'
            }}>
                {/* Hero */}
                <div style={{
                    background: '#111620',
                    borderBottom: '1px solid #60bb44',
                    padding: '24px 22px 20px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center', gap: 12
                }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 14,
                        background: '#60bb44', border: '1px solid #60bb44',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}>
                        <Icon name="shield-alert" size={28} />
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.02em', color: '#eef2f7' }}>
                        Verify before you scan
                    </div>
                    <div style={{ fontSize: 12, color: '#60bb44', lineHeight: 1.65, maxWidth: 300 }}>
                        You are about to pay a new merchant. QR codes can be physically swapped by scammers without the merchant noticing — take a moment to check the destination.
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '18px 22px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
                        {[
                            { l: 'Merchant',                  v: 'Unverified',  neutral: false },
                            { l: 'First scan from this source', v: 'Yes',        neutral: false },
                            { l: 'URL destination',            v: data.url,      neutral: true  },
                        ].map((row, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                fontSize: 12, padding: '9px 12px', background: '#161c28',
                                borderRadius: 7, border: '1px solid #1f2a3c'
                            }}>
                                <span style={{ color: '#6b7a8f' }}>{row.l}</span>
                                <span style={{
                                    fontWeight: row.neutral ? 400 : 600,
                                    color: row.neutral ? '#6b7a8f' : '#60bb44',
                                    fontFamily: row.neutral ? 'monospace' : 'inherit',
                                    fontSize: row.neutral ? 11 : 12
                                }}>{row.v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Progress ring */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                        <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
                            <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="#1f2a3c" strokeWidth="4" />
                            </svg>
                            <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" fill="none"
                                    stroke="#60bb44" strokeWidth="4"
                                    strokeDasharray="125.6" strokeDashoffset={offset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div style={{
                                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: done ? 11 : 14, fontWeight: 800, color: '#60bb44'
                            }}>
                                {done ? '✓' : rem}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#eef2f7', marginBottom: 4 }}>
                                Safety check in progress
                            </div>
                            <div style={{ fontSize: 10, color: '#4a5568', lineHeight: 1.5 }}>
                                This pause helps you read the URL carefully before completing the payment.
                            </div>
                            <div style={{ height: 3, background: '#1f2a3c', borderRadius: 99, overflow: 'hidden', marginTop: 6 }}>
                                <div style={{
                                    height: '100%', background: '#60bb44', borderRadius: 99,
                                    width: pct + '%', transition: 'width .1s linear'
                                }} />
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={!done}
                        onClick={onProceed}
                        className={done ? 'delay-btn-en' : ''}
                        style={{
                            width: '100%', height: 46, border: 'none', borderRadius: 10,
                            fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            transition: 'all .2s',
                            background: done ? '#60bb44' : '#263248',
                            color: done ? '#60bb44' : '#4a5568',
                            cursor: done ? 'pointer' : 'not-allowed',
                            position: 'relative'
                        }}
                    >
                        <Icon name="arrow-right" size={15} /> Continue to verify QR
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════
   RESULT OVERLAY
══════════════════════════════════════════════════ */
function ResultOverlay({ chosen, onRetry, onHome }) {
    const isCorrect = !QR_DATA[chosen].fake;
    const [phase, setPhase] = useState(isCorrect ? 'correct' : 'wrong');
    const data = QR_DATA[chosen];

    const LessonBox = ({ children }) => (
        <div style={{
            background: '#102218b2', border: '1px solid rgba(93,190,58,.15)',
            borderRadius: 8, padding: 12, marginBottom: 14,
            fontSize: 12, color: 'rgba(93,190,58,.65)', lineHeight: 1.7
        }}>{children}</div>
    );

    const overlay = (children) => (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(5,8,12,.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20, overflowY: 'auto'
        }}>
            <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
            <div style={{
                width: 360, background: '#111620', borderRadius: 16, overflow: 'hidden',
                border: '1.5px solid #040c1b', animation: 'slideUp .3s cubic-bezier(.34,1.2,.64,1)',
                maxHeight: '90vh', overflowY: 'auto'
            }}>{children}</div>
        </div>
    );

    if (phase === 'correct') return overlay(
        <>
            <div style={{
                padding: '22px 22px 18px', textAlign: 'center',
                background: '#111620',
                borderBottom: '1px solid #60bb44'
            }}>
                <div style={{
                    width: 60, height: 60, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                    background: 'rgba(93, 190, 58, 0.1)', border: '1.5px solid rgb(110, 207, 75)', color: '#60bb44'
                }}>
                    <Icon name="shield-check" size={28} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, letterSpacing: '-.02em', color: '#eef2f7' }}>You passed!</div>
                <div style={{ fontSize: 12, color: '#6b7a8f', lineHeight: 1.6 }}>
                    You correctly identified QR #2 and avoided paying the wrong vendor. You have earned a Cyber-Safe Badge!
                </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
                <div style={{ background: '#161c28', border: '1px solid #1f2a3c', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 8,
                            background: 'rgba(93,190,58,.15)', border: '1px solid rgba(93,190,58,.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#5dbe3a', flexShrink: 0
                        }}>
                            <Icon name="award" size={18} />
                        </div>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#eef2f7' }}>Cyber-Safe Badge</div>
                            <div style={{ fontSize: 11, color: '#6b7a8f' }}>Digital Vaccine · eSewa Security Program</div>
                        </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7a8f', lineHeight: 1.6, marginBottom: 10 }}>
                        Claim your badge to add it to your eSewa profile. But check the link carefully before clicking — one last test.
                    </div>
                    <div style={{
                        background: '#1c2435', border: '1px solid #263248',
                        borderRadius: 7, padding: '9px 11px', marginBottom: 10,
                        display: 'flex', alignItems: 'flex-start', gap: 8
                    }}>
                        <Icon name="info" size={12} style={{ color: '#4a5568', flexShrink: 0, marginTop: 2 }} />
                        <div>
                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.07em', color: '#4a5568', textTransform: 'uppercase', marginBottom: 3 }}>
                                Destination URL
                            </div>
                            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#6b7a8f' }}>esawa.com.np/badge/claim</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setPhase('claimed')}
                        style={{
                            width: '100%', height: 40, background: '#1c2435', border: '1px solid #263248',
                            borderRadius: 8, fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                            color: '#eef2f7', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: 7, transition: 'all .2s'
                        }}>
                        <Icon name="external-link" size={13} style={{ color: '#6b7a8f' }} />
                        esawa.com.np/badge/claim
                    </button>
                    <div style={{ textAlign: 'center', fontSize: 10, color: '#4a5568', marginTop: 5 }}>
                        Hover the link to verify the URL before clicking
                    </div>
                </div>
                <button
                    onClick={() => setPhase('ignored')}
                    style={{
                        width: '100%', height: 38, background: '#60bb44', border: '1px solid #1f2a3c',
                        borderRadius: 8, fontFamily: 'inherit', fontSize: 16, fontWeight: 600,
                        color: '#ffffff', cursor: 'pointer', marginTop: 6, transition: 'all .15s'
                    }}
                >
                    Ignore
                </button>
            </div>
        </>
    );

    if (phase === 'wrong') return overlay(
        <>
            <div style={{
                padding: '22px 22px 18px', textAlign: 'center',
                background: 'linear-gradient(135deg,#180808,#200c0c)',
                borderBottom: '1px solid rgba(240,81,81,.15)'
            }}>
                <div style={{
                    width: 60, height: 60, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                    background: 'rgba(240,81,81,.1)', border: '1.5px solid rgba(240,81,81,.25)', color: '#f05151'
                }}>
                    <Icon name="x" size={28} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, letterSpacing: '-.02em', color: '#f05151' }}>Wrong QR</div>
                <div style={{ fontSize: 12, color: '#6b7a8f', lineHeight: 1.6 }}>
                    You scanned the fake QR. Money would have gone to a scammer.
                </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
                <div style={{ background: '#161c28', border: '1px solid #1f2a3c', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.07em', color: '#6b7a8f', textTransform: 'uppercase', marginBottom: 8 }}>
                        Why it was fake
                    </div>
                    <div style={{ fontSize: 12, color: '#eef2f7', marginBottom: 4, fontFamily: 'monospace' }}>{data.url}</div>
                    <div style={{ fontSize: 12, color: '#6b7a8f', lineHeight: 1.6 }}>{data.reason}</div>
                </div>
                <LessonBox>
                    <strong style={{ color: '#5dbe3a' }}>Lesson:</strong> Always read the full URL under the QR before scanning. Scammers place stickers over real codes — the QR looks identical but the destination changes.
                </LessonBox>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={onRetry} style={{
                        flex: 1, padding: 10, border: '1px solid #1f2a3c', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        background: '#1c2435', color: '#eef2f7'
                    }}>Try Again</button>
                    <button onClick={onHome} style={{
                        flex: 1, padding: 10, border: 'none', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        background: '#5dbe3a', color: '#051500'
                    }}>Home</button>
                </div>
            </div>
        </>
    );

    if (phase === 'claimed') return overlay(
        <>
            <div style={{
                padding: '22px 22px 18px', textAlign: 'center',
                background: 'linear-gradient(135deg,#180808,#200c0c)',
                borderBottom: '1px solid rgba(240,81,81,.15)'
            }}>
                <div style={{
                    width: 60, height: 60, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                    background: 'rgba(240,81,81,.1)', border: '1.5px solid rgba(240,81,81,.25)', color: '#f05151'
                }}>
                    <Icon name="alert-triangle" size={28} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, letterSpacing: '-.02em', color: '#f05151' }}>
                    So Close — Last Trap!
                </div>
                <div style={{ fontSize: 12, color: '#6b7a8f', lineHeight: 1.6 }}>
                    You clicked the link without reading it carefully. The actual destination was esawa — not esewa.
                </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
                <div style={{ background: '#161c28', border: '1px solid #1f2a3c', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 12, color: '#6b7a8f', lineHeight: 1.7 }}>
                    The reveal box above the button clearly showed{' '}
                    <code style={{ background: '#1c2435', padding: '1px 5px', borderRadius: 3, color: '#eef2f7' }}>esawa.com.np</code>
                    {' '}— one letter different from{' '}
                    <code style={{ background: '#1c2435', padding: '1px 5px', borderRadius: 3, color: '#eef2f7' }}>esewa.com.np</code>.
                    {' '}One letter. That is all it takes.
                </div>
                <LessonBox>
                    <strong style={{ color: '#5dbe3a' }}>Lesson:</strong> Scammers use reward links as a final trap. Always read the actual destination URL — never just the display text of a link.
                </LessonBox>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={onRetry} style={{
                        flex: 1, padding: 10, border: '1px solid #1f2a3c', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        background: '#1c2435', color: '#eef2f7'
                    }}>Try Again</button>
                    <button onClick={onHome} style={{
                        flex: 1, padding: 10, border: 'none', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        background: '#5dbe3a', color: '#051500'
                    }}>Home</button>
                </div>
            </div>
        </>
    );

    /* ── IGNORED / Fully Cyber-Proof ── */
    return overlay(
        <>
            <div style={{
                padding: '22px 22px 18px', textAlign: 'center',
                background: '#111620'
            }}>
                <div style={{
                    width: 60, height: 60, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                    background: 'rgba(93,190,58,.12)', border: '1.5px solid rgba(93,190,58,.3)', color: '#5dbe3a'
                }}>
                    <Icon name="trophy" size={28} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, letterSpacing: '-.02em', color: '#eef2f7' }}>
                    Fully Cyber-Proof!
                </div>
                <div style={{ fontSize: 12, color: '#6b7a8f', lineHeight: 1.6 }}>
                    You spotted the fake URL in the badge claim link. You passed all 3 rounds.
                </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
                <div style={{
                    background: '#161c28', border: '1px solid rgba(93,190,58,.2)',
                    borderRadius: 10, padding: 14, marginBottom: 14, textAlign: 'center'
                }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>🛡</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#5dbe3a', marginBottom: 4 }}>
                        Cyber-Safe Certificate Earned
                    </div>
                    <div style={{ fontSize: 11, color: '#6b7a8f', lineHeight: 1.6 }}>
                        You caught the wrong recipient, ignored the MPIN scam, identified the fake QR, and caught the fake badge link.
                    </div>
                </div>
                <LessonBox>
                    <strong style={{ color: '#5dbe3a' }}>Final lesson:</strong> Even after winning, scammers try one last trick — a fake reward link. The URL showed esawa instead of esewa. One letter. Always hover and verify before clicking anything.
                </LessonBox>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={onHome} style={{
                        flex: 1, padding: 10, border: '1px solid #1f2a3c', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        background: '#1c2435', color: '#eef2f7'
                    }}>Home</button>
                    <button onClick={() => alert('Share feature coming soon!')} style={{
                        flex: 1, padding: 10, border: 'none', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        background: '#5dbe3a', color: '#051500'
                    }}>Share Badge</button>
                </div>
            </div>
        </>
    );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function EsewaQr({ onHome = () => {} }) {
    const [chosen, setChosen]       = useState(null);
    const [showDelay, setShowDelay] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [shaking, setShaking]     = useState(null);
    const [showTutorial, setShowTutorial] = useState(true);

    const pickQR = (n) => {
        setShowTutorial(false); // dismiss tutorial on first QR tap
        setChosen(n);
        setShowDelay(true);
    };

    const proceedAfterDelay = () => {
        setShowDelay(false);
        if (!QR_DATA[chosen].fake) {
            setShowResult(true);
        } else {
            setShaking(chosen);
            setTimeout(() => setShaking(null), 400);
            setTimeout(() => setShowResult(true), 500);
        }
    };

    const handleRetry = () => {
        setChosen(null);
        setShowDelay(false);
        setShowResult(false);
        setShaking(null);
        setShowTutorial(true);
    };

    const QR_CARDS = [
        { id: 1, merchant: 'Sharma Kirana Pasal', url: 'esawa.com.np/pay/sharma',  svg: QR_SVGS[1] },
        { id: 2, merchant: 'Sharma Kirana Pasal', url: 'esewa.com.np/pay/sharma',  svg: QR_SVGS[2] },
        { id: 3, merchant: 'Sharma Kirana Pasal', url: 'esewa-pay.com/sharma',     svg: QR_SVGS[3] },
    ];

    return (
        <>
            <GlobalHeader />
            <div style={{
                fontFamily: "'Inter', sans-serif",
                background: '#f5f7ff', color: '#eef2f7',
                fontSize: 13,
                height: 'calc(100vh - 70px)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column'
            }}>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
                    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                    @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
                    @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
                    .qr-card{width:200px;background:#111620;border:1.5px solid #1f2a3c;border-radius:12px;overflow:hidden;cursor:pointer;transition:all .2s;position:relative;display:flex;flex-direction:column;}
                    .qr-card:hover{border-color:#263248;transform:translateY(-3px);}
                    .ico-btn{width:32px;height:32px;border-radius:8px;background:#ffffff;border:1px solid #1f2a3c;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6b7a8f;transition:all .15s;}
                    .ico-btn:hover{background:#49bb46;color:#eef2f7;}

                    /* ── Tutorial system ── */
                    @keyframes tut-fade-in { from{opacity:0} to{opacity:1} }
                    @keyframes tut-pulse-glow {
                        0%,100%{ box-shadow: 0 0 0 3px #60bb46, 0 0 28px rgba(96,187,70,0.35); }
                        50%    { box-shadow: 0 0 0 5px #60bb46, 0 0 52px rgba(96,187,70,0.55); }
                    }
                    @keyframes tut-tooltip-in {
                        from { opacity:0; transform: translateX(-50%) translateY(8px); }
                        to   { opacity:1; transform: translateX(-50%) translateY(0); }
                    }
                    @keyframes tut-arrow-bounce {
                        0%,100% { transform: translateY(0); }
                        50%     { transform: translateY(-6px); }
                    }
                    .tut-dim-cover {
                        position: fixed; inset: 0; z-index: 70;
                        background: rgba(5,8,12,0.78);
                        backdrop-filter: blur(2px);
                        pointer-events: none;
                        animation: tut-fade-in .35s ease;
                    }
                    .tut-spotlight {
                        position: relative;
                        z-index: 80;
                        border-radius: 18px;
                        animation: tut-pulse-glow 2.2s ease-in-out infinite;
                        padding: 20px 24px 24px;
                        background: rgba(17,22,32,0.55);
                        overflow: visible;
                    }
                    .tut-tooltip-wrap {
                        position: absolute;
                        top: calc(100% + 16px);
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 90;
                        animation: tut-tooltip-in .3s cubic-bezier(.34,1.4,.64,1);
                        width: 420px;
                        pointer-events: all;
                    }
                    .tut-tooltip-box {
                        background: #1a202c;
                        border: 1.5px solid #60bb46;
                        border-radius: 14px;
                        padding: 16px 20px;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(96,187,70,0.1);
                    }
                    /* Arrow pointing UP (tooltip is below the spotlight) */
                    .tut-tooltip-arrow {
                        width: 0; height: 0;
                        margin: 0 auto;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid #60bb46;
                        position: relative;
                    }
                    .tut-tooltip-arrow::after {
                        content: '';
                        position: absolute;
                        left: 50%;
                        top: 3px;
                        transform: translateX(-50%);
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-bottom: 8px solid #1a202c;
                    }
                    .tut-bounce-arrow {
                        text-align: center;
                        font-size: 20px;
                        animation: tut-arrow-bounce 1s ease-in-out infinite;
                        color: #60bb46;
                        margin-bottom: 6px;
                    }
                    .tut-dismiss-btn {
                        margin-top: 12px;
                        width: 100%;
                        padding: 8px 0;
                        background: transparent;
                        border: 1px solid rgba(96,187,70,0.4);
                        border-radius: 8px;
                        color: #60bb46;
                        font-family: inherit;
                        font-size: 11px;
                        font-weight: 700;
                        letter-spacing: .04em;
                        cursor: pointer;
                        transition: background .15s;
                    }
                    .tut-dismiss-btn:hover { background: rgba(96,187,70,0.1); }
                    .tut-step-pill {
                        display: inline-flex; align-items: center; gap: 6px;
                        background: rgba(96,187,70,0.12);
                        border: 1px solid rgba(96,187,70,0.3);
                        border-radius: 99px;
                        padding: 3px 10px 3px 6px;
                        font-size: 10px; font-weight: 800;
                        letter-spacing: .06em; text-transform: uppercase;
                        color: #60bb46; margin-bottom: 10px;
                    }
                    .tut-step-pill span {
                        width: 16px; height: 16px; border-radius: 50%;
                        background: #60bb46; color: #fff;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 9px; font-weight: 900;
                    }
                    .qr-card-tut-hover {
                        position: absolute; inset: 0;
                        background: rgba(96,187,70,0.07);
                        border-radius: inherit;
                        display: flex; flex-direction: column;
                        align-items: center; justify-content: center;
                        opacity: 0; transition: opacity .2s;
                        pointer-events: none;
                        z-index: 2;
                    }
                    .qr-card:hover .qr-card-tut-hover { opacity: 1; }
                `}</style>

                {/* Sub-header */}
                <div style={{
                    height: 48, background: '#60bb46', borderBottom: '1px solid #1f2a3c',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 16px', flexShrink: 0,
                    position: 'relative', zIndex: showTutorial ? 10 : 'auto',
                    filter: showTutorial ? 'brightness(0.4)' : 'none',
                    transition: 'filter .3s',
                    pointerEvents: showTutorial ? 'none' : 'auto',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button className="ico-btn" onClick={onHome}><Icon name="arrow-left" size={15} /></button>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>Scan &amp; Pay</span>
                    </div>
                    <button className="ico-btn"><Icon name="info" size={15} /></button>
                </div>

                {/* ── Tutorial dim cover ── */}
                {showTutorial && <div className="tut-dim-cover" />}

                {/* Main content */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    flex: 1, padding: 20, gap: 0, overflow: 'visible'
                }}>
                    {/* ── Spotlight wrapper: title + QR cards highlighted during tutorial ── */}
                    <div
                        className={showTutorial ? 'tut-spotlight' : ''}
                        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        {/* Tutorial tooltip floats below the QR cards */}
                        {showTutorial && (
                            <div className="tut-tooltip-wrap">
                                {/* Arrow pointing UP toward the QR cards */}
                                <div className="tut-bounce-arrow">↑</div>
                                <div className="tut-tooltip-arrow" />
                                <div className="tut-tooltip-box">
                                    <div className="tut-step-pill"><span>!</span> Tutorial</div>
                                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-.01em' }}>
                                        Spot the Fake QR Code
                                    </div>
                                    <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.65, marginBottom: 4 }}>
                                        Above are <strong style={{ color: '#e2e8f0' }}>3 QR codes</strong> — only <strong style={{ color: '#60bb46' }}>one is genuine</strong>.
                                        Scammers often place fake QR stickers over real ones. Your job is to tap the one you trust.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Title */}
                        <div style={{ textAlign: 'center', maxWidth: 480, marginBottom: 28 }}>
                            <h2 style={{ fontSize: 22, fontWeight: 850, marginBottom: 6, letterSpacing: '-.03em', color: showTutorial ? '#ffffff' : '#000000' }}>
                                Which QR is safe to scan?
                            </h2>
                            <p style={{ fontSize: 13, color: showTutorial ? '#94a3b8' : '#6b7a8f', lineHeight: 1.7 }}>
                                You just bought goods from Sharma Kirana Pasal. Tap the one you think is genuine.
                            </p>
                        </div>

                        {/* QR Cards */}
                        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                            {QR_CARDS.map(card => (
                                <div
                                    key={card.id}
                                    className="qr-card"
                                    onClick={() => pickQR(card.id)}
                                    style={{ animation: shaking === card.id ? 'shake .35s ease' : 'none' }}
                                >
                                    {/* Card number badge */}
                                    <div style={{
                                        position: 'absolute', top: 8, left: 8, width: 20, height: 20,
                                        background: 'rgba(0,0,0,.5)', borderRadius: '50%',
                                        fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', color: 'white', zIndex: 3
                                    }}>{card.id}</div>

                                    {/* Tutorial hover hint — visible on hover while tutorial is active */}
                                    {showTutorial && (
                                        <div className="qr-card-tut-hover">
                                            <div style={{
                                                background: 'rgba(17,22,32,0.9)', border: '1px solid rgba(96,187,70,0.4)',
                                                borderRadius: 8, padding: '6px 10px', textAlign: 'center',
                                                maxWidth: 160, pointerEvents: 'none'
                                            }}>
                                                <div style={{ fontSize: 16, marginBottom: 3 }}>🔍</div>
                                                <div style={{ fontSize: 10, fontWeight: 700, color: '#60bb46', marginBottom: 2 }}>Inspect this QR</div>
                                                <div style={{ fontSize: 9, color: '#94a3b8', lineHeight: 1.4 }}>
                                                    Check the URL below it carefully before tapping
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div style={{
                                        background: 'white', padding: 14,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {card.svg}
                                    </div>
                                    <div style={{ padding: '10px 12px 12px' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, color: '#eef2f7' }}>{card.merchant}</div>
                                        <div style={{ fontSize: 11, color: '#6b7a8f', fontFamily: 'monospace', wordBreak: 'break-all', lineHeight: 1.4 }}>
                                            {card.url}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {showDelay && !showResult && (
                    <DelayOverlay chosen={chosen} onProceed={proceedAfterDelay} />
                )}
                {showResult && (
                    <ResultOverlay chosen={chosen} onRetry={handleRetry} onHome={onHome} />
                )}
            </div>
        </>
    );
}