import React, { memo, useCallback, useState } from 'react';
import { Card, Button } from '~/shared/ui';
import type { TradeProduct } from '~/entity/chat/model/chatTypes';

export interface TradeEmbedProps {
  readonly product: TradeProduct;
  readonly onTradeAccept?: () => Promise<void>;
  readonly onReservation?: () => void;
  readonly onCancelReservation?: () => void;
  readonly showButtons?: boolean;
  readonly isLoading?: boolean;
  readonly requestorNickname?: string;
  readonly alignment?: 'left' | 'right';
  readonly onReviewButtonPress?: () => void;
  readonly showReviewButton?: boolean;
}

const TradeEmbedComponent: React.FC<TradeEmbedProps> = ({
  product,
  onTradeAccept,
  onReservation,
  onCancelReservation,
  showButtons = false,
  isLoading = false,
  requestorNickname = '상대방',
  alignment = 'left',
  onReviewButtonPress,
  showReviewButton = false,
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const handleTradeAccept = useCallback(async () => {
    if (!onTradeAccept || localLoading || isLoading) return;

    try {
      setLocalLoading(true);
      await onTradeAccept();
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  }, [onTradeAccept, localLoading, isLoading]);

  const handleReservation = useCallback(async () => {
    if (!onReservation || localLoading || isLoading) return;

    try {
      setLocalLoading(true);
      await onReservation();
      setIsReserved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  }, [onReservation, localLoading, isLoading]);

  const handleCancelReservation = useCallback(async () => {
    if (!onCancelReservation || localLoading || isLoading) return;

    try {
      setLocalLoading(true);
      await onCancelReservation();
      setIsReserved(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  }, [onCancelReservation, localLoading, isLoading]);

  const productImage = product.images[0] ?? null;

  const alignmentClass = alignment === 'right' ? 'self-end' : 'self-start';

  return (
    <div className={`mb-4 flex flex-col ${alignmentClass}`}>
      <Card variant="default" padding="none" className="overflow-hidden">
        {productImage && (
        <div className="p-4">
          <div className="mb-3 h-20 w-20 overflow-hidden rounded-lg relative">
            <img
              src={productImage.imageUrl}
              alt="product"
              className="h-full w-full object-cover"
            />
            {product.images.length > 1 && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-black bg-opacity-60">
                <span className="text-xs font-bold text-white">+{product.images.length - 1}</span>
              </div>
            )}
          </div>
        </div>
        )}

        <div className="p-4">
          <p className="mb-2 text-lg font-bold text-gray-900 truncate">
            {product.title}
          </p>
          <p className="mb-4 text-sm text-gray-600">
            {product.isCompleted
              ? '거래가 완료되었습니다'
              : `${requestorNickname}님께서 거래하기를 누르셨습니다`}
          </p>
          {showReviewButton && product.isCompleted && (
            <Button
              variant="primary"
              onClick={onReviewButtonPress}
              width="w-full"
              style={{ minHeight: 40 }}>
              리뷰 작성하기
            </Button>
          )}
          {showButtons && !product.isCompleted && (
            <div className="flex flex-row justify-between gap-2">
              {isReserved ? (
                <Button
                  variant="secondary"
                  onClick={handleCancelReservation}
                  disabled={localLoading || isLoading}
                  width="w-[48%]"
                  style={{ minHeight: 40 }}>
                  {localLoading || isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8FC31D] border-t-transparent" />
                  ) : (
                    '예약 취소'
                  )}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleReservation}
                  disabled={localLoading || isLoading}
                  width="w-[48%]"
                  style={{ minHeight: 40 }}>
                  {localLoading || isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8FC31D] border-t-transparent" />
                  ) : (
                    '예약하기'
                  )}
                </Button>
              )}

              <Button
                variant="primary"
                onClick={handleTradeAccept}
                disabled={localLoading || isLoading}
                width="w-[48%]"
                style={{ minHeight: 40 }}>
                {localLoading || isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  '거래 완료하기'
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export const TradeEmbed = memo(TradeEmbedComponent);
TradeEmbed.displayName = 'TradeEmbed';
