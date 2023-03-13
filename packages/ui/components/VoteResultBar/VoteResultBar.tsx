import React from "react";

type Props = {
  nAgrees: number;
  nDisagrees: number;
  nAbuses: number;
};

export function VoteResultBar({ nAgrees, nDisagrees, nAbuses }: Props) {
  const nTotal = nAgrees + nDisagrees + nAbuses;
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4 w-full">
        <div className="w-20">Agree</div>
        <div className="flex flex-grow bg-gray-800 rounded-md dark:bg-gray-700">
          <div
            className="bg-gray-200 text-xs font-medium text-black text-center p-0.5 leading-none rounded-md align-middle"
            style={{ width: `${(nAgrees * 100) / nTotal}%` }}
          >
            {nAgrees} ({((nAgrees * 100) / nTotal).toFixed(2)} %)
          </div>
        </div>
      </div>
      <div className="flex space-x-4 w-full">
        <div className="w-20">Disagree</div>
        <div className="flex flex-grow bg-gray-800 rounded-md dark:bg-gray-700">
          <div
            className="bg-gray-200 text-xs font-medium text-black text-center p-0.5 leading-none rounded-md align-middle"
            style={{ width: `${(nDisagrees * 100) / nTotal}%` }}
          >
            {nDisagrees} ({((nDisagrees * 100) / nTotal).toFixed(2)} %)
          </div>
        </div>
      </div>
      <div className="flex space-x-4 w-full">
        <div className="w-20">Abuse</div>
        <div className="flex flex-grow bg-gray-800 rounded-md dark:bg-gray-700">
          <div
            className="bg-gray-200 text-xs font-medium text-black text-center p-0.5 leading-none rounded-md align-middle"
            style={{ width: `${(nAbuses * 100) / nTotal}%` }}
          >
            {nAbuses} ({((nAbuses * 100) / nTotal).toFixed(2)} %)
          </div>
        </div>
      </div>
    </div>
  );
}
