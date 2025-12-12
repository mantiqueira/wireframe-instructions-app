import { ReactNode, useEffect, useState } from 'react'
import styles from './PageTransition.module.css'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn')

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('fadeOut')
    }
  }, [children, displayChildren])

  const onTransitionEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayChildren(children)
      setTransitionStage('fadeIn')
    }
  }

  return (
    <div
      className={`${styles.transitionContainer} ${styles[transitionStage]}`}
      onAnimationEnd={onTransitionEnd}
    >
      {displayChildren}
    </div>
  )
}
