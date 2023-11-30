import { LabelDetails } from '@/app/types/response.types'
import Link from 'next/link'
import React from 'react'

const ReportError: React.FC<LabelDetails> = ({ brand_id, product_id }) => {

    return (
        <aside className="w-full flex items-center">
            <Link
                href={{
                    pathname: '/report',
                    query: {
                        brand_id,
                        product_id
                    }
                }}
                className="w-3/5 rounded-xl text-center font-nunito700 text-secondary shadow-shadowGray border bg-black text-white hover:scale-110 hover:delay-300 drop-shadow-xl border-transparent p-2 px-5 mx-auto"
            >Report Error</Link>
        </aside>
    )
}

export default ReportError
