import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./Datatable";
import MainNavigation from "./MainNavigation";
import { Payment, payments } from "@/lib/payments";

async function getData(): Promise<Payment[]> {
  return payments;
}

const MainPage = () => {
  const [data, setData] = useState<Payment[]>([]); // Initialize an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result); // Set the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchData();
  }, []); // Empty dependency array means this

  return (
    <>
      <MainNavigation />
      <div className="mx-auto max-w-7xl px-5 py-2 sm:px-6 lg:px-8">
        <p className="text-2xl mt-2">List of payments</p>
        {loading ? (
          <p>Loading...</p> // Display loading state
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};

export default MainPage;
