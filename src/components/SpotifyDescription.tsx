import React from 'react';

interface SpotifyDescriptionProps {
  description: string;
}

const SpotifyDescription: React.FC<SpotifyDescriptionProps> = ({ description }) => {
  // Function to process the description and preserve formatting
  const formatDescription = (text: string): React.ReactNode => {
    return text.split('\n').map((paragraph: string, index: number) => (
      <React.Fragment key={index}>
        {paragraph}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="whitespace-pre-wrap">{formatDescription(description)}</div>
    </div>
  );
};

export default SpotifyDescription;