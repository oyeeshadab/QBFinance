import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

type Props = {
  children: React.ReactNode;
  padding?: boolean;
  bubble?: boolean;
  useSafeArea?: boolean;
  blob?: boolean;
};

const FinanceTrackerWrapper = ({
  children,
  padding = false,
  bubble = false,
  useSafeArea = false,
  blob = false,
}: Props) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const Container = useSafeArea ? RNSafeAreaView : View;

  return (
    <Container style={styles.container}>
      {bubble && (
        <>
          <LinearGradient
            colors={['#6578C8', '#C8CAEF']}
            style={styles.topBlob}
          />
        </>
      )}
      {blob && (
        <LottieView
          source={require('@assets/JSON/blob.json')}
          style={styles.lottie}
          autoPlay
          loop
        />
      )}
      <View style={padding && styles.padding}>{children}</View>
    </Container>
  );
};

export default FinanceTrackerWrapper;
