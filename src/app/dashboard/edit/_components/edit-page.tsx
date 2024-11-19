'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BG_HTML_DEFAULT_CSS, COLOR, DEMO_HTML } from '@/constants';
import ImagePreviewCard from './image-preview-card';
import { FileProps } from '@/types/index.type';
import { useState } from 'react';

type Props = {
  data: FileProps;
};

const EditPage = ({ data }: Props) => {
  const handleDownloadClick = () => {};
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const [bgPadding, setBgPadding] = useState(data?.bgPadding);
  const [fgPadding, setFgPadding] = useState(data?.fgPadding);
  const [bgRadius, setBgRadius] = useState(data?.bgRadius);
  const [fgRadius, setFgRadius] = useState(data?.fgRadius);
  const [bgBackground, setBgBackground] = useState(data?.bgBackground);
  const [fgBackground, setFgBackground] = useState(data?.fgBackground);
  const [fgShadow, setFgShadow] = useState(data?.fgShadow);
  const [fgTransparency, setFgTransparency] = useState(data?.fgTransparency);

  const [hideDate, setHideDate] = useState(data?.hideDate);
  const [hideMetrics, setHideMetrics] = useState(data?.hideDate);
  const [hideLogo, setHideLogo] = useState(data?.hideLogo);

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

  const handleSliderChange = (newValue, setValue) => {
    setValue(newValue[0]);
    return;
  };

  return (
    <>
      <div className="grid grid-cols-2 w-full gap-8">
        <ImagePreviewCard data={newData} />

        <div className="px-8 grid">
          <div>
            <Label>Theme</Label>
            <div className="flex gap-3 mt-3">
              <Button className="rounded">Dark</Button>
              <Button className="rounded">Light</Button>
            </div>
          </div>

          <div className="mt-3">
            <Label>Background Padding</Label>
            <div className="flex gap-3 mt-3">
              <Slider
                defaultValue={[10]}
                max={20}
                step={1}
                onValueChange={(newValue) =>
                  handleSliderChange(newValue, setBgPadding)
                }
              />
            </div>
          </div>

          <div className="mt-3">
            <Label>Foreground Padding</Label>
            <div className="flex gap-3 mt-3">
              <Slider
                defaultValue={[10]}
                max={20}
                step={1}
                onValueChange={(newValue) =>
                  handleSliderChange(newValue, setFgPadding)
                }
              />
            </div>
          </div>

          <div className="mt-3">
            <Label>Background Radius</Label>
            <div className="flex gap-3 mt-3">
              <Slider
                defaultValue={[10]}
                max={20}
                step={1}
                onValueChange={(newValue) =>
                  handleSliderChange(newValue, setBgRadius)
                }
              />
            </div>
          </div>

          <div className="mt-3">
            <Label>Foreground Radius</Label>
            <div className="flex gap-3 mt-3">
              <Slider
                defaultValue={[10]}
                max={20}
                step={1}
                onValueChange={(newValue) =>
                  handleSliderChange(newValue, setFgRadius)
                }
              />
            </div>
          </div>

          <div className="mt-3">
            <Label>Border Radius</Label>
            <div className="flex gap-3 mt-3">
              <Slider defaultValue={[80]} max={100} step={1} />
            </div>
          </div>

          <div className="grid grid-cols-2 mt-2 ">
            <div className="flex gap-3 mt-4">
              <Checkbox />
              <Label>Hide Parent Tweet</Label>
            </div>

            <div className="flex gap-3 mt-4">
              <Checkbox />
              <Label>Hide Footer</Label>
            </div>

            <div className="flex gap-3 mt-4">
              <Checkbox />
              <Label>Hide Links</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between w-full">
        <div className="mt-5">
          <Label>Background Color</Label>
          <div className="flex gap-3 mt-3">
            {COLOR.map((option, index) => (
              <button
                key={index}
                className={`w-12 h-9 rounded border-2 ${selectedColor === option.color ? 'border-primary' : 'border-transparent'}`}
                style={{ background: option.color }}
                onClick={() => setSelectedColor(option.color)}
              ></button>
            ))}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white text-black h-10">
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup onValueChange={handleDownloadClick}>
              <DropdownMenuRadioItem value="720P">720P</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="1080P">1080P</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="4K">4K</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default EditPage;
