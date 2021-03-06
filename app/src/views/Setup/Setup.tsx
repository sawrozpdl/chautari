import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  Container,
  Typography,
  Fade,
  Tooltip,
  Icon,
  TextField,
  Switch,
  makeStyles,
  FormControlLabel,
} from '@material-ui/core';

import toast from '../../utils/toast';
import routes from '../../constants/routes';
import { GUEST } from '../../constants/app';
import { matches } from '../../utils/string';
import useSettings from '../../hooks/useSettings';
import { USERNAME } from '../../constants/schemas';
import SmartAvatar from '../../components/SmartAvatar';
import { form as messages } from '../../constants/labels';
import { getRandomName, getHashAvatar } from '../../utils/user';
import { restrictedNames, takenNames } from '../../constants/restricted';

const defaultValues = {
  nickname: getRandomName(),
  conversationSharing: true,
  safeMode: false,
};

const Setup: React.FC<any> = (props: any) => {
  const { history } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      height: '100%',
      paddingTop: '100px',
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
      marginTop: theme.spacing(1.5),
    },
    avatar: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    setupBtn: {
      margin: theme.spacing(2, 0),
    },
    textField: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes: any = useStyles();

  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const hasSetup = settings.nickname && settings.nickname !== GUEST;

    if (hasSetup) {
      history.push(routes.APP);
    }
  }, [settings]);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [showError, setShowError] = useState<any>(false);
  const [values, setValues] = useState<any>(defaultValues);
  const [changed, setChanged] = useState<any>(false);

  useEffect(() => {
    if (errors.nickname) return;

    setAvatarUrl(getHashAvatar({ name: values.nickname, size: 100 }));
  }, [values.nickname]);

  const validate = (): boolean => {
    const { nickname } = values;
    let isValid = false;
    const toTest = nickname && nickname.trim();
    if (takenNames.includes(toTest) || restrictedNames.includes(toTest)) {
      setErrors({ ...errors, nickname: messages.inappropriateName });
    } else if (!matches(toTest, USERNAME)) {
      setErrors({ ...errors, nickname: messages.shortName });
    } else {
      setErrors({});
      isValid = true;
    }

    return isValid;
  };

  const handleChange = (event: any): void => {
    setChanged(true);
    setShowError(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value?.trim() || event.target.checked,
    });
    validate();
  };

  const handleSubmit = async (): Promise<void> => {
    const isFormValid = validate();
    if (!isFormValid) {
      setShowError(true);
    } else {
      await updateSettings((settings: any) => ({ ...settings, ...values }));
      toast.success(messages.gameBegin);
      history.push(routes.APP);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.content}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            {`Just one step, Almost there..`}
          </Typography>
          <SmartAvatar className={classes.avatar} size={100} src={avatarUrl} />
          <TextField
            className={classes.textField}
            error={showError}
            fullWidth
            helperText={
              showError
                ? errors.nickname
                : changed
                ? messages.generatedAvatar
                : messages.cuteName
            }
            label="Choose a suitable nickname"
            name="nickname"
            onChange={handleChange}
            type="text"
            value={values.nickname || ''}
            variant="outlined"
          />
          <FormControlLabel
            className={classes.checkbox}
            control={
              <>
                <Tooltip
                  TransitionComponent={Fade}
                  title="Hide profanity, offensive languages and other racial slurs from people around the world."
                  arrow
                >
                  <Icon
                    color="primary"
                    fontSize="small"
                    className={classes.infoIcon}
                  >
                    info_circle
                  </Icon>
                </Tooltip>
                <Switch
                  checked={values.safeMode}
                  onChange={handleChange}
                  name="safeMode"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </>
            }
            label="Keep me safe"
            labelPlacement="start"
          />
          <FormControlLabel
            className={classes.checkbox}
            control={
              <>
                <Tooltip
                  TransitionComponent={Fade}
                  title="Contribute to data science by allowing the use of conversations made in this site. Note: The info/messages won't be made public."
                  arrow
                >
                  <Icon
                    color="primary"
                    fontSize="small"
                    className={classes.infoIcon}
                  >
                    info_circle
                  </Icon>
                </Tooltip>
                <Switch
                  checked={values.conversationSharing}
                  onChange={handleChange}
                  name="conversationSharing"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </>
            }
            label="Allow conversation sharing"
            labelPlacement="start"
          />
          <Button
            className={classes.setupBtn}
            color="secondary"
            onClick={handleSubmit}
            disabled={showError}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {"Let's gooo!"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

Setup.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default Setup;
