import Link from "next/link";
import React from "react";

type Props = {
  description: string;
  id: string;
};

export default function Proposal({ description, id }: Props) {
  return <Link href={`/${id}`}>{description}</Link>;
}
