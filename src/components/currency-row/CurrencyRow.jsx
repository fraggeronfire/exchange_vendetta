import React from "react";
import styles from './CurrencyRow.module.css';
import { Col, Input, Row, Select } from "antd";
import { CODES } from "../../constants";

const CurrencyRow = (
    {
        inputValue,
        inputDisabled,
        selectValue,
        onInputChange,
        onselectChange,
        hasMargin = false
    }
) => {
    return(
        <Row gutter={15} className={hasMargin && styles.rowWithMargin}>
            <Col span={12}>
            <Input
              placeholder='enter value'
              size='large'
              type='number'
              value={inputValue}
              onChange={onInputChange}
              disabled={inputDisabled}
            />
            </Col>
            <Col span={12}>
             <Select
                showSearch
                optionFilterProp='label'
                size='large'
                placeholder="select currency"
                value={selectValue}
                options={CODES}
                onChange={onselectChange}
             />
            </Col>
        </Row>
    )
}

export default CurrencyRow;