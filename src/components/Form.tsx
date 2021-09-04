import React from 'react';

function Form({
  value,
  handleChange,
}: {
  value: string | undefined;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="p-10 card bg-base-200 col-span-4 relative">
      <div className="absolute right-3 top-2 text-2xs">
        <a
          className="link link-primary"
          target="_blank"
          href="https://github.com/Karnak19/zorroa-client/tree/ternoa-lp"
        >
          Github
        </a>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">BEP20 wallet</span>
        </label>
        <input
          type="text"
          placeholder="BEP20 address"
          className="input input-bordered"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Form;
