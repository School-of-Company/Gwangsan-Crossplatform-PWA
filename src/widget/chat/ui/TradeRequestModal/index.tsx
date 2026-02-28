import React, { memo, useCallback } from 'react';
import { BottomSheetModalWrapper, Button } from '~/shared/ui';

interface TradeRequestModalProps {
  readonly isVisible: boolean;
  readonly onClose: () => void;
  readonly onTradeRequest: () => void;
  readonly onAnimationComplete?: () => void;
  readonly isLoading?: boolean;
}

const TradeRequestModalComponent: React.FC<TradeRequestModalProps> = ({
  isVisible,
  onClose,
  onTradeRequest,
  onAnimationComplete,
  isLoading = false,
}) => {
  const handleTradeRequest = useCallback(() => {
    onTradeRequest();
    onClose();
  }, [onTradeRequest, onClose]);

  return (
    <BottomSheetModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      onAnimationComplete={onAnimationComplete}
      title="거래 요청"
      height={200}>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="gap-4">
          <span className="text-center text-gray-600">이 상품에 대한 거래를 요청하시겠습니까?</span>
        </div>

        <div className="flex flex-row gap-3">
          <Button variant="secondary" onClick={onClose} width="flex-1" disabled={isLoading}>
            <span className="text-gray-700">취소</span>
          </Button>

          <Button
            variant="primary"
            onClick={handleTradeRequest}
            disabled={isLoading}
            width="flex-1">
            <span className="text-white">{isLoading ? '요청 중...' : '거래 요청하기'}</span>
          </Button>
        </div>
      </div>
    </BottomSheetModalWrapper>
  );
};

export const TradeRequestModal = memo(TradeRequestModalComponent);
TradeRequestModal.displayName = 'TradeRequestModal';
