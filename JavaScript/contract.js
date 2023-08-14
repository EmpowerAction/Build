document.getElementById('connectMetamaskButton').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3('http://127.0.0.1:8545');
  } else {
    alert("Metamask no instalado. Instalelo para continuar");
    return;
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await window.web3.eth.getAccounts();
    displayAccountNumber(accounts[0]); // Display the connected address
    initializeContract(accounts[0]); // Pass the connected address
  } catch (error) {
    console.error('User denied account access');
    return;
  }
});

function displayAccountNumber(account) {
  // Display the account number wherever you want in your HTML
  document.getElementById('accountNumber').innerText = account;
  document.querySelector('.wallet__information').classList.add('expanded');
  document.querySelector(".wallet__key").style.marginRight = "0.66rem";
}


let jobName;
let jobPrice;


function jobInfo() {
    jobName = document.getElementById("JobName").value;
    jobPrice = document.getElementById("jobPrice").value;
    return
}



async function initializeContract() {
  const contractABIRequest = await fetch('../out/EmpowerAction.sol/JobMarket.json'); // ABI from your compiled contract
  const contractABI = await contractABIRequest.json();
  console.log(contractABI); 
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';// Contract address
  console.log('--------Web3---', window.web3.eth)
  const contract = new window.web3.eth.Contract(contractABI["abi"], contractAddress);

  const jobStatus = await contract.methods.getJobStatus(0).call();
  console.log('Result:', jobStatus );
}


//  contract.methods.YourFunction(parameters).send({ from: userAddress })
//    .on('transactionHash', hash => console.log('Transaction Hash:', hash))
//    .on('confirmation', (confirmationNumber, receipt) => console.log('Confirmation:', confirmationNumber))
//    .on('error', console.error);
//
//  contract.events.YourEvent()
//    .on('data', event => console.log('Event:', event))
//    .on('error', console.error);






  
  
