"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

let toastCount = 0

// 전역 상태로 토스트 관리
let globalSetToasts: React.Dispatch<React.SetStateAction<Toast[]>> | null = null

export const useToast = () => {
  const show = (message: string, type: Toast['type'] = 'info') => {
    if (globalSetToasts) {
      const id = toastCount++
      globalSetToasts(prev => [...prev, { id, message, type }])

      // 3초 후 자동으로 제거
      setTimeout(() => {
        globalSetToasts(prev => prev.filter(toast => toast.id !== id))
      }, 3000)
    }
  }

  return { show }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    globalSetToasts = setToasts
    return () => {
      globalSetToasts = null
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`mb-2 p-4 rounded-lg shadow-lg text-white ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 