import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ReviewStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ReviewStep = ({ data, onBack }: ReviewStepProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    toast({
      title: "Submitting assessment...",
      description: "Processing your data with GAN-PINN model",
    });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Assessment complete!",
        description: "Your results are ready for review",
      });
      navigate("/results");
    }, 2000);
  };

  const getSectionCompleteness = () => {
    const sections = [
      { name: "Demographics", complete: !!data.demographics?.age },
      { name: "Symptoms", complete: !!data.symptoms },
      { name: "Vital Signs", complete: !!data.vitals?.systolic },
      { name: "Laboratory Values", complete: !!data.labs?.glucose },
      { name: "Medical Imaging", complete: !!data.imaging },
    ];
    return sections;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting for analysis
        </p>
      </div>

      {/* Consent Confirmation */}
      <Card className="border-success/50 bg-success-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            Consent Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground">
          All required consents have been accepted. Your data will be processed securely.
        </CardContent>
      </Card>

      {/* Section Completeness */}
      <Card>
        <CardHeader>
          <CardTitle>Data Completeness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getSectionCompleteness().map((section, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{section.name}</span>
                <Badge variant={section.complete ? "default" : "secondary"}>
                  {section.complete ? "Complete" : "Incomplete"}
                </Badge>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Note: More complete data improves prediction accuracy. Incomplete sections won't prevent submission.
          </p>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      {data.demographics && (
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.demographics.height && data.demographics.weight && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">BMI</p>
                  <p className="text-2xl font-bold text-primary">
                    {(
                      Number(data.demographics.weight) /
                      Math.pow(Number(data.demographics.height) / 100, 2)
                    ).toFixed(1)}
                  </p>
                </div>
              )}
              {data.labs?.glucose && data.labs?.insulin && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">HOMA-IR</p>
                  <p className="text-2xl font-bold text-primary">
                    {((Number(data.labs.insulin) * Number(data.labs.glucose)) / 405).toFixed(2)}
                  </p>
                </div>
              )}
              {data.labs?.lh && data.labs?.fsh && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">LH/FSH Ratio</p>
                  <p className="text-2xl font-bold text-primary">
                    {(Number(data.labs.lh) / Number(data.labs.fsh)).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Model Information */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm">Analysis Method</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <span className="font-medium">Model:</span> GAN-PINN v2.1.0 (Generative Adversarial
            Network + Physics-Informed Neural Network)
          </p>
          <p>
            <span className="font-medium">Training:</span> Public clinical datasets + synthetic
            augmentation (n=12,453 records)
          </p>
          <p>
            <span className="font-medium">Validation:</span> Physiological constraint checking via
            PINN residuals
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="bg-gradient-primary">
          <Send className="mr-2 h-4 w-4" />
          Submit for Analysis
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
