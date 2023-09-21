import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOffIcon, EyeOnIcon } from '~/assets';
import { Input, Button } from '~/components/common';
import { useAuth } from '~/hooks';
import { isValidEmail, isValidPassword, isValidSignIn } from '~/utils';
interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm = ({ handleClose }: LoginFormProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: false,
    password: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**
    로그인 처리 로직 예시:
    API 호출 또는 상태 업데이트 등
    로그인 성공 시 onSubmit을 호출하여 모달을 닫을 수 있음
    */
    await signIn({ email, password });
    handleClose();
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: true
    }));
  };

  return (
    <form
      className="flex h-full w-full flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <div className="mb-1 p-3 text-2xl font-semibold">로그인</div>
      <Input
        onBlur={handleBlur}
        className="mb-1 w-full"
        type="email"
        value={email}
        name="email"
        placeholder="이메일을 입력해주세요."
        onChange={handleChangeEmail}
      />
      <div className="mb-2 mt-[0.12rem] pl-[0.44rem] text-[0.75rem]">
        {form.email &&
          (isValidEmail(email) ? (
            <span className="text-sub-green">올바른 아이디입니다 :)</span>
          ) : (
            <span className="whitespace-pre-line text-sub-red">
              이메일 형식을 바르게 입력해 주세요. {'\n'} 예)honkok@example.kr
            </span>
          ))}
      </div>
      <div className="relative">
        <Input
          onBlur={handleBlur}
          name="password"
          className="mb-1 w-full"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChangePassword}
        />
        <Button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 cs:p-0"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
        </Button>
      </div>
      <div className="mb-2 mt-[0.12rem] pl-[0.44rem] text-[0.75rem]">
        {form.password &&
          (isValidPassword(password) ? (
            <span className="text-sub-green">알맞은 비밀번호입니다 :)</span>
          ) : (
            <span className="whitespace-pre-line text-sub-red">
              비밀번호 형식을 바르게 입력해 주세요. {'\n'} 영문, 숫자 조합 8글자
              이상
            </span>
          ))}
      </div>
      <Button
        theme="main"
        className="mb-2 w-full rounded-[0.625rem] text-lg disabled:opacity-30"
        disabled={!isValidSignIn({ email, password })}
      >
        로그인
      </Button>
      <Button
        type="button"
        className="inline-block self-end text-sm"
        onClick={handleSignUp}
      >
        회원가입
      </Button>
    </form>
  );
};

export default LoginForm;