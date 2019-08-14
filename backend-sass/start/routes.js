"use strict";

const Route = use("Route");

Route.post("sessions", "SessionController.store").validator("Session");
Route.post("users", "UserController.store").validator("User");

Route.group(() => {
  Route.resource("teams", "TeamController")
    .apiOnly()
    .validator(new Map([[["teams.store", "teams.update"], ["Team"]]]));
}).middleware("auth");

Route.group(() => {
  Route.get("roles", "RoleController.index");
  Route.post("invites", "InviteController.store")
    .validator("Invite")
    .middleware(["is:(administrator or moderator)"]);
  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store", "projects.update"], ["Project"]]]))
    .middleware(new Map([[["projects.store", "projects.update"], ["can:projects_create"]]]));

  Route.get("members", "MemberController.index");
  Route.put("members/:id", "MemberController.update").middleware(["is:(administrator or moderator)"]);

  Route.get("permissions", "PermissionController.show");
}).middleware(["auth", "team"]);
