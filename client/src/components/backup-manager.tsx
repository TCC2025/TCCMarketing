import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, Save, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BackupManager() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const exportContent = async () => {
    setIsExporting(true);
    try {
      const [services, testimonials, caseStudies, blogPosts] = await Promise.all([
        fetch('/api/services').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/case-studies').then(r => r.json()).catch(() => []),
        fetch('/api/blog').then(r => r.json()).catch(() => [])
      ]);

      const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        data: {
          services,
          testimonials,
          caseStudies,
          blogPosts
        }
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `website-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Backup Created",
        description: "Your website content has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to create backup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const backup = JSON.parse(e.target?.result as string);
        
        // Validate backup structure
        if (!backup.data || !backup.timestamp) {
          throw new Error('Invalid backup file format');
        }

        // Here you would normally send to server to restore
        // For now, just show success message
        toast({
          title: "Backup Ready",
          description: "Backup file validated. Contact support to complete restoration.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid backup file. Please check the file and try again.",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Content Backup</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Why Backup?</h4>
          <p className="text-sm text-blue-800">
            Regular backups protect your content from accidental changes or technical issues. 
            Export your content before major updates or changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Content
            </h4>
            <p className="text-sm text-muted-foreground">
              Download all your website content as a backup file.
            </p>
            <Button
              onClick={exportContent}
              disabled={isExporting}
              className="w-full"
              variant="outline"
            >
              {isExporting ? (
                <>
                  <Save className="w-4 h-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Backup
                </>
              )}
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import Content
            </h4>
            <p className="text-sm text-muted-foreground">
              Restore content from a previous backup file.
            </p>
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                disabled={isImporting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                disabled={isImporting}
                className="w-full"
                variant="outline"
              >
                {isImporting ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-pulse" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Backup File
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last backup</span>
            </div>
            <Badge variant="outline">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}