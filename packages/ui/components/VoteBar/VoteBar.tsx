import React from "react";

type Props = {};

export function VoteBar({}: Props) {
  return (
    <div
      className="grid w-full grid-cols-3 space-x-2 rounded-xl bg-gray-200 p-2 text-black"
      x-data="app"
    >
      <div>
        <input type="radio" name="option" id="agree" className="peer hidden" />
        <label
          htmlFor="agree"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          Agree
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="option"
          id="disagree"
          className="peer hidden"
        />
        <label
          htmlFor="disagree"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          Disagree
        </label>
      </div>

      <div>
        <input type="radio" name="option" id="abuse" className="peer hidden" />
        <label
          htmlFor="abuse"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          Abuse
        </label>
      </div>
    </div>
  );
}
