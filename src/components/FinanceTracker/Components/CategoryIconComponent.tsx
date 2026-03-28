import * as Icons from '@assets/SVG';
import React, { memo, useMemo } from 'react';

export type IconName = keyof typeof Icons;

type Props = {
  icon_name?: IconName;
  size?: number;
  color?: string;
};

const DEFAULT_ICON: IconName = 'Default';

const CategoryIconComponent = ({
  icon_name,
  size = 45,
  color = '#000',
}: Props) => {
  console.log('🚀 ~ CategoryIconComponent ~ icon_name:', icon_name);
  const IconComponent = useMemo(() => {
    if (!icon_name || !(icon_name in Icons)) {
      return Icons[DEFAULT_ICON];
    }

    return Icons[icon_name];
  }, [icon_name]);

  return <IconComponent height={size} width={size} color={color} />;
};

export const CategoryIcon = memo(CategoryIconComponent);
