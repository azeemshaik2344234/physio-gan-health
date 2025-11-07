import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImagingStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ImagingStep = ({ data, onNext, onBack }: ImagingStepProps) => {
  const { toast } = useToast();
  const [imaging, setImaging] = useState({
    ovarianVolume: data?.imaging?.ovarianVolume || "",
    follicleCount: data?.imaging?.follicleCount || "",
    ultrasoundFiles: data?.imaging?.ultrasoundFiles || [],
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImaging({
        ...imaging,
        ultrasoundFiles: [...imaging.ultrasoundFiles, ...newFiles],
      });
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) added successfully`,
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = imaging.ultrasoundFiles.filter((_: any, i: number) => i !== index);
    setImaging({ ...imaging, ultrasoundFiles: newFiles });
  };

  const handleSubmit = () => {
    onNext({ imaging });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Medical Imaging</h2>
        <p className="text-muted-foreground">
          Upload ultrasound images and related measurements (optional but improves accuracy)
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
          <label htmlFor="ultrasound-upload" className="cursor-pointer">
            <div className="p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-2">
                Click to upload pelvic ultrasound images
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                DICOM, PNG, JPEG supported • Max 20MB per file
              </p>
              <Button type="button" variant="secondary" size="sm">
                Choose Files
              </Button>
              <input
                id="ultrasound-upload"
                type="file"
                multiple
                accept="image/*,.dcm"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>
        </Card>

        {/* Uploaded Files */}
        {imaging.ultrasoundFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Images ({imaging.ultrasoundFiles.length})</Label>
            <div className="space-y-2">
              {imaging.ultrasoundFiles.map((file: File, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual Measurements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Ovarian Measurements</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ovarianVolume">Ovarian Volume (cm³)</Label>
              <Input
                id="ovarianVolume"
                type="number"
                step="0.1"
                placeholder="e.g., 12.5"
                value={imaging.ovarianVolume}
                onChange={(e) => setImaging({ ...imaging, ovarianVolume: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="follicleCount">Antral Follicle Count</Label>
              <Input
                id="follicleCount"
                type="number"
                placeholder="e.g., 15"
                value={imaging.follicleCount}
                onChange={(e) => setImaging({ ...imaging, follicleCount: e.target.value })}
              />
            </div>
          </div>

          {imaging.follicleCount && Number(imaging.follicleCount) >= 12 && (
            <div className="p-4 bg-warning-light border border-warning/20 rounded-lg">
              <p className="text-sm font-medium text-warning-foreground">
                Antral follicle count ≥12 is one of the Rotterdam criteria for PCOS diagnosis
              </p>
            </div>
          )}
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

export default ImagingStep;
