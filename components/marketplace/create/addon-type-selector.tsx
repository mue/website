import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddonType } from './types';

type AddonTypeSelectorProps = {
  value: AddonType;
  onChange: (value: AddonType) => void;
};

export function AddonTypeSelector({ value, onChange }: AddonTypeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Addon Type</CardTitle>
        <CardDescription>Select the type of addon you want to create</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="photos">Photo Pack</SelectItem>
            <SelectItem value="quotes">Quote Pack</SelectItem>
            <SelectItem value="settings">Preset Settings</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
