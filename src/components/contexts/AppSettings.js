import React, { useEffect } from 'react';

export const AppSettingsContext = React.createContext();

class AppSettings extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count: 0,
      viewCompleted: true,
      showItems: 5,
      sortBy: 'difficulty',
      toggleViewCompleted: this.toggleViewCompleted,
      setShowItems: this.setShowItems,
      setSortBy: this.setSortBy,
      updateCount: this.updateCount,
    }
  }

  updateCount = (count) => {
    this.setState({ count }); 
    document.title = `To Do List: (${count})`;
  }

  toggleViewCompleted = (viewCompleted) => {
    this.setState({ viewCompleted }); 
  }
  setShowItems = (showItems) => {
    this.setState({ showItems }); 
  }
  setSortBy = (sortBy) => {
    this.setState({ sortBy }); 
  }

  render(){
    return(
      <AppSettingsContext.Provider value={this.state}>
        {this.props.children}
      </AppSettingsContext.Provider>
    )
  }
}

export default AppSettings;