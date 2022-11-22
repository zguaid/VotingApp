/* eslint-disable import/no-anonymous-default-export */

import {
  EuiBadge,
  EuiHeader,
  EuiHeaderLogo,
  useEuiTheme,
} from '@elastic/eui';
import { useEffect, useState } from "react";

import React from 'react';
import useEth from "../../contexts/EthContext/useEth";

export default () => {
  const { state: { contract, accounts } } = useEth();
  const { euiTheme } = useEuiTheme();
  const [isAdmin, setIsAdmin] = useState("");
  
  const initialState = async () => {
    const value = await contract.methods.isOwner().call({ from: accounts[0] });
    setIsAdmin(value);
  } 
  
  useEffect(() => {
    if (contract?.methods) {
      initialState()
    }
  }, [contract]);

  return (
    <EuiHeader 
      position="fixed" 
      theme="dark"
      sections={[
        {
          items: [
            <EuiHeaderLogo iconType='logoAppSearch'>Voting App</EuiHeaderLogo>,
          ],
          borders: 'right',
        },
        {
          items: [
            <div>
              <EuiBadge
                color={euiTheme.colors.darkestShade}
                iconSide="right"
              >
                {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
              </EuiBadge>,
              <EuiBadge
                color={ isAdmin ? 'warning' : 'success' }
                iconSide="right"
              >
                { isAdmin ? 'Admin' : 'Voter' }
              </EuiBadge>
            </div>,
          ],
          borders: 'none',
        },
      ]}
    />
  );
};