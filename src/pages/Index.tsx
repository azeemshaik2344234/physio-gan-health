import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Brain,
  Database,
  Shield,
  TrendingUp,
  Microscope,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="container relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              AI-Powered Clinical Assessment
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Advanced PCOS & Metabolic Syndrome Prediction
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Production-ready system combining Generative Adversarial Networks (GANs) and
              Physics-Informed Neural Networks (PINNs) for robust, explainable risk assessment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary" onClick={() => window.location.href = "/assessment"}>
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why This System is Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge ML architecture designed for clinical robustness and interpretability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-card transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Physics-Informed Neural Networks</CardTitle>
                <CardDescription>
                  Enforces known physiological relationships (hormone dynamics, insulin-glucose
                  interactions) as soft constraints for biologically plausible predictions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-card transition-shadow">
              <CardHeader>
                <Database className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>GAN-Based Data Augmentation</CardTitle>
                <CardDescription>
                  Generates realistic synthetic clinical records to balance classes, improve
                  generalization, and protect privacy while expanding training data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-card transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-success mb-4" />
                <CardTitle>Continuous Learning Pipeline</CardTitle>
                <CardDescription>
                  Fine-tunes on consented user data with automated retraining, calibration
                  monitoring, and clinician feedback loops.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Technical Excellence</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built on Proven ML Research
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Microscope,
                    title: "Validated on Public Datasets",
                    desc: "Pretrained on large-scale clinical PCOS datasets with established benchmarks",
                  },
                  {
                    icon: Shield,
                    title: "HIPAA-Compliant Architecture",
                    desc: "De-identification, encryption at rest, audit logs, and consent management",
                  },
                  {
                    icon: Activity,
                    title: "Explainable Predictions",
                    desc: "SHAP values, feature importance, PINN residuals, and clinician-friendly explanations",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Calibrated Risk Scores",
                    desc: "Probability calibration ensures predicted risks match observed frequencies",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-overlay border-2">
              <h3 className="text-2xl font-bold text-foreground mb-6">System Architecture</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Data Pipeline</span>
                    <span className="text-sm text-muted-foreground">Ingestion → Harmonization</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">GAN Augmentation</span>
                    <span className="text-sm text-muted-foreground">Synthetic Generation</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">PINN Training</span>
                    <span className="text-sm text-muted-foreground">Constraint Enforcement</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Model Serving</span>
                    <span className="text-sm text-muted-foreground">Inference + Monitoring</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-primary"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Model Version:</strong> GAN-PINN v2.1.0
                  <br />
                  <strong className="text-foreground">Training Dataset:</strong> Public + Synthetic
                  (n=12,453)
                  <br />
                  <strong className="text-foreground">AUC-ROC:</strong> 0.89 | <strong className="text-foreground">Calibration:</strong> Brier 0.12
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Get Your Risk Assessment?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Complete our comprehensive clinical assessment in under 10 minutes. All data is
            securely encrypted and de-identified.
          </p>
          <Button size="lg" variant="secondary" onClick={() => window.location.href = "/assessment"}>
            Start Clinical Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">About</h3>
              <p className="text-sm text-muted-foreground">
                Advanced clinical ML system for PCOS and metabolic syndrome prediction using
                state-of-the-art GAN and PINN architectures.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Research Papers</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Model Card</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>HIPAA Compliance</li>
                <li>Data Protection</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 GAN-PINN Clinical Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
