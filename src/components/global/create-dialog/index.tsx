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
import { LoadingButton } from '@/components/ui/custom/loading-button';
import { createFile } from '@/actions/file';
import { redirect } from 'next/navigation';

interface TweetConverterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDialog({
  isOpen,
  onClose,
}: TweetConverterPopupProps) {
  const [tweetUrl, setTweetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = async () => {
    setLoading(false);
    setError('');
    setTweetUrl('');
    onClose();
  };

  const handleContinue = async () => {
    if (!tweetUrl.trim()) {
      setError('Please enter a tweet URL.');
      return;
    }

    setError('');
    setLoading(true);
    const newFile = await createFile({ tweetUrl });
    if (newFile.status !== 201 || !newFile.data) {
      await handleCancel();
      return;
    }

    await handleCancel();
    return redirect(`/dashboard/edit/${newFile.data.id}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] sm:max-w-[600px]">
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
              placeholder="https://x.com/your-username/status/1234543"
              className="w-full mt-1"
              required
            />
            {error && <p className="ml-1 text-red-500 text-sm mt-1">{error}</p>}{' '}
          </div>
        </div>
        <DialogFooter>
          {!loading ? (
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          ) : (
            ''
          )}
          <LoadingButton
            loading={loading}
            onClick={handleContinue}
            className="mb-3 sm:mb-0"
          >
            Continue
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
