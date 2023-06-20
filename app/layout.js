import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import NextThemeProvider from './components/nextThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark:bg-[#353334] dark:text-white ${inter.className}`} suppressHydrationWarning={true}>
        <NextThemeProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="dark:bg-[#201C1D] bg-[#F9F9F9] md:rounded-tl-3xl w-screen px-10 py-20 h-auto">
              {children}
            </div>
          </div>
        </NextThemeProvider>
      </body>
    </html>
  );
}
