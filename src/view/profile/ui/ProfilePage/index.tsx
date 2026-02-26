import { useState, useEffect } from 'react';
import { Footer } from '~/shared/ui/Footer';
import { Gwangsan, Information, Light } from '~/entity/profile/ui';
import { Active, Introduce } from '~/widget/profile/ui';
import { toast } from 'react-toastify';
import { useGetPosts } from '../../model/useGetPosts';
import Post from '~/shared/ui/Post';
import { useGetProfile } from '../../model/useGetProfile';
import { useLocalSearchParams } from 'expo-router';
import { Header } from '~/shared/ui';
import { useGetMyProfile } from '../../model/useGetMyProfile';
import { useGetMyPosts } from '../../model/useGetMyPosts';

export default function ProfilePageView() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: profileData,
    error: profileError,
    isError: profileIsError,
    refetch: refetchProfile,
  } = useGetProfile(id);

  const isMe = !Boolean(id);

  const { data: myProfileData, refetch: refetchMyProfile } = useGetMyProfile(isMe);

  const {
    data: myPostsData,
    error: myPostsError,
    isError: myPostsIsError,
    refetch: refetchMyPosts,
  } = useGetMyPosts(isMe);

  const {
    data: otherPostsData,
    error: otherPostsError,
    isError: otherPostsIsError,
    refetch: refetchOtherPosts,
  } = useGetPosts(id);

  const postsData = isMe ? myPostsData : otherPostsData;
  const error = isMe ? myPostsError : otherPostsError;
  const isError = isMe ? myPostsIsError : otherPostsIsError;
  const refetchPosts = isMe ? refetchMyPosts : refetchOtherPosts;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchPosts(), isMe ? refetchMyProfile() : refetchProfile()]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (profileIsError) {
      toast.error(profileError?.message || '프로필을 불러오는데 실패했습니다.');
    }
  }, [profileIsError, profileError]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || '글을 불러오는데 실패했습니다.');
    }
  }, [isError, error]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header headerTitle="프로필" />
      <Information
        isMe={isMe}
        id={isMe ? myProfileData?.memberId : profileData?.memberId}
        name={isMe ? myProfileData?.nickname : profileData?.nickname}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white pb-14">
          <Introduce
            introduce={isMe ? myProfileData?.description : profileData?.description}
            specialty={isMe ? myProfileData?.specialties : profileData?.specialties}
          />
          <Light lightLevel={isMe ? myProfileData?.light : profileData?.light} />
          {isMe && <Gwangsan gwangsan={myProfileData?.gwangsan} />}
        </div>
        <Active
          name={isMe ? myProfileData?.nickname : profileData?.nickname}
          id={String(isMe ? myProfileData?.memberId : profileData?.memberId)}
          isMe={isMe}
        />
        <div className="mt-3 flex flex-col gap-6 bg-white px-6 pb-9 pt-10">
          <h2 className="text-titleSmall">{isMe ? '내 글' : `${profileData?.nickname}님의 글`}</h2>
          {Array.isArray(postsData) && postsData.map((post) => <Post {...post} key={post.id} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
