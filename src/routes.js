import React from 'react';
import otherverification from './Component/OtherVerification/otherverification';


const Tables = React.lazy(() => import('./views/Base/Tables'));
const Users = React.lazy(()=> import('./Component/GetUsers/getusers'))
const Register = React.lazy(()=> import('./Component/Register/Register'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const EditSeller = React.lazy(()=> import('./Component/EditSeller/EditSeller'))
const payoutedit = React.lazy(()=> import('./Component/Payout/Payout'))
const Payouts = React.lazy(()=> import('./Component/GetPayout/GetPayOut'))
const Measurement = React.lazy(()=>import('./Component/inventorys/viewmeasurement'))
const editPayouts= React.lazy(()=>import('./Component/EditPayout/EditPayout'))
const verifystore= React.lazy(()=>import('./Component/VerifyStore/verifyStore'))
const login = React.lazy(()=>import('../src/Component/Login/Login'))
const otherVerification = React.lazy(()=>import('./Component/OtherVerification/otherverification'))
const EditotherVerification = React.lazy(()=>import('./Component/OtherVerification/editOtherVerification'))
const AddPayout = React.lazy(()=> import('./Component/addPayout/addPayout'))
const SellerTask = React.lazy(()=> import('./Component/sellerAssignment/sellerAssignment'))
const NewJob = React.lazy(()=>import('./Component/CostumerExecutive/newJob'))
const CompletedJobs = React.lazy(()=>import('./Component/CostumerExecutive/CompletedJob'))
const ProgressJobs = React.lazy(()=>import('./Component/CostumerExecutive/ProgressJob'))
const AdminProgress = React.lazy(()=>import('./Component/AdminProgressJobs/adminProgress'))
const ViewScheduledNotification = React.lazy(()=>import('./Component/Notification/ViewScheduledNotification'))
const SMSNotification = React.lazy(()=>import('./Component/Notification/smsnotificationboth'))
const Notification = React.lazy(()=>import('./Component/Notification/Notificationonly'))
const SMSOnly = React.lazy(()=>import('./Component/Notification/Smsonly'))
const EditJobs = React.lazy(()=>import('./Component/CostumerExecutive/editJob'))
const EditNotification = React.lazy(()=>import('./Component/Notification/editNotification'))
const EditUsers = React.lazy(()=>import('./Component/EditUser/editUSer'))
const Task = React.lazy(()=>import('./Component/TaskAssign/task'))
const InventoryTask = React.lazy(()=>import('./Component/InventoryMangement/invetoryTaskManagement'))
const SKUDetails = React.lazy(()=> import('./Component/inventorys/viewinventory'))
const EditSku = React.lazy(()=>import('./Component/inventorys/editSku'))
const EdirMEasurement= React.lazy(()=>import('./Component/inventorys/editmeasurement'))
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
  {path: '/inprogress', name: 'Progress Job', component: AdminProgress},
  {path: '/register', name: 'Register', component:Register},
  {path: '/viewschedulednotification', name: "Scheduled Notification", component: ViewScheduledNotification},
  {path: '/smsnotification', name: "SMS and Notification", component: SMSNotification},
  {path: '/notification', name: "Notification", component: Notification},
  {path: '/sms', name: "SMS", component: SMSOnly},
  {path: '/editsmsnotification', name: 'editnot', component:EditNotification },
  {path: '/users', name: 'User', component:Users},
  {path: '/editUser', name: 'EditUser', component: EditUsers},
  {path: '/seller/task', name: "SellerTask", component: SellerTask},
  {path: '/inventory/task', name: "InventoryTask", component: InventoryTask},
  {path: '/viewSKu', name: "SKU DETAILS", component: SKUDetails},
{path:'/editsku', name: 'editSku', component: EditSku},
{path:'/editmeasurement', name: 'edit Measurement', component: EdirMEasurement},
{path:'/viewMeasurement', name: 'Measurement', component: Measurement},

  {path: '/', component: login},

  
];

export default routes;
