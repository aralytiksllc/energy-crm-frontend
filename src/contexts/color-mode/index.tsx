import { RefineThemes } from '@refinedev/antd';
import { ConfigProvider, theme } from 'antd';
import {
  type PropsWithChildren,
  createContext,
} from 'react';

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: () => {}, // No-op since we're forcing light mode
        mode: 'light',
      }}
    >
      <ConfigProvider
        theme={{
          ...RefineThemes.Blue,
          algorithm: defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
