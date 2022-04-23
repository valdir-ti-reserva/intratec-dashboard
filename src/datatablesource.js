import NoAvatar from './assets/no_avatar.png'

export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
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
  