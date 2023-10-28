import React from 'react'
import SearchInput from '../../Fields/SearchInput'

type OptionSectionProps = {
    title: string
}

const OptionSection:React.FC<OptionSectionProps> = ({title}) => {
  return (
    <div>
      <SearchInput title={title} />
    </div>
  )
}

export default OptionSection
