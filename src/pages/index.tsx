import { AnimatePresence, motion } from 'framer-motion';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useReducer, useState } from 'react';
import { FaHashtag, FaKeybase, FaSmileWink } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import {
	SiAmazonaws,
	SiDocker,
	SiGit,
	SiGithub,
	SiGo,
	SiLinkedin,
	SiNodedotjs as SiNodeDotJs,
	SiPostgresql,
	SiRedis,
	SiRust,
	SiTwitter,
	SiTypescript,
	SiYarn,
	SiScylladb,
} from 'react-icons/si';
import type { Data as LanyardData, LanyardResponse } from 'use-lanyard';
import { LanyardError, useLanyard } from 'use-lanyard';
import Banner from '../../public/banner.jpg';
import { ListItem } from '../components/list-item';
import { DISCORD_ID } from '../components/song';
import type { PinnedRepo } from '../hooks/github';
import { useGitHubPinnedRepos } from '../hooks/github';
import { age } from '../util/time';

interface Props {
	readonly lanyard: LanyardData;
	readonly pinnedRepos: PinnedRepo[];
}

export default function Index(props: Props) {
	const { data: projects = props.pinnedRepos } = useGitHubPinnedRepos('fyko');

	const { data: lanyard } = useLanyard(DISCORD_ID, {
		initialData: props.lanyard,
	});

	const [showMeme, setShowMeme] = useState(false);
	useEffect(() => {
		window.addEventListener('keypress', ({ key }) => {
			if (key.toLowerCase() === 'h') setShowMeme(!showMeme);
		});
	}, [showMeme, setShowMeme]);

	return (
		<>
			<div className="space-y-4">
				<div className="flex items-center space-x-3">
					<a href="https://github.com/fyko" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
						<SiGithub className="h-7 w-7" />
						<span className="sr-only">GitHub Profile</span>
					</a>

					<a href="https://twitter.com/fyko" target="_blank" rel="noreferrer" aria-label="Twitter Profile">
						<SiTwitter className="h-7 w-7" />
						<span className="sr-only">Twitter Profile</span>
					</a>

					<a href="https://keybase.io/fyko/" target="_blank" rel="noreferrer" aria-label="Keybase Profile">
						<FaKeybase className="h-7 w-7" />
						<span className="sr-only">Keybase Profile</span>
					</a>

					<a
						href="https://www.linkedin.com/in/carterhimmel/"
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn Profile"
					>
						<SiLinkedin className="h-7 w-7" />
						<span className="sr-only">LinkedIn Profile</span>
					</a>

					{showMeme && (
						<a href="/onlyfans" target="_blank" rel="noreferrer" aria-label="Onlyfans Profile">
							<FaSmileWink className="h-7 w-7" />
							<span className="sr-only">OnlyFans 👀</span>
						</a>
					)}

					{lanyard && (
						<p>
							<a
								target="_blank"
								href={`https://search.alistair.sh/?q=!maps+${lanyard.kv.location}`}
								rel="noreferrer"
								className="flex items-center rounded-full bg-gray-200 px-2 pr-3 text-neutral-600 no-underline transition-colors dark:bg-gray-700 dark:text-white dark:text-opacity-50 dark:hover:bg-gray-800"
							>
								<span>
									<HiOutlineLocationMarker className="inline dark:text-white" />
									&nbsp;
								</span>

								<span className="-mb-0.5">
									{lanyard.kv.location}
									&nbsp;
								</span>

								<span className="-mb-0.5 ml-1 block h-[6px] w-[6px] animate-pulse rounded-full bg-gray-600 dark:bg-white" />
							</a>
						</p>
					)}
				</div>

				<h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">
					Howdy, I'm <span className="text-blurple">Carter</span> 🤠
				</h1>

				<p className="opacity-80">I'm a ~{age.toPrecision(6)} year old software engineer based in Denver, Colorado.</p>

				<div className="text-gray-900/30 transition-all hover:text-gray-900 dark:text-white/20 dark:hover:text-white/100">
					<Image
						alt="watching the sunset with my besties"
						src={Banner}
						width={1_100}
						height={600}
						placeholder="blur"
						className="block rounded-xl object-cover"
					/>
					<span className="not-sr-only text-sm">watching the sunset with my besties 🤍</span>
				</div>
			</div>

			<div className="space-y-4">
				<h1 className="text-2xl font-bold sm:text-3xl" id="what">
					<a href="#what">
						<FaHashtag size={18} className="-mt-1 inline" />
					</a>{' '}
					What do I do? 💭
				</h1>
				<p className="opacity-80">
					I'm currently enjoying myself over at Truffle - we're building a platform to give content creators control
					over their growth and audiences.
					<br />
					<br />
					Below are some of my popular open source projects. In total, the following repos have earned me{' '}
					{projects.reduce((acc, project) => acc + Number.parseInt(project.stars, 10), 0)} stars! Thank you! 💖
				</p>
				<div className="grid auto-cols-max grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-3">
					{projects.map((project) => (
						<ProjectCard key={project.repo} repo={project} />
					))}
				</div>
			</div>

			<div className="space-y-4">
				<h1 className="text-2xl font-bold sm:text-3xl" id="tech">
					<a href="#tech">
						<FaHashtag size={18} className="-mt-1 inline" />
					</a>{' '}
					Technologies 💻
				</h1>
				<p className="opacity-80">
					I use a wide range of tools to tackle each hurdle in the most efficient manner possible. I really love working
					with Docker and containersation and it's proven to be a reliable bit of kit for working in and scaling
					services in both production and development environments.
				</p>
				<ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
					<ListItem icon={SiDocker} text="Docker" />
					<ListItem icon={SiRedis} text="Redis" />
					<ListItem icon={SiPostgresql} text="PostgreSQL" />
					<ListItem icon={SiScylladb} text="ScyllaDB" />
					<ListItem icon={SiNodeDotJs} text="Node.js" />
					<ListItem icon={SiTypescript} text="TypeScript" />
					<ListItem icon={SiGo} text="Golang" />
					<ListItem icon={SiRust} text="Rust" />
					<ListItem icon={SiAmazonaws} text="AWS" />
					<ListItem icon={SiYarn} text="Yarn" />
					<ListItem icon={SiGit} text="Git" />
				</ul>
			</div>
		</>
	);
}

function ProjectCard({ repo: project }: { readonly repo: PinnedRepo }) {
	const [isOpen, toggle] = useReducer((x) => !x, false);

	return (
		<motion.div
			animate={{ height: isOpen ? 'auto' : '54px' }}
			className="relative flex flex-col overflow-hidden rounded-md border-white/10 bg-gradient-to-tr from-blue-100 to-blue-700/5 text-blue-900/80 no-underline dark:border dark:from-white/5 dark:to-white/5 dark:text-gray-100 dark:hover:bg-white/10 md:rounded-lg"
		>
			<button
				type="button"
				className="flex cursor-pointer select-none items-center space-x-2 border-b border-white border-opacity-10 px-5 py-4 text-lg font-bold focus:outline-none"
				onClick={toggle}
			>
				<div className="flex flex-1 items-center space-x-2 text-left">
					<span>{project.repo}</span>
					<span className="flex items-center space-x-3 text-xs">
						<span className="space-x-1">
							<span>⭐</span>
							<span>{project.stars}</span>
						</span>
						<span className="space-x-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="inline h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
								/>
							</svg>
							<span>{project.forks}</span>
						</span>
					</span>
				</div>
				<div>
					<motion.div
						className="rounded-full bg-white bg-opacity-0 p-1 hover:bg-opacity-10"
						animate={{ rotate: isOpen ? 90 : 0 }}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</motion.div>
				</div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full">
						<div className="flex flex-col space-y-4 px-5 py-4">
							<p className="flex-1">{project.description}</p>

							<div>
								<a
									href={`https://github.com/${project.owner}/${project.repo}`}
									target="_blank"
									rel="noreferrer"
									className="inline-flex select-none items-center space-x-2 rounded-full bg-blue-700 px-6 py-2 text-white no-underline transition-transform duration-500 hover:scale-95 dark:bg-white/10"
								>
									<span>View Project</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const pinnedRepos = await fetch('https://gh-pinned.nxl.sh/api/user/fyko').then(
		async (response) => response.json() as Promise<PinnedRepo[]>,
	);

	const lanyard = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);

	const lanyardBody = (await lanyard.json()) as LanyardResponse;

	if ('error' in lanyardBody) {
		throw new Error(lanyardBody.error.message);
	}

	return {
		props: { pinnedRepos, lanyard: lanyardBody.data },
		revalidate: 120,
	};
};
