import Header from '~/entity/main/ui/header';
import { Footer } from '~/shared/ui/Footer';
import { Inform, MainSlideViewer } from '~/widget/main';
import { useGetMyInformation } from '../../../../entity/main/model/useGetMyInformation';
import { toast } from 'react-toastify';

export default function MainPageView() {
  const { data, isError, error } = useGetMyInformation();
  if (isError) {
    toast.error(
      `정보 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}`
    );
  }
  return (
    <div className="flex-1 bg-white">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <MainSlideViewer />
        <Inform
          head={data?.headName ?? '본점'}
          dong={data?.dongName ?? '동'}
          place={data?.placeName ?? '지점'}
        />
      </div>
      <Footer />
    </div>
  );
}
