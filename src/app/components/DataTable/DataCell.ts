import styled from 'styled-components';
const DataCell = styled.div<{ align?: 'left' | 'right' }>`
  flex: 1;
  order: 2;
  text-align: ${props => props.align || 'left'};
`;

export default DataCell;
