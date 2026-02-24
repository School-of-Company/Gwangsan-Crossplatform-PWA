import { Button } from '@/shared/ui/Button';
import { ReactNode, memo } from 'react';
import { useResetPasswordStepNavigation } from '~/entity/auth/model/useAuthSelectors';
import BackArrow from '@/shared/assets/svg/BackArrow';

interface ResetPasswordFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  isNextDisabled?: boolean;
}

function ResetPasswordForm({
  title,
  description,
  children,
  onBack,
  onNext,
  nextButtonText = '다음',
  isNextDisabled = false,
}: ResetPasswordFormProps) {
  const { prevStep } = useResetPasswordStepNavigation();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6">
        <div className="flex flex-row items-center pt-4">
          <button
            className="flex flex-row items-center bg-transparent"
            onClick={onBack || prevStep}>
            <BackArrow />
            <span className="ml-2 text-gray-500">뒤로</span>
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-4 text-lg text-gray-700">{description}</p>
        </div>

        <div className="mt-8 flex-1">{children}</div>

        <div className="mb-8 mt-auto">
          <Button onClick={onNext} disabled={isNextDisabled} width="w-full">
            {nextButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ResetPasswordForm);
