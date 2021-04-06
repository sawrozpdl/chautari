import React, { useEffect, useMemo, useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {
  Container,
  Typography,
  Avatar,
  TextField,
  Checkbox,
  Switch,
  makeStyles,
  FormControlLabel,
} from '@material-ui/core';

import toast from '../../utils/toast';
import { events } from '../../constants/socket';
import { form, interests } from '../../constants/labels';
import { ItemsSelect, SlideSelect } from '../../components';
import routes, { roomOptions } from '../../constants/routes';
import { ROOM_NAME, PASS_KEY } from '../../constants/schemas';
import { interpolate, matches, parseQuery } from '../../utils/string';
import { restrictedNames, takenNames } from '../../constants/restricted';

const defaultValues = (query: any): any => ({
  roomName: query.roomName || '',
  isPrivate: false,
  maxUsers: 3,
  key: query.key || null,
  topics: [],
});

const defaultOptions = (query: any): any => ({
  hasKey: query.key ? true : false,
  hasTopics: false,
});

const EditRoom: React.FC<any> = (props: any) => {
  const { location, match, socket, history } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      height: '100%',
      paddingTop: '80px',
    },
    content: {
      position: 'relative',
    },
    backBtn: {
      position: 'absolute',
      top: 0,
      left: theme.spacing(2),
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoIcon: {
      position: 'relative',
      bottom: '6px',
    },
    checkbox: {
      marginTop: theme.spacing(2),
      marginRight: 0,
    },
    avatar: { width: 100, height: 100, marginBottom: theme.spacing(2) },
    title: { marginBottom: theme.spacing(1) },
    actionButton: {
      margin: theme.spacing(2, 0),
      width: '40%',
    },
    textField: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: '75%',
    },
    options: {
      display: 'flex',
      width: '75%',
      justifyContent: 'space-between',
    },
    optionsAlt: {
      display: 'flex',
      width: '75%',
      justifyContent: 'space-around',
    },
    slider: {
      width: '75%',
      marginTop: theme.spacing(2),
    },
  }));

  const classes: any = useStyles();

  const { option } = match.params;

  const isCreating = option === roomOptions.CREATE;

  const query = useMemo(() => parseQuery(location.search), [location.search]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showError, setShowError] = useState<any>(false);
  const [values, setValues] = useState<any>(defaultValues(query));
  const [options, setOptions] = useState<any>(defaultOptions(query));

  const handleBackClick = (): void => {
    if (history.length > 0) {
      history.push(routes.APP);
    } else history.goBack();
  };

  const validate = (): boolean => {
    const { roomName, key } = values;

    let isNameValid = false;
    let isKeyValid = options.hasKey ? false : true;

    const toTestRoomName = roomName && roomName.trim();

    const errors: any = {};

    if (
      takenNames.includes(toTestRoomName) ||
      restrictedNames.includes(toTestRoomName)
    ) {
      errors.roomName = form.inappropriateName;
    } else if (!matches(toTestRoomName, ROOM_NAME)) {
      errors.roomName = form.shortName;
    } else {
      isNameValid = true;
    }

    if (options.hasKey && !matches(key, PASS_KEY)) {
      errors.key = form.badKey;
    } else if (options.hasKey) {
      isKeyValid = true;
    }

    setErrors(errors);

    return isNameValid && isKeyValid;
  };

  const handleChange = (name: string, value: any): void => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleValueChange = (event: any): void => {
    setShowError(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value?.trim() || event.target.checked,
    });
    validate();
  };

  const handleOptionChange = (event: any): void => {
    setShowError(false);
    setOptions({
      ...options,
      [event.target.name]: event.target.checked,
    });
  };

  const goToChat = useCallback((): void => {
    let toGo = interpolate(routes.ROOM_CHAT, { name: values.roomName });
    if (options.hasKey) {
      toGo += `?key=${values.key}`;
    }
    history.push(toGo);
  }, [values.roomName, values.key]);

  useEffect(() => {
    socket.on(events.ROOM_CREATED, () => {
      toast.success('Room creation successful!');

      goToChat();
    });
    socket.on(events.ROOM_CREATION_FAILED, (data: any) => {
      toast.error(data?.text || 'Room creation failed!');
      setLoading(false);
    });

    socket.on(events.JOIN_REQUEST_ACCEPTED, () => {
      toast.success('Join request accepted!');

      goToChat();
    });
    socket.on(events.JOIN_REQUEST_REJECTED, (data: any) => {
      toast.error(data?.text || 'Join request rejected!');
      setLoading(false);
    });

    return (): void => {
      socket.off(events.ROOM_CREATED);
      socket.off(events.ROOM_CREATION_FAILED);
      socket.off(events.JOIN_REQUEST_ACCEPTED);
      socket.off(events.JOIN_REQUEST_REJECTED);
    };
  }, [goToChat]); //TODO: optimize the un-mount logic.

  const requestRoomCreation = (): void => {
    socket.emit(events.CREATE_ROOM, values);
  };

  const requestRoomJoin = (): void => {
    socket.emit(events.REQUEST_JOIN, values);
  };

  const handleSubmit = async (): Promise<void> => {
    const isFormValid = validate();
    if (!isFormValid) {
      setShowError(true);
    } else {
      setLoading(true);
      if (isCreating) requestRoomCreation();
      else requestRoomJoin();

      toast.info(
        isCreating ? 'Room creation in progress!' : 'Room join request sent!'
      );
    }
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <div className={classes.content}>
        <Button
          variant="outlined"
          onClick={handleBackClick}
          className={classes.backBtn}
          color="secondary"
        >
          Back
        </Button>
        <div className={classes.paper}>
          <Avatar
            src={isCreating ? '/images/settings.svg' : '/images/door.svg'}
            className={classes.avatar}
          />
          <Typography component="h1" variant="h3" className={classes.title}>
            {isCreating ? 'Create room' : 'Join room'}
          </Typography>
          <TextField
            className={classes.textField}
            error={showError && errors.roomName}
            helperText={
              showError
                ? errors.roomName
                : 'Must be 3-50 characters without numbers/symbols'
            }
            label={
              isCreating
                ? 'Choose a suitable room name'
                : 'Mention the room name'
            }
            name="roomName"
            onChange={handleValueChange}
            type="text"
            value={values.roomName || ''}
            variant="outlined"
          />
          {isCreating && (
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Switch
                  checked={values.isPrivate}
                  onChange={handleValueChange}
                  name="isPrivate"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Private room"
              labelPlacement="start"
            />
          )}
          {isCreating && (
            <SlideSelect
              className={classes.slider}
              name={'maxUsers'}
              title={'Max users:'}
              usePaper={false}
              onChange={handleChange}
              min={2}
              max={12}
              step={1}
              value={values.maxUsers}
            />
          )}
          <div className={isCreating ? classes.options : classes.optionsAlt}>
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  checked={options.hasKey}
                  onChange={handleOptionChange}
                  name="hasKey"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label={isCreating ? 'Add passkey' : 'Has passkey'}
            />
            {isCreating && (
              <FormControlLabel
                className={classes.checkbox}
                control={
                  <Checkbox
                    checked={options.hasTopics}
                    onChange={handleOptionChange}
                    name="hasTopics"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label="Add topics"
              />
            )}
          </div>
          {options.hasKey && (
            <TextField
              className={classes.textField}
              error={showError && errors.key}
              fullWidth
              helperText={
                showError
                  ? errors.key
                  : 'Must be 4-20 alphanumeric characters/symbols'
              }
              label={
                isCreating ? 'Provide a secure pass key' : 'Enter the pass key'
              }
              name="key"
              onChange={handleValueChange}
              type="text"
              value={values.key || ''}
              variant="outlined"
            />
          )}
          {options.hasTopics && (
            <ItemsSelect
              label={'topic'}
              name={'topics'}
              labels={interests}
              value={values.topics}
              onChange={handleChange}
              style={{ marginTop: '12px' }}
            />
          )}
          <Button
            className={classes.actionButton}
            color="secondary"
            onClick={handleSubmit}
            disabled={showError || loading}
            size="large"
            type="submit"
            variant="contained"
          >
            {isCreating ? "Let's go!" : 'Aight, get me in!'}
          </Button>
        </div>
      </div>
    </Container>
  );
};

EditRoom.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default EditRoom;
