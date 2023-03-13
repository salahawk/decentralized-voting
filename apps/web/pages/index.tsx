import Head from "next/head";
import { useState } from "react";
import { Header, Proposals } from "ui";
import { useHelloQuery } from "../src/store/services/api";

export default function Web() {
  const [description, setDescription] = useState("");
  const [proposals, setProposals] = useState([
    {
      description: "hello1",
      id: "3423743-5-23-4--34234234-3234",
    },
    {
      description: "hello2",
      id: "3423743-5--234-2-34234234-3234",
    },
    {
      description: "hello3",
      id: "3423743-5-23-4-234-2-34234234",
    },
    {
      description: "hello1",
      id: "3423743-5-23-4--34234234-3234",
    },
    {
      description: "hello2",
      id: "3423743-5--234-2-34234234-3234",
    },
    {
      description: "hello3",
      id: "3423743-5-23-4-234-2-34234234",
    },
    {
      description: "hello1",
      id: "3423743-5-23-4--34234234-3234",
    },
    {
      description: "hello2",
      id: "3423743-5--234-2-34234234-3234",
    },
    {
      description: "hello3",
      id: "3423743-5-23-4-234-2-34234234",
    },
    {
      description: "hello1",
      id: "3423743-5-23-4--34234234-3234",
    },
    {
      description: "hello2",
      id: "3423743-5--234-2-34234234-3234",
    },
    {
      description: "hello3",
      id: "3423743-5-23-4-234-2-34234234",
    },
    {
      description: "hello1",
      id: "3423743-5-23-4--34234234-3234",
    },
    {
      description: "hello2",
      id: "3423743-5--234-2-34234234-3234",
    },
    {
      description: "hello3",
      id: "3423743-5-23-4-234-2-34234234",
    },
    {
      description: "hello1",
      id: "3423743-5-23-4--34234234-3234",
    },
    {
      description: "hello2",
      id: "3423743-5--234-2-34234234-3234",
    },
    {
      description: "hello3",
      id: "3423743-5-23-4-234-2-34234234",
    },
  ]);

  const handleAdd = async () => {
    if (description.length === 0) return;
    setProposals((prev) => [
      {
        description,
        id: "fwewe-5-23-4--34234234-3234",
      },
      ...prev,
    ]);
  };

  return (
    <div className="bg-gray-800 text-white h-screen overflow-y-scroll">
      <Head>
        <title>Simple Voting System @Optic</title>
      </Head>
      <Header />
      <main className="flex flex-col w-full space-y-6 p-8 text-center text-xl">
        <div className="flex space-x-8 text-center align-middle justify-center">
          <input
            className="bg-transparent border-b-2 outline-none p-1 w-full"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <button className="border p-4 min-w-fit" onClick={handleAdd}>
            Add Proposal
          </button>
        </div>
        <Proposals proposals={proposals} />
      </main>
    </div>
  );
}
