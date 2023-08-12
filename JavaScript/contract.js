document.getElementById('connectMetamaskButton').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
  } else {
    console.log('Metamask is not installed. Please consider installing it!');
    return;
  }
  
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await window.web3.eth.getAccounts();
    initializeContract(accounts[0]); // Pass the connected address
  } catch (error) {
    console.error('User denied account access');
    return;
  }
});

function initializeContract(userAddress) {
  const contractABI = []; // ABI from your compiled contract
  const contractAddress = '0x...'; // Contract address
  const contract = new window.web3.eth.Contract(contractABI, contractAddress);

  contract.methods.YourFunction().call().then(result => {
    console.log('Result:', result);
  });

  contract.methods.YourFunction(parameters).send({ from: userAddress })
    .on('transactionHash', hash => console.log('Transaction Hash:', hash))
    .on('confirmation', (confirmationNumber, receipt) => console.log('Confirmation:', confirmationNumber))
    .on('error', console.error);

  contract.events.YourEvent()
    .on('data', event => console.log('Event:', event))
    .on('error', console.error);
}





  
  