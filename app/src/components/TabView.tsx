import React, { useState } from 'react';

import { Tabs, Tab, Box, makeStyles } from '@material-ui/core';

const getTabProps = (index: any): any => ({
  id: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`,
});

const TabPanel = (props: any): any => {
  const { component: Component, className, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={className}
    >
      {value === index && <Component {...other} />}
    </Box>
  );
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: '75%',
  },
}));

const TabView = (props: any): any => {
  const { items, onTabChange, onTabClick, ...other } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number): void => {
    setValue(newValue);

    if (onTabChange || onTabClick) {
      (onTabChange || onTabClick)(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {Object.keys(items).map((key, index): any => (
          <Tab key={index} label={key} {...getTabProps(index)} />
        ))}
      </Tabs>
      {Object.values(items).map((props, index): any => (
        <TabPanel
          key={index}
          value={value}
          index={index}
          className={classes.tabContent}
          {...props}
          {...other}
        />
      ))}
    </div>
  );
};

export default TabView;
