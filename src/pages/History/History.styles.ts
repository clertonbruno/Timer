import styled from 'styled-components';

export const HistoryContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5.6rem;
  overflow: auto;

  h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 3.2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${({ theme }) => theme['gray-600']};
      padding: 1.6rem;
      text-align: left;
      color: ${({ theme }) => theme['gray-100']};
      font-size: 1.4rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 2.4rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 2.4rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme['gray-700']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1.6rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 2.4rem;
      }

      &:last-child {
        padding-right: 2.4rem;
      }
    }
  }
`;

const STATUS_COLORS = {
  success: 'green-500',
  ongoing: 'yellow-500',
  interrupted: 'red-500',
} as const;

interface StatusProps {
  status?: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: ${({ theme, status }) => {
      return theme[STATUS_COLORS[status || 'success']];
    }};
  }
`;
