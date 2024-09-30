'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { parseISO, format } from 'date-fns';
import { Episode } from '@/types/episode';

/**
 * Podcast page component for displaying podcast information.
 * @module app/podcast/page
 */

/**
 * Renders the podcast page of the application.
 * @function PodcastPage
 * @returns {JSX.Element} The rendered podcast page component.
 */
export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/latest-episodes')
        if (!response.ok) {
          throw new Error('Failed to fetch episodes')
        }
        const data = await response.json()
        setEpisodes(data.episodes)
        if (data.episodes.length > 0) {
          setSelectedEpisode(data.episodes[0])
        }
      } catch (error) {
        console.error('Error fetching episodes:', error)
      } finally {
        setIsLoading(false);
      }
    }

    fetchEpisodes()
  }, [])

  useEffect(() => {
    if (selectedEpisode && iframeRef.current) {
      iframeRef.current.src = `https://open.spotify.com/embed/episode/${selectedEpisode.id}`;
    }
  }, [selectedEpisode]);

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      
      <main className="flex-grow">
        <section className="relative h-[50vh] w-full overflow-hidden">
          <Image
            src="/images/homepage/learn-more/podcast.jpg"
            alt="Podcast Hero Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">MTA Podcast</h1>
              <p className="text-lg md:text-xl text-gray-200">
                Exploring the journeys of men striving for impactful, purpose-driven lives
              </p>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="p-4 rounded-lg shadow-lg"> {/* Removed bg-gray-900 and adjusted padding */}
            <div className="w-full max-w-3xl mx-auto"> {/* Removed bg-[#1A1A1A] and p-4 */}
              {selectedEpisode && (
                <div className="mb-6"> {/* Reduced margin-bottom */}
                  <iframe
                    ref={iframeRef}
                    src={`https://open.spotify.com/embed/episode/${selectedEpisode.id}`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                </div>
              )}
              {isLoading ? (
                <p className="text-white text-center">Loading episodes...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {episodes.map((episode) => (
                    <div key={episode.id} className="card bg-black text-white p-4 rounded-lg shadow-lg">
                      <a href={`/podcast/${episode.id}`} className="block">
                        <Image
                          src={episode.imageUrl} // Use episode image URL
                          alt={episode.title}
                          width={300} // Set appropriate width
                          height={200} // Set appropriate height
                          className="rounded-t-lg" // Rounded top corners
                        />
                        <h2 className="text-xl font-bold mt-2">{episode.title}</h2> {/* Title only */}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Men In The Arena. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}