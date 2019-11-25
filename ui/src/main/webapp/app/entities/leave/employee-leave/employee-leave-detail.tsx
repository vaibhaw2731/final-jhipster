import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-leave.reducer';
import { IEmployeeLeave } from 'app/shared/model/leave/employee-leave.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeLeaveDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeLeaveDetail extends React.Component<IEmployeeLeaveDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeLeaveEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="uiApp.leaveEmployeeLeave.detail.title">EmployeeLeave</Translate> [<b>{employeeLeaveEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="employeeCode">
                <Translate contentKey="uiApp.leaveEmployeeLeave.employeeCode">Employee Code</Translate>
              </span>
            </dt>
            <dd>{employeeLeaveEntity.employeeCode}</dd>
            <dt>
              <span id="total">
                <Translate contentKey="uiApp.leaveEmployeeLeave.total">Total</Translate>
              </span>
            </dt>
            <dd>{employeeLeaveEntity.total}</dd>
            <dt>
              <span id="available">
                <Translate contentKey="uiApp.leaveEmployeeLeave.available">Available</Translate>
              </span>
            </dt>
            <dd>{employeeLeaveEntity.available}</dd>
          </dl>
          <Button tag={Link} to="/employee-leave" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/employee-leave/${employeeLeaveEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ employeeLeave }: IRootState) => ({
  employeeLeaveEntity: employeeLeave.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeLeaveDetail);
