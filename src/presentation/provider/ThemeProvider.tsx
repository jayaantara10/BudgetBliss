import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import {Theme, defaultTheme} from '../theme/Theme';
import {Appearance, ColorSchemeName} from 'react-native';
import {ColorScheme} from '../theme/ColorScheme';
import {Typography} from '../theme/Typography';
import {Sizing} from '../theme/Sizing';

// Make alias for theme context props
interface ThemeContextProps {
  theme: Theme;
  colors: ColorScheme;
  typography: Typography;
  spacing: Sizing;
  radius: Sizing;
  colorScheme: ColorSchemeName;
  toggleUseSystemTheme: () => void;
}

// Make alias for theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Make context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Make theme provider for provide theme apps
const ThemeProvider = ({children}: ThemeProviderProps) => {
  // init theme
  const theme: Theme = defaultTheme;

  // Init typography
  const typography: Typography = theme.typography;

  // Init state for is user want to use system theme or use app theme
  const [useSystemTheme, setUseSystemTheme] = useState<boolean>(false);

  // Init state color scheme state on theme that user choose or use
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme(),
  );

  // Init state colors satate base on color scheme
  const [colors, setColors] = useState<ColorScheme>(
    colorScheme === 'dark' ? theme.darkScheme : theme.lightScheme,
  );

  // Init Spacing
  const spacing: Sizing = theme.spacing;

  // Init radius
  const radius: Sizing = theme.radius;

  // For change use system theme state
  const toggleUseSystemTheme = () => {
    setUseSystemTheme(prevState => (prevState === true ? false : true));
  };

  // Handle appeareance change for theme
  const handleAppearanceChange = (preferences: {
    colorScheme: ColorSchemeName;
  }) => {
    setColorScheme(preferences.colorScheme);
    setColors(
      preferences.colorScheme === 'dark' ? theme.darkScheme : theme.lightScheme,
    );
  };

  // Setup listener for appearance change
  useEffect(() => {
    const subscription = Appearance.addChangeListener(handleAppearanceChange);
    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        typography,
        spacing,
        radius,
        colorScheme,
        toggleUseSystemTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Make use theme instance for access provider state in any screens
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    const errorMessage =
      "Theme Error: 'useTheme' must be used within a ThemeProvider";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return context;
};

export default ThemeProvider;
