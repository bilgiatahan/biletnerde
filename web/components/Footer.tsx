'use client';

import { Ticket, Facebook, Instagram, Youtube, Twitter, Linkedin, Music } from 'lucide-react';

export function Footer() {
  const aboutLinks = [
    { label: 'HAKKIMIZDA', href: '#' },
    { label: 'KULLANIM KOŞULLARI', href: '#' },
    { label: 'ETKİNLİK OLUŞTURMA', href: '#' },
    { label: 'GİZLİLİK POLİTİKASI', href: '#' },
  ];

  const helpLinks = [
    { label: 'YARDIM', href: '#' },
    { label: 'İLETİŞİM', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Music, href: '#', label: 'TikTok' },
    { icon: Music, href: '#', label: 'Spotify' },
  ];

  return (
    <footer className='bg-gray-900 text-gray-300 mt-auto'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Left Section - Logo & Links */}
          <div className='space-y-6'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500'>
                <Ticket className='h-5 w-5 text-white' />
              </div>
              <span className='text-indigo-400 text-xl'>Ticket Aggregator</span>
            </div>
            <ul className='space-y-3'>
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-sm text-gray-400 hover:text-indigo-400 transition-colors'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Section - Help */}
          <div className='space-y-6'>
            <ul className='space-y-3'>
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-sm text-gray-400 hover:text-indigo-400 transition-colors'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Social & Apps */}
          <div className='space-y-6'>
            {/* Social Media Icons */}
            <div className='flex gap-3 flex-wrap'>
              {socialLinks.map((social, index) => (
                <a
                  key={`${social.label}-${index}`}
                  href={social.href}
                  className='w-8 h-8 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors'
                  aria-label={social.label}
                >
                  <social.icon className='h-4 w-4' />
                </a>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className='flex gap-3 flex-wrap'>
              <a
                href='#'
                className='flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors'
              >
                <svg className='h-6 w-6' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
                </svg>
                <div className='text-left'>
                  <div className='text-xs'>GET IT ON</div>
                  <div className='text-sm'>Google Play</div>
                </div>
              </a>
              <a
                href='#'
                className='flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors'
              >
                <svg className='h-6 w-6' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z' />
                </svg>
                <div className='text-left'>
                  <div className='text-xs'>Download on the</div>
                  <div className='text-sm'>App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className='mt-12 pt-6 border-t border-gray-800'>
          <p className='text-center text-sm text-gray-500'>
            © 2025 Ticket Aggregator. Tüm hakları saklıdır. Bu platform bilet satışı yapmaz, sadece
            mevcut etkinlikleri toplar.
          </p>
        </div>
      </div>
    </footer>
  );
}
