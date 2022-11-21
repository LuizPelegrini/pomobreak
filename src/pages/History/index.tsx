import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { Container, HistoryList, Status } from './styles';
import { formatDistanceToNow } from 'date-fns';

export function History() {
  const { cycles } = useContext(CyclesContext);

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
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.completedDate && (
                    <Status statusColor="green">Completed</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrupted</Status>
                  )}

                  {!cycle.interruptedDate && !cycle.completedDate && (
                    <Status statusColor="yellow">In Progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </Container>
  );
}
