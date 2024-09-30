import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';
import { Episode } from '@/types/episode';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get access token
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Fetch episode by ID
    const episodeId = params.id;
    const response = await spotifyApi.getEpisode(episodeId);

    const episode: Episode = {
      id: response.body.id,
      title: response.body.name,
      description: response.body.description,
      imageUrl: response.body.images[0]?.url || '',
      uri: response.body.uri,
      releaseDate: response.body.release_date,
      durationMs: response.body.duration_ms,
      // Add other necessary fields
    };

    return NextResponse.json({ episode });
  } catch (error: unknown) {
    console.error('Detailed error:', JSON.stringify(error, null, 2));

    if (error instanceof Error) {
      const errorMessage = error.message;
      const statusCode = 'status' in error ? (error as any).status : 500;

      console.error('Error message:', errorMessage);
      return NextResponse.json({ 
        error: 'Failed to fetch episode',
        details: errorMessage
      }, { status: statusCode });
    }

    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}