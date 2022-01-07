import Image from 'next/image';
import Link from 'next/link';
import Banner from '../../public/banner.jpg';

export default function AboutPage() {
	return (
		<div className="space-y-8">
			<h1 className="block text-3xl sm:text-4xl md:text-6xl font-bold">About</h1>
			<div className="text-white text-opacity-20 hover:text-opacity-100 transition-all">
				<Image
					alt="watching the sunset with my besties"
					src={Banner}
					width={1100}
					height={600}
					placeholder="blur"
					className="block object-cover rounded-xl border-2 border-white"
				/>
				<span className="text-sm not-sr-only">watching the sunset with my besties 🤍</span>
			</div>
			<p className="opacity-80">
				Howdy folks! My name's Carter! I'm a software engineer currently based in Denver, Colorado. I love spending time
				with my friends, writing code, and drinking coffee. I founded my company,{' '}
				<a href="https://sycer.dev" rel="noreferrer" target="_blank">
					Sycer Development
				</a>{' '}
				in December of 2019 and offered Discord bots to sneaker "cook groups". Now, I work for{' '}
				<a href="https://pushas.com" rel="noreferrer" target="_blank">
					PUSHAS
				</a>
				, the leading sneaker marketplace in Australia and New Zeland. We're building a platform to easier facilitate
				sneaker consignment.
			</p>
			<p className="opacity-80">
				I'm not 100% sure what to put on this page, I've not properly considered it much. If you have any ideas, please{' '}
				<Link href="/talk">let me know</Link>...
			</p>
		</div>
	);
}
