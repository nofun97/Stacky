import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import PeopleCardList from "../../components/PeopleCardList";
import FilterDrawer from "../../components/FilterDrawer";
import styles from "../../styles/pages/Home/Search.module.css";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleSkillFilter = this.handleSkillFilter.bind(this);
    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      user: [],
      drawerOpen: false,
      pageNumber: 1,
      totalPageNumber: 1,
      dataPerPage: 8,
      currentIndex: 0,
      totalItem: 0,
      filterSkill: [],
      skills: [],
      changes: false,
      hasSearcher: 0,
    };
  }

  componentDidMount = async () => {
    this.handleFetchUsers();
  };

  componentDidUpdate = async () => {
    if (this.state.changes) {
      this.handleFetchUsers();
      this.setState({
        changes: false,
      });
    }
  };

  handleFetchUsers = async () => {
    console.log(this.state.currentIndex);
    var query = `/api/users?from=${this.state.currentIndex}&size=${
      this.state.dataPerPage
    }`;
    if (this.state.filterSkill.length > 0) {
      query += `&skills=${this.state.filterSkill
        .map(skill => skill.Skill)
        .join(",")}`;
    }
    const userData = await fetch(query, {
      credentials: "include",
    });
    const usersPage = await userData.json();
    const users = usersPage.users;
    const totalData = usersPage.total;
    if (totalData === 0) {
      this.setState({
        user: [],
      });
      return;
    }

    var skillsObj = {};
    var skillsList = [];
    /*
      user data list of
      {
        firstName: string,
        lastName: string,
        image: string,
        skill: []{Name: string, category: string, Description: string},
        _id: string
      }
    */
    var profiles = users.map(data => {
      for (var i = 0; i < data.Skills.length; i++) {
        skillsObj[data.Skills[i].Skill] = 1;
      }
      return {
        firstName: data.FirstName,
        lastName: data.LastName,
        //TODO: change this
        image: "holder.js/100px100",
        skill: data.Skills,
        _id: data._id,
      };
    });

    for (var s in skillsObj) {
      skillsList.push(s);
    }

    const skillsData = await fetch(`/api/skill?id=${skillsList.join(",")}`, {
      credentials: "include",
    });
    const skills = await skillsData.json();

    // Check for whether there's the seaarching user in the search
    let includeSearcher = false;
    profiles = profiles
      .map(data => {
        let userSkills = [];
        for (var i = 0; i < data.skill.length; i++) {
          for (var j = 0; j < skills.length; j++) {
            if (data.skill[i].Skill === skills[j]._id) {
              userSkills.push({
                Name: skills[j].Name,
                category: skills[j].Category,
                Description: skills[j].Description,
              });
              break;
            }
          }
        }
        return {
          firstName: data.firstName,
          lastName: data.lastName,
          //TODO: change this
          image: data.image,
          skill: userSkills,
          _id: data._id,
        };
      })
      .filter(user => {
        if (user._id !== this.props.state.user._id) {
          return true;
        }
        includeSearcher = true;
        return false;
      });

    // fetch one more user if the logged in user is in search
    if (includeSearcher && (profiles.length + this.state.currentIndex) !== (totalData - 1)) {
      let newQuery = `/api/users?from=${this.state.currentIndex +
        this.state.dataPerPage}&size=1`;
      if (this.state.filterSkill.length > 0) {
        query += `&skills=${this.state.filterSkill
          .map(skill => skill.Skill)
          .join(",")}`;
      }
      let newUserData = await fetch(newQuery, {
        credentials: "include",
      });
      const newUsersPage = await newUserData.json();
      const newUsers = newUsersPage.users;
      if (totalData === 0) {
        this.setState({
          user: [],
        });
        return;
      }

      let newSkillsObj = {};
      let newSkillsList = [];
      /*
        user data list of
        {
          firstName: string,
          lastName: string,
          image: string,
          skill: []{Name: string, category: string, Description: string},
          _id: string
        }
      */
      var newProfiles = newUsers.map(data => {
        for (var i = 0; i < data.Skills.length; i++) {
          newSkillsObj[data.Skills[i].Skill] = 1;
        }
        return {
          firstName: data.FirstName,
          lastName: data.LastName,
          //TODO: change this
          image: "holder.js/100px100",
          skill: data.Skills,
          _id: data._id,
        };
      });

      for (let s in newSkillsObj) {
        newSkillsList.push(s);
      }

      let newSkillsData = await fetch(
        `/api/skill?id=${newSkillsList.join(",")}`,
        {
          credentials: "include",
        }
      );
      let newSkills = await newSkillsData.json();

      newProfiles = newProfiles
        .map(data => {
          let newUserSkills = [];
          for (var i = 0; i < data.skill.length; i++) {
            for (var j = 0; j < newSkills.length; j++) {
              if (data.skill[i].Skill === newSkills[j]._id) {
                newUserSkills.push({
                  Name: newSkills[j].Name,
                  category: newSkills[j].Category,
                  Description: newSkills[j].Description,
                });
                break;
              }
            }
          }
          return {
            firstName: data.firstName,
            lastName: data.lastName,
            //TODO: change this
            image: data.image,
            skill: newUserSkills,
            _id: data._id,
          };
        })
        .filter(user => user._id !== this.props.state.user._id);

      profiles.push(...newProfiles);
    }

    if (includeSearcher) {
      this.setState({
        hasSearcher: this.state.pageNumber,
        user: profiles,
        totalItem: (totalData - 1) / this.state.dataPerPage,
        totalPageNumber: Math.ceil((totalData - 1) / this.state.dataPerPage),
      });
    } else {
      this.setState({
        user: profiles,
        totalItem: (totalData - 1) / this.state.dataPerPage,
        totalPageNumber: Math.ceil((totalData - 1) / this.state.dataPerPage),
      });
    }
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleSkillFilter(filteredSkills) {
    this.setState({
      filterSkill: filteredSkills,
      changes: true,
    });
  }

  handleClick = id => {
    this.props.history.push({
      pathname: "/user",
      state: {
        id: id,
        userID: this.props.id,
        userFirstName: this.props.firstName,
        userLastName: this.props.lastName,
      },
    });
  };

  handleNextPage = () => {
    if (this.state.pageNumber < this.state.totalPageNumber) {
      // check next page logic
      if (this.state.pageNumber === this.state.hasSearcher) {
        this.setState({
          currentIndex: this.state.currentIndex + this.state.dataPerPage + 1,
          pageNumber: this.state.pageNumber + 1,
          changes: true,
        });
      } else {
        this.setState({
          currentIndex: this.state.currentIndex + this.state.dataPerPage,
          pageNumber: this.state.pageNumber + 1,
          changes: true,
        });
      }
    }
  };

  handlePreviousPage = () => {
    if (this.state.currentIndex > 0) {
      // check previous page logic
      if (this.state.pageNumber - 1 === this.state.hasSearcher) {
        this.setState({
          currentIndex: this.state.currentIndex - this.state.dataPerPage - 1,
          pageNumber: this.state.pageNumber - 1,
          changes: true,
        });
      } else {
        this.setState({
          currentIndex: this.state.currentIndex - this.state.dataPerPage,
          pageNumber: this.state.pageNumber - 1,
          changes: true,
        });
      }
    }
  };

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.options}>
          <IconButton
            color="inherit"
            className={styles.icon}
            onClick={this.toggleDrawer(true)}
          >
            <FilterListIcon />
          </IconButton>
        </div>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
        >
          {/* put the thing inside of the drawer here */}
          <FilterDrawer
            filterSkill={this.state.filterSkill}
            skills={this.state.skills}
            onSkillFilter={this.handleSkillFilter}
          />
        </Drawer>
        <div className={styles["card-container"]}>
          <PeopleCardList
            handleClick={this.handleClick}
            id={this.props.id}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            values={this.state.user}
          />
        </div>
        <div className={styles.bottom}>
          {/* need to implement this page count */}
          <Button
            className={`${styles["next-btn"]} ${styles["back-btn"]}`}
            onClick={this.handlePreviousPage}
          >
            {`<`}
          </Button>
          <span className={styles.pagination}>
            page {this.state.pageNumber} of {this.state.totalPageNumber}
          </span>
          <Button className={styles["next-btn"]} onClick={this.handleNextPage}>
            >
          </Button>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps)(Search);
