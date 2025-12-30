import React, { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useCommonStore } from '../../stores/common';

interface AppWindowProps {
  name: string;
  zIndex: number;
  children: React.ReactNode;
}

export const AppWindow: React.FC<AppWindowProps> = React.memo(
  ({ name, zIndex, children }) => {
    const focusApp = useCommonStore(state => state.focusApp);
    const handleMouseDown = useCallback(() => {
      focusApp(name);
    }, [focusApp, name]);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <div
        className={clsx(
          'fixed left-0 top-0 h-screen w-screen overflow-hidden pointer-events-auto transition-opacity duration-200 ease-in-out',
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.2]'
        )}
        style={{ zIndex }}
        onMouseDown={handleMouseDown}
      >
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    );
  }
);

AppWindow.displayName = 'AppWindow';
