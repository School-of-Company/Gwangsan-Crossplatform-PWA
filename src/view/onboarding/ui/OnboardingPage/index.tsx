import { AuthButtonContainer } from '~/entity/onboarding';
import { OnboardingSlideViewer } from '~/widget/onboarding';

const OnboardingPage = () => {
  return (
    <div className="flex h-dvh w-full flex-1 flex-col bg-white">
      <div className="flex flex-1 flex-col">
        <div className="flex-[7]">
          <OnboardingSlideViewer />
        </div>
        <div className="flex-1" />
        <div className="flex-none">
          <AuthButtonContainer />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
