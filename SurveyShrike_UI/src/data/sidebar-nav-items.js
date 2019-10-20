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
    }
  ];
}
