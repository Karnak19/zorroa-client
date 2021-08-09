import { LoginWithMagicLinkConfiguration } from 'magic-sdk';
import { useEffect } from 'react';
import { useMagicContext } from '../context/magic';
import magic from '../magic';

const useMagic = () => {
  const magicCtx = useMagicContext();
  const login = async (config: LoginWithMagicLinkConfiguration) => {
    await magic.auth.loginWithMagicLink(config);
  };

  useEffect(() => {
    const init = async () => {
      if (await magic.user.isLoggedIn()) magicCtx.setState(await magic.user.getMetadata());
      else login({ email: 'basile64.v@gmail.com' });
    };

    init();
  }, []);

  return { login, user: magic.user };
};

export default useMagic;
