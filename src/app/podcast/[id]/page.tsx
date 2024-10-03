"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SpotifyDescription from '@/components/SpotifyDescription';

interface Episode {
	imageUrl: string;
	title: string;
	id: string;
	description: string;
	uri: string;
}

export default function PodcastPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [episode, setEpisode] = useState<Episode | null>(null);

	useEffect(() => {
		// Fetch episode data based on params.id
		async function fetchEpisode() {
			const response = await fetch(`/api/podcast/${params.id}`);
			if (!response.ok) {
				console.error('Failed to fetch episode:', response.statusText);
				return;
			}
			const data = await response.json();
			setEpisode(data.episode);
		}

		fetchEpisode();
	}, [params.id]);

	if (!episode) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full">

			{/* Adjust the title with larger font and more top margin */}
			<h1 className="text-5xl font-extrabold text-center my-8">{episode.title}</h1>

			{/* Adjust iframe embed size for better appearance */}
			<div className="flex justify-center my-6">
				<iframe
					src={`https://open.spotify.com/embed/episode/${episode.uri.split(':').pop()}`}
					width="100%"
					height="300" // Increased height for better visibility
					frameBorder="0"
					allow="encrypted-media"
					className="max-w-2xl w-full"
				></iframe>
			</div>

			<SpotifyDescription description={episode.description} />
		</div>
	);
}