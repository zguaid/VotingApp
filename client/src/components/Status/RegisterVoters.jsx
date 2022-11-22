/* eslint-disable import/no-anonymous-default-export */

import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiListGroup,
  EuiListGroupItem,
} from '@elastic/eui';
import React, { useState } from 'react';

import useEth from "../../contexts/EthContext/useEth";

const RegisterVoters = () => {
  const { state: { contract, accounts } } = useEth();
  const [registerAddresses, setNewAddress] = useState([]);
  const [address, setAddress] = useState('');

  const handleRegisterAddress = async () => {
    const event = await contract.methods.addVoter(address).send({ from: accounts[0] }); // TODO: find contract owner
    console.log(event.address);
    if (event.address) {
      setNewAddress([...registerAddresses, event.address])
    }

  }

  const handleAddressInput = (event) => {
    console.log('event', event.target.value)
    setAddress(event.target.value)
  }

  return (
  <EuiFlexGroup style={{ maxWidth: 600 }}>
    <EuiFlexItem>
      <EuiFormRow label="Adress">
        <EuiFieldText 
          value={address}
          onChange={handleAddressInput}
        />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow hasEmptyLabelSpace>
        <EuiButton onClick={handleRegisterAddress} disabled={!address}>Register</EuiButton>
      </EuiFormRow>
    </EuiFlexItem>

    <EuiListGroup showToolTips>
      {registerAddresses.map(item => <EuiListGroupItem label={item} />)}
    </EuiListGroup>
  </EuiFlexGroup>
  )
};

export default RegisterVoters;