import React from 'react';
import { View } from 'react-native';

import MenuItem from '../components/MenuItem';
import styles from './styles/ContainerStyles';


function MenuScreen(props) {
    return (<View style={styles.background}>
      <MenuItem label="Game" name="initGame" {...props} />
      <MenuItem label="Resume game" name="resumeGame" {...props} />
      <MenuItem label="Players" name="players" {...props} />
      <MenuItem label="Courses" name="courses" {...props} />
    </View>);
}

export default MenuScreen;
