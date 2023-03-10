// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    enum Response {
        Agree,
        Decline,
        Abuse
    }

    struct Election {
        string description;
        uint[3] result;
        uint startTime;
        uint endTime;
    }

    event Election_Created(string electionId, string description);
    event Election_Duration_Set(
        string electionId,
        uint startTime,
        uint endTime
    );
    event Vote_Submitted(address voter, string electionId);

    mapping(string => Election) private elections;
    mapping(address => mapping(string => bool)) private hasVoted;

    function createElection(
        string memory electionId,
        string memory description
    ) public onlyOwner {
        Election memory newElection;
        newElection.description = description;
        elections[electionId] = newElection;

        emit Election_Created(electionId, description);
    }

    function setElectionDuration(
        string memory electionId,
        uint _startTime,
        uint _endTime
    ) public onlyOwner {
        require(elections[electionId].startTime == 0, "Duration already set");
        require(
            _startTime >= block.timestamp,
            "startTime must be time in future"
        );
        require(_endTime >= _startTime, "Invalid duration");
        elections[electionId].startTime = _startTime;
        elections[electionId].endTime = _endTime;

        emit Election_Duration_Set(electionId, _startTime, _endTime);
    }

    function vote(string memory electionId, Response option) public {
        require(
            elections[electionId].startTime <= block.timestamp,
            "Election not started"
        );
        require(
            elections[electionId].endTime >= block.timestamp,
            "Election's over"
        );
        require(hasVoted[msg.sender][electionId] == false, "Already voted");

        hasVoted[msg.sender][electionId] = true;
        elections[electionId].result[uint(option)]++;

        emit Vote_Submitted(msg.sender, electionId);
    }

    function getElectionResult(
        string memory electionId
    ) public view returns (uint agrees, uint declines, uint abuses) {
        return (
            elections[electionId].result[0],
            elections[electionId].result[1],
            elections[electionId].result[2]
        );
    }
}
