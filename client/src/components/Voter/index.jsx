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
    const { state: { contract, accounts, web3 } } = useEth();
    const [currentStatus, setCurrentStatus] = useState("RegisteringVoters");
    const [isAdmin, setIsAdmin] = useState("");
    const [address, setAddress] = useState('');
    const [votersAddresses, setVotersAddresses] = useState([]);
    
    
    const initialState = async () => {
      const valueIsOwner = await contract.methods.isOwner().call({ from: accounts[0] });
      setIsAdmin(valueIsOwner);

      const value = await contract.methods.getCurrentStatus().call({ from: accounts[0] });
      setCurrentStatus(value);
    }
    
    useEffect(() => {
      if (contract?.methods) {
        initialState()
        getDataFromEvents()
      }
    }, [contract]);

    const getDataFromEvents = useCallback(async () => {
      if (!contract) return
  
      const previousEvents = await contract.getPastEvents('VoterRegistered', {
        fromBlock: 0,
        toBlock: 'latest'
      })
      const previousVoters = previousEvents.map((event) => event.returnValues.voterAddress.toLowerCase())
      setVotersAddresses(previousVoters)
      contract.events.VoterRegistered({ fromBlock: 'earliest' }, (error, event) => {
        setVotersAddresses(voters => voters.concat((event.returnValues.voterAddress).toLowerCase()))
      })
      contract.events.WorkflowStatusChange({ fromBlock: 'earliest' }, (error, event) => {
        setCurrentStatus(event.returnValues.newStatus)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract])
    
    
    const handleRegisterAddress = async () => {
      if (!web3.utils.isAddress(address)) {
        alert("invalid address")
      }
      await contract.methods.addVoter(address).send({ from: accounts[0] });
      setAddress('');
    }

    const handleAddressInput = (event) => {
      setAddress(event.target.value)
    }

  return (
    <Fragment>

      <EuiSpacer size="l" />

      <EuiListGroup size='s' bordered={true} showToolTips>
        {votersAddresses.map(item => <EuiListGroupItem label={item} key={item} />)}
      </EuiListGroup>

      
      { currentStatus==="RegisteringVoters" && isAdmin
          ? <>
                <EuiSpacer size="l" />
                <EuiFlexItem>
                  <EuiFormRow label="New Voter">
                    <EuiFieldText 
                      value={address}
                      onChange={handleAddressInput}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiSpacer size="l" />
                <EuiButton aria-label="Add new voter" fullWidth  onClick={handleRegisterAddress} disabled={!address}>Add Vote
                </EuiButton>
            </> 
          : null 
        }
    </Fragment>
  );
};