'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TweetConverterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConvert: (tweetUrl: string) => void;
}

export default function CreateDialog({
  isOpen,
  onClose,
  onConvert,
}: TweetConverterPopupProps) {
  const [tweetUrl, setTweetUrl] = useState('');

  const handleContinue = () => {
    onConvert(tweetUrl);
    setTweetUrl('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Convert Tweet to Image</DialogTitle>
          <DialogDescription>
            Paste the URL of the tweet you want to convert to an image.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full items-center gap-4">
            <Label htmlFor="tweetUrl" className="text-right">
              URL
            </Label>
            <Input
              id="tweetUrl"
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              placeholder="https://twitter.com/..."
              className="w-full mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
