import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SymptomsStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const SymptomsStep = ({ data, onNext, onBack }: SymptomsStepProps) => {
  const [symptoms, setSymptoms] = useState({
    menstrualCycle: data?.symptoms?.menstrualCycle || "",
    hirsutism: data?.symptoms?.hirsutism || false,
    acne: data?.symptoms?.acne || false,
    hairThinning: data?.symptoms?.hairThinning || false,
    fertilityIssues: data?.symptoms?.fertilityIssues || false,
    familyHistoryPCOS: data?.symptoms?.familyHistoryPCOS || false,
    familyHistoryDiabetes: data?.symptoms?.familyHistoryDiabetes || false,
    familyHistoryCVD: data?.symptoms?.familyHistoryCVD || false,
  });

  const handleSubmit = () => {
    onNext({ symptoms });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Symptoms & Medical History</h2>
        <p className="text-muted-foreground">
          Information about symptoms and family medical history
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="menstrualCycle">Menstrual Cycle Regularity</Label>
          <Select
            value={symptoms.menstrualCycle}
            onValueChange={(value) => setSymptoms({ ...symptoms, menstrualCycle: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cycle regularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Regular (21-35 days)</SelectItem>
              <SelectItem value="irregular">Irregular (variable length)</SelectItem>
              <SelectItem value="absent">Absent (amenorrhea)</SelectItem>
              <SelectItem value="infrequent">Infrequent (&gt;35 days)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Current Symptoms</Label>
          <div className="space-y-3">
            {[
              { key: "hirsutism", label: "Hirsutism (excessive hair growth)" },
              { key: "acne", label: "Persistent acne" },
              { key: "hairThinning", label: "Hair thinning or loss" },
              { key: "fertilityIssues", label: "Fertility concerns" },
            ].map((symptom) => (
              <div key={symptom.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={symptom.key}
                  checked={symptoms[symptom.key as keyof typeof symptoms] as boolean}
                  onCheckedChange={(checked) =>
                    setSymptoms({ ...symptoms, [symptom.key]: checked as boolean })
                  }
                />
                <label
                  htmlFor={symptom.key}
                  className="text-sm font-medium leading-none cursor-pointer flex-1"
                >
                  {symptom.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Family Medical History</Label>
          <div className="space-y-3">
            {[
              { key: "familyHistoryPCOS", label: "Family history of PCOS" },
              { key: "familyHistoryDiabetes", label: "Family history of diabetes" },
              { key: "familyHistoryCVD", label: "Family history of cardiovascular disease" },
            ].map((history) => (
              <div key={history.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={history.key}
                  checked={symptoms[history.key as keyof typeof symptoms] as boolean}
                  onCheckedChange={(checked) =>
                    setSymptoms({ ...symptoms, [history.key]: checked as boolean })
                  }
                />
                <label
                  htmlFor={history.key}
                  className="text-sm font-medium leading-none cursor-pointer flex-1"
                >
                  {history.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default SymptomsStep;
