'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Ticket, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo Section */}
        <div className='text-center mb-8'>
          <button
            onClick={() => router.push('/')}
            className='inline-flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity'
          >
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-lg'>
              <Ticket className='h-8 w-8 text-white' />
            </div>
            <div className='text-left'>
              <div className='text-2xl font-semibold text-gray-900'>Ticket Aggregator</div>
              <div className='text-sm text-gray-500'>Tüm etkinlikler, tek yerde</div>
            </div>
          </button>
        </div>

        {/* Register Card */}
        <div className='bg-white rounded-3xl shadow-2xl p-8 border border-gray-100'>
          <div className='mb-8'>
            <h1 className='text-2xl text-gray-900 mb-2'>Hesap Oluşturun</h1>
            <p className='text-gray-600'>Etkinlikleri keşfetmeye başlayın</p>
          </div>

          <form onSubmit={handleRegister} className='space-y-5'>
            {/* Name Input */}
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-gray-700'>
                Ad Soyad
              </Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  id='name'
                  type='text'
                  placeholder='Adınız ve soyadınız'
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className='pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-gray-700'>
                E-posta
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  id='email'
                  type='email'
                  placeholder='ornek@email.com'
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className='pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-gray-700'>
                Şifre
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className='pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  required
                  minLength={6}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword' className='text-gray-700'>
                Şifre Tekrar
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className='pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
                  required
                  minLength={6}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showConfirmPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className='flex items-start gap-2'>
              <Checkbox
                id='terms'
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => updateFormData('acceptTerms', checked as boolean)}
                className='mt-1'
              />
              <Label
                htmlFor='terms'
                className='text-sm text-gray-600 cursor-pointer leading-relaxed'
              >
                <button className='text-indigo-600 hover:underline'>Kullanım Koşulları</button> ve{' '}
                <button className='text-indigo-600 hover:underline'>Gizlilik Politikası</button>
                &rsquo;nı okudum ve kabul ediyorum.
              </Label>
            </div>

            {/* Register Button */}
            <Button
              type='submit'
              disabled={!formData.acceptTerms}
              className='w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Kayıt Ol
            </Button>
          </form>

          {/* Divider */}
          <div className='my-6 flex items-center gap-4'>
            <Separator className='flex-1' />
            <span className='text-sm text-gray-500'>veya</span>
            <Separator className='flex-1' />
          </div>

          {/* Social Register Buttons */}
          <div className='space-y-3'>
            <Button
              type='button'
              variant='outline'
              className='w-full h-12 border-gray-200 hover:bg-gray-50'
            >
              <svg className='h-5 w-5 mr-2' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Google ile Kayıt Ol
            </Button>
          </div>

          {/* Login Link */}
          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Zaten hesabınız var mı?{' '}
              <button
                type='button'
                onClick={() => router.push('/login')}
                className='text-indigo-600 hover:text-indigo-700 transition-colors'
              >
                Giriş Yapın
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
