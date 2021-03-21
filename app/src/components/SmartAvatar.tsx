import React, { useState } from 'react';

import { Avatar, CircularProgress } from '@material-ui/core';

import { createBlobUrl } from '../utils/image';
import { isValidHttpUrl } from '../utils/string';
import useDebounce from '../hooks/useDebounce';

const SmartAvatar = (props: any): any => {
  const { children, size = 50, src, ...rest } = props;
  const [blobURL, setBlobURL] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const updateBlob = async (): Promise<void> => {
    if (!isValidHttpUrl(src)) {
      return;
    }
    setLoading(true);
    setBlobURL(undefined); // So that the loading children element can be shown.
    const imageData = await fetch(src);
    await createBlobUrl(imageData, setBlobURL);
    setLoading(false);
  };

  useDebounce(updateBlob, 1000, [src]);

  const loadingSize = (size * 2) / 5;

  return (
    <Avatar src={blobURL} {...rest} style={{ width: size, height: size }}>
      {loading ? (
        <CircularProgress
          color="primary"
          style={{ width: loadingSize, height: loadingSize }}
        />
      ) : (
        children
      )}
    </Avatar>
  );
};

export default SmartAvatar;
