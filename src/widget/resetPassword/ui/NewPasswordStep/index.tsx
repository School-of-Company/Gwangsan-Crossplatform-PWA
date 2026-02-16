import { useState, useRef, useCallback } from 'react';
import { Input } from '@/shared/ui/Input';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import ResetPasswordForm from '~/entity/auth/ui/ResetPasswordForm';
import {
  useResetPasswordFormField,
  useResetPasswordStepNavigation,
} from '~/entity/auth/model/useAuthSelectors';
import { passwordSchema, passwordConfirmSchema } from '~/entity/auth/model/authSchema';
import { ZodError } from 'zod';
import { resetPassword } from '~/entity/auth/api/resetPassword';
import { useRouter } from 'expo-router';

export default function NewPasswordStep() {
  const router = useRouter();
  const { value: phoneNumber } = useResetPasswordFormField('phoneNumber');
  const { value: newPassword, updateField: updateNewPassword } =
    useResetPasswordFormField('newPassword');
  const { value: newPasswordConfirm, updateField: updateNewPasswordConfirm } =
    useResetPasswordFormField('newPasswordConfirm');
  const { resetStore } = useResetPasswordStepNavigation();
  const [localPassword, setLocalPassword] = useState<string>((newPassword as string) || '');
  const [localPasswordConfirm, setLocalPasswordConfirm] = useState<string>(
    (newPasswordConfirm as string) || ''
  );
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = useCallback(
    (text: string) => {
      setLocalPassword(text);
      if (passwordError) setPasswordError(null);
    },
    [passwordError]
  );

  const handleConfirmChange = useCallback(
    (text: string) => {
      setLocalPasswordConfirm(text);
      if (confirmError) setConfirmError(null);
    },
    [confirmError]
  );

  const handlePasswordSubmit = useCallback(() => {
    passwordConfirmRef.current?.focus();
  }, []);

  const validateAndResetPassword = useCallback(async () => {
    let hasError = false;
    try {
      passwordSchema.parse(localPassword);
      setPasswordError(null);
    } catch (err) {
      if (err instanceof ZodError) {
        setPasswordError(err.errors[0].message);
        hasError = true;
      }
    }

    try {
      passwordConfirmSchema(localPassword).parse(localPasswordConfirm);
      setConfirmError(null);
    } catch (err) {
      if (err instanceof ZodError) {
        setConfirmError(err.errors[0].message);
        hasError = true;
      }
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      await resetPassword({
        phoneNumber: phoneNumber as string,
        newPassword: localPassword,
      });

      updateNewPassword(localPassword);
      updateNewPasswordConfirm(localPasswordConfirm);

      alert('비밀번호가 성공적으로 변경되었습니다.\n새로운 비밀번호로 로그인해주세요.');
      resetStore();
      router.replace('/signin');
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    localPassword,
    localPasswordConfirm,
    phoneNumber,
    updateNewPassword,
    updateNewPasswordConfirm,
    resetStore,
  ]);

  const handleConfirmSubmit = useCallback(() => {
    if (localPassword.trim() !== '' && localPasswordConfirm.trim() !== '') {
      validateAndResetPassword();
    }
  }, [localPassword, localPasswordConfirm, validateAndResetPassword]);

  const isNextDisabled = !localPassword.trim() || !localPasswordConfirm.trim() || isLoading;

  return (
    <ResetPasswordForm
      title="새 비밀번호 설정"
      description="새로운 비밀번호를 입력해주세요"
      onNext={validateAndResetPassword}
      nextButtonText={isLoading ? '설정 중...' : '비밀번호 재설정'}
      isNextDisabled={isNextDisabled}>
      <div>
        <Input
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요"
          value={localPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlePasswordChange(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handlePasswordSubmit()
          }
          type="password"
          disabled={isLoading}
        />
        <ErrorMessage error={passwordError} />
      </div>

      <div className="mt-4">
        <Input
          ref={passwordConfirmRef}
          label="비밀번호 재입력"
          placeholder="비밀번호를 다시 입력해주세요"
          value={localPasswordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleConfirmChange(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleConfirmSubmit()
          }
          type="password"
          disabled={isLoading}
        />
        <ErrorMessage error={confirmError} />
      </div>
    </ResetPasswordForm>
  );
}
