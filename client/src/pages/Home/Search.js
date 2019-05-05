import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import PeopleCardList from "../../components/PeopleCardList";
import FilterDrawer from "../../components/FilterDrawer";
import styles from "../../styles/pages/Home/Search.module.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleSkillFilter = this.handleSkillFilter.bind(this);
    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      user: [
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [{Name:"Baking", category:"Cooking", Description:"Nothing"},{Name:"Algorithm", category:"Computing", Description:"Nothing"}],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
        // {
        //   firstName: "Frisco",
        //   lastName: "Saol",
        //   image: "holder.js/100px100",
        //   skill: [],
        //   _id: "key",
        // },
      ],
      drawerOpen: false,
      pageNumber: 1,
      totalPageNumber: 1,
      dataPerPage: 8,
      currentIndex: 0,
      totalItem: 0,
      filterSkill: [],
      skills: [],
      changes: false,
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
    var query = `http://localhost:5000/api/users?from=${
      this.state.currentIndex
    }&size=${this.state.dataPerPage}`;
    if (this.state.filterSkill.length > 0) {
      query += `&skills=${this.state.filterSkill
        .map(skill => skill.id)
        .join(",")}`;
    }
    const userData = await fetch(query);
    const usersPage = await userData.json();
    const users = usersPage.users;
    const totalData = usersPage.total;
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

    const skillsData = await fetch(
      `http://localhost:5000/api/skill?id=${skillsList.join(",")}`
    );
    const skills = await skillsData.json();

    profiles = profiles.map(data => {
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
      // console.log(data);
      return {
        firstName: data.firstName,
        lastName: data.lastName,
        //TODO: change this
        image: data.image,
        skill: userSkills,
        _id: data._id,
      };
    });
    // console.log(users);
    this.setState({
      user: profiles,
      totalItem: totalData / this.state.dataPerPage,
      totalPageNumber:Math.ceil(totalData / this.state.dataPerPage),
    });
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
    this.props.history.push("/user", {id});
  };

  handleNextPage = () => {
    this.setState({
      currentIndex: this.state.currentIndex + this.state.dataPerPage + 1,
      pageNumber: this.state.pageNumber + 1,
      changes: true,
    });
    this.handleFetchUsers();
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
            values={this.state.user}
          />
        </div>
        <div className={styles.bottom}>
          {/* need to implement this page count */}
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

export default Search;
