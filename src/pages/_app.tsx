import 'react-tippy/dist/tippy.css';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import 'nprogress/nprogress.css';

import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { Router } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import type { MouseEventHandler, ReactNode } from 'react';
import React, { StrictMode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import { DISCORD_ID, Song } from '../components/song';
import { fetcher } from '../util/fetcher';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [hasScrolled, setHasScrolled] = useState(false);

	const toggleMenu = () => {
		setMobileMenuOpen((old) => !old);
	};

	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
			return;
		}

		document.body.style.overflow = 'unset';
	}, [mobileMenuOpen]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const listener = () => {
			setHasScrolled(window.scrollY > 20);
		};

		document.addEventListener('scroll', listener);

		return () => {
			document.removeEventListener('scroll', listener);
		};
	}, []);

	const closeMenu = () => {
		setMobileMenuOpen(false);
	};

	const navLinks = (
		<>
			<NavLink href="/" closeMenu={closeMenu}>
				/
			</NavLink>
			<NavLink href="/about" closeMenu={closeMenu}>
				/about
			</NavLink>
			<NavLink href="/talk" closeMenu={closeMenu}>
				/talk
			</NavLink>
			<NavLink href="https://blog.fyko.net" target="_blank" closeMenu={closeMenu}>
				blog
			</NavLink>
		</>
	);

	return (
		<StrictMode>
			<SWRConfig
				value={{
					fallback: {
						[`lanyard:${DISCORD_ID}`]: pageProps?.lanyard as unknown,
						'https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=fyko': pageProps?.pinnedRepos as unknown,
					},
					fetcher,
				}}
			>
				<Toaster toastOptions={{ position: 'top-left' }} />

				<Head>
					<title>Carter Himmel</title>
				</Head>

				{mobileMenuOpen && (
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-10 space-y-2 bg-white px-8 py-24 dark:bg-gray-900 sm:hidden"
						>
							<h1 className="text-4xl font-bold">Menu.</h1>]<ul className="grid grid-cols-1 gap-2">{navLinks}</ul>
						</motion.div>
					</AnimatePresence>
				)}

				<div className="sticky top-0 z-20 h-32 overflow-hidden transition-all sm:hidden">
					<div
						className={`${
							hasScrolled || mobileMenuOpen ? 'mt-0' : 'mx-5 mt-10'
						} relative bg-gray-100 transition-all dark:bg-gray-900 ${
							hasScrolled || mobileMenuOpen ? 'rounded-none' : 'rounded-lg'
						}`}
					>
						<div
							className={`flex justify-between space-x-2 pr-5 transition-colors ${
								mobileMenuOpen ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
							}`}
						>
							<button
								type="button"
								className="relative z-50 block px-2 text-gray-500 transition-all focus:ring"
								onClick={toggleMenu}
							>
								<Hamburger toggled={mobileMenuOpen} size={20} color="currentColor" />
							</button>

							<div className="overflow-hidden px-1 py-2">
								<Song />
							</div>
						</div>
					</div>
				</div>

				<div className="mx-auto max-w-4xl px-5 py-10">
					<div className="hidden items-center space-x-2 sm:flex">
						<nav className="flex-1">
							<ul className="flex space-x-4">{navLinks}</ul>
						</nav>

						<div className="overflow-hidden px-1 py-2">
							<Song />
						</div>
					</div>

					<main className="mx-auto max-w-3xl space-y-12 md:py-24">
						<Component {...pageProps} />
					</main>

					<footer className="mx-auto mt-20 max-w-3xl border-t-2 border-gray-900 border-opacity-10 p-4 py-10 opacity-50 dark:border-white">
						<h1 className="text-3xl font-bold">Carter Himmel</h1>
						<p>Software Engineer • {new Date().getFullYear()}</p>
						Based on{' '}
						<a href="https://alistair.sh" target="_blank" rel="noreferrer">
							ali's
						</a>{' '}
						website{' '}
						<a href="https://github.com/alii/alistair" target="_blank" rel="noreferrer">
							[source]
						</a>
					</footer>
				</div>
			</SWRConfig>
			<Script src="https://apples.fyko.net/js/script.outbound-links.js" defer data-domain="fyko.net" />
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
					(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "hikewdkjc0");
				`,
				}}
			/>
		</StrictMode>
	);
}

interface NavLinkProps {
	readonly children: ReactNode;
	readonly closeMenu?: MouseEventHandler<HTMLAnchorElement>;
	readonly href: string;
	readonly target?: string;
}

function NavLink(props: NavLinkProps) {
	return (
		<li>
			<Link
				href={props.href}
				className="block rounded-md py-3 font-mono text-lg no-underline dark:hover:text-white sm:inline-block sm:rounded-full sm:bg-white/0 sm:px-5 sm:text-sm sm:font-normal sm:underline sm:hover:bg-gray-900/5 dark:sm:hover:bg-white/10"
				onClick={(event) => props.closeMenu?.(event)}
				target={props.target}
			>
				{props.children}
			</Link>
		</li>
	);
}
