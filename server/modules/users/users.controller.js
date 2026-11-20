import listUsers from "./user.service.js"

export default function getUsers(req, res){
  const users = listUsers();
  res.json({users});
}