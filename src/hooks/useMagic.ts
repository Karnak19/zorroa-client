import { useMagicContext } from '../context/magic';
import magic from '../magic';

export default function useMagic() {
  const { setState } = useMagicContext();

  const reauth = async () => {
    if (await magic.user.isLoggedIn()) {
      const token = await magic.user.getIdToken();
      setState(token);
      localStorage.setItem('MAGIC_TOKEN', token);
    }
  };

  return {
    reauth,
  };
}
