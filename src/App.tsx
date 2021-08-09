import React, { useEffect, useState } from 'react';
import useMagic from './hooks/useMagic';

function App() {
  const [state, setState] = useState<any>(null);
  const { login, user } = useMagic();

  useEffect(() => {
    const init = async () => {
      if (await user.isLoggedIn()) setState(await user.getMetadata());
      else login({ email: 'basile64.v@gmail.com' });
    };

    init();
  }, []);

  return (
    <div className="grid place-items-center min-h-screen">
      <button
        onClick={() => login({ email: 'basile64.v@gmail.com' })}
        className="bg-gradient-to-br from-indigo-500 to-purple-500 px-5 py-2 text-2xl rounded"
      >
        login
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
