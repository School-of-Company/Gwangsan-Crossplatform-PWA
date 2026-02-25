import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import ResetPasswordForm from '~/entity/auth/ui/ResetPasswordForm';
import {
  useResetPasswordFormField,
  useResetPasswordStepNavigation,
} from '~/entity/auth/model/useAuthSelectors';
import { useResetPasswordPhoneVerification } from '~/entity/auth/model/useResetPasswordPhoneVerification';
import { useRouter } from 'expo-router';

export default function PhoneStep() {
  const router = useRouter();
  const { value: initialPhoneNumber, updateField: updatePhoneNumber } =
    useResetPasswordFormField('phoneNumber');
  const { value: initialVerificationCode, updateField: updateVerificationCode } =
    useResetPasswordFormField('verificationCode');
  const { nextStep, resetStore } = useResetPasswordStepNavigation();

  const handleBack = () => {
    resetStore();
    router.replace('/onboarding');
  };

  const handleVerificationSuccess = (phoneNumber: string, verificationCode: string) => {
    updatePhoneNumber(phoneNumber);
    updateVerificationCode(verificationCode);
    nextStep();
  };

  const {
    phoneNumber,
    verificationCode,
    phoneError,
    verificationError,
    verificationState,
    handlePhoneChange,
    handleVerificationChange,
    handlePhoneSubmit,
    handleVerificationSubmit,
    requestVerification,
    verifyCode,
    buttonState,
    isVerificationComplete,
    verificationRef,
  } = useResetPasswordPhoneVerification({
    initialPhoneNumber: initialPhoneNumber as string,
    initialVerificationCode: initialVerificationCode as string,
    onSuccess: handleVerificationSuccess,
  });

  return (
    <ResetPasswordForm
      title="비밀번호 재설정"
      description="가입 시 등록한 전화번호를 입력해주세요"
      onNext={verifyCode}
      onBack={handleBack}
      isNextDisabled={!isVerificationComplete}>
      <div>
        <div className="flex flex-row items-end gap-2">
          <div className="flex-1">
            <Input
              label="전화번호"
              placeholder="전화번호를 입력해주세요"
              value={phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePhoneChange(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' && handlePhoneSubmit()
              }
              type="tel"
              maxLength={11}
              disabled={verificationState.isSendingCode}
            />
          </div>
          <Button
            className={`h-16 items-center justify-center rounded-xl px-8 ${
              buttonState.canSend ? 'bg-[#8FC31D]' : 'bg-gray-300'
            }`}
            onClick={requestVerification}
            disabled={buttonState.isDisabled}>
            <span className="font-medium text-white">{buttonState.text}</span>
          </Button>
        </div>
        <ErrorMessage error={phoneError} />
      </div>

      {verificationState.isVerifying && (
        <div className="mt-4">
          <Input
            ref={verificationRef}
            label="전화번호 인증"
            placeholder="인증번호를 입력해주세요"
            value={verificationCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleVerificationChange(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && handleVerificationSubmit()
            }
            type="tel"
            disabled={verificationState.isVerifyingCode}
            maxLength={6}
          />
          <ErrorMessage error={verificationError} />
        </div>
      )}
    </ResetPasswordForm>
  );
}
