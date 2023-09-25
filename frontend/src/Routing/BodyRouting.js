import { Route, Routes } from 'react-router-dom'
import Body from './Body'
import LoginFlow from './LoginFlow'
import Login from '../pages/Authorization/Login'

const BodyRouting = () => {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="authorization/*" element={<LoginFlow />} />
            <Route exact path="dashboard/*" element={<Body />} />
        </Routes>
    )
}
export default BodyRouting