'use client'

import { useEffect, useRef } from 'react'

export function AdminLogoInjector() {
  const injectedRef = useRef(false)

  useEffect(() => {
    // Only run once per component mount
    if (injectedRef.current) {
      return
    }

    // Function to inject logo div above nav__wrap (only once)
    const injectLogo = () => {
      // Remove any existing logos first
      document.querySelectorAll('.obf-logo').forEach((logo) => logo.remove())

      // Find the element with class "nav__wrap"
      const navWrap = document.querySelector('.nav__wrap')
      
      if (!navWrap) {
        return
      }

      // Check if logo already exists
      if (document.querySelector('.obf-logo')) {
        return
      }

      // Create logo div element
      const logoContainer = document.createElement('div')
      logoContainer.className = 'obf-logo'
      logoContainer.setAttribute('data-obf-logo', 'true')
      logoContainer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 0.5rem;
        width: 100%;
        box-sizing: border-box;
      `

      // Create img element inside the div
      const logoImg = document.createElement('img')
      logoImg.src = '/logo.svg'
      logoImg.alt = 'One Big Future'
      logoImg.style.cssText = `
        height: 40px;
        width: auto;
        max-width: 100%;
      `

      // Add img to div
      logoContainer.appendChild(logoImg)

      // Insert div above nav__wrap
      if (navWrap.parentElement) {
        navWrap.parentElement.insertBefore(logoContainer, navWrap)
        injectedRef.current = true
      }
    }

    // Try to inject after DOM is ready
    const timeout = setTimeout(() => {
      injectLogo()
    }, 1000)

    return () => {
      clearTimeout(timeout)
      // Remove logo on cleanup
      document.querySelectorAll('.obf-logo').forEach((logo) => logo.remove())
      injectedRef.current = false
    }
  }, [])

  return null
}
