export const userActionResponses = {
  [userActionResults.SUCCESS]: {
    code: 'success',
    default: 'The action was performed successfully!',
    [userActions.BAN_USER]: 'User banned from this room!',
    [userActions.KICK_USER]: 'User kicked from this room!',
    [userActions.PROMOTE_USER]: 'User promoted to admin of this room!',
    [userActions.REPORT_USER]:
      'User has been reported of inappropriate behavior!',
  },
  [userActionResults.FAILED]: {
    code: 'error',
    default: 'Failed to perform this action!',
    [userActions.BAN_USER]: 'Failed to ban this user!',
    [userActions.KICK_USER]: 'Failed to kick this user!',
    [userActions.PROMOTE_USER]: 'Failed to promote this user!',
    [userActions.REPORT_USER]: 'Failed to report this user!',
  },
  [userActionResults.UNAUTHORIZED]: {
    code: 'warning',
    default: "You aren't authorized to perform this action!",
  },
};
