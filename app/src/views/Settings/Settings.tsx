import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

import ActionBar from './ActionBar';
import toast from '../../utils/toast';
import { useSettings } from '../../hooks';
import { TabView } from '../../components';
import UserContext from '../../context/UserContext';
import { Appearance, Interests, User, Preferences, Privacy } from './pages';
import { events } from '../../constants/socket';
import { getPublicSettings } from '../../utils/user';

const items = {
  Appearance: { component: Appearance },
  User: { component: User },
  Interests: { component: Interests },
  Preferences: { component: Preferences },
  Privacy: { component: Privacy },
};

const Settings: React.FC<any> = (props: any) => {
  const { className, socket, history } = props;

  const userCtx: any = useContext(UserContext);

  const { user } = userCtx;

  const isRegistered = Boolean(user.id);

  const handleBackClick = (): void => {
    history.goBack();
  };

  const { settings, updateSettings } = useSettings();
  const [changed, setChanged] = useState(false);
  const [formState, setFormState] = useState({ ...settings });

  const handleChange = (key: any, value: any): void => {
    setFormState((formState: any) => ({ ...formState, [key]: value }));
    setChanged(true);
  };

  const handleUpdateClick = (): void => {
    updateSettings(formState, isRegistered);

    socket.emit(events.UPDATE, getPublicSettings(formState, user));
    setChanged(false);

    toast.success('Settings updated successfully!');
  };

  const handleResetClick = (): void => {
    setFormState({ ...settings });
    setChanged(false);
  };

  return (
    <div className={className}>
      <Container maxWidth="md">
        <div style={{ marginTop: '36px' }}>
          <ActionBar
            changed={changed}
            onBackClick={handleBackClick}
            onResetClick={handleResetClick}
            onUpdateClick={handleUpdateClick}
          />
          <TabView
            items={items}
            formState={formState}
            onChange={handleChange}
            history={history}
            user={user}
          />
        </div>
      </Container>
    </div>
  );
};

Settings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default Settings;
