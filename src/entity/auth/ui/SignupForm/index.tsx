import { Button } from '@/shared/ui/Button';
import { ReactNode } from 'react';
import { useSignupStepNavigation } from '~/entity/auth/model/useAuthSelectors';
import BackArrow from '@/shared/assets/svg/BackArrow';

interface SignupFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  isNextDisabled?: boolean;
}

export default function SignupForm({
  title,
  description,
  children,
  onBack,
  onNext,
  nextButtonText = '다음',
  isNextDisabled = false,
}: SignupFormProps) {
  const { prevStep } = useSignupStepNavigation();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col gap-8 px-6">
        <div className="flex flex-row items-center pt-4">
          <button className="flex flex-row items-center" onClick={onBack || prevStep}>
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
          <Button onPress={onNext} disabled={isNextDisabled}>
            {nextButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
