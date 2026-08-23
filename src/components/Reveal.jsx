import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 34,
  duration = 0.8,
  className,
  once = false,
  style,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-90px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function RevealGroup({ children, className, stagger = 0.09, delay = 0, once = false }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-90px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, y = 30, duration = 0.7 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
