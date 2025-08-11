// // "use client";

// // import {
// //   Table,
// //   TableHeader,
// //   TableBody,
// //   TableRow,
// //   TableHead,
// //   TableCell,
// // } from "@/components/ui/Table";
// // import { Eye, Trash2 } from "lucide-react";

// // export default function OrdersTable({ orders = [], onView, onDelete }) {
// //   return (
// //     <div className="border rounded-md overflow-x-auto">
// //       <Table>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead>Order ID</TableHead>
// //             <TableHead>User</TableHead>
// //             <TableHead>Total (Rs.)</TableHead>
// //             <TableHead>Order Status</TableHead>
// //             <TableHead>Payment Status</TableHead>
// //             <TableHead>Date</TableHead>
// //             <TableHead className="text-center">Actions</TableHead>
// //           </TableRow>
// //         </TableHeader>

// //         <TableBody>
// //           {orders.map((order) => (
// //             <TableRow key={order._id}>
// //               <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
// //               <TableCell>
// //                 {order.user?.name || "N/A"} <br />
// //                 <small className="text-gray-500">{order.user?.email}</small>
// //               </TableCell>
// //               <TableCell>{order.totalAmount?.toFixed(2) || "-"}</TableCell>
// //               <TableCell className="capitalize">{order.orderStatus}</TableCell>
// //               <TableCell className="capitalize">{order.paymentStatus}</TableCell>
// //               <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
// //               <TableCell className="text-center space-x-2">
// //                 <button
// //                   onClick={() => onView(order)}
// //                   className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
// //                   title="View Details"
// //                 >
// //                   <Eye size={16} />
// //                 </button>
// //                 <button
// //                   onClick={() => onDelete(order._id)}
// //                   className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-red-600 hover:bg-red-100 transition"
// //                   title="Delete Order"
// //                 >
// //                   <Trash2 size={16} />
// //                 </button>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   );
// // }


// "use client";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/Table";
// import { Eye, Trash2 } from "lucide-react";

// export default function OrdersTable({ orders = [], onView, onDelete }) {
//   return (
//     <div className="border rounded-md overflow-x-auto">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Order ID</TableHead>
//             <TableHead>User</TableHead>
//             <TableHead>Total (Rs.)</TableHead>
//             <TableHead>Order Status</TableHead>
//             <TableHead>Payment Status</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-center">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {orders.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={7} className="text-center py-6 bg-green-400 text-gray-500">
//                 No orders found.
//               </TableCell>
//             </TableRow>
//           ) : (
//             orders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
//                 <TableCell>
//                   {order.user?.name || "N/A"} <br />
//                   <small className="text-gray-500">{order.user?.email}</small>
//                 </TableCell>
//                 <TableCell>{order.totalAmount?.toFixed(2) || "-"}</TableCell>
//                 <TableCell className="capitalize">{order.orderStatus}</TableCell>
//                 <TableCell className="capitalize">{order.paymentStatus}</TableCell>
//                 <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell className="text-center space-x-2">
//                   <button
//                     onClick={() => onView(order)}
//                     className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
//                     title="View Details"
//                   >
//                     <Eye size={16} />
//                   </button>
//                   <button
//                     onClick={() => onDelete(order._id)}
//                     className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-red-600 hover:bg-red-100 transition"
//                     title="Delete Order"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }


"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Eye, Trash2 } from "lucide-react";


export default function OrdersTable({ orders = [], onView, onDelete }) {



  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Total (Rs.)</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>
                  {order.user?.name || "N/A"} <br />
                  <small className="text-gray-500">{order.user?.email}</small>
                </TableCell>
                <TableCell>{order.totalAmount?.toFixed(2) || "-"}</TableCell>
                <TableCell className="capitalize">{order.orderStatus}</TableCell>
                <TableCell className="capitalize">{order.paymentStatus}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-center space-x-2">
                  <button
                    onClick={() => onView(order)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(order._id)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-red-600 hover:bg-red-100 transition"
                    title="Delete Order"
                  >
                    <Trash2 size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
