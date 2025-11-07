import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface VitalsStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const VitalsStep = ({ data, onNext, onBack }: VitalsStepProps) => {
  const [vitals, setVitals] = useState({
    systolic: data?.vitals?.systolic || "",
    diastolic: data?.vitals?.diastolic || "",
    heartRate: data?.vitals?.heartRate || "",
  });

  const handleSubmit = () => {
    onNext({ vitals });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Vital Signs</h2>
        <p className="text-muted-foreground">
          Recent vital sign measurements
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="systolic">Systolic Blood Pressure (mmHg)</Label>
          <Input
            id="systolic"
            type="number"
            placeholder="e.g., 120"
            value={vitals.systolic}
            onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="diastolic">Diastolic Blood Pressure (mmHg)</Label>
          <Input
            id="diastolic"
            type="number"
            placeholder="e.g., 80"
            value={vitals.diastolic}
            onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heartRate">Resting Heart Rate (bpm)</Label>
          <Input
            id="heartRate"
            type="number"
            placeholder="e.g., 72"
            value={vitals.heartRate}
            onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
          />
        </div>
      </div>

      {vitals.systolic && vitals.diastolic && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-1">Blood Pressure Reading</p>
          <p className="text-2xl font-bold text-primary">
            {vitals.systolic}/{vitals.diastolic} mmHg
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {Number(vitals.systolic) >= 140 || Number(vitals.diastolic) >= 90
              ? "Elevated - consider clinical evaluation"
              : "Normal range"}
          </p>
        </div>
      )}

      <div className="flex justify-between gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VitalsStep;
