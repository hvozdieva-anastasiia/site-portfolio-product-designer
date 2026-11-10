import { toggleTheme, useTheme } from '../../../lib/theme';
import { MoonIcon, SunIcon } from '../../atoms/Icon/Icon';
import { Key } from '../../atoms/Key/Key';

/** Switches between the light and dark theme. The D key does the same. */
export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <Key
      variant="icon"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      aria-keyshortcuts="D"
      title={`Switch to ${next} theme (D)`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Key>
  );
}
