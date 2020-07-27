import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable({ taskBreakdown, activeDriver }) {
  const classes = useStyles();

  let pick = taskBreakdown[0] ? taskBreakdown[0].Pickup : 0;
  let drop = taskBreakdown[0] ? taskBreakdown[0].Dropoff : 0;
  let other = taskBreakdown[0] ? taskBreakdown[0].Other : 0;

  function createData(name, Pickup, Dropoff, Other) {
    return { name, Pickup, Dropoff, Other };
  }

  const rows = [createData(`${activeDriver}`, pick, drop, other)];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Driver</TableCell>
            <TableCell align="right">Pickup</TableCell>
            <TableCell align="right">Dropoff</TableCell>
            <TableCell align="right">Other</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.Pickup}</TableCell>
              <TableCell align="right">{row.Dropoff}</TableCell>
              <TableCell align="right">{row.Other}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
