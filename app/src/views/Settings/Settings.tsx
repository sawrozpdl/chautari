import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

import ActionBar from './ActionBar';
import toast from '../../utils/toast';
import { useSettings } from '../../hooks';
import { TabView } from '../../components';
import { Appearance, Interests, User } from './pages';

const items = {
  User: { component: User },
  Appearance: { component: Appearance },
  Interests: { component: Interests },
  Privacy: { component: Appearance },
  Accessibility: { component: Appearance },
};

const App: React.FC<any> = (props: any) => {
  const { className, history } = props;

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
    updateSettings(() => formState);
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
          />
        </div>
      </Container>
    </div>
  );
};

App.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default App;
