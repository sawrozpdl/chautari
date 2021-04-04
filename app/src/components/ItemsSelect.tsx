import React, { useState } from 'react';

import {
  Paper,
  TextField,
  Typography,
  Chip,
  makeStyles,
  Grid,
  Button,
  createStyles,
} from '@material-ui/core';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

import { generic } from '../constants/labels';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    results: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(3),
      margin: 0,
    },
    inputArea: {
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

const ItemsSelect = (props: any): any => {
  const {
    name,
    value: items,
    onChange,
    labels = generic,
    label = 'item',
    ...rest
  } = props;

  const classes = useStyles();

  const [input, setInput] = useState('');
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState<any>(false);

  const validate = (): boolean => {
    let isValid = false;
    const toTest = input && input.trim();
    if (!toTest || !/[a-zA-Z ]{3,50}/g.test(toTest)) {
      setError(labels.tooShort);
    } else if (toTest.length > 50) {
      setError(labels.tooLong);
    } else {
      setError(null);
      isValid = true;
    }

    return isValid;
  };

  const handleTextChange = (event: any): void => {
    setShowError(false);
    setInput(event.target.value);
    validate();
  };

  const handlePushClick = (): void => {
    const isFormValid = validate();
    if (!isFormValid) {
      setShowError(true);
    } else {
      onChange(name, [...items, input.trim()]);
      setInput('');
    }
  };

  const handleKeyDown = (event: any): void => {
    if (event.key === 'Enter') {
      handlePushClick();
    }
  };

  const handleDelete = (item: string): void => {
    onChange(
      name,
      items.filter((ex: string) => ex !== item)
    );
  };

  return (
    <Grid container className={classes.inputArea} spacing={2} {...rest}>
      <Grid item xs={11}>
        {' '}
        <TextField
          error={showError}
          fullWidth
          helperText={
            showError
              ? error
              : `Or, simply enter to push the ${label} into the list below`
          }
          label={`Jot down a suitable ${label}`}
          name="interest"
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          type="text"
          value={input || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="outlined"
          color="primary"
          disabled={showError}
          style={{ height: '70%' }}
          onClick={handlePushClick}
        >
          <VerticalAlignBottomIcon />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper component="ul" className={classes.results}>
          {items.length ? (
            items.map((item: string, index: number) => {
              return (
                <li key={index}>
                  <Chip
                    label={item}
                    variant="outlined"
                    onDelete={(): void => handleDelete(item)}
                    className={classes.chip}
                  />
                </li>
              );
            })
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              {`As soon as you start adding some ${label}s, the list will appear here`}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ItemsSelect;
