// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobMarket {
    enum JobStatus { Available, InProgress, Completed }

    struct User {
        address UserAddress;
        string name;
        //tambien link ipfs a la imagen quizas
    }

    struct Job {
        User user; // Added worker to the job
        uint256 price;
        string name;
    }

    mapping(uint256 => Job) public jobs;
    mapping(address => User) public Users; // Mapping to manage workers
    uint256 public jobCount;

    // Event to be emitted when a new job is posted
    event NewJobPosted(address indexed client, string name, uint256 price);

    constructor() {
        jobCount = 0;
    }

    function registerUser(string memory _name) public {
        Users[msg.sender] = User(msg.sender, _name);
    }

    function postJob(string memory _name, uint256 _price) public {
        //require(necesitas estar registrado)
        jobs[jobCount] = Job(Users[msg.sender], _price, _name);
        emit NewJobPosted(msg.sender, _name, _price); // Emitting event
        jobCount++;
    }

    function checkUser(address _address) public view returns (bool) {
        return Users[_address].UserAddress != address(0);
    }

    function getJob(uint256 _jobId) public view returns (address, string memory, uint256, string memory) {
        Job memory job = jobs[_jobId];
        return (job.user.UserAddress, job.user.name, job.price, job.name);
    }
}



