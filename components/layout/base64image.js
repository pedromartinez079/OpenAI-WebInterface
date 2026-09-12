import React from 'react';

const getImageFormat = (b64_json) => {
    const base64Prefix = b64_json.substring(0, 5);

    if (base64Prefix.includes('/9j/4')) {
      return 'jpeg';
    } else if (base64Prefix.includes('iVBOR')) {
      return 'png';
    } else if (base64Prefix.includes('UklGR')) {
      return 'webp';
    }
    throw new Error('Unknown image format');
};

const getImage = ({ b64_json, format }) => {
  // Data URL
  const dataUrl = `data:image/${format};base64,${b64_json}`;

  return (
    <img src={dataUrl} alt="GPT Image" className="img-fluid" width="120" height="100"/>
  );
};

const Base64Image = ({ b64_json }) => {
    const format = getImageFormat(b64_json);
    const image = getImage({b64_json: b64_json, format: format})

    return image;
};

export default Base64Image;