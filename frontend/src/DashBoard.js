import * as React from "react";

function DashBoard() {
  return (
    <div className="flex gap-5 justify-between py-1 pr-20 pl-6 bg-white border border-solid border-slate-950 max-md:flex-wrap max-md:px-5">
      <div className="flex gap-5 justify-between text-sm text-neutral-400 max-md:flex-wrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/786bf8f8989cb8ba64bc360d39b989b83e32694c5d3cd729357395843a10b94e?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
          alt="Not found"
          className="shrink-0 my-auto w-6 aspect-square"
        />
        <div className="flex flex-col grow shrink-0 justify-center basis-0 w-fit">
        </div>
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
              Abednego
            </div>
            <div className="flex gap-1 text-sm text-center text-zinc-500">
              <div className="grow">Property Owner</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1154ee703093123e1a47296595a665e031bcb079640e4014b549efe912b4c7d0?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
                alt="Not found"
                className="shrink-0 my-auto aspect-square w-[15px]"
              />
            </div>
          </div>
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1bb3252744325191acf1abb38dc4a3c6bc598fd097206f16f9099ac78526d5d?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 w-12 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}


export default DashBoard;