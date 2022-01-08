import { useRouter } from 'next/router';
import { APIResponse } from 'nextkit';
import React from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineMail } from 'react-icons/hi';
import { RiSendPlane2Line } from 'react-icons/ri';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import { FaKeybase } from 'react-icons/fa';
import { ListItem } from '../components/list-item';
import { fetcher } from '../util/fetcher';
import { useLanyard } from 'use-lanyard';
import { DISCORD_ID } from '../components/song';

const statusMap = {
	online: 'bg-green-500',
	idle: 'bg-yellow-500',
	dnd: 'bg-red-500',
	offline: 'bg-gray-500',
};

export default function Talk() {
	const router = useRouter();
	const { data: lanyard } = useLanyard(DISCORD_ID);

	return (
		<div className="space-y-4">
			<h1 className="text-2xl sm:text-3xl font-bold">Let's talk 💬</h1>
			<p>Leave a message on the form below or get in touch through Discord, Twitter or email.</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="p-5 bg-gray-100 rounded-lg dark:bg-white/5">
					<form
						className="space-y-2"
						action="/api/form"
						method="POST"
						onSubmit={async (event) => {
							event.preventDefault();

							const values = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());

							const promise = fetcher<APIResponse<{ sent: true }>>('/api/form', {
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(values),
								method: 'POST',
							});

							await toast
								.promise(promise, {
									success: 'Success!',
									loading: 'Sending...',
									error: (error: Error) => error.message || 'Something went wrong...',
								})
								.then(async () => router.push('/thanks'))
								.catch(() => null);
						}}
					>
						<label htmlFor="name" className="block">
							<span className="text-sm font-bold tracking-wide dark:text-white text-opacity-50 uppercase select-none">
								Name
							</span>

							<input
								required
								type="body"
								name="name"
								id="name"
								className="block py-1 px-4 w-full font-sans text-lg bg-gray-200 rounded-md focus:ring focus:outline-none dark:bg-white/5"
							/>
						</label>

						<label htmlFor="email" className="block">
							<span className="text-sm font-bold tracking-wide dark:text-white text-opacity-50 uppercase select-none">
								Email Address
							</span>

							<input
								required
								type="email"
								name="email"
								id="email"
								className="block py-1 px-4 w-full font-sans text-lg bg-gray-200 rounded-md focus:ring focus:outline-none dark:bg-white/5"
							/>
						</label>

						<label htmlFor="body" className="block">
							<span className="text-sm font-bold tracking-wide dark:text-white text-opacity-50 uppercase select-none">
								Your message
							</span>

							<textarea
								rows={5}
								name="body"
								id="body"
								className="block py-1 px-4 w-full font-sans text-lg bg-gray-200 rounded-md focus:ring focus:outline-none dark:bg-white/5"
							/>
						</label>

						<div className="block pt-2">
							<button
								type="submit"
								className="inline-flex items-center py-2 px-8 space-x-2 text-lg text-blue-100 dark:text-white bg-blue-700 rounded-full focus:ring focus:outline-none dark:bg-white/5 dark:hover:bg-white/10"
							>
								<span>Send</span> <RiSendPlane2Line />
							</button>
						</div>
					</form>
				</div>

				<div>
					<ul className="space-y-2 list-disc list-inside">
						<ListItem icon={HiOutlineMail} text="me@fyko.net" />
						<ListItem
							icon={SiDiscord}
							text={
								lanyard ? (
									<span className="flex items-center space-x-1">
										<span>
											{lanyard.discord_user.username}#{lanyard.discord_user.discriminator}
										</span>

										<span
											className={`${
												statusMap[lanyard.discord_status as keyof typeof statusMap]
											} h-2 w-2 inline-block rounded-full`}
										/>
									</span>
								) : (
									<span>Carter#0007</span>
								)
							}
						/>
						<ListItem icon={SiTwitter} text="Fykowo" />
						<ListItem icon={FaKeybase} text="fyko" />
					</ul>
				</div>
			</div>
		</div>
	);
}
