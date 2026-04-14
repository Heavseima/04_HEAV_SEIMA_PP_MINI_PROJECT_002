import { getAllOrders } from "@/service/orderService";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const OrdersPage = async () => {
  const session = await auth();

  let orders = [];

  if (session) {
    try {
      orders = await getAllOrders();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="max-w-7xl mx-auto py-16 font-sans text-[#1a1a1a]">
      <div className="space-y-10">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Order
                  </span>
                  <p className="font-extrabold text-xl">#{order.orderId}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    User ID
                  </span>
                  <p className="text-[15px] font-medium text-gray-800">
                    {order.appUserId}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Line items
                  </span>
                  <p className="font-extrabold text-gray-800">
                    {order.orderDetailsResponse.length}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end justify-between">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Total
                  </span>
                  <p className="text-3xl font-extrabold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="md:text-right mt-6">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Order date
                  </span>
                  <p className="font-bold text-gray-700">
                    {formatDate(order.orderDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details Gray Box */}
            <div className="bg-[#f8f9fa] rounded-2xl p-8 space-y-6">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                Order Details
              </span>

              {order.orderDetailsResponse.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">Product</span>
                    <span className="font-bold text-gray-900">
                      {item.productName}
                    </span>
                  </div>

                  <div className="flex flex-1 justify-center px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-medium">Qty</span>
                      <span className="font-bold text-gray-900">
                        {item.orderQty}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right min-w-[100px]">
                    <p className="font-bold text-gray-900 text-lg">
                      ${item.orderTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-bold text-lg">No orders yet</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
