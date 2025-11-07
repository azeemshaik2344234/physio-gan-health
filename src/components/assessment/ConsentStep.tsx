import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Database, FileText } from "lucide-react";

interface ConsentStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ConsentStep = ({ data, onNext, isFirstStep }: ConsentStepProps) => {
  const [consents, setConsents] = useState({
    dataCollection: data?.consents?.dataCollection || false,
    dataStorage: data?.consents?.dataStorage || false,
    syntheticGeneration: data?.consents?.syntheticGeneration || false,
    researchUse: data?.consents?.researchUse || false,
  });

  const allConsented = Object.values(consents).every(v => v);

  const handleSubmit = () => {
    onNext({ consents });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Consent & Privacy Notice
        </h2>
        <p className="text-muted-foreground">
          Please review and accept the following terms before proceeding with your clinical assessment.
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Your Privacy Matters</h3>
              <p className="text-sm text-muted-foreground">
                All personal health information (PHI) is strictly de-identified before processing. 
                We employ state-of-the-art encryption and comply with HIPAA regulations to protect your data.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4 mt-4">
          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="dataCollection"
              checked={consents.dataCollection}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, dataCollection: checked as boolean })
              }
            />
            <div className="flex-1">
              <label
                htmlFor="dataCollection"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Database className="h-4 w-4 text-primary" />
                  Data Collection & Processing
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  I consent to the collection and processing of my clinical data for risk assessment purposes.
                </p>
              </label>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="dataStorage"
              checked={consents.dataStorage}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, dataStorage: checked as boolean })
              }
            />
            <div className="flex-1">
              <label
                htmlFor="dataStorage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="h-4 w-4 text-primary" />
                  Secure Storage
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  I consent to secure, encrypted storage of my de-identified health data for model improvement and continuous learning.
                </p>
              </label>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="syntheticGeneration"
              checked={consents.syntheticGeneration}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, syntheticGeneration: checked as boolean })
              }
            />
            <div className="flex-1">
              <label
                htmlFor="syntheticGeneration"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-primary" />
                  Synthetic Data Generation
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  I consent to my de-identified data being used to generate synthetic clinical records via GANs for research and model training (no identifiable information will be retained).
                </p>
              </label>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="researchUse"
              checked={consents.researchUse}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, researchUse: checked as boolean })
              }
            />
            <div className="flex-1">
              <label
                htmlFor="researchUse"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Research Use (Optional)
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  I consent to anonymized use of my data for clinical research and publication (fully de-identified, no individual traceability).
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button
          onClick={handleSubmit}
          disabled={!allConsented}
          size="lg"
        >
          Accept & Continue
        </Button>
      </div>
    </div>
  );
};

export default ConsentStep;
