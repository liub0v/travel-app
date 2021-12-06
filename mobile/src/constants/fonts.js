import * as Font from 'expo-font';

export async function loadFonts() {
  return await Font.loadAsync({
    Montserrat: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratExtraBold: require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });
}

export default Object.freeze({
  normal: 'Montserrat',
  bold: 'MontserratExtraBold',
});
