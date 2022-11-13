import * as S from './History.styles';

export const History = () => {
  return (
    <S.HistoryContainer>
      <h1>My History</h1>
      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='interrupted'>Interrupted</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='ongoing'>Processing</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>10:00</td>
              <td>10:30</td>
              <td>
                <S.Status status='success'>Finished</S.Status>
              </td>
            </tr>
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  );
};
