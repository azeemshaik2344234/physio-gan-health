import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LabsStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const LabsStep = ({ data, onNext, onBack }: LabsStepProps) => {
  const [labs, setLabs] = useState({
    glucose: data?.labs?.glucose || "",
    glucoseUnit: data?.labs?.glucoseUnit || "mg/dL",
    hba1c: data?.labs?.hba1c || "",
    insulin: data?.labs?.insulin || "",
    totalCholesterol: data?.labs?.totalCholesterol || "",
    hdl: data?.labs?.hdl || "",
    ldl: data?.labs?.ldl || "",
    triglycerides: data?.labs?.triglycerides || "",
    lh: data?.labs?.lh || "",
    fsh: data?.labs?.fsh || "",
    testosterone: data?.labs?.testosterone || "",
    shbg: data?.labs?.shbg || "",
    tsh: data?.labs?.tsh || "",
    prolactin: data?.labs?.prolactin || "",
  });

  const calculateHOMAIR = () => {
    if (labs.glucose && labs.insulin) {
      const glucose = Number(labs.glucose);
      const insulin = Number(labs.insulin);
      // HOMA-IR = (fasting insulin μU/mL × fasting glucose mg/dL) / 405
      return ((insulin * glucose) / 405).toFixed(2);
    }
    return null;
  };

  const calculateLHFSHRatio = () => {
    if (labs.lh && labs.fsh) {
      return (Number(labs.lh) / Number(labs.fsh)).toFixed(2);
    }
    return null;
  };

  const handleSubmit = () => {
    onNext({ labs });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Laboratory Values</h2>
        <p className="text-muted-foreground">
          Recent lab test results (all fields optional, but more data improves accuracy)
        </p>
      </div>

      <div className="space-y-6">
        {/* Metabolic Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Metabolic Panel</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glucose">Fasting Glucose</Label>
              <div className="flex gap-2">
                <Input
                  id="glucose"
                  type="number"
                  placeholder="e.g., 95"
                  value={labs.glucose}
                  onChange={(e) => setLabs({ ...labs, glucose: e.target.value })}
                  className="flex-1"
                />
                <Select value={labs.glucoseUnit} onValueChange={(value) => setLabs({ ...labs, glucoseUnit: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mg/dL">mg/dL</SelectItem>
                    <SelectItem value="mmol/L">mmol/L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hba1c">HbA1c (%)</Label>
              <Input
                id="hba1c"
                type="number"
                step="0.1"
                placeholder="e.g., 5.5"
                value={labs.hba1c}
                onChange={(e) => setLabs({ ...labs, hba1c: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insulin">Fasting Insulin (μU/mL)</Label>
              <Input
                id="insulin"
                type="number"
                placeholder="e.g., 10"
                value={labs.insulin}
                onChange={(e) => setLabs({ ...labs, insulin: e.target.value })}
              />
            </div>

            {calculateHOMAIR() && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm font-medium mb-1">Calculated HOMA-IR</p>
                <p className="text-2xl font-bold text-primary">{calculateHOMAIR()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Number(calculateHOMAIR()) > 2.5 ? "Indicates insulin resistance" : "Normal range"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lipid Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Lipid Panel (mg/dL)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalCholesterol">Total Cholesterol</Label>
              <Input
                id="totalCholesterol"
                type="number"
                placeholder="e.g., 180"
                value={labs.totalCholesterol}
                onChange={(e) => setLabs({ ...labs, totalCholesterol: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hdl">HDL Cholesterol</Label>
              <Input
                id="hdl"
                type="number"
                placeholder="e.g., 55"
                value={labs.hdl}
                onChange={(e) => setLabs({ ...labs, hdl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ldl">LDL Cholesterol</Label>
              <Input
                id="ldl"
                type="number"
                placeholder="e.g., 100"
                value={labs.ldl}
                onChange={(e) => setLabs({ ...labs, ldl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="triglycerides">Triglycerides</Label>
              <Input
                id="triglycerides"
                type="number"
                placeholder="e.g., 120"
                value={labs.triglycerides}
                onChange={(e) => setLabs({ ...labs, triglycerides: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Hormonal Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Hormonal Panel</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lh">LH (mIU/mL)</Label>
              <Input
                id="lh"
                type="number"
                placeholder="e.g., 12"
                value={labs.lh}
                onChange={(e) => setLabs({ ...labs, lh: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fsh">FSH (mIU/mL)</Label>
              <Input
                id="fsh"
                type="number"
                placeholder="e.g., 5"
                value={labs.fsh}
                onChange={(e) => setLabs({ ...labs, fsh: e.target.value })}
              />
            </div>

            {calculateLHFSHRatio() && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg md:col-span-2">
                <p className="text-sm font-medium mb-1">LH/FSH Ratio</p>
                <p className="text-2xl font-bold text-primary">{calculateLHFSHRatio()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Number(calculateLHFSHRatio()) > 2 ? "Elevated - common in PCOS" : "Normal range"}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="testosterone">Total Testosterone (ng/dL)</Label>
              <Input
                id="testosterone"
                type="number"
                placeholder="e.g., 55"
                value={labs.testosterone}
                onChange={(e) => setLabs({ ...labs, testosterone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shbg">SHBG (nmol/L)</Label>
              <Input
                id="shbg"
                type="number"
                placeholder="e.g., 40"
                value={labs.shbg}
                onChange={(e) => setLabs({ ...labs, shbg: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tsh">TSH (μIU/mL)</Label>
              <Input
                id="tsh"
                type="number"
                step="0.01"
                placeholder="e.g., 2.5"
                value={labs.tsh}
                onChange={(e) => setLabs({ ...labs, tsh: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prolactin">Prolactin (ng/mL)</Label>
              <Input
                id="prolactin"
                type="number"
                placeholder="e.g., 15"
                value={labs.prolactin}
                onChange={(e) => setLabs({ ...labs, prolactin: e.target.value })}
              />
            </div>
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

export default LabsStep;
