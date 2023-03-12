import React from "react";
import Proposal from "./Proposal";

type Props = {
  proposals: Array<any>;
};

export function Proposals({ proposals }: Props) {
  return (
    <ul className="list-none">
      {proposals.map((proposal, index) => (
        <li className="p-2 border border-dotted" key={index}>
          <Proposal
            description={proposal.description}
            id={proposal.id}
          ></Proposal>
        </li>
      ))}
    </ul>
  );
}
