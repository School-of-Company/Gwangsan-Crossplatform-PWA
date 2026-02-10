import { AuthButtonContainer } from '~/entity/onboarding';
import { OnboardingSlideViewer } from '~/widget/onboarding';

const OnboardingPage = () => {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex flex-1">
        <div className="flex flex-7">
          <OnboardingSlideViewer />
        </div>
        <div className="flex flex-1" />
        <div className="flex flex-2">
          <AuthButtonContainer />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
