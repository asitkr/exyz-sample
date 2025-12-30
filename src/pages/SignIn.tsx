import React, { lazy } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { ArrowRight, Lock, Shield } from 'lucide-react';

import { INITIAL_USERS } from '../utils/constants';
import { LoginFormValues, UserRole } from '../utils/types';
import SignInLayout from '../components/layout/SignInLayout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setCredentials } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Input = lazy(() => import('../components/common/Input'));
const Button = lazy(() => import('../components/common/Button'));

const AUTH_TOKEN_KEY = 'auth_token';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const resolveUser = (username: string) => {
        const foundUser = INITIAL_USERS.find(
            u => u.username.toLowerCase() === username.toLowerCase()
        );

        if (foundUser) {
            return {
                user: foundUser.username,
                role: foundUser.role,
                userId: foundUser.id,
            };
        }

        const role: UserRole =
            username.toLowerCase().includes('super')
                ? 'SUPER_ADMIN'
                : username.toLowerCase().includes('proc')
                    ? 'PROCUREMENT_ADMIN'
                    : username.toLowerCase().includes('unit')
                        ? 'UNIT_ADMIN'
                        : 'NORMAL_USER';

        return {
            user: username,
            role,
            userId: '999',
        };
    };

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, dirtyFields, isSubmitting },
    } = useForm<LoginFormValues>({
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const onSubmit = async (data: LoginFormValues) => {
        await new Promise(res => setTimeout(res, 2200));

        const authData = resolveUser(data.username);

        const token = btoa(
            `${Math.random().toString(36).substring(7)}:${data.username}:${Date.now()}`
        );

        // persist token
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        dispatch(
            setCredentials({
                ...authData,
                token,
            })
        );

        toast.success('Identity Verified', { id: 'auth' });
        navigate('/');
    };

    return (
        <SignInLayout>
            <div className="relative z-10 w-full max-w-[480px] px-6 mt-12 animate-fade-in-up">
                <div className="relative group backdrop-blur-[40px] bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-white/10 
                shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] rounded-[3rem] 
                overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

                    <div className="p-10 md:p-12">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Login</h2>
                            <p className="text-slate-500 dark:text-blue-200/60 font-bold uppercase tracking-widest text-[10px]">Command Level Authorization Required</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-6">
                                <Input
                                    label="Service ID"
                                    placeholder="e.g. ADM.DOE"
                                    icon={Shield}
                                    error={errors.username?.message}
                                    touched={touchedFields.username}
                                    dirty={dirtyFields.username}
                                    {...register('username', {
                                        required: 'Username is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Minimum 3 characters required',
                                        },
                                    })}
                                />

                                <Input
                                    label="Security Passcode"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={Lock}
                                    error={errors.password?.message}
                                    touched={touchedFields.password}
                                    dirty={dirtyFields.password}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Minimum 6 characters required',
                                        },
                                    })}
                                />
                            </div>

                            <Button
                                type="submit"
                                loading={isSubmitting}
                                fullWidth
                                className="py-5 rounded-2xl font-black uppercase tracking-widest"
                            >
                                Authenticate <ArrowRight size={20} />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </SignInLayout>
    )
}

export default SignIn;