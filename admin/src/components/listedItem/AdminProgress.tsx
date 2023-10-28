
const AdminProgress = ({ data }: any) => {

    const listing = data?.map((item: any, index: any) => (
        <div key={index} className="flex items-center justify-between text-sm text-primaryDarkGray capitalize">
            <h4>{item.name}</h4>
            <h4>{item.progress} %</h4>
        </div>
    ))

    return (
        <div className="pt-10 h-36 overflow-y-auto">
            {listing}
        </div>
    )
}

export default AdminProgress
