import { Dialog, Transition } from '@headlessui/react';
import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import React, { Fragment } from 'react';

interface Props {
	readonly children: ReactNode;
	readonly description?: string;
	readonly focusRef?: MutableRefObject<HTMLElement | null>;
	readonly isOpen: boolean;
	readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
	readonly title: ReactNode;
}

export function Modal({ isOpen, ...props }: Props) {
	const close = () => {
		props.setIsOpen(false);
	};

	return (
		<Transition appear as={Fragment} show={isOpen}>
			<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" initialFocus={props.focusRef} onClose={close}>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-md dark:bg-black/80" />
					</Transition.Child>

					<span className="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="relative z-10 my-8 inline-block w-full max-w-xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
							<div className="relative">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6">
									{props.title}
								</Dialog.Title>

								<div className="absolute right-0 top-0 text-xl">
									<button type="button" className="leading-none" onClick={close}>
										&times;
									</button>
								</div>
							</div>

							{props.description && (
								<div className="mt-2">
									<p className="text-sm text-gray-100">{props.description}</p>
								</div>
							)}

							<div className="mt-4">{props.children}</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
