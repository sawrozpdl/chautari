import React from 'react';

import { Tooltip, Fade, Chip } from '@material-ui/core';

const ChipButton = (props: any): any => {
  const { onClick, className, info, icon: Icon, label } = props;

  return (
    <Chip
      className={className}
      avatar={
        <Tooltip TransitionComponent={Fade} title={info} arrow>
          <Icon />
        </Tooltip>
      }
      label={label}
      onClick={onClick}
      variant="outlined"
      color="default"
    />
  );
};

export default ChipButton;
