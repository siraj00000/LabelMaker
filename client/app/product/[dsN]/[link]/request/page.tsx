import ReqHelpForm from "./_component/ReqHelpForm";

type Props = {
    params: {
        dsN: string;
        link: string;
    }
}

const page: React.FC<Props> = ({ params }) => {
    return (
        <div>
            <ReqHelpForm {...params} />
        </div>
    )
}

export default page
