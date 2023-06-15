import { AnimatePresence, motion } from 'framer-motion';
import { GetStaticProps } from 'next';
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
} from 'react-icons/si';
import { Data as LanyardData, LanyardError, LanyardResponse, useLanyard } from 'use-lanyard';
import { ListItem } from '../components/list-item';
import { DISCORD_ID } from '../components/song';
import { PinnedRepo, useGitHubPinnedRepos } from '../hooks/github';
import { age } from '../util/time';

interface Props {
	pinnedRepos: PinnedRepo[];
	lanyard: LanyardData;
}

export default function Index(props: Props) {
	const { data: projects = props.pinnedRepos } = useGitHubPinnedRepos('carterhimmel');

	const { data: lanyard } = useLanyard(DISCORD_ID, {
		fallbackData: props.lanyard,
	});

	const [showMeme, setShowMeme] = useState(false);
	useEffect(() => {
		window.addEventListener('keypress', (e) => {
			if (e.key.toLowerCase() === 'h') setShowMeme(!showMeme);
		});
	}, [showMeme, setShowMeme]);

	return (
		<>
			<div className="space-y-4">
				<div className="flex items-center space-x-3">
					<a href="https://github.com/fyko" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
						<SiGithub className="w-7 h-7" />
						<span className="sr-only">GitHub Profile</span>
					</a>

					<a href="https://twitter.com/fyko" target="_blank" rel="noreferrer" aria-label="Twitter Profile">
						<SiTwitter className="w-7 h-7" />
						<span className="sr-only">Twitter Profile</span>
					</a>

					<a href="https://keybase.io/fyko/" target="_blank" rel="noreferrer" aria-label="Keybase Profile">
						<FaKeybase className="w-7 h-7" />
						<span className="sr-only">Keybase Profile</span>
					</a>

					<a
						href="https://www.linkedin.com/in/carterhimmel/"
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn Profile"
					>
						<SiLinkedin className="w-7 h-7" />
						<span className="sr-only">LinkedIn Profile</span>
					</a>

					{showMeme && (
						<a href="/onlyfans" target="_blank" rel="noreferrer" aria-label="Onlyfans Profile">
							<FaSmileWink className="w-7 h-7" />
							<span className="sr-only">OnlyFans 👀</span>
						</a>
					)}

					{lanyard && (
						<p>
							<a
								target="_blank"
								href={`https://search.alistair.sh/?q=!maps+${lanyard.kv.location}`}
								rel="noreferrer"
								className="flex items-center px-2 pr-3 dark:text-white dark:text-opacity-50 no-underline bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 rounded-full transition-colors text-neutral-600"
							>
								<span>
									<HiOutlineLocationMarker className="inline dark:text-white" />
									&nbsp;
								</span>

								<span className="-mb-0.5">
									{lanyard.kv.location}
									&nbsp;
								</span>

								<span className="block -mb-0.5 ml-1 bg-gray-600 dark:bg-white rounded-full animate-pulse w-[6px] h-[6px]" />
							</a>
						</p>
					)}
				</div>

				<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
					Howdy, I'm <span className="text-blurple">Carter</span> 🤠
				</h1>

				<p className="opacity-80">I'm a ~{age.toPrecision(6)} year old software engineer based in Denver, Colorado.</p>
			</div>

			<div className="space-y-4">
				<h1 className="text-2xl sm:text-3xl font-bold" id="what">
					<a href="#what">
						<FaHashtag size={18} className="inline -mt-1" />
					</a>{' '}
					What do I do? 💭
				</h1>
				<p className="opacity-80">
					I'm currently enjoying myself over at Truffle - we're building a platform to give content creators control
					over their growth and audiences.
					<br></br>
					<br></br>
					Below are some of my popular open source projects. In total, the following repos have earned me{' '}
					{projects.reduce((acc, project) => acc + parseInt(project.stars, 10), 0)} stars! Thank you! 💖
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 auto-cols-max gap-1 sm:gap-3">
					{projects.map((project) => (
						<ProjectCard key={project.repo} repo={project} />
					))}
				</div>
			</div>

			<div className="space-y-4">
				<h1 className="text-2xl sm:text-3xl font-bold" id="tech">
					<a href="#tech">
						<FaHashtag size={18} className="inline -mt-1" />
					</a>{' '}
					Technologies 💻
				</h1>
				<p className="opacity-80">
					I use a wide range of tools to tackle each hurdle in the most efficient manner possible. I really love working
					with Docker and containersation and it's proven to be a reliable bit of kit for working in and scaling
					services in both production and development environments.
				</p>
				<ul className="grid grid-cols-3 sm:grid-cols-4 gap-4">
					<ListItem icon={SiDocker} text="Docker" />
					<ListItem icon={SiRedis} text="Redis" />
					<ListItem icon={SiPostgresql} text="Postgres" />
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

function ProjectCard({ repo: project }: { repo: PinnedRepo }) {
	const [isOpen, toggle] = useReducer((x) => !x, false);

	return (
		<motion.div
			animate={{ height: isOpen ? 'auto' : '54px' }}
			className="flex overflow-hidden relative flex-col dark:text-gray-100 no-underline bg-gradient-to-tr from-blue-100 rounded-md md:rounded-lg dark:border text-blue-900/80 dark:hover:bg-white/10 dark:from-white/5 to-blue-700/5 dark:to-white/5 border-white/10"
		>
			<button
				type="button"
				className="flex items-center py-4 px-5 space-x-2 text-lg font-bold border-b border-white border-opacity-10 cursor-pointer focus:outline-none select-none"
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
								className="inline w-4 h-4"
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
						className="p-1 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full"
						animate={{ rotate: isOpen ? 90 : 0 }}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
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
						<div className="flex flex-col py-4 px-5 space-y-4">
							<p className="flex-1">{project.description}</p>

							<div>
								<a
									href={`https://github.com/${project.owner}/${project.repo}`}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center py-2 px-6 space-x-2 text-white no-underline bg-blue-700 rounded-full transition-transform duration-500 hover:scale-95 select-none dark:bg-white/10"
								>
									<span>View Project</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
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

export const getStaticProps: GetStaticProps<Props> = async function () {
	const pinnedRepos = await fetch('https://gh-pinned.nxl.sh/api/user/fyko').then(
		async (response) => response.json() as Promise<PinnedRepo[]>,
	);

	const lanyard = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);

	const lanyardBody = (await lanyard.json()) as LanyardResponse;

	if ('error' in lanyardBody) {
		throw new LanyardError(lanyard.status, lanyardBody.error.message);
	}

	return {
		props: { pinnedRepos, lanyard: lanyardBody.data },
		revalidate: 120,
	};
};
