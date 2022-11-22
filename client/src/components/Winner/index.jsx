/* eslint-disable import/no-anonymous-default-export */

import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, } from '@elastic/eui';
import React, { Fragment, useEffect, useState } from "react";

import useEth from "../../contexts/EthContext/useEth";

export default () => {
    const { state: { contract, accounts } } = useEth();
    const [winner, setWinner] = useState("");
    const [currentStatus, setCurrentStatus] = useState("RegisteringVoters");

    useEffect(() => {
        if (contract?.methods) {
          initialState()
        }
    }, [contract]);
      
    const initialState = async () => {    
        const currentStatusValue = await contract.methods.getCurrentStatus().call({ from: accounts[0] });
        setCurrentStatus(currentStatusValue);

        if(currentStatusValue==="VotesTallied"){
            const winningProposalID = await contract.methods.winningProposalID().call({ from: accounts[0] });
            const value = await contract.methods.getOneProposal(winningProposalID).call({ from: accounts[0] });
            console.log(winningProposalID, value)
            setWinner(value);
        }
    }
    
    return (
        <Fragment>
            <EuiFlexGroup gutterSize="l">
                <EuiFlexItem key={winner}>
                    <EuiCard
                    icon={<EuiIcon size="xxl" type='logoAppSearch' />}
                    title={ currentStatus==="VotesTallied" ? "Winning Proposal" : "Voting App" }
                    description={ currentStatus==="VotesTallied" ? `The winning proposal is: ${winner}` : " " }
                    // description={`The winning proposal is: ${winner}`}
                    />
                </EuiFlexItem>
            </EuiFlexGroup>
        </Fragment>
    )
};