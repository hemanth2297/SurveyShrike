export default function () {
  return [
    {
      title: "User Dashboard",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/user-surveys",
    },
    {
      title: "All Surveys",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/all-surveys",
    },
    {
      title: "Add New Survey",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-survey",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
