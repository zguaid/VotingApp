/* eslint-disable import/no-anonymous-default-export */

import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem, EuiStepsHorizontal } from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import useEth from "../../contexts/EthContext/useEth";

export default () => {
  const { state: { contract, accounts } } = useEth();

  const [isAdmin, setIsAdmin] = useState("");
  const [currentStatus , setCurrentStatus] = useState("RegisteringVoters")
  const [currentStatusIndex , setCurrentIndex] = useState('1')
  const [firtStepStatus, setFirtStepStatus] = useState('incomplete');
  const [secondStepStatus, setSecondStepStatus] = useState('incomplete');
  const [thirdStepStatus, setthirdStepStatus] = useState('incomplete');
  const [fourthStepStatus, setFourthStepStatus] = useState('incomplete');
  const [fifthStepStatus, setFifthStepStatus] = useState('incomplete');
  const [sixthStepStatus, setSixthStepStatus] = useState('incomplete');


// enum WorkflowStatus {
//   RegisteringVoters,
//   ProposalsRegistrationStarted,
//   ProposalsRegistrationEnded,
//   VotingSessionStarted,
//   VotingSessionEnded,
//   VotesTallied
// }
  const initialState = async () => {
    const valueIsOwner = await contract.methods.isOwner().call({ from: accounts[0] });
    setIsAdmin(valueIsOwner);
    
    const value = await contract.methods.getCurrentStatus().call({ from: accounts[0] });
    setCurrentStatus(value)
    console.log('Status status', value)
    
    updateStepsStatus(value)
  }

  function updateStepsStatus(_currentStatus) {
    setCurrentIndex(getCurrentStepIndex(_currentStatus))
    setFirtStepStatus(getStepStatus(_currentStatus, 'RegisteringVoters', 1))
    setSecondStepStatus(getStepStatus(_currentStatus, 'ProposalsRegistrationStarted', 2))
    setthirdStepStatus(getStepStatus(_currentStatus, 'ProposalsRegistrationEnded', 3))
    setFourthStepStatus(getStepStatus(_currentStatus, 'VotingSessionStarted', 4))
    setFifthStepStatus(getStepStatus(_currentStatus, 'VotingSessionEnded', 5))
    setSixthStepStatus(getStepStatus(_currentStatus, 'VotesTallied', 6))
  }
  
  function getStepStatus(_currentStatus, _step, _stepIndex) {
    if(_currentStatus===_step)
    {
      return 'loading'
    }
    else {
      if(_stepIndex<=currentStatusIndex) {
        return 'complete'
      }
      else {
        return 'incomplete'
      }
    }
  }
  
  
  function getCurrentStepIndex(step) {
    if(step==="RegisteringVoters") return 1;
    if(step==="ProposalsRegistrationStarted") return 2;
    if(step==="ProposalsRegistrationEnded") return 3;
    if(step==="VotingSessionStarted") return 4;
    if(step==="VotingSessionEnded") return 5;
    if(step==="VotesTallied") return 6;
    return 0;
  }

  const nextStep = async () => {
    let nextStep = 'RegisteringVoters'
    if(currentStatus==="RegisteringVoters") {
      await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
      nextStep='ProposalsRegistrationStarted'
    }
    if(currentStatus==="ProposalsRegistrationStarted") {
      await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
      nextStep='ProposalsRegistrationEnded'
    }
    if(currentStatus==="ProposalsRegistrationEnded") {
      await contract.methods.startVotingSession().send({ from: accounts[0] });
      nextStep='VotingSessionStarted'
    }
    if(currentStatus==="VotingSessionStarted") {
      await contract.methods.endVotingSession().send({ from: accounts[0] });
      nextStep='VotingSessionEnded'
    }
    if(currentStatus==="VotingSessionEnded") {
      await contract.methods.tallyVotes().send({ from: accounts[0] });
      nextStep='VotesTallied'
    }
    if(currentStatus==="VotesTallied") {
      await contract.methods.restartSession().send({ from: accounts[0] });
      nextStep='RegisteringVoters'
    }
    // if(currentStatus==="VotesTallie") await contract.methods.mint().send({ from: accounts[0] });
    setCurrentStatus(nextStep)
    updateStepsStatus(nextStep)
  };
  
  useEffect(() => {
    if (contract?.methods) {
      initialState()
    }
  }, [contract]);

  
  const steps = [
    {
      title: 'Registering Voters',
      status: firtStepStatus,
      onClick: () => {},
    },
    {
      title: 'Proposals Registration Started',
      status: secondStepStatus,
      onClick: () => {},
      // titleSize: (currentStatus==="RegisteringVoters" ? 's': 'xs'),
      // titleSize: (currentStatus==="ProposalsRegistrationStarted" ? 's' : null),
    },
    {
      title: 'Proposals Registration Ended',
      status: thirdStepStatus,
      onClick: () => {},
    },
    {
      title: 'Voting Session Started',
      status: fourthStepStatus,
      onClick: () => {},
    },
    {
      title: 'Voting Session Ended',
      status: fifthStepStatus,
      onClick: () => {},
    },
    {
      title: 'Votes Tallied',
      status: sixthStepStatus,
      onClick: () => {},
      // status: status,
    },
  ];

  return (
    <div>
      <EuiFlexGroup justifyContent="spaceAround" wrap>
        <EuiFlexItem  grow={false}>
          <EuiCard
            title= ''
            betaBadgeProps={{
              label: 'Current Status',
              color: 'hollow',
            }}
            children=
              {
                <EuiStepsHorizontal steps={steps} />
              }
              footer={
                isAdmin ? <EuiButton onClick={nextStep} aria-label="Go to next step" fullWidth>{currentStatus==="VotesTallied" ? "Reset Session" : "Next Step"}</EuiButton> : null
              }
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};