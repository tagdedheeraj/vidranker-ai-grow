
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ThumbnailGenerationStatusProps {
  status: string;
  isGenerating: boolean;
}

export const ThumbnailGenerationStatus = ({ status, isGenerating }: ThumbnailGenerationStatusProps) => {
  if (!status) return null;

  const getIcon = () => {
    if (isGenerating) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (status.includes('✅')) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status.includes('❌')) return <AlertCircle className="w-4 h-4 text-red-600" />;
    return <Loader2 className="w-4 h-4 animate-spin" />;
  };

  const getStatusColor = () => {
    if (status.includes('✅')) return 'border-green-200 bg-green-50/50 text-green-700';
    if (status.includes('❌')) return 'border-red-200 bg-red-50/50 text-red-700';
    return 'border-blue-200 bg-blue-50/50 text-blue-700';
  };

  return (
    <Card className={`glass ${getStatusColor()}`}>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 text-sm">
          {getIcon()}
          <span>{status}</span>
        </div>
      </CardContent>
    </Card>
  );
};
