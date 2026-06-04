import { Head, Link } from '@inertiajs/react';
import headImg     from '../assets/head.jpg';
import shareyImg   from '../assets/sharey.jpg';
import yellowImg   from '../assets/yellow.jpg';
import blackcatImg from '../assets/blackcat.jpg';
import logo from '../assets/logo.png';

const AVATAR_IMAGES = [headImg, shareyImg, yellowImg, blackcatImg];

const ROW_CLASS  = ['row-1', 'row-2', 'row-3'];
const RANK_CLASS = ['r1', 'r2', 'r3'];

function accClass(acc) {
    if (acc >= 70) return 'grn';
    if (acc >= 40) return 'org';
    return 'red';
}

const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  .hp-logo img { height: 30px; width: auto; display: block; }
  
  .lb-page {
    min-height: 100vh;
    background: #ffffff;
    color: #0f172a;
    font-family: Inter, system-ui, sans-serif;
  }

  /* ── Header ── */
  .lb-header {
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
  .lb-header-left { display: flex; align-items: center; gap: 10px; }
  .lb-header-logo {
    width: 30px; height: 30px; border-radius: 5px;
    background: #60bb46;
    display: flex; align-items: center; justify-content: center; font-size: 15px;
  }
  .lb-header-brand { font-size: 0.9rem; font-weight: 700; color: #fff; }
  .lb-header-sub   { font-size: 0.68rem; color: #6b7280; }
  .lb-header-nav   { display: flex; gap: 2px; }
  .lb-header-link {
    font-size: 0.8rem; font-weight: 500; color: #9ca3af;
    text-decoration: none; padding: 6px 11px; border-radius: 4px;
    transition: color 0.12s, background 0.12s;
  }
  .lb-header-link:hover  { color: #fff; background: rgba(255,255,255,0.08); }
  .lb-header-link.active { color: #fff; background: rgba(255,255,255,0.12); }

  /* ── Shell ── */
  .lb-shell { max-width: 1100px; margin: 0 auto; padding: 32px 24px 56px; }

  /* ── Title row ── */
  .lb-title-row {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 12px; margin-bottom: 24px;
  }
  .lb-title-row h1 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0; }
  .lb-title-row p  { font-size: 0.83rem; color: #6b7280; margin: 4px 0 0; }
  .lb-users-badge {
    font-size: 0.78rem; font-weight: 700; color: #60bb46;
    background: rgba(96,187,70,0.1); border: 1px solid rgba(96,187,70,0.3);
    border-radius: 5px; padding: 6px 14px; align-self: center;
  }

  /* ── Stats banner ── */
  .lb-stats-banner {
    background: #111827; border-radius: 10px; padding: 22px 28px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px; margin-bottom: 24px;
  }
  .lb-sb-left      { display: flex; align-items: center; gap: 20px; }
  .lb-sb-pts       { font-size: 2.6rem; font-weight: 900; color: #60bb46; line-height: 1; }
  .lb-sb-pts-label { font-size: 0.72rem; color: #6b7280; margin-top: 3px; }
  .lb-sb-divider   { width: 1px; height: 40px; background: #374151; }
  .lb-sb-meta      { display: flex; gap: 28px; }
  .lb-sb-item      { text-align: center; }
  .lb-sb-value     { font-size: 1.1rem; font-weight: 800; color: #fff; }
  .lb-sb-label     { font-size: 0.68rem; color: #6b7280; margin-top: 2px; }
  .lb-sb-right     { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; min-width: 200px; }
  .lb-sb-bar-label { font-size: 0.72rem; color: #6b7280; display: flex; justify-content: space-between; width: 100%; }
  .lb-sb-bar-track { width: 100%; height: 6px; background: #374151; border-radius: 3px; overflow: hidden; }
  .lb-sb-bar-fill  { height: 100%; background: #60bb46; border-radius: 3px; transition: width 0.4s ease; }
  .lb-rank-tag {
    font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 4px;
    background: rgba(96,187,70,0.15); color: #60bb46; border: 1px solid rgba(96,187,70,0.3);
  }

  /* ── Podium ── */
  .lb-podium-wrap {
    background: #111827;
    border-radius: 12px;
    padding: 36px 24px 0;
    margin-bottom: 24px;
    overflow: hidden;
  }
  .lb-podium-stage {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 10px;
  }
  .lb-pod-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 200px;
  }
  .lb-pod-above { text-align: center; margin-bottom: 12px; }
  .lb-pod-img {
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto 7px;
  }
  .lb-pod-uname { color: #fff; font-size: 13px; font-weight: 700; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }
  .lb-pod-score {
    display: inline-block;
    background: #60bb46;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    padding: 3px 11px;
    border-radius: 99px;
  }
  .lb-pod-building {
    width: 100%;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .lb-pod-rank-num {
    font-size: 3.5rem;
    font-weight: 900;
    color: rgba(255,255,255,0.25);
    line-height: 1;
  }
  .lb-pod-tests-txt { font-size: 10px; color: rgba(255,255,255,0.45); }

  /* ── Rankings table ── */
  .lb-table-card {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px;
  }
  .lb-table-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 16px; flex-wrap: wrap; gap: 8px;
  }
  .lb-table-top h3 { margin: 0; font-size: 1rem; font-weight: 700; color: #0f172a; }

  .lb-thead {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 0 14px 10px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 6px;
  }
  .lb-thead span {
    font-size: 0.7rem; color: #9ca3af; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .lb-thead span:not(:first-child) { text-align: center; }

  .lb-trow {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    align-items: center;
    padding: 12px 14px;
    border-radius: 8px;
    margin-bottom: 6px;
    background: #f9fafb;
    border: 1px solid #f0f0f0;
    transition: background 0.12s, border-color 0.12s;
  }
  .lb-trow:hover { background: #f0f8ec; border-color: rgba(96,187,70,0.3); }
  .lb-trow.row-1 { background: #f0f8ec; border-left: 3px solid #f59e0b; }
  .lb-trow.row-2 { background: #f9fafb; border-left: 3px solid #9ca3af; }
  .lb-trow.row-3 { background: #f9fafb; border-left: 3px solid #b45309; }

  .lb-trow-name-cell { display: flex; align-items: center; gap: 10px; }
  .lb-trow-rank {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 800; color: #6b7280;
    background: #f0f0f0; flex-shrink: 0;
  }
  .lb-trow-rank.r1 { background: #f59e0b; color: #fff; }
  .lb-trow-rank.r2 { background: #9ca3af; color: #fff; }
  .lb-trow-rank.r3 { background: #b45309; color: #fff; }

  .lb-trow-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; display: block; flex-shrink: 0; }
  .lb-trow-name   { font-weight: 600; color: #0f172a; font-size: 0.85rem; }
  .lb-trow-email  { font-size: 0.68rem; color: #9ca3af; margin-top: 1px; }

  .lb-cell-center { text-align: center; }
  .lb-cell-strong { font-size: 0.92rem; font-weight: 800; color: #0f172a; }
  .lb-cell-sub    { display: block; font-size: 0.68rem; color: #9ca3af; margin-top: 1px; }

  .lb-pts-pill {
    display: inline-flex; align-items: center; justify-content: center;
    background: rgba(96,187,70,0.12); color: #3d8c2c;
    border: 1px solid rgba(96,187,70,0.3);
    border-radius: 6px; padding: 4px 12px;
    font-weight: 800; font-size: 0.85rem;
  }

  .lb-acc-circle {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 0.73rem; color: #fff; margin: 0 auto;
  }
  .lb-acc-circle.grn { background: #60bb46; }
  .lb-acc-circle.org { background: #d97706; }
  .lb-acc-circle.red { background: #dc2626; }

  /* ── Your rank strip ── */
  .lb-my-rank {
    margin-top: 16px; border-top: 1px solid #f0f0f0; padding-top: 16px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  }
  .lb-my-rank-badge {
    font-size: 0.78rem; font-weight: 700;
    background: rgba(96,187,70,0.1); color: #60bb46;
    border: 1px solid rgba(96,187,70,0.25); border-radius: 4px; padding: 5px 12px;
  }
  .lb-my-rank-text         { font-size: 0.85rem; color: #6b7280; }
  .lb-my-rank-text strong  { color: #0f172a; }
  .lb-my-rank-btn {
    background: #60bb46; color: #fff; border-radius: 6px;
    padding: 8px 18px; font-size: 0.8rem; font-weight: 700;
    text-decoration: none; transition: filter 0.12s;
  }
  .lb-my-rank-btn:hover { filter: brightness(0.9); }

  /* ── Empty / Footer ── */
  .lb-empty {
    text-align: center; padding: 40px; color: #9ca3af;
    border: 1px dashed #e5e7eb; border-radius: 8px; margin-top: 10px;
  }
  .lb-footer {
    margin-top: 32px; padding-top: 18px; border-top: 1px solid #e5e7eb;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 12px; font-size: 0.78rem; color: #9ca3af;
  }
  .lb-footer a { color: #6b7280; text-decoration: none; font-weight: 600; }
  .lb-footer a:hover { color: #0f172a; }

  @media (max-width: 700px) {
    .lb-podium-stage { gap: 6px; }
    .lb-pod-col { max-width: 110px; }
    .lb-pod-uname { font-size: 11px; }
    .lb-thead { display: none; }
    .lb-trow  { grid-template-columns: 1fr 1fr; gap: 8px; }
    .lb-stats-banner { flex-direction: column; align-items: flex-start; }
    .lb-sb-right { align-items: flex-start; min-width: 100%; }
  }
`;

/* ── Podium slot config: order left→right is 2nd, 1st, 3rd ── */
const PODIUM_SLOTS = [
    { idx: 1, rank: 2, height: 155, building: 'rgba(96,187,70,0.60)', imgSize: 58, border: '#9ca3af' },
    { idx: 0, rank: 1, height: 210, building: '#60bb46',              imgSize: 74, border: '#60bb46' },
    { idx: 2, rank: 3, height: 115, building: 'rgba(96,187,70,0.40)', imgSize: 52, border: '#b45309' },
];

export default function Leaderboard({ leaders = [], currentUserStanding = null }) {
    const podium     = leaders.slice(0, 3);
    const totalTests = leaders.reduce((s, l) => s + (l.tests_passed ?? 0), 0);
    const topScore   = leaders[0]?.points ?? 0;
    const yourRank   = currentUserStanding?.rank;

    return (
        <div className="lb-page">
            <Head title="Leaderboard" />
            <style>{styles}</style>

            {/* ── Header ── */}
            <header className="lb-header">
                <div className="lb-header-left">
                    <div className="hp-logo">
                        <img src={logo} alt="esewa logo" />
                    </div>
                </div>
                <nav className="lb-header-nav">
                    <Link href={route('fraud-awareness')} className="lb-header-link">Simulations</Link>
                    <Link href={route('leaderboard')}     className="lb-header-link active">Leaderboard</Link>
                    <Link href={route('dashboard')}       className="lb-header-link">Dashboard</Link>
                </nav>
            </header>

            <div className="lb-shell">

                {/* ── Title ── */}
                <div className="lb-title-row">
                    <div>
                        <h1>Leaderboard</h1>
                        <p>Ranked by total points — earn more by passing fraud simulations</p>
                    </div>
                    <span className="lb-users-badge">{leaders.length} active users</span>
                </div>

                {/* ── Stats banner ── */}
                <div className="lb-stats-banner">
                    <div className="lb-sb-left">
                        <div>
                            <div className="lb-sb-pts">{topScore}</div>
                            <div className="lb-sb-pts-label">top score</div>
                        </div>
                        <div className="lb-sb-divider" />
                        <div className="lb-sb-meta">
                            <div className="lb-sb-item">
                                <div className="lb-sb-value">{leaders.length}</div>
                                <div className="lb-sb-label">ranked users</div>
                            </div>
                            <div className="lb-sb-item">
                                <div className="lb-sb-value">{totalTests}</div>
                                <div className="lb-sb-label">tests passed</div>
                            </div>
                            <div className="lb-sb-item">
                                <div className="lb-sb-value">{yourRank ? `#${yourRank}` : '—'}</div>
                                <div className="lb-sb-label">your rank</div>
                            </div>
                        </div>
                    </div>
                    <div className="lb-sb-right">
                        <div className="lb-sb-bar-label">
                            <span>Your score progress</span>
                            <span>{currentUserStanding?.points ?? 0} / 90 pts</span>
                        </div>
                        <div className="lb-sb-bar-track">
                            <div
                                className="lb-sb-bar-fill"
                                style={{ width: `${Math.min(Math.round(((currentUserStanding?.points ?? 0) / 90) * 100), 100)}%` }}
                            />
                        </div>
                        <div className="lb-rank-tag">
                            Tier: {currentUserStanding?.rank_tier ?? 'Vulnerable'}
                        </div>
                    </div>
                </div>

                {/* ── Podium — three buildings ── */}
                {podium.length > 0 && (
                    <div className="lb-podium-wrap">
                        <div className="lb-podium-stage">
                            {PODIUM_SLOTS.map(({ idx, rank, height, building, imgSize, border }) => {
                                const leader = podium[idx];
                                if (!leader) return null;
                                return (
                                    <div key={leader.user_id} className="lb-pod-col">
                                        {/* Avatar + name + score above the building */}
                                        <div className="lb-pod-above">
                                            <img
                                                className="lb-pod-img"
                                                src={AVATAR_IMAGES[leader.user_id % AVATAR_IMAGES.length]}
                                                alt={leader.name}
                                                style={{ width: imgSize, height: imgSize, border: `3px solid ${border}` }}
                                            />
                                            <div className="lb-pod-uname">{leader.name}</div>
                                            <span className="lb-pod-score">{leader.points} pts</span>
                                        </div>

                                        {/* Building column */}
                                        <div
                                            className="lb-pod-building"
                                            style={{ height, background: building }}
                                        >
                                            <div className="lb-pod-rank-num">{rank}</div>
                                            <div className="lb-pod-tests-txt">{leader.tests_passed ?? 0} tests passed</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ── Full rankings table ── */}
                <div className="lb-table-card">
                    <div className="lb-table-top">
                        <h3>All Rankings</h3>
                    </div>

                    {leaders.length > 0 ? (
                        <>
                            <div className="lb-thead">
                                <span>Player</span>
                                <span>Tests Passed</span>
                                <span>Points</span>
                                <span>Accuracy</span>
                            </div>

                            {leaders.map((leader, i) => {
                                const accuracy = Math.round(leader.accuracy_rate ?? 0);
                                return (
                                    <div key={leader.user_id} className={`lb-trow ${ROW_CLASS[i] ?? ''}`}>
                                        {/* Name cell */}
                                        <div className="lb-trow-name-cell">
                                            <div className={`lb-trow-rank ${RANK_CLASS[i] ?? ''}`}>{i + 1}</div>
                                            <img
                                                className="lb-trow-avatar"
                                                src={AVATAR_IMAGES[leader.user_id % AVATAR_IMAGES.length]}
                                                alt={leader.name}
                                            />
                                            <div>
                                                <div className="lb-trow-name">{leader.name}</div>
                                                <div className="lb-trow-email">{leader.email}</div>
                                            </div>
                                        </div>

                                        {/* Tests passed */}
                                        <div className="lb-cell-center">
                                            <div className="lb-cell-strong">{leader.tests_passed ?? 0}</div>
                                            <span className="lb-cell-sub">passed</span>
                                        </div>

                                        {/* Points */}
                                        <div className="lb-cell-center">
                                            <div className="lb-pts-pill">{leader.points}</div>
                                        </div>

                                        {/* Accuracy */}
                                        <div className="lb-cell-center">
                                            <div className={`lb-acc-circle ${accClass(accuracy)}`}>{accuracy}%</div>
                                        </div>
                                    </div>
                                );
                            })}

                            {currentUserStanding && (
                                <div className="lb-my-rank">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span className="lb-my-rank-badge">Your Rank #{currentUserStanding.rank}</span>
                                        <span className="lb-my-rank-text">
                                            <strong>{currentUserStanding.points} pts</strong> ·{' '}
                                            <strong>{currentUserStanding.tests_passed ?? 0} tests passed</strong> ·{' '}
                                            {currentUserStanding.rank_tier}
                                        </span>
                                    </div>
                                    <Link href={route('fraud-awareness')} className="lb-my-rank-btn">
                                        Play &amp; Climb →
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="lb-empty">No leaderboard data yet. Be the first to complete a simulation!</div>
                    )}
                </div>

                <div className="lb-footer">
                    <span>Points are earned by passing fraud awareness simulations.</span>
                    <Link href={route('dashboard')}>← Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
