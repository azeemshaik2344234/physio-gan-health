import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DemographicsStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const DemographicsStep = ({ data, onNext, onBack }: DemographicsStepProps) => {
  const [demographics, setDemographics] = useState({
    age: data?.demographics?.age || "",
    sex: data?.demographics?.sex || "",
    ethnicity: data?.demographics?.ethnicity || "",
    height: data?.demographics?.height || "",
    weight: data?.demographics?.weight || "",
    waist: data?.demographics?.waist || "",
  });

  const isValid = demographics.age && demographics.sex && demographics.height && demographics.weight;

  const handleSubmit = () => {
    if (isValid) {
      onNext({ demographics });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Demographics</h2>
        <p className="text-muted-foreground">
          Basic demographic and anthropometric information
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Years"
            value={demographics.age}
            onChange={(e) => setDemographics({ ...demographics, age: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sex">Sex *</Label>
          <Select value={demographics.sex} onValueChange={(value) => setDemographics({ ...demographics, sex: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Select value={demographics.ethnicity} onValueChange={(value) => setDemographics({ ...demographics, ethnicity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select ethnicity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="caucasian">Caucasian</SelectItem>
              <SelectItem value="african">African American</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (cm) *</Label>
          <Input
            id="height"
            type="number"
            placeholder="e.g., 165"
            value={demographics.height}
            onChange={(e) => setDemographics({ ...demographics, height: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) *</Label>
          <Input
            id="weight"
            type="number"
            placeholder="e.g., 70"
            value={demographics.weight}
            onChange={(e) => setDemographics({ ...demographics, weight: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="waist">Waist Circumference (cm)</Label>
          <Input
            id="waist"
            type="number"
            placeholder="e.g., 80"
            value={demographics.waist}
            onChange={(e) => setDemographics({ ...demographics, waist: e.target.value })}
          />
        </div>
      </div>

      {demographics.height && demographics.weight && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-1">Calculated BMI</p>
          <p className="text-2xl font-bold text-primary">
            {(Number(demographics.weight) / Math.pow(Number(demographics.height) / 100, 2)).toFixed(1)}
          </p>
        </div>
      )}

      <div className="flex justify-between gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DemographicsStep;
