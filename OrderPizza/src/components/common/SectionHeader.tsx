type ComponentProps = {
  children: React.ReactNode,
}

const SectionHeader = ({children}: ComponentProps) => {
  return (
    <h3>{children}</h3>
  )
}

export default SectionHeader