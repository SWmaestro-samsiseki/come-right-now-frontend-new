import styled from 'styled-components';

interface Custom {
  value: number;
}

const Container = styled.div<Custom>`
  width: 100%;
  min-height: ${(prop) => prop.value + 'px'};
`;

function EmptyBar({ value }: { value: number }) {
  return <Container value={value} />;
}

export default EmptyBar;
