import * as _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { changeCurrentGame, removeGame } from '../actions/actionCreators';
import ContextMenu from '../shared/components/ContextMenu';
import Confirmation from '../shared/components/Confirmation';
import GameListElement from './GameListElement';
import styles from './styles/ResumeGameStyles';


class ResumeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContextMenu: false,
      showDeleteConfirmation: false
    };
    this.renderRow = this.renderRow.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  handleSelection(rowData) {
    const index = _.findIndex(this.props.games, (g) => g.id === rowData.id);
    const game = this.props.games[index];
    this.props.changeCurrentGame(game);
    Actions.game();
  }

  confirmDelete() {
    this.setState({
      showContextMenu: false,
      showDeleteConfirmation: true
    });
  }

  showModal(game) {
    this.setState({
      showContextMenu: true,
      selectedGame: game
    });
  }

  deleteGame() {
    this.props.removeGame(this.state.selectedGame);
    this.setState({
      showDeleteConfirmation: false,
      selectedGame: null
    });
  }

  renderRow(rowData) {
    return (<GameListElement
      game={rowData}
      onPress={() => this.handleSelection(rowData)}
      onLongPress={() => this.showModal(rowData)}
    />);
  }

  renderSeparator() {
    return (<View style={styles.listSeparator} />);
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(_.sortBy(this.props.games, 'timeBegin').reverse());
    const removeGameString = this.state.selectedGame
            ? 'Do you really want to remove game?'
            : '';
    return (<View style={styles.mainContainer}>
      <ContextMenu
        visible={this.state.showContextMenu}
        onDelete={this.confirmDelete}
        onClose={() => this.setState({ showContextMenu: false })}
      />
      <Confirmation
        onConfirm={this.deleteGame}
        onCancel={() => this.setState({ showDeleteConfirmation: false })}
        message={removeGameString}
        visible={this.state.showDeleteConfirmation}
      />
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    </View>);
  }
}

ResumeGame.propTypes = {
  games: React.PropTypes.array.isRequired,
  changeCurrentGame: React.PropTypes.func.isRequired,
  removeGame: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  games: state.games
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentGame: bindActionCreators(changeCurrentGame, dispatch),
  removeGame: bindActionCreators(removeGame, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeGame);