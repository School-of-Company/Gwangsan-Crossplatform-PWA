import { useMemo, useCallback, memo, useState, useEffect } from 'react';
import { TextField } from '~/shared/ui/TextField';
import { Button } from '~/shared/ui/Button';
import { BottomSheetModalWrapper, ProgressBar } from '~/shared/ui';

interface ReviewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (type: number, contents: string) => void;
  light: number;
  setLight: (v: number) => void;
  contents: string;
  onContentsChange: (contents: string) => void;
  onAnimationComplete?: () => void;
}

const ReviewsModal = ({
  isVisible,
  onClose,
  onSubmit,
  light,
  setLight,
  contents,
  onContentsChange,
  onAnimationComplete,
}: ReviewsModalProps) => {
  const [localLight, setLocalLight] = useState(light);
  const [localContents, setLocalContents] = useState(contents);

  useEffect(() => {
    setLocalLight(light);
  }, [light]);

  useEffect(() => {
    setLocalContents(contents);
  }, [contents]);

  const isDisabled = useMemo(() => localContents.trim().length === 0, [localContents]);

  const handleSubmit = useCallback(() => {
    if (localContents.trim()) {
      setLight(localLight);
      onSubmit(localLight, localContents.trim());
      onClose();
    }
  }, [localContents, localLight, onSubmit, onClose, setLight]);

  const handleLightChange = useCallback((value: number) => {
    setLocalLight(value);
  }, []);

  const handleContentsChange = useCallback((text: string) => {
    setLocalContents(text);
  }, []);

  return (
    <BottomSheetModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      onAnimationComplete={onAnimationComplete}
      title="후기 작성">
      <div className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-8">
          <ProgressBar value={localLight} onChange={handleLightChange} />
          <TextField
            label="후기 작성"
            placeholder="거래의 후기를 입력해주세요"
            value={localContents}
            onChange={(e) => handleContentsChange(e.target.value)}
          />
        </div>
        <Button disabled={isDisabled} onClick={handleSubmit}>
          작성완료
        </Button>
      </div>
    </BottomSheetModalWrapper>
  );
};

export default memo(ReviewsModal);
