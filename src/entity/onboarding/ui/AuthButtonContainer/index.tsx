import { Button } from '~/shared/ui/Button';
import { router, Link } from 'expo-router';

const AuthButtonContainer = () => {
  return (
    <div className="flex flex-col gap-3 px-6">
      <Button onClick={() => router.push('/signin')}>로그인</Button>
      <Button variant="secondary" onClick={() => router.push('/signup')}>
        회원가입
      </Button>
      <Link href="/resetPassword" className="text-center text-sm text-gray-500 underline">
        비밀번호 변경하기
      </Link>
    </div>
  );
};

export default AuthButtonContainer;
