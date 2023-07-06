import { Route, Routes } from 'react-router-dom'
import Body from '../pages/Dashboard/Body'

const BodyRouting = (porps) => {
    return (
        <Routes>
            <Route exact path="dashboard/*" element={
                <Body />
            }>
            </Route>
        </Routes>
    )
}
export default BodyRouting