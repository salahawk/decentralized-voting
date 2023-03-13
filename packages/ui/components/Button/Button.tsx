import { EventHandler } from "react";

type Props = {
  text: string;
  onClick: Function;
};

export const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className="text-xl bg-transparent hover:text-xl"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
