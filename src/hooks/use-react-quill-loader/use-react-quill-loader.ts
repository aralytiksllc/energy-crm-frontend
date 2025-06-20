// External imports
import { useMemo } from 'react';

// Internal imports
import { useAsyncModuleLoader } from '../use-async-module-loader';

// Types
interface ReactQuillModule {
  component: any;
  isAvailable: boolean;
}

// ReactQuill loader function
const loadReactQuill = async (): Promise<ReactQuillModule> => {
  try {
    const [quillModule] = await Promise.all([
      import('react-quill'),
      import('react-quill/dist/quill.snow.css'),
    ]);

    return {
      component: quillModule.default,
      isAvailable: true,
    };
  } catch (error) {
    console.warn('react-quill not available, falling back to textarea');
    return {
      component: null,
      isAvailable: false,
    };
  }
};

export function useReactQuillLoader() {
  const { data, isLoading, error, isInitialized, load, reset } =
    useAsyncModuleLoader(loadReactQuill);

  // Auto-load on first render
  useMemo(() => {
    if (!isInitialized && !isLoading) {
      load().catch(() => {
        // Error is already handled by the reducer
      });
    }
  }, [isInitialized, isLoading, load]);

  return {
    ReactQuill: data?.component || null,
    isQuillAvailable: data?.isAvailable ?? null,
    isLoading: isLoading || !isInitialized,
    error,
    reload: load,
    reset,
  };
}
