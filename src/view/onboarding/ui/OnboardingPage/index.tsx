import { AuthButtonContainer } from '~/entity/onboarding';
import { OnboardingSlideViewer } from '~/widget/onboarding';

const OnboardingPage = () => {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex flex-1 flex-col">
        <div className="flex-7 flex">
          <OnboardingSlideViewer />
        </div>
        <div className="flex flex-1" />
        <div className="flex-2 flex">
          <AuthButtonContainer />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
