import { Container, HistoryList, Status } from './styles';

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
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>
                <Status statusColor="yellow">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 hours ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </Container>
  );
}
