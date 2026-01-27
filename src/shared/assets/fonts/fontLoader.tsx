import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const useCustomFonts = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setLoaded(true);
      return;
    }

    Font.loadAsync({
      Cafe24SsurroundOTF: require('@/shared/assets/fonts/Cafe24Ssurround-v2.0/Cafe24Ssurround-v2.0.otf'),
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
};
