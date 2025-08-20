
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/settings">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Link>
        </Button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Shield className="w-8 h-8" />
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground mb-3">
              VidRanker is designed with privacy in mind. We collect minimal information to provide our services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Content you generate (SEO tags, titles, descriptions, thumbnails) - stored locally on your device</li>
              <li>Usage analytics to improve app performance (anonymized)</li>
              <li>Crash reports to fix bugs and improve stability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To provide and maintain our service</li>
              <li>To improve user experience and app functionality</li>
              <li>To display relevant advertisements (through AdMob)</li>
              <li>To analyze usage patterns and optimize performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Storage</h2>
            <p className="text-muted-foreground">
              Your generated content (SEO data and thumbnails) is stored locally on your device using browser local storage. 
              This data is not transmitted to our servers and remains private to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground mb-3">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Google AdMob:</strong> For displaying advertisements</li>
              <li><strong>Hugging Face API:</strong> For AI-powered content generation</li>
              <li><strong>Capacitor:</strong> For mobile app functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Access your locally stored data through the app's History section</li>
              <li>Delete your data by clearing the app's storage or using the "Clear All" function</li>
              <li>Request information about data collection practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@vidranker.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
