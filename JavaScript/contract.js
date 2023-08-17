async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    return account;
  }
  
  
  
  
  
  document.getElementById('connectMetamaskButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      //window.web3 = new Web3('http://127.0.0.1:8545');
      window.web3 = new Web3(window.ethereum);
    } else {
      alert("Metamask no instalado. Instalelo para continuar");
      return;
    }
  
    try {
      const account = await getAccount();
  
      displayAccountNumber(account); // Display the connected address
      initializeContract(account); // Pass the connected address
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


  
  async function jobInfo() {
    const account = await getAccount();
    if (!account) {
        alert("Por favor, conecta tu wallet de MetaMask para continuar.");
        return;
    }

    // Obtener valores de los campos de entrada
    const jobName = document.getElementById("inputJobName").value;
    const jobPrice = document.getElementById("inputJobPrice").value;

    // Limpiar los campos de entrada
    document.getElementById("inputJobName").value = "";
    document.getElementById("inputJobPrice").value = "";

    // Llamar al contrato
    await window.contract.methods.postJob(jobName, jobPrice).send({from: account});
}
  
  
  
  
  async function initializeContract() {
    const contractABIRequest = await fetch('../out/EmpowerAction.sol/JobMarket.json'); // ABI from your compiled contract
    const contractABI = await contractABIRequest.json();
    console.log(contractABI); 
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';// Contract address
    console.log('--------Web3---', window.web3.eth)
    window.contract = new window.web3.eth.Contract(contractABI["abi"], contractAddress);
    const job = await contract.methods.getJob(0).call();
    console.log('Result:', job );
  
  }
  
  let nombreUsuario; 
  
  async function guardarNombre() {
  
      const account = await getAccount();
      if (!account) {
        alert("Por favor, conecta tu wallet de MetaMask para continuar.");
        return;
    }
      const imgPath = "../HTML/img/face.png";
      const imgChangeProfile = document.getElementById("imgProfilePicture");
      nombreUsuario = document.getElementById('nombreInput').value;
      document.getElementById('userNameContainer').style.display = 'flex';
      document.getElementById('userNameDisplay').textContent = nombreUsuario;
      document.getElementById("register").style.display = "none";
      document.querySelector(".ventanita").style.display = "none";
      imgChangeProfile.src = imgPath;
      console.log('nombre', nombreUsuario);
      registerUser(nombreUsuario)
      return;
  }
      
  async function registerUser(name) {
      const account = await getAccount() 
      console.log('account:',account)
      await window.contract.methods.registerUser(name).send({from:account});
  }
  
  
  async function checkUser(address) {
      const checkedUser = await window.contract.methods.checkUser(address).call();
      console.log('User registered : ' , checkedUser);
  }
  
  
  //  contract.methods.YourFunction(parameters).send({ from: userAddress })
  //    .on('transactionHash', hash => console.log('Transaction Hash:', hash))
  //    .on('confirmation', (confirmationNumber, receipt) => console.log('Confirmation:', confirmationNumber))
  //    .on('error', console.error);
  //
  //  contract.events.YourEvent()
  //    .on('data', event => console.log('Event:', event))
  //    .on('error', console.error);