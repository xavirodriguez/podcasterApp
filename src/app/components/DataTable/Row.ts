import styled from 'styled-components';

const Row = styled.div<{ isOdd?: boolean; isFirst?: boolean }>`
  display: flex;
  padding: 10px;
  border-top: ${props => (props.isFirst ? 'none' : '1px solid #333')};
  background-color: ${props => (props.isOdd ? '#f5f5f5' : '#fff')};
`;

export default Row;
