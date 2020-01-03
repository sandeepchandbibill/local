const CE = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    },
  },
  {
    name: 'New Job',
    url: '/newjobs',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    },
  },
  {
    name: 'Completed Job',
    url: '/completedjobs',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    },
  },
  // {
  //   name: 'On Hold Job',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //   },
  // },
  {
    name: 'In Progress',
    url: '/progressjobs',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    },
  },
  {
    name: 'Seller Management',
    url: '/base',
    icon: 'icon-cursor',
    children: [
      {
        name: 'View / Update Seller',
        url: '/base/tables',
        icon: 'icon-puzzle',
      },
      {
        name: 'View / Update Payout',
        url: '/payout',
        icon: 'icon-puzzle',
      },
       {
        name: 'Other Verification', 
        url: '/otherverification', 
        icon: 'icon-puzzle',
      },
    ],
  },
]



const Admin  = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    },
  },
  {
    name: 'Task  Assign',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Task Assign',
        url: '/base/task',
        icon: 'icon-puzzle',
      },
      {
        name: 'In Progress',
        url: '/inprogress',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
        },
      },
    ],
  },
  {
    name: 'Seller Management',
    url: '/base',
    icon: 'icon-cursor',
    children: [
      {
        name: 'View / Update Seller',
        url: '/base/tables',
        icon: 'icon-puzzle',
      },
      {
        name: 'View / Update Payout',
        url: '/payout',
        icon: 'icon-puzzle',
      },
      
       {
        name: 'Other Verification', 
        url: '/otherverification', 
        icon: 'icon-puzzle',
      },
      { 
        name: 'Verify Store',
        url: '/verifyStore',
        icon: 'icon-puzzle',
       },
    ],
  },
  {
    name: 'Notification',
    url: '/base',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Scheduled Notification',
        url: '/viewschedulednotification',
        icon: 'icon-puzzle',
      },
      {
        name: 'SMS & Notification',
        url: '/smsnotification',
        icon: 'icon-puzzle',
      },
      
       {
        name: 'Notification Only', 
        url: '/notification', 
        icon: 'icon-puzzle',
      },
      { 
        name: 'SMS Only',
        url: '/sms',
        icon: 'icon-puzzle',
       },
    ],
  },

]

const SuperAdmin  = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    },
  },
{
  name: 'User Management',
  icon: 'icon-cursor',
  children: [
    {
      name: 'Register',
      url: '/register',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
      },
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
      },
    },
    // {
    //   name: 'Edit Users',
    //   url: '/edit/user',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //   },
    // }
  ]
},
  {
    name: 'Task  Assign',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Task Assign',
        url: '/base/task',
        icon: 'icon-puzzle',
      },
      {
        name: 'In Progress',
        url: '/inprogress',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
        },
      },
    ],
  },
  {
    name: 'Seller Management',
    url: '/base',
    icon: 'icon-cursor',
    children: [
      {
        name: 'View / Update Seller',
        url: '/base/tables',
        icon: 'icon-puzzle',
      },
      {
        name: 'View / Update Payout',
        url: '/payout',
        icon: 'icon-puzzle',
      },
      
       {
        name: 'Other Verification', 
        url: '/otherverification', 
        icon: 'icon-puzzle',
      },
      { 
        name: 'Verify Store',
        url: '/verifyStore',
        icon: 'icon-puzzle',
       },
    ],
  },
  {
    name: 'Notification',
    url: '/base',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Scheduled Notification',
        url: '/viewschedulednotification',
        icon: 'icon-puzzle',
      },
      {
        name: 'SMS & Notification',
        url: '/smsnotification',
        icon: 'icon-puzzle',
      },
      
       {
        name: 'Notification Only', 
        url: '/notification', 
        icon: 'icon-puzzle',
      },
      { 
        name: 'SMS Only',
        url: '/sms',
        icon: 'icon-puzzle',
       },
    ],
  },

]

export default 
    (((sessionStorage.getItem('roleType')) === '4') ? {items: CE} : 
    ((sessionStorage.getItem('roleType')) === '2') ? {items: Admin}:
    ((sessionStorage.getItem('roleType')) === '1')? {items: SuperAdmin}:
    {items: null}
    )
   

 
