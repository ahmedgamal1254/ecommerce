import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

function get_status(status){
    switch(status){
        case 0:
            return "pending";
        case 1:
            return "fail";
        case 2:
            return "success"
        default:
            return "pending";
        break;
    }
}

const statusColors = {
  success: "text-green-500",
  fail: "text-red-500",
  pending: "text-yellow-500",
};

const statusIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />, 
  fail: <XCircle className="w-5 h-5 text-red-500" />, 
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
};

function get_date(date) {
    const d = new Date(date);

    return d.toLocaleString('en-US', { weekday: 'long' })+ " " + d.getDate() + " "+ d.toLocaleString('en-US', { month: 'long' }) + " " + d.getFullYear();
}

const OrderCard = ({ order }) => {
  return (
    <Card className="p-4 border rounded-lg shadow-md">
      <CardContent>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
          <div className="flex items-center gap-2">
            {statusIcons[order.status]}
            <Badge className={statusColors[get_status(order.status)]}>{get_status(order.status)}</Badge>
          </div>
        </div>
        <p className="text-gray-600">Phone: {order.phone}</p>
        <p className="text-gray-600">num of Products: {order.products.length}</p>
        <p className="text-gray-600">amount: {order.amount} {order.currency_code}</p>
        <p className="text-gray-600">Address: {order.address1}, {order.city}, {order.state}</p>
        <p className="text-gray-600">created-at: {get_date(order.created_at)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
