// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobMarket {
    enum JobStatus { Available, InProgress, Completed }

    struct Job {
        address client;
        uint256 price;
        string name;
        JobStatus status;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public jobCount;

    constructor() {
        jobCount = 0;
    }

    function postJob(string memory _name, uint256 _price) public {
        jobs[jobCount++] = Job(msg.sender, _price, _name, JobStatus.Available);
    }

    function startJob(uint256 _jobId) public {
        require(jobs[_jobId].status == JobStatus.Available, "Job not available");
        jobs[_jobId].status = JobStatus.InProgress;
    }

    function completeJob(uint256 _jobId) public {
        require(jobs[_jobId].status == JobStatus.InProgress, "Job not in progress");
        jobs[_jobId].status = JobStatus.Completed;
    }

    function getJobStatus(uint256 _jobId) public view returns (JobStatus) {
        return jobs[_jobId].status;
    }
    
    function getJob(uint256 _jobId) public view returns (address, uint256, string memory, JobStatus) {
    Job memory job = jobs[_jobId];
    return (job.client, job.price, job.name, job.status);
}
}


