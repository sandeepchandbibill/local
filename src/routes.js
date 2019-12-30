import React from 'react';
import otherverification from './Component/OtherVerification/otherverification';


const Tables = React.lazy(() => import('./views/Base/Tables'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const EditSeller = React.lazy(()=> import('./Component/EditSeller/EditSeller'))
const payoutedit = React.lazy(()=> import('./Component/Payout/Payout'))
const Payouts = React.lazy(()=> import('./Component/GetPayout/GetPayOut'))
const editPayouts= React.lazy(()=>import('./Component/EditPayout/EditPayout'))
const verifystore= React.lazy(()=>import('./Component/VerifyStore/VerifyStore'))
const login = React.lazy(()=>import('../src/Component/Login/Login'))
const otherVerification = React.lazy(()=>import('./Component/OtherVerification/otherverification'))
const EditotherVerification = React.lazy(()=>import('./Component/OtherVerification/editOtherVerification'))
const AddPayout = React.lazy(()=> import('./Component/addPayout/addPayout'))
const Task = React.lazy(()=> import('./Component/TaskAssignment/TaskAssignment'))
const NewJob = React.lazy(()=>import('./Component/CostumerExecutive/newJob'))
const CompletedJobs = React.lazy(()=>import('./Component/CostumerExecutive/CompletedJob'))
const ProgressJobs = React.lazy(()=>import('./Component/CostumerExecutive/ProgressJob'))
const EditJobs = React.lazy(()=>import('./Component/CostumerExecutive/editJob'))
let token = sessionStorage.getItem('token')

const routes = [
  {path: '/', exact: true,  component: login },
  token != null ?{path: '/dashboard', name: 'Dashboard', component: Dashboard } : {path: '/', component: login},
  {path: '/base/tables', name: 'Seller Information', component: Tables },
  {path: '/editSeller', name: 'Edit Seller', component:EditSeller},
  {path: '/payout', name: 'Payouts Information', component: Payouts},
  {path: '/otherverification', name: 'Other Verification', component: otherVerification},
  {path: '/editotherverification', name: 'Edit Other Verification', component: EditotherVerification},
  {path: '/payoutedit', name:'Edit Payout', component: payoutedit},
  {path: '/editpayouts', name: 'Edit Payouts', component: editPayouts},
  {path: '/verifystore', name: 'Verify Store', component: verifystore},
  {path: '/addpayout', name: 'AddPayout', component: AddPayout},
  {path: '/newjobs', name: 'New Job', component: NewJob},
  {path: '/progressjobs', name: 'Progress Job', component: ProgressJobs},
  {path: '/completedjobs', name: 'Completed Job', component: CompletedJobs},
  {path: '/editjobs', name: 'Edit Job', component: EditJobs},
  {path: '/base/task', name: "Task", component: Task},
  {path: '/', component: login},

  
];

export default routes;