pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ServiceToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ServiceToken", "STKN") {
        _mint(msg.sender, initialSupply);
    }
}

contract ServiceExchange {
    ServiceToken public token;

    struct Job {
        address owner;
        string name;
        uint256 price;
        address worker;
        bool completed;
    }

    mapping(address => bool) public registeredUsers;
    mapping(address => Job[]) public availableJobs;
    mapping(address => Job[]) public takenJobs;

    constructor(address _token) {
        token = ServiceToken(_token);
    }

    function registerUser() public {
        registeredUsers[msg.sender] = true;
    }

    function addJob(string memory _name, uint256 _price) public {
        require(registeredUsers[msg.sender], "You must be registered");
        availableJobs[msg.sender].push(Job(msg.sender, _name, _price, address(0), false));
    }

    function takeJob(address _owner, uint256 _index) public {
        require(registeredUsers[msg.sender], "You must be registered");
        Job storage job = availableJobs[_owner][_index];
        require(token.transferFrom(msg.sender, address(this), job.price), "Transfer failed");
        job.worker = msg.sender;
        takenJobs[msg.sender].push(job);
    }

    function completeJob(address _worker, uint256 _index) public {
        Job storage job = takenJobs[_worker][_index];
        require(msg.sender == job.owner, "Not the owner");
        require(token.transfer(job.worker, job.price), "Transfer failed");
        job.completed = true;
    }
}

