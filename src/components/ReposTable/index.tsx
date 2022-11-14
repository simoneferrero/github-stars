import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { RepoNode } from '../../types/ReposSearch'

type Props = {
  repos: RepoNode[]
}

const ReposTable = ({ repos }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="Table containing information about GitHub repositories"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">🌟 stars</TableCell>
            <TableCell align="right">🍴 forks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map(({ name, stargazerCount, forkCount, url }) => (
            <TableRow
              key={name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <a
                  className="App-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={url}
                >
                  {name}
                </a>
              </TableCell>
              <TableCell align="right">{stargazerCount}</TableCell>
              <TableCell align="right">{forkCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReposTable
