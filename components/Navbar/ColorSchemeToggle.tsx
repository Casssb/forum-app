import { Menu, useMantineColorScheme } from '@mantine/core';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Menu.Item
      icon={colorScheme === 'dark' ? <IconSunFilled size={14} /> : <IconMoonFilled size={14} />}
      onClick={() => toggleColorScheme()}
    >
      Dark/Light
    </Menu.Item>
  );
}
