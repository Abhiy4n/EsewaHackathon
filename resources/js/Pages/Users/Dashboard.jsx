import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ scoreboard = null }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            User Space Dashboard
                        </h2>
                        <p className="text-sm text-slate-500">
                            Manage your user profile, configurations, and active sessions.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Active Session
                        </span>
                        <span className="text-xs text-slate-400">
                            Last synced: Just now
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="User Dashboard" />

            <div className="py-10 bg-slate-50 min-h-[calc(100vh-65px)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-8 md:p-10 shadow-lg">
                        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl font-extrabold tracking-tight">
                                Welcome back, {user.name}!
                            </h3>
                            <p className="mt-3 text-indigo-200/90 leading-relaxed font-light">
                                Your account is fully verified. Explore the user space dashboard to manage your settings, view logs, or update your profile details.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={route('profile.edit')}
                                    className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-semibold rounded-xl bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
                                >
                                    Edit Profile
                                </a>
                                <a
                                    href={route('fraud-awareness')}
                                    className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 transition-colors shadow-sm"
                                >
                                    Open Fraud Hub
                                </a>
                                <a
                                    href={route('leaderboard')}
                                    className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-semibold rounded-xl bg-slate-950 text-white hover:bg-slate-800 transition-colors shadow-sm"
                                >
                                    View Leaderboard
                                </a>
                                <button className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-semibold rounded-xl bg-indigo-500/20 text-white border border-indigo-400/30 hover:bg-indigo-500/30 transition-colors">
                                    View Security Logs
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Stat 1 — Account */}
                        <div className="bg-white overflow-hidden shadow-sm border border-slate-100 rounded-2xl p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 truncate">Account Details</p>
                                    <h4 className="text-lg font-bold text-slate-950 mt-1">{user.name}</h4>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                                <span className="text-slate-400">Email:</span>
                                <span className="font-medium text-slate-700 truncate max-w-[180px]">{user.email}</span>
                            </div>
                        </div>

                        {/* Stat 2 — Security */}
                        <div className="bg-white overflow-hidden shadow-sm border border-slate-100 rounded-2xl p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 truncate">Security Status</p>
                                    <h4 className="text-lg font-bold text-slate-950 mt-1">Highly Secured</h4>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                                <span className="text-slate-400">Two-Factor Auth:</span>
                                <span className="font-semibold text-amber-600">Not Enabled</span>
                            </div>
                        </div>

                        {/* Stat 3 — Created */}
                        <div className="bg-white overflow-hidden shadow-sm border border-slate-100 rounded-2xl p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 truncate">Created On</p>
                                    <h4 className="text-lg font-bold text-slate-950 mt-1">
                                        {new Date(user.created_at || Date.now()).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </h4>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                                <span className="text-slate-400">System Role:</span>
                                <span className="font-semibold text-slate-700">Standard User</span>
                            </div>
                        </div>

                        {/* Stat 4 — Fraud Score */}
                        <div className="bg-white overflow-hidden shadow-sm border border-slate-100 rounded-2xl p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-yellow-50 text-yellow-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <div className="ml-4 min-w-0">
                                    <p className="text-sm font-medium text-slate-500 truncate">Fraud Score</p>
                                    <h4 className="text-lg font-bold text-slate-950 mt-1">
                                        {scoreboard ? `${scoreboard.points} pts` : '0 pts'}
                                    </h4>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Tests Passed:</span>
                                    <span className="font-semibold text-emerald-600">{scoreboard?.tests_passed ?? 0} / 6</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Accuracy:</span>
                                    <span className="font-semibold text-slate-700">{scoreboard?.accuracy_rate ?? 0}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Rank Tier:</span>
                                    <span className={`font-semibold ${
                                        scoreboard?.rank_tier === 'Guardian' ? 'text-emerald-600' :
                                        scoreboard?.rank_tier === 'Shielded' ? 'text-blue-600' :
                                        scoreboard?.rank_tier === 'Aware' ? 'text-yellow-600' :
                                        'text-red-500'
                                    }`}>
                                        {scoreboard?.rank_tier ?? 'Vulnerable'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lower Grid: Profile Summary & Activity */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Profile Summary Card */}
                        <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-6 lg:col-span-1">
                            <h4 className="text-lg font-bold text-slate-950 mb-4">Quick Profile Info</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-slate-900">{user.name}</h5>
                                        <p className="text-xs text-slate-500">Registered member</p>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-4 space-y-2">
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium">NAME</span>
                                        <span className="text-sm text-slate-800 font-semibold">{user.name}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium">EMAIL</span>
                                        <span className="text-sm text-slate-800 font-semibold">{user.email}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium">ACCOUNT CREATED</span>
                                        <span className="text-sm text-slate-800 font-semibold">
                                            {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Actions / Security Logs Card */}
                        <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-6 lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-slate-950">Security Activity & Events</h4>
                                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Clear Logs
                                </button>
                            </div>
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    <li>
                                        <div className="relative pb-8">
                                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center ring-8 ring-white">
                                                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-slate-700">Account login successful <span className="font-semibold text-slate-900">User Session Started</span></p>
                                                    </div>
                                                    <div className="text-right text-xs whitespace-nowrap text-slate-500">
                                                        <time>Just now</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="relative pb-8">
                                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                                                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-slate-700">Security scan completed <span className="font-semibold text-slate-900">0 vulnerabilities found</span></p>
                                                    </div>
                                                    <div className="text-right text-xs whitespace-nowrap text-slate-500">
                                                        <time>3 mins ago</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="relative">
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white">
                                                        <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-slate-700">Account registered <span className="font-semibold text-slate-900">Welcome to UserHub!</span></p>
                                                    </div>
                                                    <div className="text-right text-xs whitespace-nowrap text-slate-500">
                                                        <time>Recently</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
