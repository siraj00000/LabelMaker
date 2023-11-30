import React from 'react'
import { LabelDetails } from '../types/response.types'
import ReportErrorForm from './_components/ReportErrorForm'

type Props = {
  searchParams: LabelDetails
}
const page = ({ searchParams }: Props) => {
  return (
    <div>
      <ReportErrorForm {...searchParams} />
    </div>
  )
}

export default page
