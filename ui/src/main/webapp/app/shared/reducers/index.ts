import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/organization/employee/employee.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/organization/department/department.reducer';
// prettier-ignore
import employeeLeave, {
  EmployeeLeaveState
} from 'app/entities/leave/employee-leave/employee-leave.reducer';
// prettier-ignore
import leaveRequest, {
  LeaveRequestState
} from 'app/entities/leave/leave-request/leave-request.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification/notification.reducer';
// prettier-ignore
import meetingRoom, {
  MeetingRoomState
} from 'app/entities/meeting/meeting-room/meeting-room.reducer';
// prettier-ignore
import participant, {
  ParticipantState
} from 'app/entities/meeting/participant/participant.reducer';
// prettier-ignore
import meeting, {
  MeetingState
} from 'app/entities/meeting/meeting/meeting.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly employee: EmployeeState;
  readonly department: DepartmentState;
  readonly employeeLeave: EmployeeLeaveState;
  readonly leaveRequest: LeaveRequestState;
  readonly notification: NotificationState;
  readonly meetingRoom: MeetingRoomState;
  readonly participant: ParticipantState;
  readonly meeting: MeetingState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  employee,
  department,
  employeeLeave,
  leaveRequest,
  notification,
  meetingRoom,
  participant,
  meeting,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
