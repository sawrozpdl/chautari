import React from 'react';

import { Tooltip, Fade, Chip } from '@material-ui/core';

const ChipButton = (props: any): any => {
  const {
    onClick,
    className,
    info,
    icon: Icon,
    label,
    disabled = false,
  } = props;

  return (
    <Chip
      className={className}
      style={{ transform: 'scale(1.3)' }}
      disabled={disabled}
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
