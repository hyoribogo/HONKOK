import { snsApiClient } from '~/api';
import useUser from './useUser';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp extends SignIn {
  fullName: string;
}

const BAD_REQUEST = 400;

const useAuth = () => {
  const { clearUser, updateUser } = useUser();

  const authServerCall = async (
    urlEndpoint: string,
    authInfo: SignIn | SignUp
  ) => {
    try {
      const { data, status } = await snsApiClient.post(urlEndpoint, authInfo);

      if (status === BAD_REQUEST) {
        console.log('Unauthorized');
        return;
      }

      if ('user' in data && 'token' in data) {
        updateUser(data);
      }
    } catch {}
  };

  const signIn = async ({ email, password }: SignIn) => {
    authServerCall('/login', { email, password });
  };

  const signUp = async ({ email, fullName, password }: SignUp) => {
    authServerCall('/signup', { email, fullName, password });
  };

  const signOut = () => {
    clearUser();
  };

  return { signIn, signUp, signOut };
};

export default useAuth;