import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../../constants/colors';

export const GalleryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: flex-start;
  padding: 24px;
  margin-top: 24px;
`;
export const ImageWrapper = styled.View`
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 1.5%;
  margin-right: 1.5%;
  width: 30%;
`;
export const ImageItem = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;
`;
export const AddButton = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${colors.grey};
  opacity: 0.5;
  justify-content: center;
  align-items: center;
`;
export const DeleteWrapper = styled.View`
  position: absolute;
  top: -8px;
  right: -8px;
`;
