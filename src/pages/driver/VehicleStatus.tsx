import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDriverInfoQuery } from "@/redux/features/driver/driver.api";

export default function VehicleStatus() {
  const { data: driverInfo } = useDriverInfoQuery(undefined);
  console.log(driverInfo?.data);

  return (
    <>
      <h2 className="text-center text-xl font-bold">
        Your Vehicles Approval Status
      </h2>
      <div className="rounded-md border p-4 md:w-1/2 mx-auto  ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Index</TableHead>
              <TableHead className="w-[100px]">Vehicle Name</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {driverInfo?.data?.map((item, index) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium ">{index + 1}</TableCell>
                <TableCell className="font-medium ">
                  {item.licenseNumber}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-primary">{item.approvalStatus}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
