import React,{useEffect, useState} from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import ResponsiveAppBar from '../../appBar';

const Ar26 = () => {
  const route=useRouter();
    const headerStyle={
       position:"sticky",
       top:0,
       backgroundColor:"black",
       color:"white"

    }
    const showData=(id)=>{
      console.log(id);
      route.push("ar26/editAr?id="+id)
    }
    var cnt=1;
  const [ar, setAr] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://127.0.0.1:8000/api/ar26");
      const allArData = await res.json();
      setAr(allArData);
    // console.log("Annual Returns Data: ", ar);

    }
    getData();
  }, []);
  return (
    <>
    <ResponsiveAppBar/>
      <h1>Annual returns 26</h1>
      {Object.keys(ar).length > 0 ? (
        <>
          <Table>
            <TableHead style={{ position: "sticky", top: 0 }}>
              <TableRow>
                <TableCell style={headerStyle}>Sl</TableCell>
                <TableCell style={headerStyle}>Branch Code</TableCell>
                <TableCell style={headerStyle}>Branch Name</TableCell>
                <TableCell style={headerStyle}>Region</TableCell>
                <TableCell style={headerStyle}>Name Of Vendor</TableCell>
                <TableCell style={headerStyle}>Nature Of Payment</TableCell>
                <TableCell style={headerStyle}>PAN of Vendor</TableCell>
                <TableCell style={headerStyle}>GSTIN of vendor</TableCell>
                <TableCell style={headerStyle}>Amount Paid</TableCell>
                <TableCell style={headerStyle}>TDS Deducted</TableCell>
                <TableCell style={headerStyle}>TDS Deduction Date</TableCell>
                <TableCell style={headerStyle}>TDS Rate</TableCell>
                <TableCell style={headerStyle}>Credit BGL Number</TableCell>
                <TableCell style={headerStyle}>Debit BGL Number</TableCell>
                <TableCell style={headerStyle}>Remark - Reversal Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ar.data.map((element) => (
                <TableRow key={element.id} onClick={()=>showData(element.id)}>
                  <TableCell>{cnt++}</TableCell>
                  <TableCell>{element.brCode}</TableCell>
                  <TableCell>{element.branch}</TableCell>
                  <TableCell>{element.region}</TableCell>
                  <TableCell>{element.nameOfVendor}</TableCell>
                  <TableCell>{element.profession}</TableCell>
                  <TableCell>{element.panNumber}</TableCell>
                  <TableCell>{element.gstIn}</TableCell>
                  <TableCell>{element.amountOrRentPaid}</TableCell>
                  <TableCell>{element.TableCellsDeducted}</TableCell>
                  <TableCell>{element.paymenTableCellate}</TableCell>
                  <TableCell>{element.TableCellsRate}</TableCell>
                  <TableCell>{element.bglNumber}</TableCell>
                  <TableCell>{element.bglDr}</TableCell>
                  <TableCell>{element.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Ar26