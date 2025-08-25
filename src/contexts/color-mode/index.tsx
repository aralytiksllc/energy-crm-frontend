import { RefineThemes } from '@refinedev/antd';
import { ConfigProvider, theme } from 'antd';
import { type PropsWithChildren, createContext } from 'react';

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
        setMode: () => {},
        mode: 'light',
      }}
    >
      <ConfigProvider
        theme={{
          ...RefineThemes.Blue,
          algorithm: defaultAlgorithm,
          token: {
            // colorPrimary: '#111111',
            motionDurationMid: '0.24s',
            motionEaseInOut: 'cubic-bezier(0.2, 0, 0, 1)',
          },
          components: {
            Menu: {
              itemHeight: 40,
              itemBorderRadius: 12,
              itemSelectedBg: RefineThemes.Blue.token?.colorPrimary,
              itemSelectedColor: '#ffffff',
              colorSplit: 'transparent',
            },
            Card: { borderRadiusLG: 12, paddingSM: 12 },
            Button: { controlHeight: 40, borderRadius: 999 },
            Dropdown: { borderRadiusLG: 12 },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
