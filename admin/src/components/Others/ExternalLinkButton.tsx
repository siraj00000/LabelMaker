import { NavLink } from "react-router-dom"

type Props = {
    label: string,
    navTo: string,
}

const ExternalLinkButton: React.FC<Props> = ({ label, navTo }) => (
    <div className="space-y-2">
        <NavLink to={navTo} target="_blank" className="bg-primaryDarkGray py-1 px-4 text-xs text-white rounded-md">
            Visit
        </NavLink>
        <h1 className="text-xs font-medium text-gray-400">{label}</h1>
    </div>
)

export default ExternalLinkButton