import { Button } from '~/shared/ui/Button';
import { router } from 'expo-router';

const AuthButtonContainer = () => {
  return (
    <div className="flex flex-col gap-3 px-6">
      <Button onPress={() => router.push('/signin')}>로그인</Button>
      <Button variant="secondary" onPress={() => router.push('/signup')}>
        회원가입
      </Button>
      <button
        className="text-center text-sm text-gray-500 underline"
        onClick={() => router.push('/resetPassword')}>
        비밀번호 변경하기
      </button>
    </div>
  );
};

export default AuthButtonContainer;
