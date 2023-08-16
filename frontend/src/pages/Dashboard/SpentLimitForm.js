import React, { useRef, useState } from 'react'
import Input from '../../components/Input';
import Button from '../../components/Button';

const SpentLimitForm = () => {
    
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
            <ul className="">
                <li className="">
                    <Input
                        defaultValue={spentLimit}
                        placeholder={spentLimit}
                        reference={startDateRef}
                        inputType="text"
                    />
                </li>
                <li className="">
                    <Input
                        defaultValue={PROPS['startDate']}
                        value={new Date()}
                        placeholder="Enter Date"
                        reference={startDateRef}
                        inputType="date"
                    />
                </li>
                <li className="">
                    <Input
                        defaultValue={PROPS['endDate']}
                        placeholder="Enter Date"
                        reference={endDateRef}
                        inputType="date"
                    />
                </li>
                <li className="">
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
