/* eslint-disable import/no-anonymous-default-export */

import {
  EuiButton,
  EuiFieldText,
  EuiFlexItem,
  EuiFormRow,
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer
} from '@elastic/eui';
import React, { Fragment, useCallback, useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";

export default () => {
  const { state: { contract, accounts } } = useEth();
  const [currentStatus, setCurrentStatus] = useState("RegisteringVoters");
  const [isAdmin, setIsAdmin] = useState("");
  const [proposal, setProposal] = useState('');
  const [proposals, setProposals] = useState([]);
  const [voter, setVoter] = useState('');
  
  
  useEffect(() => {
    if (contract?.methods) {
      initialState()
    }
  }, [contract]);
  
  const initialState = async () => {
    const valueIsOwner = await contract.methods.isOwner().call({ from: accounts[0] });
    setIsAdmin(valueIsOwner);

    const value = await contract.methods.getCurrentStatus().call({ from: accounts[0] });
    setCurrentStatus(value);
    console.log('event', currentStatus)

    const values = await contract.methods.getProposals().call({ from: accounts[0] });
    setProposals(values);
    console.log('Proposals ', values)

    if(!isAdmin){
      const voterData = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
      setVoter(voterData)
      console.log(voterData)
    }
  }

  const handleProposalInput = (event) => {
    console.log('event', event.target.value)
    setProposal(event.target.value)
  }

  const handleRegisterProposal = async () => {
    console.log('Proposal', proposal)
    // await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    setProposals(proposals => proposals.concat({description : proposal}))
    setProposal('');
  }
  
  useEffect(() => {
    if (contract?.methods) {
      initialState()
      getDataFromEvents()
    }
  }, [contract]);

  const getDataFromEvents = useCallback(async () => {
    if (!contract) return
    
    contract.events.WorkflowStatusChange({ fromBlock: 'earliest' }, (error, event) => {
      setCurrentStatus(event.returnValues.newStatus)
    })
    contract.events.WorkflowStatusChange({ fromBlock: 'earliest' }, (error, event) => {
      setCurrentStatus(event.returnValues.newStatus)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract])
  
    return (
      <Fragment>
  
        <EuiSpacer size="l" />
  
        <EuiListGroup size='s' bordered={true}>
          {
            proposals.map((item, index) =>
              <EuiListGroupItem 
                label={item.description} 
                key={index} 
                extraAction={
                  {
                    isLoading: (currentStatus==="VotingSessionStarted" && !isAdmin && voter.isRegistered && !voter.hasVoted) ? false : true,
                    type: 'button',
                    display: 'base',
                    color: 'success',
                    iconType: 'check',
                    onClick: async () =>
                    {
                      if(voter && !voter.hasVoted){
                        console.log("vote index ", index)
                        await contract.methods.setVote(index).send({ from: accounts[0] });
                      }
                      else{
                        alert("You already voted");
                      }
                    },
                    alwaysShow: true,
                    iconSize: 's',
                    'aria-label': '1' ,
                  }
                }
            />)
          }
        </EuiListGroup>
  
        { currentStatus==="ProposalsRegistrationStarted" && !isAdmin && voter?.isRegistered && !voter?.hasVoted
          ? <>
                <EuiSpacer size="l" />
                <EuiFlexItem>
                  <EuiFormRow label="New Proposal">
                    <EuiFieldText 
                      value={proposal}
                      onChange={handleProposalInput}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiSpacer size="l" />
                <EuiButton aria-label="Add new proposal" fullWidth  onClick={handleRegisterProposal} disabled={!proposal}>Add Proposal
                </EuiButton>
            </> 
          : null 
        }
      </Fragment>
    );
  };