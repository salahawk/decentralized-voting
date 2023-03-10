const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Simple Voting", async () => {
  let engine;
  let deployer, voter1, voter2, voter3, voter4;

  const electionId = "32f234-fsd8f-fsfewe-323345";
  const description = "Test description";

  beforeEach(async () => {
    [deployer, voter1, voter2, voter3, voter4] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("Voting");
    engine = await factory.deploy();
    await engine.deployed();
  });

  describe("Chairperson", () => {
    describe("Create Proposal", async () => {
      it("Deployer should be able to create a proposal", async () => {
        await expect(engine.createElection(electionId, description))
          .to.emit(engine, "Election_Created")
          .withArgs(electionId, description);
      });
      it("Normal user is not able to create a proposal", async () => {
        await expect(
          engine.connect(voter1).createElection(electionId, description)
        ).to.revertedWith("Ownable: caller is not the owner");
      });
    });

    describe("Election Duration", async () => {
      it("Should revert in case of invalid duration", async () => {
        await expect(
          engine.setElectionDuration(electionId, 0, 0)
        ).to.revertedWith("startTime must be time in future");
      });
      it("Should revert in case of invalid duration", async () => {
        const currentTimestamp = await time.latest();
        await expect(
          engine.setElectionDuration(electionId, currentTimestamp + 1000000, 0)
        ).to.revertedWith("Invalid duration");
      });
      it("Should be able to set duration", async () => {
        const currentTimestamp = await time.latest();
        await expect(
          engine.setElectionDuration(
            electionId,
            currentTimestamp + 1000000,
            currentTimestamp + 10000000
          )
        ).to.emit(engine, "Election_Duration_Set");
      });
      it("Should revert when duration is already set", async () => {
        const currentTimestamp = await time.latest();
        await engine.setElectionDuration(
          electionId,
          currentTimestamp + 1000000,
          currentTimestamp + 10000000
        );
        await expect(
          engine.setElectionDuration(
            electionId,
            currentTimestamp + 1000000,
            currentTimestamp + 10000000
          )
        ).to.revertedWith("Duration already set");
      });
    });
  });

  describe("Voter", async () => {
    beforeEach(async () => {
      await engine.createElection(electionId, description);
      const currentTimestamp = await time.latest();
      await engine.setElectionDuration(
        electionId,
        currentTimestamp + 1000000,
        currentTimestamp + 10000000
      );
    });

    describe("Vote", async () => {
      it("Should revert when election is not started", async () => {
        await expect(
          engine.connect(voter1).vote(electionId, 0)
        ).to.revertedWith("Election not started");
      });
      it("Should revert when election is not started", async () => {
        await ethers.provider.send("evm_increaseTime", [100000000]);
        await ethers.provider.send("evm_mine");

        await expect(
          engine.connect(voter1).vote(electionId, 0)
        ).to.revertedWith("Election's over");
      });
      it("Should be able to vote", async () => {
        await ethers.provider.send("evm_increaseTime", [1000000]);
        await ethers.provider.send("evm_mine");

        await expect(engine.connect(voter1).vote(electionId, 0))
          .to.emit(engine, "Vote_Submitted")
          .withArgs(voter1.address, electionId);
      });
      it("Should revert when on a second vote", async () => {
        await ethers.provider.send("evm_increaseTime", [1000000]);
        await ethers.provider.send("evm_mine");

        await engine.connect(voter1).vote(electionId, 0);

        await expect(
          engine.connect(voter1).vote(electionId, 0)
        ).to.revertedWith("Already voted");
      });
    });
    describe("Get Result", async () => {
      it("Should return 1:0:0", async () => {
        await ethers.provider.send("evm_increaseTime", [1000000]);
        await ethers.provider.send("evm_mine");

        await engine.connect(voter1).vote(electionId, 0);

        const result = await engine.getElectionResult(electionId);
        expect(result.agrees).to.equal(1);
        expect(result.declines).to.equal(0);
        expect(result.abuses).to.equal(0);
      });
      it("Should return 1:1:0", async () => {
        await ethers.provider.send("evm_increaseTime", [1000000]);
        await ethers.provider.send("evm_mine");

        await engine.connect(voter1).vote(electionId, 0);
        await engine.connect(voter2).vote(electionId, 1);

        const result = await engine.getElectionResult(electionId);
        expect(result.agrees).to.equal(1);
        expect(result.declines).to.equal(1);
        expect(result.abuses).to.equal(0);
      });
    });
  });
});
