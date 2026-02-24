import { Button } from '~/shared/ui/Button';

interface LastStepButtonProps {
  onEditPress: () => void;
  onCompletePress: () => void;
  disabled?: boolean;
  buttonText?: string;
}

const LastStepButton = ({
  onEditPress,
  onCompletePress,
  disabled = false,
  buttonText = '완료',
}: LastStepButtonProps) => (
  <div className="flex flex-row gap-6 px-6 pt-16">
    <div className="flex-1">
      <Button onClick={onEditPress} disabled={disabled}>
        수정
      </Button>
    </div>
    <div className="flex-1">
      <Button variant="secondary" onClick={onCompletePress} disabled={disabled}>
        {buttonText}
      </Button>
    </div>
  </div>
);

export default LastStepButton;
