import * as React from "react";

function LeftPannel() {
  return (
    <div className="flex flex-col px-6 pt-6 pb-10 text-base bg-white border border-solid border-slate-950 max-w-[233px]">
      <div className="justify-center pt-5 pr-16 pb-2.5 pl-5 text-4xl font-extrabold text-white whitespace-nowrap bg-rose-500">
        logo
      </div>
      <div className="flex flex-col justify-center px-5 py-3 mt-8 w-full tracking-tight rounded bg-slate-950 leading-[150%] text-slate-50">
        <div className="flex gap-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/31c90fcc51d9824f7de849ce9360762f9009d78347bf5b7237457c64f0abe037?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 w-6 aspect-square"
          />
          <div className="flex-auto">My Properties</div>
        </div>
      </div>
      <div className="flex flex-col pr-14 pl-5 mt-8 tracking-tight whitespace-nowrap leading-[150%] text-slate-500">
        <div className="flex gap-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8f93dd84a811cf7ed80292d6ec0f4ef28075eb167d1b79a7e02175f6fe88386?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 w-6 aspect-square"
          />
          <div>Rentals</div>
        </div>
        <div className="flex gap-5 mt-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0aa6670ad9ba47d7ac02e68100411702f9b653f4eaa0b4b1fbf1f9a9381b8b82?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 w-6 aspect-square"
          />
          <div>Archived</div>
        </div>
        <div className="flex gap-5 mt-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/335dc9fb1ff46fecab8789860889a08cc1a8b7cfdf872fbb4450233a8d99a99a?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 w-6 aspect-square"
          />
          <div>Tenants</div>
        </div>
        <div className="flex gap-5 mt-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00cfee6a8f68090bbb35bf1f974c996ed67bf618f31986aab3252464fb582116?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 w-6 aspect-square"
          />
          <div>Message</div>
        </div>
      </div>
      <div className="flex gap-1 justify-center self-center px-2.5 py-2 mt-96 text-sm text-center whitespace-nowrap rounded border border-solid shadow-sm bg-slate-50 border-slate-700">
        <div className="flex gap-1.5 my-auto text-slate-950">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/643eb2f34d242fb76c4c845c9e163605b5d763b5d9bbb020ae6e7beddfa4322a?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
            alt="Not found"
            className="shrink-0 self-start w-4 aspect-square"
          />
          <div>Invite</div>
        </div>
        <div className="flex flex-col flex-1 justify-center px-1.5 py-2.5 rounded bg-slate-950 text-slate-50">
          <div className="flex gap-1 justify-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ed7b050e760da86f7d7ab301edc3027f0bfaa49a742745bd33f8066997e9e8c?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
              alt="Not found"
              className="shrink-0 self-start w-4 aspect-square"
            />
            <div className="grow">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPannel;


