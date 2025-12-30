import { isRAGE } from "./helpers";
import { useCommonStore } from "./stores/common";
import React, { useEffect } from "react";
import * as apps from "./apps";
import clsx from "clsx";
import { AppWindow, SideBar } from "./components/layout";
import { Hooks } from "./hooks";

const App: React.FC = () => {
  const activeApps = useCommonStore((state) => state.activeApps);
  const zOrder = useCommonStore((state) => state.zOrder);
  const { setAppStatus } = useCommonStore();
  
  
  useEffect(() => {

    const showApp = (app: string) => {
      try {
        setAppStatus(app, true);
      } catch (err) {
        console.error(err);
      }
    };

    const hideApp = (app: string) => {
      console.log("hide app", app);
      try {
        setAppStatus(app, false);
      } catch (err) {
        console.error(err);
      }
    };

    const toggleApp = (app: string, toggle: boolean) => {
      console.log(app, toggle);
      if (toggle) {
        showApp(app);
      } else {
        hideApp(app);
      }
    };

    if (isRAGE()) {
      mp.trigger("CLIENT_BROWSER_INITIALIZE");

      mp.events.add("CEF_BROWSER_TOGGLE", toggleApp);

      return () => {
        mp.events.remove("CEF_BROWSER_TOGGLE");
      };
    }
  }, []);


  return (
    <div
      className={clsx(
        "h-screen w-full select-none overflow-hidden",
        !isRAGE() && "bg-[url('/background.png')] bg-cover"
      )}
    >      
      <Hooks />
      <SideBar />

      {zOrder
        .filter((appName) => activeApps.includes(appName))
        .map((appName, idx) => {
          const BASE_ZINDEX = 100;
          const zIndex = BASE_ZINDEX + idx;
          const Component = (apps as any)[appName];
          if (!Component) return null;
          return (
            <AppWindow
              key={`${appName}<->${idx}`}
              name={appName}
              zIndex={zIndex}
            >
              <Component />
            </AppWindow>
          );
        })}
    </div>
  );
};

export default App;
