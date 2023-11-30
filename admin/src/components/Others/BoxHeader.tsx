type BoxHeaderProps = { title: string }

const BoxHeader: React.FC<BoxHeaderProps> = ({ title }) => (
    <div className="flex items-center justify-end gap-2 w-full rounded-t-xl bg-whtie py-5 px-5">
        <div className="mr-auto">
            <h1 className="text-xl font-medium text-primaryDarkGray capitalize">{title}</h1>
            <p className="text-xs text-primaryDarkGray mt-2">
                {`${title} and necessary information from here`}
            </p>
        </div>

    </div>
)

export default BoxHeader