
import Web3 from 'web3';

const App = () => {
  let web3;
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    // Use the user's existing web3 provider
    web3 = new Web3(window.ethereum || window.web3.currentProvider);
  } else {
    // Use a fallback provider (e.g. Infura)
    web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/6579bd6485d945559174aaa1ef4b4f71"));
  }

  window.ethereum.enable().then(() => {

    console.log(web3.user)

    // User connected their wallet
  });

}

export default App;
