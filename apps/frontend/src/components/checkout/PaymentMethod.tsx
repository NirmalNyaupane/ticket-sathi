import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const PaymentMethod = () => {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup className="space-y-4" defaultValue="khalti">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="khalti" id="r1" />
            <Label htmlFor="r1">Khalti</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="esewa" id="r2" />
            <Label htmlFor="r2">Esewa</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
