/* eslint-disable import/no-anonymous-default-export */

import {
  EuiCode,
  EuiSteps,
  EuiText,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import RegisterVoters from "./RegisterVoters"
import useEth from "../../contexts/EthContext/useEth";

// enum WorkflowStatus {
//   RegisteringVoters,
//   ProposalsRegistrationStarted,
//   ProposalsRegistrationEnded,
//   VotingSessionStarted,
//   VotingSessionEnded,
//   VotesTallied
// }


export default () => {
  const { state: { contract, accounts, web3 } } = useEth();
  
  const [currentStep , setCurrentStep] = useState(null)

  const initialState = async () => {
    const defaultStep = await contract.methods.workflowStatus;
    setCurrentStep(defaultStep)
  }
  
  useEffect(() => {
    initialState()
  })



  const steps = [
    {
      title: 'Registering Voters',
      children: currentStep === "" ? (
        <>
          <RegisterVoters />
        </>
      ): null,
    },
    {
      title: 'Proposals Registration Started',
      children: currentStep === "" ? (
        <EuiText>
          <p>
            In order to complete this step, do the following things{' '}
            <strong>in order</strong>.
          </p>
            <ol>
              <li>Do thing 1</li>
              <li>Do thing 2</li>
              <li>Do thing 3</li>
            </ol>
        </EuiText>
      ) : null,
    },
    {
      title: 'Proposals Registration Ended',
      children: (
        <EuiText>
          <p>
            Now that you&apos;ve completed step 2, go find the{' '}
            <EuiCode>thing</EuiCode>.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'Voting Session Started',
      children: (
        <EuiText>
          <p>
            Now that you&apos;ve completed step 2, go find the{' '}
            <EuiCode>thing</EuiCode>.
          </p>
          <p>
            Go to <strong>Overview &gt;&gt; Endpoints</strong> note{' '}
            <strong>Elasticsearch</strong> as <EuiCode>&lt;thing&gt;</EuiCode>.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'Voting Session Ended',
      children: (
        <EuiText>
          <p>
            Now that you&apos;ve completed step 2, go find the{' '}
            <EuiCode>thing</EuiCode>.
          </p>
          <p>
            Go to <strong>Overview &gt;&gt; Endpoints</strong> note{' '}
            <strong>Elasticsearch</strong> as <EuiCode>&lt;thing&gt;</EuiCode>.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'VotesTallied',
      children: (
        <EuiText>
          <p>
            Now that you&apos;ve completed step 2, go find the{' '}
            <EuiCode>thing</EuiCode>.
          </p>
          <p>
            Go to <strong>Overview &gt;&gt; Endpoints</strong> note{' '}
            <strong>Elasticsearch</strong> as <EuiCode>&lt;thing&gt;</EuiCode>.
          </p>
        </EuiText>
      ),
    },
  ];

  return (
    <div>
      <EuiSteps headingElement="h2" steps={steps} />
    </div>
    )
};