import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  release_date: string;
  duration_ms: number;
  images: { url: string }[];
  uri: string;
}

interface SpotifyApiError extends Error {
  body?: {
    error: {
      status: number;
      message: string;
    };
  };
}

export async function GET() {
  try {
    // Get access token
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get show episodes (replace with your show ID)
    const showId = '5pOSDqLNCZLArkyc3FLIET'; // Replace with your actual show ID
    const response = await spotifyApi.getShowEpisodes(showId, { limit: 10 });

    const episodes = response.body.items.map((episode: SpotifyEpisode) => ({
      id: episode.id,
      title: episode.name,
      description: episode.description,
      releaseDate: episode.release_date,
      durationMs: episode.duration_ms,
      imageUrl: episode.images[0]?.url,
      uri: episode.uri
    }));

    return NextResponse.json({ episodes });
  } catch (error: unknown) {
    console.error('Detailed error:', JSON.stringify(error, null, 2));
    
    if (error instanceof Error) {
      const spotifyError = error as SpotifyApiError;
      const errorMessage = spotifyError.body?.error?.message || spotifyError.message;
      const statusCode = spotifyError.body?.error?.status || 500;

      console.error('Error message:', errorMessage);
      return NextResponse.json({ 
        error: 'Failed to fetch episodes',
        details: errorMessage
      }, { status: statusCode });
    }
    
    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}