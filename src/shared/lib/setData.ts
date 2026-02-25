import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'react-toastify';

export const setData = async (name: string, data: string) => {
  try {
    await AsyncStorage.setItem(name, data);
  } catch (e) {
    toast.error('오류 발생: 데이터를 저장하는 중 오류가 발생했습니다');

    throw e;
  }
};
