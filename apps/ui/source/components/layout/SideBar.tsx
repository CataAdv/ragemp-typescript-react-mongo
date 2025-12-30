"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as apps from "../../apps"
import { useCommonStore } from "@/stores"
import { isRAGE } from "@/helpers"

const APP_ICONS: Record<string, string> = {
  Test: "∑",
  Calendar: "◐",
  Notes: "≡",
  Terminal: "⌘",
  Browser: "◈",
  Music: "♪",
  Photos: "◇",
  Settings: "⚙",
}

export const SideBar: React.FC = () => {
  const sideBar = useCommonStore((state) => state.sideBar)
  const activeApps = useCommonStore((state) => state.activeApps)
  const setAppStatus = useCommonStore((state) => state.setAppStatus)
  const toggleSideBar = useCommonStore((state) => state.toggleSideBar)

  useEffect(() => {
    if (isRAGE()) return
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        toggleSideBar();
      }
    }
    window.addEventListener("keyup", onKeyUp)
    return () => window.removeEventListener("keyup", onKeyUp)
  }, [toggleSideBar])

  return (
    <AnimatePresence>
      {sideBar && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[9998] bg-[#000000]/60 backdrop-blur-md"
            onClick={toggleSideBar}
          />

          <div className="pointer-events-none fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh]">
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 0.3 },
              }}
              className="pointer-events-auto w-[680px]"
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#ffffff]/10 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#050505] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
                <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent opacity-60" />

                <div className="relative border-b border-[#ffffff]/5 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-2xl font-light tracking-tight text-[#ffffff]"
                      >
                        Application Launcher
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-1 text-sm text-[#a3a3a3]"
                      >
                        Select your workspace environment
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffffff]/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]"
                    >
                      <span className="font-mono text-lg font-bold text-[#ffffff]">{activeApps.length}</span>
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(apps).map(([name], idx) => {
                      const isActive = activeApps.includes(name)
                      const icon = APP_ICONS[name] || "◆"

                      return (
                        <motion.button
                          key={name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 * idx,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppStatus(name, !isActive)}
                          className="group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300"
                          style={{
                            borderColor: isActive ? "#ffffff20" : "#ffffff08",
                            background: isActive
                              ? "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)"
                              : "linear-gradient(135deg, #171717 0%, #0f0f0f 100%)",
                          }}
                        >
                          {!isActive && (
                            <div
                              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{
                                background:
                                  "radial-gradient(circle at center, rgba(167, 139, 250, 0.08) 0%, transparent 70%)",
                              }}
                            />
                          )}

                          <div className="relative z-10 flex items-start justify-between">
                            <div className="flex-1">
                              <motion.div
                                animate={isActive ? { rotate: [0, 10, 0] } : {}}
                                transition={{ duration: 0.5 }}
                                className="mb-3 text-4xl opacity-90"
                                style={{ color: isActive ? "#0a0a0a" : "#737373" }}
                              >
                                {icon}
                              </motion.div>

                              <h3
                                className="text-lg font-semibold tracking-tight transition-colors"
                                style={{ color: isActive ? "#0a0a0a" : "#ffffff" }}
                              >
                                {name}
                              </h3>

                              <p
                                className="mt-0.5 text-xs transition-colors"
                                style={{ color: isActive ? "#525252" : "#737373" }}
                              >
                                {isActive ? "Active" : "Inactive"}
                              </p>
                            </div>

                            <motion.div
                              animate={
                                isActive
                                  ? {
                                      scale: [1, 1.2, 1],
                                      opacity: [1, 0.8, 1],
                                    }
                                  : {}
                              }
                              transition={
                                isActive
                                  ? {
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                    }
                                  : {}
                              }
                              className="mt-1 h-2 w-2 rounded-full"
                              style={{
                                background: isActive ? "linear-gradient(135deg, #0a0a0a 0%, #404040 100%)" : "#262626",
                              }}
                            />
                          </div>

                          {isActive && (
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: "200%" }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                                repeatDelay: 3,
                              }}
                              className="absolute inset-0 w-1/3"
                              style={{
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                              }}
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-[#ffffff]/5 px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]"
                      />
                      <p className="text-sm text-[#737373]">
                        Press{" "}
                        <kbd className="rounded border border-[#ffffff]/10 bg-[#1a1a1a] px-2 py-0.5 font-mono text-xs text-[#a3a3a3]">
                          Shift
                        </kbd>{" "}
                        to toggle
                      </p>
                    </div>

                    <button
                      onClick={toggleSideBar}
                      className="text-sm text-[#737373] transition-colors hover:text-[#ffffff]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
