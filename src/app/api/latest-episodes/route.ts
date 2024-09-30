/**
 * API route handler for fetching latest podcast episodes.
 * @module api/latest-episodes
 */

import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node'; // Import ResponseError if available
import { Episode } from '@/types/episode';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

/**
 * Handles GET requests for fetching latest podcast episodes.
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the latest episodes.
 */
export async function GET() {
  try {
    // Get access token
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get show episodes (replace with your show ID)
    const showId = '5pOSDqLNCZLArkyc3FLIET'; // Replace with your actual show ID
    const response = await spotifyApi.getShowEpisodes(showId, { limit: 10 });

    const episodes = response.body.items.map((episode: any) => ({
      id: episode.id,
      title: episode.name, // Map 'name' from API to 'title' in your interface
      description: episode.description,
      releaseDate: episode.release_date, // Map 'release_date' from API to 'releaseDate' in your interface
      durationMs: episode.duration_ms, // Map 'duration_ms' from API to 'durationMs' in your interface
      imageUrl: episode.images[0]?.url, // Assuming the first image's URL is what you need
      uri: episode.uri
    }));

    return NextResponse.json({ episodes });
  } catch (error: unknown) {
    console.error('Detailed error:', JSON.stringify(error, null, 2));
    
    if (error instanceof Error) {
      const errorMessage = error.message;
      const statusCode = 'status' in error ? (error as any).status : 500; // Check if status exists on the error object

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