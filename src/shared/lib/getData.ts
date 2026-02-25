import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'react-toastify';

export const getData = async (name: string) => {
  try {
    return await AsyncStorage.getItem(name);
  } catch (e) {
    toast.error('오류 발생: 데이터를 가져오는 중 오류가 발생했습니다');

    throw e;
  }
};
