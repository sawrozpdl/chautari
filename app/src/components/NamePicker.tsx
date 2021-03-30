import React, { useState } from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { matches } from '../utils/string';
import { form } from '../constants/labels';
import { USERNAME } from '../constants/schemas';
import { restrictedNames, takenNames } from '../constants/restricted';

const NamePicker = (props: any): any => {
  const { name, value, onChange, label, helperText } = props;

  const [input, setInput] = useState(value);
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState<any>(false);

  const validate = (): boolean => {
    let isValid = false;
    const toTest = input && input.trim();
    if (!matches(toTest, USERNAME)) {
      setError(form.shortName);
    } else if (toTest.length > 50) {
      setError(form.longName);
    } else if (
      takenNames.includes(toTest) ||
      restrictedNames.includes(toTest)
    ) {
      setError(form.inappropriateName);
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

  const handleSetClick = (): void => {
    const isFormValid = validate();
    if (!isFormValid) {
      setShowError(true);
    } else {
      onChange(name, input.trim());
    }
  };

  const handleKeyDown = (event: any): void => {
    if (event.key === 'Enter') {
      handleSetClick();
    }
  };

  return (
    <Grid container style={{ padding: '20px' }} spacing={2}>
      <Grid item xs={11}>
        {' '}
        <TextField
          error={showError}
          fullWidth
          helperText={showError ? error : helperText}
          label={label}
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
          onClick={handleSetClick}
        >
          <ArrowUpwardIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default NamePicker;
