import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ConsentStep from "@/components/assessment/ConsentStep";
import DemographicsStep from "@/components/assessment/DemographicsStep";
import SymptomsStep from "@/components/assessment/SymptomsStep";
import VitalsStep from "@/components/assessment/VitalsStep";
import LabsStep from "@/components/assessment/LabsStep";
import ImagingStep from "@/components/assessment/ImagingStep";
import ReviewStep from "@/components/assessment/ReviewStep";

const STEPS = [
  { id: "consent", title: "Consent & Privacy", component: ConsentStep },
  { id: "demographics", title: "Demographics", component: DemographicsStep },
  { id: "symptoms", title: "Symptoms & History", component: SymptomsStep },
  { id: "vitals", title: "Vital Signs", component: VitalsStep },
  { id: "labs", title: "Laboratory Values", component: LabsStep },
  { id: "imaging", title: "Medical Imaging", component: ImagingStep },
  { id: "review", title: "Review & Submit", component: ReviewStep },
];

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => window.location.href = "/"}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Clinical Assessment
            </h1>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
            </p>
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-lg shadow-card p-6 md:p-8">
          <CurrentStepComponent
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === STEPS.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Assessment;
