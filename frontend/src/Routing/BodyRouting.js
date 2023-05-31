import { Route, Routes } from 'react-router-dom'
import Body from '../pages/Dashboard/Body'

const BodyRouting = (porps) => {
    return (
        <Routes>
            <Route exact path="dashboard/*" element={
                <Body
                    isAddExpensePopupTriggered={porps.isAddExpensePopupTriggered}
                    setIsAddExpensePopupTriggered={porps.setIsAddExpensePopupTriggered}
                    isUploadExpensePopupTriggered={porps.isUploadExpensePopupTriggered}
                    setIsUploadExpensePopupTriggered={porps.setIsUploadExpensePopupTriggered}
                />
            }>
            </Route>
        </Routes>
    )
}
export default BodyRouting