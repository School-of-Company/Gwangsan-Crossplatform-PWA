import { Button } from '@/shared/ui/Button';
import { ReactNode } from 'react';
import { useSigninStepNavigation } from '~/entity/auth/model/useAuthSelectors';
import BackArrow from '@/shared/assets/svg/BackArrow';

interface SigninFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  isNextDisabled?: boolean;
}

export default function SigninForm({
  title,
  description,
  children,
  onBack,
  onNext,
  nextButtonText = '다음',
  isNextDisabled = false,
}: SigninFormProps) {
  const { prevStep } = useSigninStepNavigation();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col gap-8 px-6">
        <button
          className="flex flex-row items-center bg-transparent pt-4"
          onClick={onBack || prevStep}>
          <BackArrow />
          <span className="ml-2 text-gray-500">뒤로</span>
        </button>

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-4 text-lg text-gray-700">{description}</p>
        </div>

        <div className="mt-8 flex-1">{children}</div>

        <Button onClick={onNext} disabled={isNextDisabled} width="w-full" className="mb-8 mt-auto">
          {nextButtonText}
        </Button>
      </div>
    </div>
  );
}
