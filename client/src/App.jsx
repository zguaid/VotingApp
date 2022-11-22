import "./App.css";
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiPanel, EuiProvider, EuiSpacer, EuiSplitPanel, EuiText } from '@elastic/eui';

import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header";
import Proposal from "./components/Proposal";
import Status from "./components/Status";
import Voter from "./components/Voter";
import Winner from "./components/Winner";

function App() {
  return (
    <EthProvider>
      <EuiProvider colorMode="light">
        <div id="App" >
          <div className="container">
            <Header />
            <EuiSpacer size="xxl" />
            <EuiSpacer size="xxl" />
            <Winner />
            <EuiSpacer size="xxl" />
            <Status />
            <EuiSpacer size="xxl" />
            <EuiSpacer size="m" />
            <EuiPanel>
              <EuiSplitPanel.Outer direction="row">
                <EuiSplitPanel.Inner>
                  <EuiText  textAlign="center" size="s">
                    <h3>Voters</h3>
                  </EuiText >
                  <Voter />
                </EuiSplitPanel.Inner>
                <EuiSplitPanel.Inner color="subdued">
                  <EuiText  textAlign="center" size="s">
                    <h3>Proposals</h3>
                  </EuiText >
                  <Proposal />
                </EuiSplitPanel.Inner>
              </EuiSplitPanel.Outer>
            </EuiPanel>
          </div>
        </div>
      </EuiProvider>
    </EthProvider>
  );
}

export default App;
