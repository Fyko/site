import Image from 'next/image';
import BannerImg from '../../public/banner.png';

export default function Banner() {
	return (
		<div className="text-gray-900/30 transition-all hover:text-gray-900 dark:text-white/20 dark:hover:text-white/100">
			<Image
				alt="watching the sunset with my besties"
				src={BannerImg}
				width={1_100}
				height={600}
				placeholder="blur"
				className="block rounded-xl object-cover"
			/>
			<span className="not-sr-only text-sm group">
				visiting{' '}
				<a
					className="not-sr-only transition-all group-hover:text-gray-600 dark:text-white/20 dark:group-hover:text-white/60"
					href={
						'https://www.google.com/maps/@40.2515308,-105.8189979,3a,15.6y,344.36h,85.88t/data=!3m6!1e1!3m4!1sDETWVvSYqIPCpe0IMs0uvA!2e0!7i16384!8i8192?entry=ttu'
					}
					target="_blank"
				>
					Grand Lake
				</a>{' '}
				with my besties 🤍
			</span>
		</div>
	);
}
