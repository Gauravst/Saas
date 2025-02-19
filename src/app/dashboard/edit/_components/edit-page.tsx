'use client';
import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { COLOR } from '@/constants';
import ImagePreviewCard from './image-preview-card';
import { FileProps } from '@/types/index.type';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Record } from '@prisma/client/runtime/library';
import { Switch } from '@/components/ui/switch';
// import { Sync } from 'lucide-react';
import { syncFileWithTweet } from '@/actions/file';

type Props = {
  data: FileProps;
};

const EditPage = ({ data: initialData }: Props) => {
  const [data, setData] = useState(initialData);
  const preferences = data?.preferences;
  const [syncLoading, setSyncLoading] = useState(false);

  const [bgPadding, setBgPadding] = useState(preferences.bgPadding);
  const [fgPadding, setFgPadding] = useState(preferences.fgPadding);
  const [bgRadius, setBgRadius] = useState(preferences.bgRadius);
  const [fgRadius, setFgRadius] = useState(preferences.fgRadius);
  const [bgBackground, setBgBackground] = useState(preferences.bgBackground);
  const [fgBackground, setFgBackground] = useState(preferences.fgBackground);
  const [fgShadow, setFgShadow] = useState(preferences.fgShadow);
  const [fgTransparency, setFgTransparency] = useState(
    preferences.fgTransparency
  );

  const [hideDate, setHideDate] = useState(preferences.hideDate);
  const [hideMetrics, setHideMetrics] = useState(preferences.hideMetrics);
  const [hideLogo, setHideLogo] = useState(preferences.hideLogo);

  useEffect(() => {
    if (data?.preferences) {
      setBgPadding(data.preferences.bgPadding);
      setFgPadding(data.preferences.fgPadding);
      setBgRadius(data.preferences.bgRadius);
      setFgRadius(data.preferences.fgRadius);
      setBgBackground(data.preferences.bgBackground);
      setFgBackground(data.preferences.fgBackground);
      setFgShadow(data.preferences.fgShadow);
      setFgTransparency(data.preferences.fgTransparency);
      setHideDate(data.preferences.hideDate);
      setHideMetrics(data.preferences.hideMetrics);
      setHideLogo(data.preferences.hideLogo);
    }
  }, [data]);

  const paddingOptions: Record<string, string> = {
    '2': 'Low',
    '4': 'Medium',
    '6': 'High',
  };

  const radiusOptions: Record<string, string> = {
    sm: 'Low',
    lg: 'Medium',
    '2xl': 'High',
  };

  const newData = {
    ...data,
    preferences: {
      ...data.preferences,
      bgPadding: bgPadding,
      fgPadding: fgPadding,
      bgRadius: bgRadius,
      fgRadius: fgRadius,
      bgBackground: bgBackground,
      fgBackground: fgBackground,
      fgShadow: fgShadow,
      fgTransparency: fgTransparency,
      hideDate: hideDate,
      hideMetrics: hideMetrics,
      hideLogo: hideLogo,
    },
  };

  const handleSelectChnage = (newValue: string, setValue: any) => {
    if (
      setValue === setFgPadding ||
      setValue === setBgPadding ||
      setValue === setBgBackground ||
      setValue === setFgBackground ||
      setValue === setFgTransparency
    ) {
      const value = Number(newValue);
      setValue(value);
    }

    if (
      setValue === setFgRadius ||
      setValue === setBgRadius ||
      setValue === setFgShadow
    ) {
      setValue(newValue);
    }
    return;
  };

  const handleCheckboxChange = (checked: boolean, setValue: any) => {
    setValue(checked);
    return;
  };

  const handleBGBackgroundChange = (value: string) => {
    setBgBackground((prev) => ({
      ...prev,
      key: value,
    }));

    return;
  };

  const handleOnSyncClick = async () => {
    setSyncLoading(true);
    const syncData = await syncFileWithTweet(data?.id);
    setData((prev) => ({
      ...prev,
      data: syncData,
    }));
    setSyncLoading(false);
  };

  const captureRef = useRef(null);
  const handleDownloadClick = async (value: string) => {
    const scale = Number(value);
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        scale: scale,
      });

      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'screenshot.png';
      link.click();

      console.log('Screenshot captured!');
    } catch (error) {
      console.error('Screenshot failed', error);
    }
  };

  return (
    <>
      <div className="flex w-full gap-8 overflow-hidden">
        <div
          className={`h-[430px] scrollbar-hide w-1/2 overflow-y-auto rounded-${bgRadius}`}
        >
          <ImagePreviewCard data={newData} ref={captureRef} />
        </div>

        <div className="w-1/2">
          <div className="flex ">
            <div className="flex flex-col gap-4">
              <Label>Theme</Label>
              <div className="flex gap-3 items-center">
                <Label htmlFor="mode-toggle">Light</Label>
                <Switch className="" id="mode-toggle" />
                <Label htmlFor="mode-toggle">Dark</Label>
              </div>
            </div>
            <div className="flex gap-4 ml-auto">
              <div></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white text-black h-10"
                  >
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Download Quality</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    onValueChange={(value) => handleDownloadClick(value)}
                  >
                    <DropdownMenuRadioItem value="1">1x</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2">2x</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3">3x</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col w-full overflow-hidden mt-6 justify-start items-start ml-auto">
            <div className="flex justify-start gap-6 items-center mt-6 w-full">
              <div className="flex flex-col gap-2">
                <Label>Foreground Padding</Label>
                <Select
                  defaultValue={`${fgPadding}`}
                  onValueChange={(value) =>
                    handleSelectChnage(value, setFgPadding)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    {paddingOptions[fgPadding] || 'Select'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2">Low</SelectItem>
                      <SelectItem value="4">Medium</SelectItem>
                      <SelectItem value="6">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Background Padding</Label>
                <Select
                  defaultValue={`${bgPadding}`}
                  onValueChange={(value) =>
                    handleSelectChnage(value, setBgPadding)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    {paddingOptions[bgPadding] || 'Select'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2">Low</SelectItem>
                      <SelectItem value="4">Medium</SelectItem>
                      <SelectItem value="6">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-start gap-6 items-center mt-6 w-full">
              <div className="flex flex-col gap-2">
                <Label>Foreground Radius</Label>
                <Select
                  defaultValue={`${fgRadius}`}
                  onValueChange={(value) =>
                    handleSelectChnage(value, setFgRadius)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    {radiusOptions[fgRadius] || 'Select'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="sm">Low</SelectItem>
                      <SelectItem value="lg">Medium</SelectItem>
                      <SelectItem value="2xl">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Background Radius</Label>
                <Select
                  defaultValue={`${bgRadius}`}
                  onValueChange={(value) =>
                    handleSelectChnage(value, setBgRadius)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    {radiusOptions[bgRadius] || 'Select'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="sm">Low</SelectItem>
                      <SelectItem value="lg">Medium</SelectItem>
                      <SelectItem value="2xl">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-2">
                <Label>BG Background</Label>
                <Select
                  defaultValue={`${data.preferences.bgBackground.key}`}
                  onValueChange={handleBGBackgroundChange}
                >
                  <SelectTrigger className="w-[180px]">
                    {COLOR.find((obj) => obj.key === bgBackground.key)?.name ||
                      'Select'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {COLOR.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.key}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <Checkbox
                  id="hideDate"
                  checked={hideDate}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange(checked, setHideDate)
                  }
                />
                <Label htmlFor="hideDate" className="text-sm">
                  Hide Date
                </Label>
              </div>

              <div className="flex gap-2">
                <Checkbox
                  id="hideLogo"
                  checked={hideLogo}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange(checked, setHideLogo)
                  }
                />
                <Label htmlFor="hideLogo" className="text-sm">
                  Hide Logo
                </Label>
              </div>

              <div className="flex gap-2 items-center">
                <Checkbox
                  id="hideMetrics"
                  checked={hideMetrics}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange(checked, setHideMetrics)
                  }
                />
                <Label htmlFor="hideMetrics" className="text-sm">
                  Hide Metrics
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPage;
