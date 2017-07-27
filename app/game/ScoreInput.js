import React from 'react';
import styled from 'styled-components/native';

import BaseText from '../shared/components/BaseText';
import NumberSwitcher from '../shared/components/NumberSwitcher';
import { ColorPalette } from '../themes';


const Row = styled.View`
  flex: 10;
  flex-direction: row;
  padding-top: 10;
  padding-bottom: 10;
  border-bottom-width: 1;
  border-color: ${ColorPalette.divider};
  align-items: center;
`;

const OrderContainer = styled.View`
  flex: 1;
`;

const NameContainer = styled.View`
  flex: 5;
`;

const InputContainer = styled.View`
  flex: 4;
`;

const NameText = styled(BaseText)`
  text-align: left;
  color: ${ColorPalette.text}
`;

const OrderText = styled(NameText)`
  padding: 10;
`;

const ScoreInput = (props) => (
  <Row>
    <OrderContainer>
      <OrderText>
        {props.order}
      </OrderText>
    </OrderContainer>
    <NameContainer>
      <NameText>
        {props.player.name}
      </NameText>
    </NameContainer>
    <InputContainer>
      <NumberSwitcher
        number={props.score}
        onDecrease={props.onScoreDecreased}
        onIncrease={props.onScoreIncreased}
      />
    </InputContainer>
  </Row>
);

ScoreInput.propTypes = {
  player: React.PropTypes.object.isRequired,
  score: React.PropTypes.number.isRequired,
  order: React.PropTypes.number.isRequired,
  onScoreDecreased: React.PropTypes.func.isRequired,
  onScoreIncreased: React.PropTypes.func.isRequired
};

export default ScoreInput;