import NoAvatar from './assets/no_avatar.png'

export const userColumns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "displayname",
      headerName: "Full Name",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.displayname}`}>
            {params.row.displayname}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || NoAvatar} alt={`avatar of ${params.row.username}`} />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
  ];


export const todoColumns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "todo",
      headerName: "Name",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.name}`}>
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 230,
      renderCell: (params) => {
        return (
          <div className={`todoStatus-${params.row.status}`}>
            {!params.row.status ? 'Incomplete' : 'Complete'}
          </div>
        );
      },
    }
  ];
