import React from "react";
import { useState, useEffect } from "react";
import { useGetUsers } from "../Services/userService";
import { Button, Container, Grid, Table } from "@material-ui/core";
import Header from "../Layout/Header";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";



const Manageuser = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if(userData.role != 'admin') {
        window.location.href = '/';
    }
    const getUsers = useGetUsers();
    const [users, setUsers] = useState([]);
	  const [discussion, setDiscussion] = useState(0);
    useEffect(() => {
        getUsers().then((res) => setUsers(res));
      }, [], []);
    return (
        <div>
            <Header />
                <Grid container >
                    <Grid item md={4} >
						<ListItem
								key={"add"}
								onClick={() => setDiscussion(0)}
								button
							>
							<ListItemText primary={"+"} />
						</ListItem>
						<React.Fragment>
							{users && (
								<List>
									{users.map((u) => (
										<ListItem
											key={u._id}
											onClick={() => {
                          setDiscussion(u._id);
												}}
											button
										>
										<ListItemText primary={u.name} />
										</ListItem>
									))}
								</List>
							)}
						</React.Fragment>
          </Grid>
					<Grid md={8} >
            <Container>
						{discussion == 0 && (
               <form
              //  onSubmit={handleSubmit}

           >
               <TextField
                   id="discussion_name"
                  //  className={classes.textField}
                   name="discussion_name"
                   label="Discussion Name"
                   fullWidth={true}
                   variant="outlined"
                   margin="normal"
                   required={true}
                  //  value={values.password}
                  //  onChange={handleChange}
                   type="text"
               />
               <TextField
                   id="discussion_discription"
                  //  className={classes.textField}
                   name="discussion_discription"
                   label="Discussion discription"
                   fullWidth={true}
                   variant="outlined"
                   margin="normal"
                   required={true}
                  //  value={values.password}
                  //  onChange={handleChange}
                   type="text"
               />
               <Button
                   type="submit"
                   fullWidth={true}
                   variant="contained"
                   color="primary"
                  //  className={classes.submit}
               >
                   Save
               </Button>
           </form>
            )}
            </Container>
					</Grid>
          
        </Grid>
            
        </div>
    );
}

export default Manageuser;