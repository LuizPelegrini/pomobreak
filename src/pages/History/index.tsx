import { Container, HistoryList } from './styles';

export function History() {
  return (
    <Container>
      <h1>My History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </Container>
  );
}
