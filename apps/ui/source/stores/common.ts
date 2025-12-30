import { create } from 'zustand';

interface CommonStore {
    sideBar: boolean;
    activeApps: string[];
    zOrder: string[];

    setAppStatus: (app: string, status: boolean) => void;
    focusApp: (app: string) => void;
    toggleSideBar: () => void;

}

export const useCommonStore = create<CommonStore>(set => ({
    sideBar: false,
    activeApps: [],
    zOrder: [],

    setAppStatus: (app, status) =>
        set(state => {
            let nextActive = state.activeApps;
            let nextZOrder = state.zOrder;

            if (status) {
                if (!state.activeApps.includes(app)) {
                    nextActive = [...state.activeApps, app];
                    nextZOrder = [...state.zOrder.filter(a => a !== app), app];
                }
            } else {
                nextActive = state.activeApps.filter(a => a !== app);
                nextZOrder = state.zOrder.filter(a => a !== app);
            }

            return { activeApps: nextActive, zOrder: nextZOrder };
        }),

    focusApp: app =>
        set(state => ({
            zOrder: [...state.zOrder.filter(a => a !== app), app],
        })),

    toggleSideBar: () => set(state => ({ sideBar: !state.sideBar })),
}));
