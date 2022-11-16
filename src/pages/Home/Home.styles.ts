import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5.6rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme['gray-100']};
  cursor: pointer;
  padding: 1.6rem;
  border-radius: 8px;

  font-size: 1.6rem;
  font-weight: bold;
  border: 0;

  transition: background-color 0.05s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme['green-500']};
  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme['red-500']};
  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`;
