import { Route, Routes } from 'react-router-dom'
import Body from './Body'

const BodyRouting = () => {
    return (
        <Routes>
            <Route exact path="dashboard/*" element={<Body />} />
        </Routes>
    )
}
export default BodyRouting