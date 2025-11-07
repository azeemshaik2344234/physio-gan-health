import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  FileText, 
  TrendingUp,
  Info
} from "lucide-react";

const Results = () => {
  // Mock data - will be replaced with actual API data
  const riskScore = 68;
  const riskLevel = riskScore > 70 ? "high" : riskScore > 40 ? "moderate" : "low";
  const pcosProbability = 0.72;
  const metabolicRisk = 0.58;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "destructive";
      case "moderate": return "warning";
      case "low": return "success";
      default: return "muted";
    }
  };

  const keyFactors = [
    { factor: "HOMA-IR Index", value: "4.2", impact: "High", trend: "increasing" },
    { factor: "LH/FSH Ratio", value: "2.8", impact: "Moderate", trend: "stable" },
    { factor: "Testosterone Level", value: "68 ng/dL", impact: "Moderate", trend: "increasing" },
    { factor: "BMI", value: "28.5", impact: "Moderate", trend: "stable" },
  ];

  const physioConstraints = [
    { constraint: "Insulin-Glucose Dynamics", residual: 0.12, status: "normal" },
    { constraint: "Hormonal Balance", residual: 0.34, status: "attention" },
    { constraint: "Metabolic Conservation", residual: 0.08, status: "normal" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Assessment Results
              </h1>
              <p className="text-muted-foreground">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Share with Clinician
              </Button>
            </div>
          </div>
        </div>

        {/* Main Risk Score */}
        <Card className="mb-6 border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Overall Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-foreground">{riskScore}</span>
                  <span className="text-muted-foreground">/100</span>
                </div>
                <Badge variant={getRiskColor(riskLevel) as any} className="mb-4">
                  {riskLevel.toUpperCase()} RISK
                </Badge>
                <Progress value={riskScore} className="h-3 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Your assessment indicates a {riskLevel} risk profile for PCOS and metabolic syndrome.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">PCOS Probability</span>
                    <span className="text-sm font-bold">{(pcosProbability * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={pcosProbability * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Metabolic Syndrome Risk</span>
                    <span className="text-sm font-bold">{(metabolicRisk * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={metabolicRisk * 100} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert if high risk or high uncertainty */}
        {riskLevel === "high" && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Clinical Consultation Recommended</AlertTitle>
            <AlertDescription>
              Based on your assessment, we strongly recommend consulting with a healthcare provider for further evaluation and personalized treatment options.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Key Contributing Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Key Contributing Factors
              </CardTitle>
              <CardDescription>
                Primary indicators influencing your risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyFactors.map((factor, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{factor.factor}</p>
                      <p className="text-xs text-muted-foreground">{factor.value}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        factor.impact === "High" ? "destructive" :
                        factor.impact === "Moderate" ? "secondary" : "outline"
                      } className="mb-1">
                        {factor.impact}
                      </Badge>
                      <p className="text-xs text-muted-foreground capitalize">{factor.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Physiological Constraints (PINN) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Physiological Validation
              </CardTitle>
              <CardDescription>
                Physics-informed constraint analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {physioConstraints.map((constraint, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{constraint.constraint}</p>
                      <p className="text-xs text-muted-foreground">Residual: {constraint.residual.toFixed(3)}</p>
                    </div>
                    <div>
                      {constraint.status === "normal" ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Info className="h-5 w-5 text-warning" />
                      )}
                    </div>
                  </div>
                ))}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    PINN residuals measure how well your data aligns with known physiological relationships. Low residuals indicate high confidence.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>
              Evidence-based next steps based on your assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Schedule Clinical Follow-up</p>
                  <p className="text-sm text-muted-foreground">
                    Consult with an endocrinologist or PCOS specialist for comprehensive evaluation and treatment planning.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Metabolic Panel Monitoring</p>
                  <p className="text-sm text-muted-foreground">
                    Regular monitoring of insulin resistance markers (HOMA-IR), lipid profile, and glucose tolerance recommended.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Lifestyle Modifications</p>
                  <p className="text-sm text-muted-foreground">
                    Evidence supports structured diet, exercise, and stress management for metabolic health improvement.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Information */}
        <Card className="mt-6 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-sm">Model Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Model Version</p>
                <p className="font-medium">GAN-PINN v2.1.0</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Training Dataset</p>
                <p className="font-medium">Public + Synthetic (n=12,453)</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Last Updated</p>
                <p className="font-medium">2025-10-15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
