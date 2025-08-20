
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
          <FileText className="w-8 h-8" />
          Terms of Service
        </h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By downloading, installing, or using VidRanker, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Description of Service</h2>
            <p className="text-muted-foreground">
              VidRanker is a mobile application that provides AI-powered tools for video content creators, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>SEO content generation (tags, titles, descriptions)</li>
              <li>Thumbnail generation and creation</li>
              <li>Content history and management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use the app in compliance with all applicable laws and regulations</li>
              <li>Not use the app for illegal, harmful, or inappropriate content</li>
              <li>Respect intellectual property rights when creating content</li>
              <li>Not attempt to reverse engineer or modify the app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Content Generation</h2>
            <p className="text-muted-foreground">
              While our AI generates content suggestions, you are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Reviewing and editing generated content before use</li>
              <li>Ensuring content compliance with platform terms of service</li>
              <li>Verifying accuracy and appropriateness of generated content</li>
              <li>Taking full responsibility for content you publish</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Intellectual Property</h2>
            <p className="text-muted-foreground">
              The VidRanker app, including its design, functionality, and original content, is owned by us and protected by copyright laws. 
              Content you generate using the app belongs to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              VidRanker is provided "as is" without warranties. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Any damages resulting from use of generated content</li>
              <li>Service interruptions or technical issues</li>
              <li>Loss of data or content</li>
              <li>Third-party actions or content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend access to our service at any time, with or without cause or notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms of Service from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, contact us at:
              <br />
              Email: support@vidranker.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
