import { useQuery } from "@tanstack/react-query";
import { getFinalizedData } from "../api/userQueries";

export default function Example() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["finalizedData"],
    queryFn: getFinalizedData,
  });


  return (
    <>
      <div>Hello, welcome to the admin dashboard.</div>
      {/* <div>{data[0].text}</div> */}
    </>
  );
}
