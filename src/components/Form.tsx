import React from 'react';
import Card from './commons/Card';

function Form({
  value,
  handleChange,
}: {
  value: string | undefined;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Card grid="col-span-4" className="relative">
      <div className="absolute right-3 top-2 text-2xs text-purple-600 underline hover:text-purple-400">
        <a
          className="link link-primary"
          target="_blank"
          href="https://github.com/Karnak19/zorroa-client/tree/ternoa-lp"
        >
          Github
        </a>
      </div>
      <div className="flex flex-col p-10">
        <label className="flex items-center justify-between px-1 py-2">
          <span className="text-sm">BEP20 wallet</span>
        </label>
        <input
          type="text"
          placeholder="BEP20 address"
          className="flex-shrink text-sm bg-pink-900 bg-opacity-20 border-black transition px-4 py-3 rounded-md max-w-lg"
          value={value}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
}

export default Form;
