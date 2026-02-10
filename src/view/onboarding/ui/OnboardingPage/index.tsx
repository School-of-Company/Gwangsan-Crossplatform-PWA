import { AuthButtonContainer } from '~/entity/onboarding';
import { OnboardingSlideViewer } from '~/widget/onboarding';

const OnboardingPage = () => {
  return (
    <div className="flex-1 bg-white">
      <div className="flex-1">
        <div className="flex-7">
          <OnboardingSlideViewer />
        </div>
        <div className="flex-1" />
        <div className="flex-2">
          <AuthButtonContainer />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
