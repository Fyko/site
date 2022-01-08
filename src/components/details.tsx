import { ReactNode } from 'react';

interface DetailProps {
	details: Array<{ name: string; value: ReactNode }>;
}

export function Details(props: DetailProps) {
	return (
		<dl className="space-y-1.5">
			{props.details.map((detail) => (
				<div key={detail.name} className="flex">
					<dt className="font-sans text-sm font-bold uppercase basis-1/5 text-neutral-600 dark:text-neutral-500">
						{detail.name}
					</dt>

					<dd className="font-mono text-sm basis-3/4 text-neutral-500 dark:text-neutral-300">{detail.value}</dd>
				</div>
			))}
		</dl>
	);
}
