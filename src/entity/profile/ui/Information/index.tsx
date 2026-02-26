import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import defaultProfile from '~/shared/assets/png/defaultProfile.png';
import { useSignout, useWithdrawal } from '~/entity/auth';
import { BottomSheetModalWrapper } from '~/shared/ui';

interface InformationProps {
  name?: string;
  id?: number;
  isMe: boolean;
}

export default function Information({ name, id, isMe }: InformationProps) {
  const R = useRouter();
  const { signout: handleSignout, isLoading: isSignoutLoading } = useSignout();
  const { withdrawal: handleWithdrawal, isLoading: isWithdrawalLoading } = useWithdrawal();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleEditProfile = useCallback(() => {
    R.push(`/profile/${id}/edit`);
  }, [R, id]);

  const handleLogoutIconPress = useCallback(() => {
    setIsBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
  }, []);

  const handleLogoutPress = useCallback(() => {
    handleSignout();
    setIsBottomSheetVisible(false);
  }, [handleSignout]);

  const handleWithdrawalPress = useCallback(() => {
    handleWithdrawal();
    setIsBottomSheetVisible(false);
  }, [handleWithdrawal]);

  return (
    <>
      <div className="mb-3 flex flex-row justify-between bg-white p-6">
        <div className="flex flex-row items-center gap-4">
          <img
            src={defaultProfile.uri}
            alt="프로필"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex flex-row items-center gap-2">
            <span className="text-body1">{name ?? '사용자'}</span>
            {isMe && (
              <button
                onClick={handleLogoutIconPress}
                className="flex items-center justify-center"
                disabled={isSignoutLoading || isWithdrawalLoading}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#DF454A">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {isMe ? (
          <button
            onClick={handleEditProfile}
            className="flex items-center justify-center rounded-[30px] border border-main-500 px-4 py-[10px]">
            <span className="text-main-500">내 정보 수정</span>
          </button>
        ) : (
          <button className="flex justify-center rounded-[30px] px-4 py-[10px]"></button>
        )}
      </div>

      <BottomSheetModalWrapper
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        title=""
        hasHeader={false}
        height={270}>
        <div className="flex flex-col gap-8">
          <button
            onClick={handleLogoutPress}
            disabled={isSignoutLoading || isWithdrawalLoading}
            className="flex items-center justify-center py-4">
            <span className="text-lg text-red-500">
              {isSignoutLoading ? '로그아웃 중...' : '로그아웃'}
            </span>
          </button>

          <button
            onClick={handleWithdrawalPress}
            disabled={isSignoutLoading || isWithdrawalLoading}
            className="flex items-center justify-center py-4">
            <span className="text-lg text-red-500">
              {isWithdrawalLoading ? '회원탈퇴 중...' : '회원탈퇴'}
            </span>
          </button>

          <button
            onClick={handleCloseBottomSheet}
            disabled={isSignoutLoading || isWithdrawalLoading}
            className="flex items-center justify-center py-4">
            <span className="text-lg text-gray-700">취소</span>
          </button>
        </div>
      </BottomSheetModalWrapper>
    </>
  );
}
