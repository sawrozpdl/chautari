import React from 'react';

import { Tooltip } from '@material-ui/core';

const TooltipTruncate = (props: any): any => {
  const { text, max = 50 } = props;
  return text.length <= max ? (
    text
  ) : (
    <Tooltip title={text}>
      <>
        {text.substring(0, max)}
        {'...'}
      </>
    </Tooltip>
  );
};

export default TooltipTruncate;
