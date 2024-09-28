'use client'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { parseISO, format } from 'date-fns';

interface Episode {
  id: string;
  title: string;
  uri: string;
  description: string;
  releaseDate: string;
  durationMs: number;
  imageUrl: string;
}

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
      <Navigation />
      
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
                <div className="episodes space-y-2"> {/* Added space-y-2 for consistent spacing */}
                  {episodes.map((episode) => (
                    <div 
                      key={episode.id}
                      className={`episode ${selectedEpisode?.id === episode.id ? 'bg-[#1DB954]' : 'bg-[#191414]'} hover:bg-[#1DB954] px-4 py-3 rounded w-full text-left flex items-center cursor-pointer transition-colors duration-200`}
                      onClick={() => handleEpisodeClick(episode)}
                    >
                      {episode.imageUrl && (
                        <Image 
                          src={episode.imageUrl} 
                          alt={`Cover image for ${episode.title}`} 
                          width={50} 
                          height={50} 
                          className="mr-4 rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-bold">{episode.title}</h3>
                        <p className="text-sm text-gray-400">
                          {episode.releaseDate && format(parseISO(episode.releaseDate), 'MM/dd/yyyy')}
                        </p>
                      </div>
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