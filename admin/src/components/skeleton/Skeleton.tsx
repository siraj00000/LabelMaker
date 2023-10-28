import { Puff } from "react-loader-spinner";

type LoaderProps = {
    size?: number
}

const Loader: React.FC<LoaderProps> = ({size = 80}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 w-full h-4/5">
            <Puff
                height={size}
                width={size}
                radius={1}
                color="#14b8a6"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <h5 className="text-primaryDarkGray font-medium text-lg ml-4">Loading...</h5>
        </div>
    )
}

export default Loader;
