import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getFinalizedData } from "../api/userQueries";

export default function Finalized() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["finalizedData"],
    queryFn: getFinalizedData,
  });

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 200 },
      {
        field: "firstName",
        headerName: "First Name",
        width: 200,
        editable: false,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 200,
        editable: false,
      },
      {
        field: "lawyerName",
        headerName: "Lawyer Name",
        width: 200,
        editable: false,
      },
      {
        field: "timeClicked",
        headerName: "Time Clicked",
        width: 200,
        editable: false,
        renderCell: (params) => {
          const date = new Date(params.value);
          date.setHours(date.getHours() - 7);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        },
      },
      {
        field: "clientId",
        headerName: "Contact ID",
        type: "number",
        width: 110,
        editable: false,
      },
    ],
    []
  );

  const rows =
  data?.map((item) => ({
    id: item.game,
    firstName: item.first_name,
    lastName: item.last_name,
    lawyerName: item.lawyer_name,
    clientId: item.client_id,
    timeClicked: item.time_clicked,
  })) ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
            },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
