import { useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import SignupForm from '~/entity/auth/ui/SignupForm';
import { useSignupFormField, useSignupStepNavigation } from '~/entity/auth/model/useAuthSelectors';
import { passwordSchema, passwordConfirmSchema } from '~/entity/auth/model/authSchema';
import { ZodError } from 'zod';

export default function PasswordStep() {
  const { value: initialPassword, updateField: updatePassword } = useSignupFormField('password');
  const { value: initialPasswordConfirm, updateField: updatePasswordConfirm } =
    useSignupFormField('passwordConfirm');
  const { nextStep } = useSignupStepNavigation();

  const [password, setPassword] = useState<string | undefined>(initialPassword as string);
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>(
    initialPasswordConfirm as string
  );
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const validateAndNext = () => {
    let hasError = false;

    try {
      passwordSchema.parse(password);
      setPasswordError(null);
    } catch (err) {
      if (err instanceof ZodError) {
        setPasswordError(err.errors[0].message);
        hasError = true;
      }
    }

    try {
      passwordConfirmSchema(password as string).parse(passwordConfirm as string);
      setConfirmError(null);
    } catch (err) {
      if (err instanceof ZodError) {
        setConfirmError(err.errors[0].message);
        hasError = true;
      }
    }

    if (!hasError) {
      updatePassword(password);
      updatePasswordConfirm(passwordConfirm);
      nextStep();
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError(null);
  };

  const handleConfirmChange = (text: string) => {
    setPasswordConfirm(text);
    if (confirmError) setConfirmError(null);
  };

  const handleConfirmSubmit = () => {
    if (password?.trim() !== '' && passwordConfirm?.trim() !== '') {
      validateAndNext();
    }
  };

  return (
    <SignupForm
      title="회원가입"
      description="비밀번호를 입력해주세요"
      onNext={validateAndNext}
      isNextDisabled={password?.trim() === '' || passwordConfirm?.trim() === ''}>
      <div>
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={password as string}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          returnKeyType="next"
        />
        <ErrorMessage error={passwordError} />
      </div>

      <div className="mt-4">
        <Input
          label="비밀번호 재입력"
          placeholder="비밀번호를 다시 입력해주세요"
          value={passwordConfirm as string}
          onChangeText={handleConfirmChange}
          onSubmitEditing={handleConfirmSubmit}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <ErrorMessage error={confirmError} />
      </div>
    </SignupForm>
  );
}
