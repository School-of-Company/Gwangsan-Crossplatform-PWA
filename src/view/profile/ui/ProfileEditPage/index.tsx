import { useState, useEffect } from 'react';
import { Header, Input, Button } from '~/shared/ui';
import { TextField } from '~/shared/ui/TextField';
import SpecialtiesDropdown from '~/entity/auth/ui/SpecialtiesDropdown';
import { SPECIALTIES } from '~/shared/consts/specialties';
import { useGetMyProfile } from '../../model/useGetMyProfile';
import { useUpdateProfile } from '../../model/useUpdateProfile';
import { profileEditSchema } from '~/entity/auth/model/authSchema';
import { toast } from 'react-toastify';

export default function ProfileEditPageView() {
  const [nickname, setNickname] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const { data: profileData, isLoading } = useGetMyProfile(true);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || '');
      setSpecialties(profileData.specialties || []);
      setDescription(profileData.description || '');
    }
  }, [profileData]);

  const handleSubmit = () => {
    try {
      const validatedData = profileEditSchema.parse({
        nickname: nickname.trim(),
        specialties,
        description: description.trim(),
      });

      updateProfileMutation.mutate(validatedData);
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const isFormValid = nickname.trim() && specialties.length > 0 && description.trim();
  const isSubmitting = updateProfileMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header headerTitle="내 정보 수정" />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0075C2] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header headerTitle="내 정보 수정" />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col gap-6">
          <Input
            label="별칭"
            placeholder="별칭을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
          />

          <SpecialtiesDropdown
            label="특기"
            items={SPECIALTIES}
            placeholder="특기를 선택해주세요"
            selectedItems={specialties}
            onSelect={setSpecialties}
            allowCustomInput={true}
          />

          <TextField
            label="자기소개"
            placeholder="자신을 소개해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
          />
        </div>
      </div>

      <div className="px-6 pb-6">
        <Button onClick={handleSubmit} disabled={!isFormValid || isSubmitting} width="w-full">
          {isSubmitting ? '수정 중...' : '수정'}
        </Button>
      </div>
    </div>
  );
}
