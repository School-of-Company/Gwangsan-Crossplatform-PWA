import { useMutation } from '@tanstack/react-query';
import { useCallback, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { report, type ReportRequest } from '../api/report';
import { REPORT_TYPE_MAP } from './reportType';
import type { ImageUploadState } from '@/shared/ui/ImageUploader';

interface UseReportParams {
  productId?: number;
  memberId?: number;
  onSuccess?: () => void;
}

interface ReportFormState {
  reportType: keyof typeof REPORT_TYPE_MAP | null;
  contents: string;
  imageIds: number[];
  imageUploadState?: ImageUploadState;
}

export const useReport = ({ productId, memberId, onSuccess }: UseReportParams) => {
  const [formState, setFormState] = useState<ReportFormState>({
    reportType: null,
    contents: '',
    imageIds: [],
  });

  const reportMutation = useMutation({
    mutationFn: (data: ReportRequest) => report(data),
    onSuccess: () => {
      toast.success('신고가 성공적으로 접수되었습니다.');
      resetForm();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '신고 처리 중 오류가 발생했습니다.');
    },
  });

  const resetForm = useCallback(() => {
    setFormState({
      reportType: null,
      contents: '',
      imageIds: [],
    });
  }, []);

  const setReportType = useCallback((reportType: keyof typeof REPORT_TYPE_MAP | null) => {
    setFormState((prev) => ({ ...prev, reportType }));
  }, []);

  const setContents = useCallback((contents: string) => {
    setFormState((prev) => ({ ...prev, contents }));
  }, []);

  const setImageIds = useCallback((imageIds: number[]) => {
    setFormState((prev) => ({ ...prev, imageIds }));
  }, []);

  const setImageUploadState = useCallback((imageUploadState: ImageUploadState) => {
    setFormState((prev) => ({ ...prev, imageUploadState }));
  }, []);

  const canSubmit = useMemo(() => {
    const { reportType, contents, imageUploadState } = formState;

    if (!reportType || !contents.trim()) return false;

    const reportTypeValue = reportType ? REPORT_TYPE_MAP[reportType] : undefined;
    if (!reportTypeValue) return false;

    if (reportTypeValue === 'FRAUD' && !productId) return false;
    if (reportTypeValue !== 'FRAUD' && !memberId) return false;

    if (imageUploadState) {
      if (imageUploadState.hasUploadingImages || imageUploadState.hasFailedImages) {
        return false;
      }
    }

    return true;
  }, [formState, productId, memberId]);

  const handleSubmit = useCallback(
    (type: string, reason: string) => {
      const reportTypeKey = type as keyof typeof REPORT_TYPE_MAP;
      if (!reportTypeKey) {
        toast.error('올바른 신고 유형을 선택해주세요.');
        return;
      }

      if (formState.imageUploadState?.hasUploadingImages) {
        toast.error('이미지 업로드가 완료될 때까지 기다려주세요.');
        return;
      }

      if (formState.imageUploadState?.hasFailedImages) {
        toast.error('이미지 업로드 실패');
        return;
      }

      if (reportTypeKey === 'FRAUD' && productId) {
        reportMutation.mutate({
          reportType: 'FRAUD',
          productId,
          content: reason,
          imageIds: formState.imageIds,
        });
      } else if (reportTypeKey !== 'FRAUD' && memberId) {
        reportMutation.mutate({
          reportType: reportTypeKey as 'BAD_LANGUAGE' | 'MEMBER' | 'ETC',
          memberId,
          content: reason,
          imageIds: formState.imageIds,
        });
      } else {
        toast.error('신고 실패');
      }
    },
    [reportMutation, formState, productId, memberId]
  );

  return {
    reportType: formState.reportType,
    contents: formState.contents,
    imageIds: formState.imageIds,
    setReportType,
    setContents,
    setImageIds,
    setImageUploadState,
    handleSubmit,
    resetForm,
    canSubmit,
    isLoading: reportMutation.isPending,
    error: reportMutation.error,
    imageUploadState: formState.imageUploadState,
  };
};
