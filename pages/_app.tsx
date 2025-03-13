import '@/styles/globals.css'

import { AppProps } from 'next/app'
import { useRouter } from 'next/router';

import en from '@/locales/en.json';
import zh_TW from '@/locales/zh_TW.json';
import Navbar from '@/components/navbar';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const locale = pathname.split('/')[1] || 'zh-TW';
  const data = locale === 'en' ? en : zh_TW;
  return (
    <>
      <Navbar data={data} />
      <Component {...pageProps} data={data} />
    </>
  )
}
