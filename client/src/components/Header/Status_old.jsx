/* eslint-disable import/no-anonymous-default-export */

import {
  EuiButton,
  EuiHeader,
} from '@elastic/eui';

import React from 'react';

export default () => {

    // RegisteringVoters,
    //     ProposalsRegistrationStarted,
    //     ProposalsRegistrationEnded,
    //     VotingSessionStarted,
    //     VotingSessionEnded,
    //     VotesTallied
  const breadcrumbs = [
    {
      text: 'Registering Voters', href: '#', onClick: (e) => { e.preventDefault(); },
    },
    {
      text: 'Add Proposals', href: '#', onClick: (e) => { e.preventDefault(); },
    },
    {
      text: 'End Proposals', href: '#', onClick: (e) => { e.preventDefault(); },
    },
    {
      text: 'Start Voting', href: '#', onClick: (e) => { e.preventDefault(); },
    },
    {
      text: 'End Voting', href: '#', onClick: (e) => { e.preventDefault(); },
    },
    {
      text: 'Votes Tallied', 
    },
  ];

  const renderApps = (
    <EuiButton color={'primary'} size="s"  fill onClick={() => {}}>
            Next Step
    </EuiButton>
  );

  const sections = [
    {
      items: [],
      borders: 'right',
      breadcrumbs: breadcrumbs,
      truncate: true, 
    },
    {
      items: [renderApps],
    },
  ];

  return <EuiHeader sections={sections} />;
};