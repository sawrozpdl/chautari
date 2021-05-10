import React, { useState } from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

const ImageView = (props: any): any => {
  const { size = 200, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {loading && (
        <Skeleton
          variant="rect"
          width={size}
          height={(size * 2) / 3}
          style={{ display: 'inline-block' }}
        />
      )}{' '}
      <img
        style={{
          width: `${size}px`,
          height: 'auto',
          display: loading ? 'none' : 'inline-block',
        }}
        onLoad={(): void => setLoading(false)}
        {...rest}
      />{' '}
    </>
  );
};

export default ImageView;
