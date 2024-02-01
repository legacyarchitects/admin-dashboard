import { useQuery } from "@tanstack/react-query";
import { getFinalizedData } from "../api/userQueries";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
    editable: true,
  },

  {
    field: "fullName",
    headerName: "Full Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "lawyerName",
    headerName: "Lawyer Name",
    width: 200,
    editable: true,
  },
  {
    field: "timeClicked",
    headerName: "Time Clicked",
    width: 200,
    editable: true,
    renderCell: (params) => {
      // Assuming the time is in UTC and you want to convert it to MST (UTC-7)
      const date = new Date(params.value);
      // Convert to MST by subtracting 7 hours from UTC time
      date.setHours(date.getHours() - 7);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
  {
    field: "clientId",
    headerName: "Contact ID",
    type: "number",
    width: 110,
    editable: true,
  },
];

export default function Finalized() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["finalizedData"],
    queryFn: getFinalizedData,
  });

  // Transform the data to fit DataGrid's expected structure
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
