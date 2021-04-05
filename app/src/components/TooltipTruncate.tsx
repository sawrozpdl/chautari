import React from 'react';

import { Tooltip, Typography } from '@material-ui/core';

const TooltipTruncate = (props: any): any => {
  const { text, component: Component = Typography, max = 50, ...rest } = props;
  return text.length <= max ? (
    <Component {...rest}>{text}</Component>
  ) : (
    <Tooltip title={text}>
      <Component {...rest}>
        {text.substring(0, max)}
        {'...'}
      </Component>
    </Tooltip>
  );
};

export default TooltipTruncate;
