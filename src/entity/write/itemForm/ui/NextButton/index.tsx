import { Button } from '~/shared/ui/Button';

interface NextButtonProps {
  disabled: boolean;
  onPress: () => void;
}

const NextButton = ({ disabled, onPress }: NextButtonProps) => (
  <div className="px-6">
    <Button disabled={disabled} onClick={onPress}>
      다음
    </Button>
  </div>
);

export default NextButton;
