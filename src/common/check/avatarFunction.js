import { emblemGrade } from "../globalFunction"

export function checkEmblems(em) {
    if (em === null) {
        return (<div><span className="text-red-500">□</span><span className="text-red-500 ml-2">□</span></div>)
    } else if (em.length === 1) {
        return (
            <>
                {emblemGrade(em[0])}
                <span className="text-red-500">□</span>
            </>
        );
    } else if (em.length === 2) {
        return (
            <>
                {emblemGrade(em[0])}
                {emblemGrade(em[1])}
            </>
        );
    } else if (em.length === 3) {
        return (
            <>
                <div>
                    {emblemGrade(em[0])}
                </div>
                {emblemGrade(em[1])}
                {emblemGrade(em[2])}
            </>
        );
    }
}