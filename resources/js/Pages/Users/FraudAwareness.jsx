import { useEffect, useMemo, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import logo from "../assets/logo.png"
import axios from 'axios';

const scams = [
    {
        id: 'ngo',
        icon: '🤲',
        title: 'Fake NGO / Donation',
        type: 'Charity Fraud',
        short: 'Scammers pose as charities collecting for disasters and keep the money.',
        question: 'A caller says he is from UNICEF collecting for flood victims and asks you to donate immediately via eSewa. What do you do?',
        targetGroup: 'Compassionate people, retirees, and families.',
        solution: 'Donate directly through the official NGO website and verify the organization first.',
        options: [
            { label: 'Donate via eSewa right away', correct: false },
            { label: 'Hang up and donate directly through the official website', correct: true },
            { label: 'Promise to donate later', correct: false },
        ],
        explanation: {
            correct: 'Correct. Always donate through official channels and verify the organization first.',
            wrong: 'This is a common donation scam. Unsolicited donation calls are a red flag.',
        },
    },
    {
        id: 'electricity',
        icon: '⚡',
        title: 'Electricity / Utility Bill',
        type: 'Impersonation Fraud',
        short: 'Fake bill threats push you to click a payment link and reveal card details.',
        question: 'You get an SMS claiming your electricity will be disconnected in 2 hours with a payment link. What do you do?',
        targetGroup: 'Homeowners, tenants, and busy professionals.',
        solution: 'Check the official utility app or website, not the SMS link.',
        options: [
            { label: 'Click the link and pay immediately', correct: false },
            { label: 'Log in to the official app or website to check the bill', correct: true },
            { label: 'Call the number in the SMS', correct: false },
        ],
        explanation: {
            correct: 'Correct. Never trust random payment links in SMS messages.',
            wrong: 'This link likely leads to a fake payment portal designed to steal your details.',
        },
    },
    {
        id: 'matrimonial',
        icon: '💍',
        title: 'Matrimonial',
        type: 'Romance Fraud',
        short: 'Fake profiles build trust first, then invent emergencies and ask for money.',
        question: 'You have been chatting with someone on a matrimony site for 3 weeks, and they now ask for urgent hospital money. What do you do?',
        targetGroup: 'Lonely individuals and online daters.',
        solution: 'Never send money to someone you have not met in person.',
        options: [
            { label: 'Send money because you care', correct: false },
            { label: 'Refuse and verify the person through video call and other checks', correct: true },
            { label: 'Send a smaller amount first', correct: false },
        ],
        explanation: {
            correct: 'Correct. Emotional pressure is a classic romance-scam tactic.',
            wrong: 'Emergency money requests from online-only contacts are a huge red flag.',
        },
    },
    {
        id: 'seller',
        icon: '🛒',
        title: 'Online Seller',
        type: 'Advance Payment Fraud',
        short: 'Too-good-to-be-true products disappear after advance payment.',
        question: 'A Facebook page is selling an iPhone at a huge discount and wants full payment via eSewa before shipping. What do you do?',
        targetGroup: 'Bargain hunters and new online shoppers.',
        solution: 'Use COD or verified marketplaces with buyer protection.',
        options: [
            { label: 'Pay immediately for the deal', correct: false },
            { label: 'Refuse and buy only via COD or verified stores', correct: true },
            { label: 'Pay half now and negotiate later', correct: false },
        ],
        explanation: {
            correct: 'Correct. Unverified sellers who demand upfront payment are risky.',
            wrong: 'This is a classic advance-payment scam.',
        },
    },
    {
        id: 'police',
        icon: '👮',
        title: 'Police / Cyber Bureau Threat',
        type: 'Impersonation',
        short: 'Threat calls claim your ID was used in crime and demand money to avoid arrest.',
        question: 'A caller says your number was used in a drug case and you must transfer money now to avoid arrest. What do you do?',
        targetGroup: 'Anyone with savings or fear of authority.',
        solution: 'Hang up and call the official police number yourself.',
        options: [
            { label: 'Transfer the money immediately', correct: false },
            { label: 'Call the official police number independently', correct: true },
            { label: 'Beg the caller for more time', correct: false },
        ],
        explanation: {
            correct: 'Correct. Real police never demand money by phone.',
            wrong: 'This is a scam. Verify independently, never through the caller.',
        },
    },
    {
        id: 'simswap',
        icon: '📱',
        title: 'SIM Swap',
        type: 'Account Takeover',
        short: 'A stolen number means stolen OTPs, which can empty accounts.',
        question: 'Your phone loses all network signal for over an hour without a clear reason. What is the most important next step?',
        targetGroup: 'Anyone with a bank account tied to a mobile number.',
        solution: 'Call your bank from another device right away and freeze accounts if needed.',
        options: [
            { label: 'Restart your phone and wait', correct: false },
            { label: 'Immediately call your bank from another device', correct: true },
            { label: 'Go outside for better signal', correct: false },
        ],
        explanation: {
            correct: 'Correct. Sudden loss of signal can mean a SIM swap attempt.',
            wrong: 'Persistent signal loss can be a SIM swap warning sign. Act fast.',
        },
    },
];

const POINTS_PER_WIN = 15;
const MAX_POINTS = scams.length * POINTS_PER_WIN;

const style = `
  * { box-sizing: border-box; }

    .hp-logo img { height: 30px; width: auto; display: block; }

  .fa-page {
    min-height: 100vh;
    background: #f3f4f6;
    color: #111827;
    font-family: Inter, system-ui, sans-serif;
  }

  /* ── Header ── */
  .fa-header {
    background: #111827;
    height: 74px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .fa-header-left { display: flex; align-items: center; gap: 10px; }
  .fa-header-logo {
    width: 30px; height: 30px; border-radius: 5px; background: #059669;
    display: flex; align-items: center; justify-content: center; font-size: 15px;
  }
  .fa-header-brand { font-size: 0.9rem; font-weight: 700; color: #fff; }
  .fa-header-sub { font-size: 0.68rem; color: #6b7280; }
  .fa-header-nav { display: flex; gap: 2px; }
  .fa-header-link {
    font-size: 0.8rem; font-weight: 500; color: #9ca3af;
    text-decoration: none; padding: 6px 11px; border-radius: 4px;
    transition: color 0.12s, background 0.12s;
  }
  .fa-header-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .fa-header-link.active { color: #fff; background: rgba(255,255,255,0.10); }

  /* ── Shell ── */
  .fa-shell { max-width: 1200px; margin: 0 auto; padding: 28px 24px 56px; }

  /* ── Page title ── */
  .fa-title-row {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
  }
  .fa-title-row h1 { font-size: 1.65rem; font-weight: 800; color: #111827; margin: 0; }
  .fa-title-row p { font-size: 0.83rem; color: #6b7280; margin: 4px 0 0; }

  /* ── Score banner ── */
  .fa-score-banner {
    background: #111827;
    border-radius: 8px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
  }
  .fa-score-left { display: flex; align-items: center; gap: 16px; }
  .fa-score-pts {
    font-size: 2.4rem; font-weight: 900; color: #34d399; line-height: 1;
  }
  .fa-score-pts-label { font-size: 0.72rem; color: #6b7280; margin-top: 3px; }
  .fa-score-divider { width: 1px; height: 40px; background: #374151; }
  .fa-score-meta { display: flex; gap: 24px; }
  .fa-score-meta-item { text-align: center; }
  .fa-score-meta-value { font-size: 1.1rem; font-weight: 800; color: #fff; }
  .fa-score-meta-label { font-size: 0.68rem; color: #6b7280; margin-top: 2px; }
  .fa-score-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; min-width: 180px; }
  .fa-score-bar-label {
    font-size: 0.72rem; color: #6b7280;
    display: flex; justify-content: space-between; width: 100%;
  }
  .fa-score-bar-track {
    width: 100%; height: 6px; background: #374151; border-radius: 3px; overflow: hidden;
  }
  .fa-score-bar-fill {
    height: 100%; background: #34d399; border-radius: 3px; transition: width 0.4s ease;
  }
  .fa-rank-tag {
    font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 4px;
    background: #064e3b; color: #34d399; border: 1px solid #065f46;
  }

  /* ── Grid ── */
  .fa-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 14px;
    margin-top: 4px;
  }

  /* ── Card ── */
  .fa-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.15s, border-color 0.15s;
  }
  .fa-card:hover:not(.fa-card-done) {
    box-shadow: 0 4px 14px rgba(0,0,0,0.07);
    border-color: #d1d5db;
  }

  /* Lock overlay */
  .fa-card-done-overlay {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    z-index: 2;
  }
  .fa-card-done-overlay.passed {
    background: rgba(240, 253, 244, 0.96);
    border: 2px solid #86efac;
  }
  .fa-card-done-overlay.failed {
    background: rgba(254, 242, 242, 0.96);
    border: 2px solid #fca5a5;
  }
  .fa-card-done-overlay.skipped {
    background: rgba(255, 251, 235, 0.96);
    border: 2px solid #fcd34d;
  }
  .fa-done-icon { font-size: 2.2rem; }
  .fa-done-title { font-size: 0.9rem; font-weight: 700; color: #111827; }
  .fa-done-pts { font-size: 0.75rem; color: #6b7280; }
  .fa-done-lock { font-size: 0.7rem; color: #9ca3af; margin-top: 2px; display: flex; align-items: center; gap: 4px; }

  /* Card content */
  .fa-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .fa-badge {
    display: inline-block; font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase; padding: 3px 7px;
    border-radius: 3px; background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa;
  }
  .fa-card-id { font-size: 0.72rem; font-weight: 600; color: #d1d5db; }
  .fa-card-icon {
    width: 42px; height: 42px; border-radius: 7px; background: #f0fdf4;
    border: 1px solid #bbf7d0; display: flex; align-items: center;
    justify-content: center; font-size: 20px; margin-bottom: 12px;
  }
  .fa-card h3 { margin: 0 0 6px; font-size: 0.93rem; font-weight: 700; color: #111827; }
  .fa-card p { margin: 0 0 18px; font-size: 0.8rem; color: #6b7280; line-height: 1.55; }

  /* Buttons */
  .fa-btn {
    border: 0; cursor: pointer; border-radius: 5px; padding: 9px 16px;
    font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center;
    gap: 6px; transition: opacity 0.12s, filter 0.12s;
  }
  .fa-btn:hover:not(:disabled) { filter: brightness(0.93); }
  .fa-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .fa-btn-primary  { background: #059669; color: #fff; }
  .fa-btn-secondary { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }
  .fa-btn-danger   { background: #dc2626; color: #fff; }
  .fa-btn-next     { background: #1d4ed8; color: #fff; }
  .fa-btn-skip     { background: #6b7280; color: #fff; }

  /* ── Single sim view ── */
  .fa-stage {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 28px 28px 24px;
  }

  .fa-stage-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    flex-wrap: wrap; gap: 12px;
    padding-bottom: 18px; margin-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
  }
  .fa-stage-title-row { display: flex; align-items: center; gap: 12px; }
  .fa-stage-icon {
    width: 46px; height: 46px; border-radius: 7px; background: #f0fdf4;
    border: 1px solid #bbf7d0; display: flex; align-items: center;
    justify-content: center; font-size: 22px; flex-shrink: 0;
  }
  .fa-stage-name { font-size: 1.15rem; font-weight: 800; color: #111827; margin: 0; }
  .fa-stage-type-label { font-size: 0.75rem; color: #6b7280; margin-top: 3px; }
  .fa-step-tag {
    font-size: 0.72rem; font-weight: 700; padding: 5px 11px;
    border-radius: 4px; background: #f3f4f6; border: 1px solid #e5e7eb; color: #374151;
    white-space: nowrap;
  }

  /* Question box */
  .fa-question {
    background: #111827; border-radius: 6px; padding: 16px 18px; margin-bottom: 16px;
  }
  .fa-q-label {
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.07em; color: #34d399; margin-bottom: 8px;
  }
  .fa-q-text { font-size: 0.92rem; line-height: 1.75; color: #f9fafb; }

  /* Reveal / Timer */
  .fa-reveal-row { text-align: center; margin-bottom: 14px; }

  .fa-timer-wrap { margin-bottom: 14px; }
  .fa-timer-row {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;
  }
  .fa-timer-label { font-size: 0.72rem; font-weight: 600; color: #6b7280; }
  .fa-timer-secs  { font-size: 0.72rem; font-weight: 700; color: #374151; }
  .fa-timer-secs.danger { color: #dc2626; }
  .fa-timer-track { height: 5px; background: #f3f4f6; border-radius: 3px; overflow: hidden; }
  .fa-timer-fill  { height: 100%; background: #059669; border-radius: 3px; transition: width 1s linear, background 0.3s; }
  .fa-timer-fill.danger { background: #dc2626; }

  /* Options */
  .fa-options { display: grid; gap: 7px; margin-bottom: 16px; }
  .fa-options.hidden { opacity: 0.12; filter: blur(4px); pointer-events: none; user-select: none; }

  .fa-option {
    background: #fff; border: 1.5px solid #e5e7eb; border-radius: 5px;
    padding: 11px 14px; font-size: 0.86rem; text-align: left;
    display: flex; gap: 10px; align-items: center; cursor: pointer;
    color: #111827; transition: border-color 0.1s, background 0.1s;
  }
  .fa-option:hover:not(:disabled) { border-color: #059669; background: #f0fdf4; }
  .fa-option:disabled { cursor: not-allowed; }
  .fa-option .letter {
    width: 24px; height: 24px; border-radius: 4px; background: #f3f4f6;
    color: #374151; font-weight: 700; font-size: 0.72rem;
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .fa-option.correct { background: #f0fdf4; border-color: #059669; color: #065f46; }
  .fa-option.correct .letter { background: #059669; color: #fff; }
  .fa-option.wrong   { background: #fef2f2; border-color: #dc2626; color: #991b1b; }
  .fa-option.wrong .letter   { background: #dc2626; color: #fff; }

  /* Feedback */
  .fa-feedback {
    border-radius: 5px; padding: 11px 14px; margin-bottom: 14px;
    font-size: 0.86rem; line-height: 1.6;
    border-left: 3px solid;
  }
  .fa-feedback.ok   { background: #f0fdf4; color: #065f46; border-left-color: #059669; }
  .fa-feedback.warn { background: #fffbeb; color: #92400e; border-left-color: #d97706; }

  /* Protection panel */
  .fa-panel {
    background: #f9fafb; border: 1px solid #e5e7eb;
    border-left: 3px solid #059669; border-radius: 5px; padding: 15px;
  }
  .fa-panel h4 { margin: 0 0 5px; font-size: 0.85rem; font-weight: 700; color: #111827; }
  .fa-panel p  { margin: 0; font-size: 0.82rem; color: #374151; line-height: 1.6; }
  .fa-panel-target { font-size: 0.75rem; color: #6b7280; margin-top: 8px; }

  /* Stage footer */
  .fa-stage-footer {
    display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end;
    margin-top: 20px; padding-top: 16px; border-top: 1px solid #f3f4f6;
  }

  /* Alert */
  .fa-alert {
    background: #fffbeb; border: 1px solid #fcd34d; border-radius: 5px;
    padding: 12px 16px; font-size: 0.82rem; color: #92400e; margin-top: 20px;
  }

  /* Footer */
  .fa-footer {
    margin-top: 36px; padding-top: 20px; border-top: 1px solid #e5e7eb;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 12px; font-size: 0.78rem; color: #9ca3af;
  }
  .fa-footer a { color: #6b7280; text-decoration: none; font-weight: 600; }
  .fa-footer a:hover { color: #111827; }

  @media (max-width: 768px) {
    .fa-shell { padding: 18px 16px 40px; }
    .fa-score-banner { flex-direction: column; align-items: flex-start; }
    .fa-score-right { align-items: flex-start; min-width: 100%; }
    .fa-stage { padding: 18px; }
  }
`;

export default function FraudAwareness({ scoreboard = null, completedAttempts = {} }) {
    const user = usePage().props.auth.user;

    // Initialise answered from DB-completed attempts so cards are locked on load
    const [answered, setAnswered] = useState(() => {
        const init = {};
        Object.entries(completedAttempts).forEach(([slug, data]) => {
            init[slug] = {
                idx: null,
                correct: data.won,
                won: data.won,
                timedOut: data.status === 'skipped',
                status: data.status,
                score: data.won ? 1 : 0,
                maxScore: 1,
                fromDB: true,
            };
        });
        return init;
    });

    const [currentPage, setCurrentPage] = useState('home');
    const [currentScamId, setCurrentScamId] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(10);
    const [quizFinished, setQuizFinished] = useState(false);
    const [lastError, setLastError] = useState('');
    const [sessionPoints, setSessionPoints] = useState(0);

    const activeScam = useMemo(
        () => scams.find((s) => s.id === currentScamId) || null,
        [currentScamId]
    );

    const activeAnswer = currentScamId ? answered[currentScamId] : null;
    const reviewMode = Boolean(activeAnswer);

    // Derived stats
    const initialPoints = scoreboard?.points ?? 0;
    const totalPoints = initialPoints + sessionPoints;
    const completedCount = Object.keys(answered).length;
    const wonCount = Object.values(answered).filter((a) => a.won).length;
    const accuracy = completedCount > 0 ? Math.round((wonCount / completedCount) * 100) : 0;
    const rankTier = scoreboard?.rank_tier ?? 'Vulnerable';
    const scoreBarPct = Math.min(Math.round((totalPoints / MAX_POINTS) * 100), 100);

    const recordAttempt = async (scam, payload) => {
        try {
            await axios.post(route('game-attempts.store'), {
                game_slug: scam.id,
                game_title: scam.title,
                game_description: scam.short,
                status: payload.status,
                won: payload.won,
                score: payload.score,
                max_score: payload.maxScore,
                started_at: payload.startedAt,
                completed_at: payload.completedAt,
            });
        } catch (err) {
            setLastError(err?.response?.data?.message || 'Sync failed — your answer was saved locally.');
        }
    };

    const openScam = (scamId) => {
        if (answered[scamId]) return; // locked
        setCurrentScamId(scamId);
        setCurrentPage('scam');
        setTimerStarted(false);
        setSecondsLeft(10);
        setQuizFinished(false);
        setLastError('');
    };

    const goHome = () => {
        setCurrentPage('home');
        setCurrentScamId(null);
        setTimerStarted(false);
        setSecondsLeft(10);
        setQuizFinished(false);
        setLastError('');
    };

    const finishAttempt = async ({ idx = null, timedOut = false } = {}) => {
        if (!activeScam) return;
        const correct = idx !== null ? Boolean(activeScam.options[idx]?.correct) : false;
        const status = timedOut ? 'skipped' : correct ? 'won' : 'lost';
        const answer = {
            idx,
            correct,
            won: correct,
            timedOut,
            status,
            score: correct ? 1 : 0,
            maxScore: 1,
            startedAt: new Date(Date.now() - (10 - secondsLeft) * 1000).toISOString(),
            completedAt: new Date().toISOString(),
        };

        setAnswered((prev) => ({ ...prev, [activeScam.id]: answer }));
        setQuizFinished(true);
        if (correct) setSessionPoints((p) => p + POINTS_PER_WIN);
        await recordAttempt(activeScam, answer);
    };

    useEffect(() => {
        if (currentPage !== 'scam' || !timerStarted || quizFinished) return undefined;
        const t = window.setInterval(() => setSecondsLeft((v) => Math.max(v - 1, 0)), 1000);
        return () => window.clearInterval(t);
    }, [currentPage, timerStarted, quizFinished, currentScamId]);

    useEffect(() => {
        if (currentPage === 'scam' && timerStarted && !quizFinished && secondsLeft === 0) {
            finishAttempt({ timedOut: true });
        }
    }, [secondsLeft, currentPage, timerStarted, quizFinished]);

    const startTimer = () => {
        if (reviewMode || timerStarted) return;
        setTimerStarted(true);
        setLastError('');
    };

    const selectOption = async (index) => {
        if (quizFinished || reviewMode) return;
        setTimerStarted(true);
        await finishAttempt({ idx: index });
    };

    const nextScam = useMemo(() => {
        if (!activeScam) return null;
        const i = scams.findIndex((s) => s.id === activeScam.id);
        return i < scams.length - 1 ? scams[i + 1] : null;
    }, [activeScam]);

    // ── Score banner (shared between views)
    const renderScoreBanner = () => (
        <div className="fa-score-banner">
            <div className="fa-score-left">
                <div>
                    <div className="fa-score-pts">{totalPoints}</div>
                    <div className="fa-score-pts-label">points earned</div>
                </div>
                <div className="fa-score-divider" />
                <div className="fa-score-meta">
                    <div className="fa-score-meta-item">
                        <div className="fa-score-meta-value">{completedCount}/{scams.length}</div>
                        <div className="fa-score-meta-label">completed</div>
                    </div>
                    <div className="fa-score-meta-item">
                        <div className="fa-score-meta-value">{wonCount}</div>
                        <div className="fa-score-meta-label">passed</div>
                    </div>
                    <div className="fa-score-meta-item">
                        <div className="fa-score-meta-value">{accuracy}%</div>
                        <div className="fa-score-meta-label">accuracy</div>
                    </div>
                </div>
            </div>
            <div className="fa-score-right">
                <div className="fa-score-bar-label">
                    <span>Score progress</span>
                    <span>{totalPoints} / {MAX_POINTS} pts</span>
                </div>
                <div className="fa-score-bar-track">
                    <div className="fa-score-bar-fill" style={{ width: `${scoreBarPct}%` }} />
                </div>
                <div className="fa-rank-tag">Tier: {rankTier}</div>
            </div>
        </div>
    );

    // ── Home view
    const renderHome = () => (
        <>
            <div className="fa-title-row">
                <div>
                    <h1>Fraud Awareness Hub</h1>
                    <p>Each simulation is one-attempt only. Answer correctly to earn {POINTS_PER_WIN} pts per question.</p>
                </div>
                <span style={{
                    fontSize: '0.78rem', fontWeight: 700, color: '#374151',
                    background: '#fff', border: '1px solid #e5e7eb', borderRadius: 5,
                    padding: '6px 14px', alignSelf: 'center',
                }}>
                    {user?.name ?? 'Trainee'}
                </span>
            </div>

            {renderScoreBanner()}

            <div className="fa-grid">
                {scams.map((scam) => {
                    const done = answered[scam.id];
                    const overlayClass = done
                        ? done.won ? 'passed' : done.timedOut ? 'skipped' : 'failed'
                        : '';

                    return (
                        <div key={scam.id} className={`fa-card${done ? ' fa-card-done' : ''}`}>
                            {done && (
                                <div className={`fa-card-done-overlay ${overlayClass}`}>
                                    <div className="fa-done-icon">
                                        {done.won ? '✅' : done.timedOut ? '⏰' : '❌'}
                                    </div>
                                    <div className="fa-done-title">
                                        {done.won ? 'Passed' : done.timedOut ? 'Timed Out' : 'Incorrect'}
                                    </div>
                                    <div className="fa-done-pts">
                                        {done.won ? `+${POINTS_PER_WIN} pts earned` : '0 pts'}
                                    </div>
                                    <div className="fa-done-lock">🔒 Locked — one attempt only</div>
                                </div>
                            )}

                            <div className="fa-card-header">
                                <span className="fa-badge">{scam.type}</span>
                                <span className="fa-card-id">{scam.id}</span>
                            </div>
                            <div className="fa-card-icon">{scam.icon}</div>
                            <h3>{scam.title}</h3>
                            <p>{scam.short}</p>

                            {!done && (
                                <button className="fa-btn fa-btn-primary" onClick={() => openScam(scam.id)}>
                                    Start Simulation →
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="fa-alert">
                <strong>Report suspicious activity:</strong> Contact eSewa support at{' '}
                <strong>1660-01-23456</strong> or <strong>fraud@esewa.com.np</strong>
            </div>
        </>
    );

    // ── Single sim view
    const renderScam = () => {
        if (!activeScam) return null;

        const answer = answered[activeScam.id];
        const showFeedback = Boolean(answer);
        const correctIdx = activeScam.options.findIndex((o) => o.correct);
        const timerDanger = secondsLeft <= 3 && timerStarted && !quizFinished;
        const scamIndex = scams.findIndex((s) => s.id === activeScam.id);

        return (
            <>
                {renderScoreBanner()}

                <div className="fa-stage">
                    <div className="fa-stage-top">
                        <div className="fa-stage-title-row">
                            <div className="fa-stage-icon">{activeScam.icon}</div>
                            <div>
                                <p className="fa-stage-name">{activeScam.title}</p>
                                <div className="fa-stage-type-label">{activeScam.type}</div>
                            </div>
                        </div>
                        <span className="fa-step-tag">{scamIndex + 1} / {scams.length}</span>
                    </div>

                    <div className="fa-question">
                        <div className="fa-q-label">Scenario</div>
                        <div className="fa-q-text">{activeScam.question}</div>
                    </div>

                    {!showFeedback && !quizFinished && (
                        <div className="fa-reveal-row">
                            <button className="fa-btn fa-btn-primary" onClick={startTimer}>
                                Reveal Answers & Start Timer
                            </button>
                        </div>
                    )}

                    {!showFeedback && timerStarted && (
                        <div className="fa-timer-wrap">
                            <div className="fa-timer-row">
                                <span className="fa-timer-label">Time remaining</span>
                                <span className={`fa-timer-secs${timerDanger ? ' danger' : ''}`}>
                                    {secondsLeft}s
                                </span>
                            </div>
                            <div className="fa-timer-track">
                                <div
                                    className={`fa-timer-fill${timerDanger ? ' danger' : ''}`}
                                    style={{ width: `${(secondsLeft / 10) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {showFeedback && answer.timedOut && (
                        <div className="fa-feedback warn">
                            ⏰ Time&apos;s up — you did not answer in time.
                        </div>
                    )}

                    {showFeedback && !answer.timedOut && (
                        <div className={`fa-feedback ${answer.correct ? 'ok' : 'warn'}`}>
                            {answer.correct
                                ? `✓ ${activeScam.explanation.correct}`
                                : `✗ ${activeScam.explanation.wrong}`}
                        </div>
                    )}

                    {lastError && (
                        <div className="fa-feedback warn">{lastError}</div>
                    )}

                    <div className={`fa-options${!timerStarted && !showFeedback ? ' hidden' : ''}`}>
                        {activeScam.options.map((option, index) => {
                            const isCorrect = index === correctIdx;
                            const isChosen = answer?.idx === index;
                            let cls = 'fa-option';
                            if (showFeedback) {
                                if (isCorrect) cls += ' correct';
                                else if (isChosen) cls += ' wrong';
                            }
                            return (
                                <button
                                    key={option.label}
                                    className={cls}
                                    disabled={showFeedback}
                                    onClick={() => selectOption(index)}
                                >
                                    <span className="letter">{String.fromCharCode(65 + index)}</span>
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="fa-panel">
                        <h4>How to Protect Yourself</h4>
                        <p>{activeScam.solution}</p>
                        <div className="fa-panel-target">
                            <strong>Target group:</strong> {activeScam.targetGroup}
                        </div>
                    </div>

                    <div className="fa-stage-footer">
                        <button className="fa-btn fa-btn-danger" onClick={goHome}>Exit</button>
                        {!showFeedback && (
                            <button className="fa-btn fa-btn-skip" onClick={() => finishAttempt({ timedOut: true })}>
                                Skip
                            </button>
                        )}
                        {nextScam && !answered[nextScam.id] ? (
                            <button className="fa-btn fa-btn-next" onClick={() => openScam(nextScam.id)}>
                                Next: {nextScam.title} →
                            </button>
                        ) : (
                            <button className="fa-btn fa-btn-primary" onClick={goHome}>
                                Back to Hub
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="fa-page">
            <Head title="Fraud Awareness Hub" />
            <style>{style}</style>

            <header className="fa-header">
                <div className="fa-header-left">
                    <div className="hp-logo">
                        <img src={logo} alt="esewa logo" />
                    </div>
                </div>
                <nav className="fa-header-nav">
                    <Link href={route('fraud-awareness')} className="fa-header-link active">Simulations</Link>
                    <Link href={route('leaderboard')} className="fa-header-link">Leaderboard</Link>
                    <Link href={route('dashboard')} className="fa-header-link">Dashboard</Link>
                </nav>
            </header>

            <div className="fa-shell">
                {currentPage === 'home' ? renderHome() : renderScam()}

                <div className="fa-footer">
                    <span>Educational simulations to help users spot and avoid scams.</span>
                    <Link href={route('dashboard')}>← Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
