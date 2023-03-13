import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, VoteBar, VoteResultBar } from "ui";

type Props = {};

export default function Proposal({}: Props) {
  const router = useRouter();
  const { proposalId } = router.query;

  const handleVote = () => {
    alert(proposalId);
  };

  return (
    <>
      <span className="font-bold sticky p-8 top-2 underline text-xl">
        <Link href={"/"}>&lt; Back to List</Link>
      </span>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col bg-gray-800 text-white p-8 space-y-8 rounded-xl">
          <h3 className="text-3xl italic font-bold">{result.description}</h3>
          <hr />
          {result.isAvailable && result.hasVoted && (
            <VoteResultBar
              nAgrees={result.results.nAgrees}
              nDisagrees={result.results.nDisagrees}
              nAbuses={result.results.nAbuses}
            />
          )}
          {!(result.isAvailable && result.hasVoted) && <VoteBar />}
          {!(result.isAvailable && result.hasVoted) && (
            <Button text="Vote" onClick={handleVote} />
          )}
        </div>
      </div>
    </>
  );
}

const result = {
  hasVoted: false,
  isAvailable: true,
  description: "Do you want to have rights to access the DB?",
  results: {
    nAgrees: 100,
    nDisagrees: 40,
    nAbuses: 30,
  },
};
