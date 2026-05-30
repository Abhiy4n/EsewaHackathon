import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        mobile_number: '',
        gender: 'Male',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"></div>

            <Head title="Register - User Hub" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center">
                    <Link href="/" className="inline-flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.5c0-.733.056-1.45.163-2.147m1.11 11.177C12.48 20.213 13 17.557 13 15c0-2.785-.54-5.43-1.527-7.838M12 3c1.933 0 3.5 1.567 3.5 3.5S13.933 10 12 10 8.5 8.433 8.5 6.5 10.067 3 12 3z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">UserHub</span>
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link href={route('login')} className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Sign in instead
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl py-8 px-6 sm:px-10 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" className="text-slate-300 font-medium" />
                            <div className="mt-1">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full bg-slate-950/50 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 transition-all duration-200"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.name} className="mt-1.5 text-red-400 text-sm" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email Address" className="text-slate-300 font-medium" />
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full bg-slate-950/50 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 transition-all duration-200"
                                    placeholder="you@example.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1.5 text-red-400 text-sm" />
                        </div>

                        <div>
                            <InputLabel htmlFor="mobile_number" value="Mobile Number" className="text-slate-300 font-medium" />
                            <div className="mt-1">
                                <TextInput
                                    id="mobile_number"
                                    type="tel"
                                    name="mobile_number"
                                    value={data.mobile_number}
                                    className="block w-full bg-slate-950/50 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 transition-all duration-200"
                                    placeholder="98XXXXXXXX"
                                    autoComplete="tel"
                                    onChange={(e) => setData('mobile_number', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.mobile_number} className="mt-1.5 text-red-400 text-sm" />
                        </div>

                        <div>
                            <InputLabel htmlFor="gender" value="Gender" className="text-slate-300 font-medium" />
                            <div className="mt-1">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="block w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 transition-all duration-200"
                                    required
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <InputError message={errors.gender} className="mt-1.5 text-red-400 text-sm" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-slate-300 font-medium" />
                            <div className="mt-1 relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="block w-full bg-slate-950/50 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 pe-12 transition-all duration-200"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5 text-red-400 text-sm" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-slate-300 font-medium" />
                            <div className="mt-1">
                                <TextInput
                                    id="password_confirmation"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full bg-slate-950/50 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 transition-all duration-200"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1.5 text-red-400 text-sm" />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center justify-center px-5 py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-600/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Register Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
