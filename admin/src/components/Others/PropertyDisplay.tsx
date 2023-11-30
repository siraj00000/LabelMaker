type PropertyDisplayProps = {
    label: string;
    value: string
}

const PropertyDisplay: React.FC<PropertyDisplayProps> = ({ label, value }) => (
    <div className="">
        <h1 className="text-md font-medium text-primaryDarkGray">{value}</h1>
        <h1 className="text-xs font-medium text-gray-400">{label}</h1>
    </div>
)

export default PropertyDisplay