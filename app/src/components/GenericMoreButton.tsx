import React, { useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(() => ({
  menu: {
    width: 256,
    maxWidth: '100%',
  },
}));

const GenericMoreButton = (props: any): any => {
  const { options, onOptionClick, value, ...rest } = props;
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = (): void => {
    setOpenMenu(true);
  };

  const handleMenuClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title="More options">
        <IconButton {...rest} onClick={handleMenuOpen} ref={moreRef}>
          <MoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {Object.keys(options).map((option, index) => {
          const Icon = options[option];
          return (
            <MenuItem
              key={index}
              onClick={(): void => {
                onOptionClick(option, value);
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={option} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

GenericMoreButton.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object,
  onOptionClick: PropTypes.func,
  value: PropTypes.string,
};

export default memo(GenericMoreButton);
