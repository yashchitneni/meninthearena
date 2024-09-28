import { NextResponse } from 'next/server';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const PODCAST_ID = '5pOSDqLNCZLArkyc3FLIET'; // Your podcast ID

async function getSpotifyAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();
    
    const response = await fetch(`${SPOTIFY_API_URL}/shows/${PODCAST_ID}/episodes?limit=10`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch episodes from Spotify');
    }

    const data = await response.json();
    const episodes = data.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      uri: item.uri,
      description: item.description,
      releaseDate: item.release_date,
      durationMs: item.duration_ms,
      imageUrl: item.images[0]?.url
    }));

    return NextResponse.json({ episodes });
  } catch (error) {
    console.error('Error fetching latest episodes:', error);
    return NextResponse.json({ error: 'Failed to fetch latest episodes' }, { status: 500 });
  }
}