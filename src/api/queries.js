import { gql } from "@apollo/client";

export const insertemployee = gql`
mutation MyMutation ($firstName: String, $lastName: String, $age: smallint, $deptId: Int){
    MyMutation(firstName: $firstName, lastName: $lastName, age: $age, deptId: $deptId) {
      affected_rows
    }
  }
`

export const deleteemployee = gql`
mutation MyMutation($id: Int) {
  delete_Public_Employee(where: {id: {_eq: $id}}) {
    affected_rows
  }
}`
export const allemployees = gql`
subscription MySubscription {
  Public_Employee {
    id
    firstName
    lastName
    age
    department {
      departmentName
    }
  }
}
`
export const department = gql`
{
    Public_Department {
      id
      departmentName
    }
  }      
`