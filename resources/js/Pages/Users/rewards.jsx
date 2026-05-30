import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const REWARDS = [
    { id: 1,  cat: 'mobile',  catLabel: 'Mobile Recharge', emoji: '📱', bg: 'linear-gradient(135deg,#dcfce7,#86efac)', title: 'NTC Rs.100 Recharge',     desc: 'Instant NTC balance top-up of Rs.100.',             pts: 500,  badge: '',    delivery: 'Instant',       validity: '—',       stock: 240, terms: 'Valid for NTC SIM only. Non-transferable. Single use.' },
    { id: 2,  cat: 'mobile',  catLabel: 'Mobile Recharge', emoji: '📱', bg: 'linear-gradient(135deg,#dbeafe,#93c5fd)', title: 'Ncell Rs.100 Recharge',   desc: 'Instant Ncell balance top-up of Rs.100.',           pts: 500,  badge: 'hot', delivery: 'Instant',       validity: '—',       stock: 320, terms: 'Valid for Ncell SIM only. Non-transferable.' },
    { id: 3,  cat: 'mobile',  catLabel: 'Mobile Recharge', emoji: '📲', bg: 'linear-gradient(135deg,#fce7f3,#f9a8d4)', title: 'NTC Rs.500 Recharge',     desc: 'NTC balance recharge of Rs.500.',                   pts: 2200, badge: '',    delivery: 'Instant',       validity: '—',       stock: 80,  terms: 'Valid for NTC SIM only. Non-transferable.' },
    { id: 4,  cat: 'mobile',  catLabel: 'Mobile Recharge', emoji: '📲', bg: 'linear-gradient(135deg,#fef3c7,#fcd34d)', title: 'Ncell Rs.500 Recharge',   desc: 'Ncell balance recharge of Rs.500.',                 pts: 2200, badge: '',    delivery: 'Instant',       validity: '—',       stock: 95,  terms: 'Valid for Ncell SIM only. Non-transferable.' },
    { id: 5,  cat: 'data',    catLabel: 'Data Packages',   emoji: '📶', bg: 'linear-gradient(135deg,#e0e7ff,#a5b4fc)', title: 'NTC 1GB Data Pack',       desc: 'NTC 1GB data valid for 7 days.',                    pts: 800,  badge: 'new', delivery: 'Within 10 min', validity: '7 Days',  stock: 150, terms: 'Data pack activated on NTC SIM. No carryover.' },
    { id: 6,  cat: 'data',    catLabel: 'Data Packages',   emoji: '📡', bg: 'linear-gradient(135deg,#cffafe,#67e8f9)', title: 'Ncell 2GB Data Pack',     desc: 'Ncell 2GB data valid for 15 days.',                 pts: 1400, badge: '',    delivery: 'Within 10 min', validity: '15 Days', stock: 120, terms: 'Data pack activated on Ncell SIM. No carryover.' },
    { id: 7,  cat: 'data',    catLabel: 'Data Packages',   emoji: '🌐', bg: 'linear-gradient(135deg,#d1fae5,#6ee7b7)', title: 'NTC 5GB Data Pack',       desc: 'NTC 5GB data valid for 30 days.',                   pts: 3200, badge: 'hot', delivery: 'Within 30 min', validity: '30 Days', stock: 60,  terms: 'Data pack activated on NTC SIM. No carryover.' },
    { id: 8,  cat: 'gaming',  catLabel: 'Gaming',          emoji: '🎮', bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', title: 'PUBG Mobile 60 UC',       desc: '60 Unknown Cash for PUBG Mobile.',                  pts: 600,  badge: 'hot', delivery: 'Instant',       validity: '—',       stock: 500, terms: 'Enter your PUBG Player ID at redemption. No refunds.' },
    { id: 9,  cat: 'gaming',  catLabel: 'Gaming',          emoji: '🎮', bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)', title: 'PUBG Mobile 325 UC',      desc: '325 UC for PUBG Mobile. Best value!',               pts: 1500, badge: 'hot', delivery: 'Instant',       validity: '—',       stock: 350, terms: 'Enter your PUBG Player ID at redemption. No refunds.' },
    { id: 10, cat: 'gaming',  catLabel: 'Gaming',          emoji: '🔥', bg: 'linear-gradient(135deg,#fef9c3,#fde047)', title: 'Free Fire 100 Diamonds',  desc: '100 Diamonds for Free Fire.',                       pts: 700,  badge: '',    delivery: 'Instant',       validity: '—',       stock: 300, terms: 'Enter your Free Fire Player ID at redemption.' },
    { id: 11, cat: 'gaming',  catLabel: 'Gaming',          emoji: '💎', bg: 'linear-gradient(135deg,#ede9fe,#c4b5fd)', title: 'ML Diamonds 86+6',        desc: 'Mobile Legends 86+6 Diamonds.',                     pts: 900,  badge: 'new', delivery: 'Instant',       validity: '—',       stock: 200, terms: 'Enter your ML Player ID at redemption. No refunds.' },
    { id: 12, cat: 'gaming',  catLabel: 'Gaming',          emoji: '🎯', bg: 'linear-gradient(135deg,#dcfce7,#4ade80)', title: 'Clash of Clans 80 Gems',  desc: '80 Gems pack for Clash of Clans.',                  pts: 550,  badge: '',    delivery: 'Instant',       validity: '—',       stock: 180, terms: 'Redeem via Game Center account. No refunds.' },
    { id: 13, cat: 'digital', catLabel: 'Digital Rewards', emoji: '💰', bg: 'linear-gradient(135deg,#dcfce7,#86efac)', title: 'eSewa Cashback Rs.50',    desc: 'Rs.50 cashback credited to your eSewa wallet.',     pts: 400,  badge: 'hot', delivery: 'Within 24 hrs', validity: '30 Days', stock: 999, terms: 'Cashback credited within 24 hours. Minimum balance required.' },
    { id: 14, cat: 'digital', catLabel: 'Digital Rewards', emoji: '🎁', bg: 'linear-gradient(135deg,#fce7f3,#f9a8d4)', title: 'Amazon Gift Card Rs.500', desc: 'Rs.500 Amazon.in Gift Card code.',                  pts: 3000, badge: '',    delivery: '1-2 Hours',     validity: '1 Year',  stock: 45,  terms: 'Valid on Amazon.in only. Cannot be combined with other offers.' },
    { id: 15, cat: 'digital', catLabel: 'Digital Rewards', emoji: '🛍️', bg: 'linear-gradient(135deg,#dbeafe,#93c5fd)', title: 'Daraz Coupon 10% Off',   desc: '10% discount coupon for Daraz Nepal.',              pts: 1200, badge: 'new', delivery: 'Instant',       validity: '15 Days', stock: 100, terms: 'Valid on selected categories. Single use. Min order Rs.500.' },
    { id: 16, cat: 'digital', catLabel: 'Digital Rewards', emoji: '🎬', bg: 'linear-gradient(135deg,#fef3c7,#fcd34d)', title: 'Netflix 1-Month Gift',    desc: 'Netflix Nepal 1-month subscription gift.',          pts: 8000, badge: '',    delivery: '2-4 Hours',     validity: '30 Days', stock: 20,  terms: 'Valid for new or existing Netflix accounts in Nepal.' },
];

const CHALLENGES = [
    { emoji: '📅', name: 'Daily Login',            pts: '+10 pts',  progress: 100, status: 'done'    },
    { emoji: '🧾', name: 'Pay Utility Bill',       pts: '+50 pts',  progress: 80,  status: 'ongoing' },
    { emoji: '📷', name: 'Scan QR Payment',        pts: '+20 pts',  progress: 60,  status: 'ongoing' },
    { emoji: '📱', name: 'Mobile Recharge',        pts: '+30 pts',  progress: 100, status: 'done'    },
    { emoji: '👤', name: 'Invite a Friend',        pts: '+100 pts', progress: 0,   status: 'locked'  },
    { emoji: '🪪', name: 'Complete KYC',           pts: '+200 pts', progress: 100, status: 'done'    },
    { emoji: '🛒', name: 'Online Shopping',        pts: '+40 pts',  progress: 40,  status: 'ongoing' },
    { emoji: '🐷', name: 'eSewa Savings Deposit',  pts: '+75 pts',  progress: 0,   status: 'locked'  },
];

const HISTORY = [
    { emoji: '🎮', bg: '#fce7f3', name: 'PUBG Mobile 325 UC',      pts: 1500, date: '12 May 2026', status: 'delivered'  },
    { emoji: '📱', bg: '#dcfce7', name: 'NTC Rs.100 Recharge',     pts: 500,  date: '15 May 2026', status: 'completed'  },
    { emoji: '💰', bg: '#dcfce7', name: 'eSewa Cashback Rs.50',    pts: 400,  date: '18 May 2026', status: 'completed'  },
    { emoji: '📶', bg: '#e0e7ff', name: 'NTC 1GB Data Pack',       pts: 800,  date: '22 May 2026', status: 'delivered'  },
    { emoji: '🔥', bg: '#fef9c3', name: 'Free Fire 100 Diamonds',  pts: 700,  date: '27 May 2026', status: 'processing' },
    { emoji: '🛍️', bg: '#dbeafe', name: 'Daraz Coupon 10% Off',   pts: 1200, date: '29 May 2026', status: 'pending'    },
];

const TIERS = [
    { name: 'Bronze',   color: '#b45309', range: '0 – 5,000 pts',       benefits: 'Basic rewards, 1× points multiplier',   current: false },
    { name: 'Silver',   color: '#9ca3af', range: '5,001 – 15,000 pts',  benefits: 'Exclusive deals, 1.5× multiplier',       current: true  },
    { name: 'Gold',     color: '#d97706', range: '15,001 – 30,000 pts', benefits: 'Priority redemption, 2× multiplier',     current: false },
    { name: 'Platinum', color: '#6366f1', range: '30,000+ pts',          benefits: 'VIP perks, 3× multiplier, early access', current: false },
];

const FILTERS = [
    { id: 'all',     label: 'All',        count: REWARDS.length },
    { id: 'mobile',  label: '📱 Mobile',  count: REWARDS.filter(r => r.cat === 'mobile').length },
    { id: 'data',    label: '📶 Data',    count: REWARDS.filter(r => r.cat === 'data').length },
    { id: 'gaming',  label: '🎮 Gaming',  count: REWARDS.filter(r => r.cat === 'gaming').length },
    { id: 'digital', label: '💰 Digital', count: REWARDS.filter(r => r.cat === 'digital').length },
];

const CHALL_STATUS = {
    done:    { cls: 'rw-cs-done',    label: '✓ Completed'   },
    ongoing: { cls: 'rw-cs-ongoing', label: '⏳ In Progress' },
    locked:  { cls: 'rw-cs-locked',  label: '🔒 Locked'     },
};

const HIST_STATUS = {
    delivered:  { cls: 'rw-hs-delivered',  label: '✓ Delivered'  },
    completed:  { cls: 'rw-hs-completed',  label: '✓ Completed'  },
    pending:    { cls: 'rw-hs-pending',    label: '⏳ Pending'    },
    processing: { cls: 'rw-hs-processing', label: '⚙ Processing' },
};

/* ═══════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════ */
const styles = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

.rw-page {
    min-height: 100vh;
    background: #f9fafb;
    color: #1f2937;
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f3f4f6; }
::-webkit-scrollbar-thumb { background: #60bb46; border-radius: 99px; }

/* ── Navbar ── */
.rw-nav {
    position: sticky; top: 0; z-index: 100;
    height: 60px; background: #fff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0,0,0,.06);
    display: flex; align-items: center;
}
.rw-nav-inner {
    width: 100%; max-width: 1280px; margin: 0 auto;
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.rw-logo { display: flex; align-items: center; gap: 10px; font-size: 1.15rem; font-weight: 700; color: #60bb46; text-decoration: none; }
.rw-logo-icon {
    width: 34px; height: 34px; border-radius: 6px; background: #60bb46;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: .9rem; font-weight: 900;
    box-shadow: 0 4px 12px rgba(96,187,70,.35);
}
.rw-logo-sub { color: #9ca3af; font-weight: 400; font-size: .78rem; margin-left: 1px; }
.rw-nav-links { display: flex; align-items: center; gap: 2px; }
.rw-nav-link {
    padding: 6px 12px; border-radius: 5px;
    font-size: .84rem; font-weight: 500; color: #6b7280;
    text-decoration: none; transition: all .15s;
}
.rw-nav-link:hover { background: #e8f7e3; color: #3d8a2e; }
.rw-nav-link.active { background: #e8f7e3; color: #3d8a2e; font-weight: 600; }
.rw-nav-right { display: flex; align-items: center; gap: 10px; }
.rw-pts-badge {
    display: flex; align-items: center; gap: 6px;
    background: #e8f7e3; border: 1.5px solid #bbf7d0;
    border-radius: 6px; padding: 6px 12px;
    font-size: .85rem; font-weight: 700; color: #3d8a2e;
}
.rw-avatar {
    width: 34px; height: 34px; border-radius: 6px;
    background: linear-gradient(135deg, #60bb46, #3d8a2e);
    color: #fff; font-weight: 700; font-size: .78rem;
    display: flex; align-items: center; justify-content: center;
}

/* ── Hero ── */
.rw-hero {
    background: linear-gradient(135deg, #3d8a2e 0%, #60bb46 55%, #8dd972 100%);
    padding: 48px 24px 80px;
    position: relative; overflow: hidden;
}
.rw-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.rw-hero-inner { max-width: 1280px; margin: 0 auto; position: relative; display: flex; flex-direction: column; gap: 28px; }
.rw-hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.rw-greeting { color: rgba(255,255,255,.85); font-size: .88rem; margin-bottom: 3px; }
.rw-username { color: #fff; font-size: 1.7rem; font-weight: 700; }
.rw-tier-badge {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.18); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.3); border-radius: 6px;
    padding: 8px 16px; color: #fff; font-weight: 600; font-size: .875rem;
}

/* Stats row */
.rw-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.rw-stat {
    background: rgba(255,255,255,.15); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.25); border-radius: 8px;
    padding: 20px 22px; color: #fff; transition: all .2s;
}
.rw-stat:hover { background: rgba(255,255,255,.22); transform: translateY(-2px); }
.rw-stat-label {
    font-size: .74rem; font-weight: 500; color: rgba(255,255,255,.75);
    text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px;
}
.rw-stat-value { font-size: 1.6rem; font-weight: 700; }
.rw-stat-sub { font-size: .72rem; color: rgba(255,255,255,.6); margin-top: 4px; }

/* Tier progress */
.rw-tp {
    background: rgba(255,255,255,.14); backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,.25); border-radius: 8px;
    padding: 18px 22px;
}
.rw-tp-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.rw-tp-top span  { color: rgba(255,255,255,.85); font-size: .82rem; }
.rw-tp-top strong { color: #fff; font-size: .88rem; }
.rw-tp-bg { height: 8px; background: rgba(255,255,255,.2); border-radius: 99px; overflow: hidden; }
.rw-tp-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#fff,rgba(255,255,255,.7)); transition: width 1.2s cubic-bezier(.4,0,.2,1); }
.rw-tp-labels { display: flex; justify-content: space-between; margin-top: 8px; }
.rw-tp-labels span { font-size: .72rem; color: rgba(255,255,255,.6); }

/* ── Main ── */
.rw-main {
    max-width: 1280px; margin: -36px auto 0;
    padding: 0 24px 60px; position: relative; z-index: 2;
}
.rw-section { margin-bottom: 40px; }
.rw-section:first-child { margin-top: 12px; }
.rw-sec-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.rw-sec-title {
    font-size: 1.1rem; font-weight: 700; color: #111827;
    display: flex; align-items: center; gap: 8px;
}
.rw-sec-link { font-size: .82rem; color: #60bb46; font-weight: 600; text-decoration: none; transition: all .15s; }
.rw-sec-link:hover { color: #3d8a2e; text-decoration: underline; }

/* ── Filter bar ── */
.rw-filter {
    display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 10px 14px; margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.rw-filter-btn {
    padding: 6px 14px; border-radius: 6px;
    font-size: .82rem; font-weight: 600; background: transparent; color: #6b7280;
    transition: all .15s; cursor: pointer;
    display: flex; align-items: center; gap: 5px; border: none;
}
.rw-filter-btn:hover { background: #f3f4f6; color: #374151; }
.rw-filter-btn.active { background: #60bb46; color: #fff; box-shadow: 0 2px 8px rgba(96,187,70,.35); }
.rw-fc {
    background: rgba(255,255,255,.25); border-radius: 99px;
    font-size: .7rem; padding: 1px 6px; font-weight: 700;
}
.rw-filter-btn:not(.active) .rw-fc { background: #f3f4f6; color: #6b7280; }

/* ── Reward cards ── */
.rw-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 16px;
}
.rw-card {
    background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px;
    overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06);
    transition: all .2s; cursor: pointer;
    display: flex; flex-direction: column;
    animation: rw-fadeup .4s ease both;
}
.rw-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,.1); border-color: #bbf7d0; }
@keyframes rw-fadeup {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
}
.rw-card-img {
    height: 120px; display: flex; align-items: center; justify-content: center;
    font-size: 2.8rem; position: relative; overflow: hidden;
}
.rw-badge {
    position: absolute; top: 8px; left: 8px;
    background: #60bb46; color: #fff; font-size: .66rem; font-weight: 700;
    padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: .04em;
}
.rw-badge.hot { background: #ef4444; }
.rw-badge.new { background: #3b82f6; }
.rw-card-body { padding: 13px 14px 12px; flex: 1; display: flex; flex-direction: column; }
.rw-card-cat   { font-size: .7rem; font-weight: 600; color: #60bb46; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 3px; }
.rw-card-title { font-size: .9rem; font-weight: 700; color: #111827; margin-bottom: 4px; line-height: 1.3; }
.rw-card-desc  { font-size: .75rem; color: #6b7280; margin-bottom: 10px; flex: 1; line-height: 1.45; }
.rw-card-foot  { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.rw-card-pts   { display: flex; align-items: center; gap: 4px; font-size: .88rem; font-weight: 700; color: #111827; }
.rw-pts-unit   { font-size: .7rem; color: #9ca3af; font-weight: 400; margin-left: 1px; }
.rw-redeem-btn {
    background: #60bb46; color: #fff; font-size: .77rem; font-weight: 700;
    padding: 7px 12px; border-radius: 5px; border: none; cursor: pointer;
    transition: all .15s; white-space: nowrap;
}
.rw-redeem-btn:hover { background: #3d8a2e; box-shadow: 0 3px 10px rgba(96,187,70,.35); }
.rw-redeem-btn:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; box-shadow: none; }

/* ── Challenges ── */
.rw-chal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
}
.rw-chal {
    background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 14px 16px; display: flex; align-items: center; gap: 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,.06); transition: all .2s;
    animation: rw-fadeup .4s ease both;
}
.rw-chal:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.08); border-color: #bbf7d0; }
.rw-c-icon {
    width: 44px; height: 44px; flex-shrink: 0; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; background: #e8f7e3;
}
.rw-c-info { flex: 1; min-width: 0; }
.rw-c-name { font-size: .88rem; font-weight: 700; color: #111827; margin-bottom: 3px; }
.rw-c-pts  { font-size: .78rem; color: #60bb46; font-weight: 600; margin-bottom: 6px; }
.rw-c-bar  { height: 5px; background: #f3f4f6; border-radius: 99px; overflow: hidden; }
.rw-c-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#60bb46,#86efac); transition: width 1s cubic-bezier(.4,0,.2,1); }
.rw-c-right { display: flex; flex-direction: column; align-items: flex-end; }
.rw-c-status { font-size: .7rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; white-space: nowrap; }
.rw-cs-done    { background: #dcfce7; color: #166534; }
.rw-cs-ongoing { background: #fef3c7; color: #92400e; }
.rw-cs-locked  { background: #f3f4f6; color: #6b7280; }

/* ── Tier table ── */
.rw-tier-wrap {
    background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px;
    overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.rw-tier-tbl { width: 100%; border-collapse: collapse; }
.rw-tier-tbl thead tr { background: #f9fafb; border-bottom: 1.5px solid #e5e7eb; }
.rw-tier-tbl th {
    padding: 12px 18px; text-align: left;
    font-size: .75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: #6b7280;
}
.rw-tier-tbl td {
    padding: 14px 18px; font-size: .88rem; color: #374151;
    border-bottom: 1px solid #f3f4f6; vertical-align: middle;
}
.rw-tier-tbl tr:last-child td { border-bottom: none; }
.rw-tier-tbl tr.is-cur td { background: #e8f7e3; }
.rw-tier-name { display: inline-flex; align-items: center; gap: 7px; font-weight: 700; font-size: .88rem; }
.rw-tier-dot  { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.rw-cur-badge {
    display: inline-block; margin-left: 8px;
    background: #60bb46; color: #fff; font-size: .66rem; font-weight: 700;
    padding: 2px 7px; border-radius: 4px;
}

/* ── History ── */
.rw-hist-wrap {
    background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px;
    overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.rw-hist-tbl { width: 100%; border-collapse: collapse; }
.rw-hist-tbl thead tr { background: #f9fafb; border-bottom: 1.5px solid #e5e7eb; }
.rw-hist-tbl th {
    padding: 12px 18px; text-align: left;
    font-size: .75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: #6b7280;
}
.rw-hist-tbl td {
    padding: 14px 18px; font-size: .86rem; color: #374151;
    border-bottom: 1px solid #f3f4f6; vertical-align: middle;
}
.rw-hist-tbl tr:last-child td { border-bottom: none; }
.rw-hist-tbl tr:hover td { background: #f9fafb; }
.rw-hist-row  { display: flex; align-items: center; gap: 10px; }
.rw-hist-icon {
    width: 34px; height: 34px; border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
}
.rw-hist-name { font-weight: 600; color: #111827; }
.rw-hist-pill { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 5px; font-size: .75rem; font-weight: 700; }
.rw-hs-delivered  { background: #dcfce7; color: #166534; }
.rw-hs-completed  { background: #dbeafe; color: #1d4ed8; }
.rw-hs-pending    { background: #fef3c7; color: #92400e; }
.rw-hs-processing { background: #ede9fe; color: #7c3aed; }

/* ── Modal ── */
.rw-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    opacity: 0; pointer-events: none;
    transition: opacity .25s;
}
.rw-overlay.open { opacity: 1; pointer-events: all; }
.rw-modal {
    background: #fff; border-radius: 12px;
    width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
    box-shadow: 0 20px 50px rgba(0,0,0,.18);
    transform: scale(.95) translateY(16px);
    transition: transform .3s cubic-bezier(.34,1.56,.64,1);
}
.rw-overlay.open .rw-modal { transform: scale(1) translateY(0); }
.rw-modal-img {
    height: 180px; border-radius: 12px 12px 0 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem; position: relative;
}
.rw-modal-x {
    position: absolute; top: 12px; right: 12px;
    width: 30px; height: 30px; background: rgba(0,0,0,.4); color: #fff;
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    font-size: 1rem; cursor: pointer; border: none; transition: all .15s;
}
.rw-modal-x:hover { background: rgba(0,0,0,.65); }
.rw-modal-body { padding: 20px 22px 22px; }
.rw-m-cat   { font-size: .72rem; font-weight: 600; color: #60bb46; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px; }
.rw-m-title { font-size: 1.25rem; font-weight: 800; color: #111827; margin-bottom: 8px; }
.rw-m-desc  { font-size: .875rem; color: #6b7280; margin-bottom: 16px; line-height: 1.6; }
.rw-m-meta  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
.rw-m-item  { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 7px; padding: 12px 14px; }
.rw-m-key   { font-size: .72rem; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
.rw-m-val   { font-size: .9rem; font-weight: 700; color: #111827; }
.rw-m-terms {
    background: #fffbeb; border: 1px solid #fde68a; border-radius: 7px;
    padding: 12px 14px; margin-bottom: 18px;
    font-size: .78rem; color: #78350f; line-height: 1.55;
}
.rw-m-terms strong { display: block; margin-bottom: 4px; color: #92400e; font-weight: 700; }
.rw-m-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.rw-m-pts-big .big { font-size: 1.55rem; font-weight: 800; color: #111827; }
.rw-m-pts-big .lbl { font-size: .78rem; color: #9ca3af; margin-left: 4px; }
.rw-m-redeem {
    flex: 1; background: #60bb46; color: #fff;
    padding: 12px 18px; border-radius: 7px; border: none; cursor: pointer;
    font-size: .9rem; font-weight: 700; font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: all .15s;
}
.rw-m-redeem:hover { background: #3d8a2e; box-shadow: 0 4px 14px rgba(96,187,70,.4); }
.rw-m-redeem:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; box-shadow: none; }

/* ── Toast ── */
.rw-toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #111827; color: #fff;
    padding: 12px 20px; border-radius: 7px;
    font-size: .875rem; font-weight: 600;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,.2); z-index: 300;
    opacity: 0; pointer-events: none;
    transition: opacity .3s, transform .3s;
}
.rw-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.rw-toast-ok { color: #60bb46; font-size: 1rem; }

/* ── Responsive ── */
@media (max-width: 1024px) {
    .rw-stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
    .rw-nav-links { display: none; }
    .rw-hero { padding: 32px 16px 64px; }
    .rw-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .rw-main { padding: 0 14px 48px; }
    .rw-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
    .rw-chal-grid { grid-template-columns: 1fr; }
    .rw-hist-tbl th:nth-child(3), .rw-hist-tbl td:nth-child(3) { display: none; }
}
@media (max-width: 480px) {
    .rw-stats { grid-template-columns: 1fr 1fr; }
    .rw-username { font-size: 1.35rem; }
    .rw-filter-btn { padding: 5px 10px; font-size: .76rem; }
}
`;

/* ─── Tier helpers ─── */
const TIER_MEDALS = { Bronze: '🥉', Silver: '🥈', Gold: '🥇', Platinum: '💠' };

function getTierProgress(pts) {
    if (pts >= 30000) return { next: null,       start: 30000, end: 30000, pct: 100, toNext: 0,            nextLabel: null };
    if (pts >= 15000) return { next: 'Platinum', start: 15000, end: 30000, pct: Math.round(((pts - 15000) / 15000) * 100), toNext: 30000 - pts, nextLabel: 'Platinum (30,001)' };
    if (pts >= 5000)  return { next: 'Gold',     start: 5000,  end: 15000, pct: Math.round(((pts - 5000)  / 10000) * 100), toNext: 15000 - pts, nextLabel: 'Gold (15,001)' };
    return              { next: 'Silver',   start: 0,     end: 5000,  pct: Math.round((pts / 5000) * 100),                toNext: 5000 - pts,  nextLabel: 'Silver (5,001)' };
}

function tierLabel(tier) {
    return tier === 'Bronze' ? '0 – 5,000'
        :  tier === 'Silver' ? '5,001 – 15,000'
        :  tier === 'Gold'   ? '15,001 – 30,000'
        :                      '30,000+';
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function Rewards({
    userPoints   = 0,
    userName     = 'User',
    userInitials = 'U',
}) {
    const [filter, setFilter]       = useState('all');
    const [modalId, setModalId]     = useState(null);
    const [points, setPoints]       = useState(userPoints);
    const [toastMsg, setToastMsg]   = useState('');
    const [toastShow, setToastShow] = useState(false);
    const [progOn, setProgOn]       = useState(false);
    const [tierOn, setTierOn]       = useState(false);

    /* Animate progress bars and tier bar on mount */
    useEffect(() => {
        const t1 = setTimeout(() => setProgOn(true), 400);
        const t2 = setTimeout(() => setTierOn(true), 600);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const filtered  = filter === 'all' ? REWARDS : REWARDS.filter(r => r.cat === filter);
    const modalData = REWARDS.find(r => r.id === modalId) ?? null;

    /* Recompute tier from live points */
    const liveTier = points >= 30000 ? 'Platinum'
                   : points >= 15000 ? 'Gold'
                   : points >= 5000  ? 'Silver'
                   :                   'Bronze';
    const tierProg = getTierProgress(points);

    const openModal  = (id) => setModalId(id);
    const closeModal = () => setModalId(null);

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastShow(true);
        setTimeout(() => setToastShow(false), 3000);
    };

    const handleRedeem = () => {
        if (!modalData || points < modalData.pts) return;
        setPoints(p => p - modalData.pts);
        closeModal();
        showToast(`"${modalData.title}" redeemed successfully!`);
    };

    return (
        <>
            <Head title="Rewards – Redeem Points" />
            <style>{styles}</style>

            <div className="rw-page">

                {/* ── Navbar ── */}
                <nav className="rw-nav">
                    <div className="rw-nav-inner">
                        <a href="#" className="rw-logo">
                            <div className="rw-logo-icon">e</div>
                            eSewa <span className="rw-logo-sub">Rewards</span>
                        </a>
                        <div className="rw-nav-links">
                            <a href="#rewards"    className="rw-nav-link active">🎁 Redeem</a>
                            <a href="#challenges" className="rw-nav-link">⚡ Earn</a>
                            <a href="#history"    className="rw-nav-link">📋 History</a>
                            <a href="#tiers"      className="rw-nav-link">🏅 Tiers</a>
                            <Link href={route('dashboard')}  className="rw-nav-link">Dashboard</Link>
                            <Link href={route('leaderboard')} className="rw-nav-link">Leaderboard</Link>
                        </div>
                        <div className="rw-nav-right">
                            <div className="rw-pts-badge">⭐ {points.toLocaleString()} pts</div>
                            <div className="rw-avatar">{userInitials}</div>
                        </div>
                    </div>
                </nav>

                {/* ── Hero ── */}
                <section className="rw-hero">
                    <div className="rw-hero-inner">
                        <div className="rw-hero-top">
                            <div>
                                <div className="rw-greeting">Welcome back,</div>
                                <div className="rw-username">{userName}</div>
                            </div>
                            <div className="rw-tier-badge">
                                {TIER_MEDALS[liveTier]} {liveTier} Member
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="rw-stats">
                            {[
                                { label: '⭐ Total Points',      value: points.toLocaleString(),   sub: 'Available balance' },
                                { label: '🏅 Current Tier',      value: liveTier,                  sub: tierLabel(liveTier) + ' pts' },
                                { label: '🎯 Next Tier',         value: tierProg.next ?? '—',      sub: tierProg.toNext > 0 ? `${tierProg.toNext.toLocaleString()} pts away` : 'Max tier reached' },
                                { label: '🎁 Available Rewards', value: filtered.length,            sub: 'You can redeem now' },
                            ].map((s, i) => (
                                <div key={i} className="rw-stat">
                                    <div className="rw-stat-label">{s.label}</div>
                                    <div className="rw-stat-value">{s.value}</div>
                                    <div className="rw-stat-sub">{s.sub}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tier progress */}
                        <div className="rw-tp">
                            <div className="rw-tp-top">
                                {tierProg.next ? (
                                    <span>{liveTier} → {tierProg.next} Progress</span>
                                ) : (
                                    <span>Maximum tier reached 🎉</span>
                                )}
                                <strong>{points.toLocaleString()} / {tierProg.end.toLocaleString()} pts</strong>
                            </div>
                            <div className="rw-tp-bg">
                                <div className="rw-tp-fill" style={{ width: tierOn ? `${Math.min(Math.max(tierProg.pct, 0), 100)}%` : '0%' }} />
                            </div>
                            <div className="rw-tp-labels">
                                <span>{TIER_MEDALS[liveTier]} {liveTier} ({tierProg.start.toLocaleString()})</span>
                                {tierProg.next && <span>{tierProg.toNext.toLocaleString()} pts to {tierProg.next}</span>}
                                {tierProg.nextLabel && <span>{TIER_MEDALS[tierProg.next] ?? '💠'} {tierProg.nextLabel}</span>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Main content ── */}
                <main className="rw-main">

                    {/* ── Rewards ── */}
                    <section className="rw-section" id="rewards">
                        <div className="rw-sec-hd">
                            <h2 className="rw-sec-title">🎁 Redeem Rewards</h2>
                            <a href="#" className="rw-sec-link">View all →</a>
                        </div>

                        {/* Filter tabs */}
                        <div className="rw-filter">
                            {FILTERS.map(f => (
                                <button
                                    key={f.id}
                                    className={`rw-filter-btn${filter === f.id ? ' active' : ''}`}
                                    onClick={() => setFilter(f.id)}
                                >
                                    {f.label} <span className="rw-fc">{f.count}</span>
                                </button>
                            ))}
                        </div>

                        {/* Cards grid */}
                        <div className="rw-grid">
                            {filtered.map((r, i) => {
                                const canAfford = points >= r.pts;
                                return (
                                    <div
                                        key={r.id}
                                        className="rw-card"
                                        style={{ animationDelay: `${i * 0.05}s` }}
                                        onClick={() => openModal(r.id)}
                                    >
                                        <div className="rw-card-img" style={{ background: r.bg }}>
                                            {r.emoji}
                                            {r.badge && (
                                                <span className={`rw-badge ${r.badge}`}>
                                                    {r.badge === 'hot' ? '🔥 Hot' : '✨ New'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="rw-card-body">
                                            <div className="rw-card-cat">{r.catLabel}</div>
                                            <div className="rw-card-title">{r.title}</div>
                                            <div className="rw-card-desc">{r.desc}</div>
                                            <div className="rw-card-foot">
                                                <div className="rw-card-pts">
                                                    ⭐ {r.pts.toLocaleString()}
                                                    <span className="rw-pts-unit">pts</span>
                                                </div>
                                                <button
                                                    className="rw-redeem-btn"
                                                    disabled={!canAfford}
                                                    onClick={e => { e.stopPropagation(); openModal(r.id); }}
                                                >
                                                    {canAfford ? 'Redeem' : 'Need pts'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ── Challenges ── */}
                    <section className="rw-section" id="challenges">
                        <div className="rw-sec-hd">
                            <h2 className="rw-sec-title">⚡ Earn Points – Challenges</h2>
                        </div>
                        <div className="rw-chal-grid">
                            {CHALLENGES.map((c, i) => {
                                const s = CHALL_STATUS[c.status];
                                return (
                                    <div key={i} className="rw-chal" style={{ animationDelay: `${i * 0.06}s` }}>
                                        <div className="rw-c-icon">{c.emoji}</div>
                                        <div className="rw-c-info">
                                            <div className="rw-c-name">{c.name}</div>
                                            <div className="rw-c-pts">{c.pts}</div>
                                            <div className="rw-c-bar">
                                                <div
                                                    className="rw-c-fill"
                                                    style={{ width: progOn ? `${c.progress}%` : '0%' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="rw-c-right">
                                            <span className={`rw-c-status ${s.cls}`}>{s.label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ── Tier levels ── */}
                    <section className="rw-section" id="tiers">
                        <div className="rw-sec-hd">
                            <h2 className="rw-sec-title">🏅 Reward Tiers</h2>
                        </div>
                        <div className="rw-tier-wrap">
                            <table className="rw-tier-tbl">
                                <thead>
                                    <tr>
                                        <th>Tier</th>
                                        <th>Points Required</th>
                                        <th>Benefits</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TIERS.map((t, i) => (
                                        <tr key={i} className={t.current ? 'is-cur' : ''}>
                                            <td>
                                                <span className="rw-tier-name" style={{ color: t.color }}>
                                                    <span className="rw-tier-dot" style={{ background: t.color }} />
                                                    {t.name}
                                                </span>
                                                {t.current && <span className="rw-cur-badge">Current</span>}
                                            </td>
                                            <td>{t.range}</td>
                                            <td>{t.benefits}</td>
                                            <td>{t.current ? '✓ Active' : '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ── History ── */}
                    <section className="rw-section" id="history">
                        <div className="rw-sec-hd">
                            <h2 className="rw-sec-title">📋 Redemption History</h2>
                        </div>
                        <div className="rw-hist-wrap">
                            <table className="rw-hist-tbl">
                                <thead>
                                    <tr>
                                        <th>Reward</th>
                                        <th>Points Used</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HISTORY.map((h, i) => {
                                        const s = HIST_STATUS[h.status];
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div className="rw-hist-row">
                                                        <div className="rw-hist-icon" style={{ background: h.bg }}>{h.emoji}</div>
                                                        <span className="rw-hist-name">{h.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{h.pts.toLocaleString()} pts</td>
                                                <td>{h.date}</td>
                                                <td><span className={`rw-hist-pill ${s.cls}`}>{s.label}</span></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </main>

                {/* ── Modal ── */}
                <div
                    className={`rw-overlay${modalId ? ' open' : ''}`}
                    onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
                >
                    <div className="rw-modal" onClick={e => e.stopPropagation()}>
                        {modalData && (
                            <>
                                <div className="rw-modal-img" style={{ background: modalData.bg }}>
                                    {modalData.emoji}
                                    <button className="rw-modal-x" onClick={closeModal}>✕</button>
                                </div>
                                <div className="rw-modal-body">
                                    <div className="rw-m-cat">{modalData.catLabel}</div>
                                    <div className="rw-m-title">{modalData.title}</div>
                                    <div className="rw-m-desc">{modalData.desc}</div>
                                    <div className="rw-m-meta">
                                        {[
                                            { key: 'Points Required', val: `${modalData.pts.toLocaleString()} pts` },
                                            { key: 'Delivery',        val: modalData.delivery },
                                            { key: 'Validity',        val: modalData.validity },
                                            { key: 'Stock Left',      val: `${modalData.stock} remaining` },
                                        ].map((m, i) => (
                                            <div key={i} className="rw-m-item">
                                                <div className="rw-m-key">{m.key}</div>
                                                <div className="rw-m-val">{m.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="rw-m-terms">
                                        <strong>⚠ Terms &amp; Conditions</strong>
                                        {modalData.terms}
                                    </div>
                                    <div className="rw-m-foot">
                                        <div className="rw-m-pts-big">
                                            <span className="big">{modalData.pts.toLocaleString()}</span>
                                            <span className="lbl">points</span>
                                        </div>
                                        <button
                                            className="rw-m-redeem"
                                            disabled={points < modalData.pts}
                                            onClick={handleRedeem}
                                        >
                                            ⚡ {points >= modalData.pts ? 'Redeem Now' : `Need ${(modalData.pts - points).toLocaleString()} more pts`}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Toast ── */}
                <div className={`rw-toast${toastShow ? ' show' : ''}`}>
                    <span className="rw-toast-ok">✓</span>
                    <span>{toastMsg}</span>
                </div>

            </div>
        </>
    );
}
