import BaseNav from "../layouts/BaseNav";

const LoadingPage = () => {
    return (
        <div className="bg-[rgb(23,27,36)] overflow-auto min-h-screen flex justify-center items-center" style={{ backgroundColor: '#171b24 !important' }}>
            <BaseNav></BaseNav>
        </div>
    );
}

export default LoadingPage;