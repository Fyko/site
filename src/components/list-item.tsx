import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export function ListItem({ text, icon }: { readonly icon: IconType; readonly text: ReactNode }) {
	return (
		<li className="flex space-x-2">
			<span>{icon({ className: 'h-6 w-6' })}</span>
			<span>{text}</span>
		</li>
	);
}
