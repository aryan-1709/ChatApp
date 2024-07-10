import * as React from "react";
import Dropdown from "../pages/Dropdown";

function DashBoard({email, name}) {
  return (
    <div className="flex gap-5 justify-between py-1 pr-20 pl-6 bg-slate-300 border border-solid border-slate-950 max-md:flex-wrap max-md:px-5">
      <div className="mt-3">
        <Dropdown />
      </div>

      <div className="flex gap-3 whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6aa4e78a2e90e1f26c4fee0acaea9372910782940594493ce1a6dfd1de9e56d5?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
          alt="Not found"
          className="shrink-0 aspect-[1.11] w-[67px]"
        />
        <div className="flex gap-3.5 my-auto">
          <div className="flex flex-col flex-1 justify-center my-auto">
            <div className="self-end text-base font-semibold text-right text-slate-950">
              {name}
            </div>
            <div className="flex gap-1 text-sm text-center text-zinc-500">
              <div className="grow">{email}</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1154ee703093123e1a47296595a665e031bcb079640e4014b549efe912b4c7d0?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
                alt="Not found"
                className="shrink-0 my-auto aspect-square w-[15px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { DashBoard};
