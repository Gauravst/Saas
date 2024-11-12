'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { LogOut, MessageSquare } from 'lucide-react';

const page = () => {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const resetSettings = () => {
    setLanguage('en');
    setNotifications(true);
    setAutoSave(true);
    // Here you would typically reset other settings to their defaults
    // Note: Logout should be handled separately and not as part of reset
  };

  return (
    <div className="w-full">
      <Card className="bg-transparent border-2">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your settings preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <div className="flex flex-col gap-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications in Email.
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autosave">Auto-save</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save your conversion settings.
              </p>
            </div>
            <Switch
              id="autosave"
              checked={autoSave}
              onCheckedChange={setAutoSave}
            />
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => (window.location.href = '/dashboard/feedback')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Feedback
            </Button>
            <Button
              onClick={resetSettings}
              variant="outline"
              className="bg-transparent"
            >
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
