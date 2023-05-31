import React, { useRef, useState } from 'react'
import Input from './Input';
import Button from './Button';

const SpentLimitForm = (props) => {
    
    const PROPS = {};
    PROPS['startDate'] = new Date();
    PROPS['endDate'] = new Date('2023-05-30');
    PROPS['spentLimit'] = 1000;

    const [spentLimit, setSpentLimit] = useState(PROPS.spentLimit);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    const SetSpentLimitHandler = () => {
        console.log('Clicked')
    }

    return (
        <>
            <ul className="flex items-center flex-shrink-0 space-x-6">
                <li className="relative">
                    <Input
                        defaultValue={spentLimit}
                        placeholder={spentLimit}
                        reference={startDateRef}
                        inputType="text"
                    />
                </li>
                <li className="relative">
                    <Input
                        defaultValue={PROPS['startDate']}
                        value={new Date()}
                        placeholder="Enter Date"
                        reference={startDateRef}
                        inputType="date"
                    />
                </li>
                <li className="relative">
                    <Input
                        defaultValue={PROPS['endDate']}
                        placeholder="Enter Date"
                        reference={endDateRef}
                        inputType="date"
                    />
                </li>
                <li className="relative">
                    <Button
                        px="2"
                        py="2"
                        buttonValue="Set New Spend Limit"
                        buttonColor="purple"
                        buttonTextColor="white"
                        onClick={SetSpentLimitHandler}
                    />
                </li>
            </ul>
        </>
    )
}

export default SpentLimitForm;
