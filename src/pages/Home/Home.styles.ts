import styled, { ThemeConsumer } from 'styled-components';

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

export const FormHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme['gray-100']};
  font-size: 2rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 4rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: 1.8rem;
  padding: 0 0.8rem;
  color: ${({ theme }) => theme['gray-100']};
  margin-top: 0.5rem;

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesInput = styled(BaseInput)`
  width: 6.4rem;
`;

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 16rem;
  line-height: 12.8rem;
  color: ${({ theme }) => theme['gray-100']};
  display: flex;
  gap: 1.6rem;

  span {
    background: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme['green-500']};
  width: 6.4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const CountdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 1.6rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.6rem;
  font-weight: bold;
  border: 0;

  transition: background-color 0.05s;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
